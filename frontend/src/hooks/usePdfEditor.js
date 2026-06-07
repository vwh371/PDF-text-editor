import { useState, useCallback } from 'react';
import { pdfApi } from '../services/api';

/**
 * Custom Hook: usePdfEditor
 * Manages all PDF editor state and business logic
 * Centralizes state management for the application
 * 
 * @returns {Object} - State variables and handler functions
 */
const usePdfEditor = () => {
  // ========== State Variables ==========
  const [sessionId, setSessionId] = useState(null);        // Unique session identifier from backend
  const [textBlocks, setTextBlocks] = useState([]);        // Array of text blocks with positions
  const [selectedBlock, setSelectedBlock] = useState(null); // Currently selected block for editing
  const [currentPage, setCurrentPage] = useState(0);       // Current page index (0-based)
  const [pageCount, setPageCount] = useState(0);           // Total number of pages in PDF
  const [pdfData, setPdfData] = useState(null);            // Raw PDF data as ArrayBuffer
  const [loading, setLoading] = useState(false);           // Loading state for async operations
  const [fileName, setFileName] = useState('');            // Name of uploaded file
  const [zoom, setZoom] = useState(1.5);                   // Zoom level (1.5 = 150%)

  /**
   * Handle file upload from user
   * Sends PDF to backend for processing and stores session data
   * 
   * @param {Event} event - File input change event
   */
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      // Upload PDF to backend
      const data = await pdfApi.uploadPDF(file);
      
      // Update state with response data
      setSessionId(data.sessionId);
      setTextBlocks(data.textBlocks);
      setPageCount(data.pageCount);
      setFileName(data.fileName);
      setCurrentPage(0);
      setSelectedBlock(null);
      
      // Fetch PDF data for rendering
      const pdfBlob = await pdfApi.getPDFData(data.sessionId);
      const arrayBuffer = await pdfBlob.arrayBuffer();
      setPdfData(arrayBuffer);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading PDF: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle clicks on canvas to select text blocks
   * Calculates which text block was clicked based on position
   * 
   * @param {number} mouseX - X coordinate relative to canvas
   * @param {number} mouseY - Y coordinate relative to canvas
   * @param {number} zoomLevel - Current zoom level for scaling
   */
  const handleCanvasClick = useCallback((mouseX, mouseY, zoomLevel) => {
    if (!textBlocks.length) return;
    
    // Find block that contains the click coordinates
    const clickedBlock = textBlocks.find(block => {
      if (block.page !== currentPage) return false;
      
      // Calculate scaled block boundaries
      const x = block.x * zoomLevel;
      const y = (block.y - block.fontSize) * zoomLevel;
      const width = block.width * zoomLevel;
      const height = block.height * zoomLevel;
      
      // Check if click is within block bounds
      return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
    });
    
    if (clickedBlock) {
      setSelectedBlock(clickedBlock);
    }
  }, [textBlocks, currentPage]);

  /**
   * Apply edits to selected text block
   * Updates local state and syncs with backend
   * 
   * @param {string} blockId - ID of block being edited
   * @param {string} newText - New text content
   * @param {number} newFontSize - New font size in pixels
   * @param {string} newColor - New color in hex format
   */
  const handleApplyEdit = async (blockId, newText, newFontSize, newColor) => {
    // Update local state
    const updatedBlocks = textBlocks.map(block =>
      block.id === blockId
        ? {
            ...block,
            text: newText,
            fontSize: newFontSize,
            color: newColor,
            width: Math.max(block.width, newText.length * (newFontSize * 0.6))
          }
        : block
    );
    
    setTextBlocks(updatedBlocks);
    setSelectedBlock({ ...selectedBlock, text: newText, fontSize: newFontSize, color: newColor });
    
    // Sync with backend and track edit history
    await pdfApi.updateBlocks(sessionId, updatedBlocks, {
      blockId,
      oldText: selectedBlock.text,
      newText,
      oldFontSize: selectedBlock.fontSize,
      newFontSize,
      oldColor: selectedBlock.color,
      newColor
    });
  };

  /**
   * Delete the currently selected text block
   * Removes block from state and backend
   */
  const handleDeleteBlock = async () => {
    if (!selectedBlock) return;
    
    if (window.confirm('Delete this text block?')) {
      const updatedBlocks = textBlocks.filter(block => block.id !== selectedBlock.id);
      setTextBlocks(updatedBlocks);
      setSelectedBlock(null);
      await pdfApi.updateBlocks(sessionId, updatedBlocks);
    }
  };

  /**
   * Save edited PDF and trigger download
   * Generates new PDF with all text edits applied
   */
  const handleSavePDF = async () => {
    if (!sessionId) return;
    
    setLoading(true);
    try {
      // Generate edited PDF from backend
      const pdfBlob = await pdfApi.generateAndDownloadPDF(sessionId, textBlocks);
      
      // Create download link and trigger download
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'PDFlow_Edit_Edited.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert('✅ PDF saved successfully!');
    } catch (error) {
      alert('Error saving PDF: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset all edits to original PDF content
   * Reverts all text blocks to their original state
   */
  const handleReset = async () => {
    if (!sessionId) return;
    
    if (window.confirm('Reset all changes?')) {
      setLoading(true);
      try {
        const data = await pdfApi.resetPDF(sessionId);
        setTextBlocks(data.textBlocks);
        setSelectedBlock(null);
        alert('✅ Reset to original');
      } catch (error) {
        alert('Error resetting: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Return all state and handlers for use in components
  return {
    sessionId,
    textBlocks,
    selectedBlock,
    currentPage,
    pageCount,
    pdfData,
    loading,
    fileName,
    zoom,
    setZoom,
    setCurrentPage,
    handleFileUpload,
    handleCanvasClick,
    handleApplyEdit,
    handleDeleteBlock,
    handleSavePDF,
    handleReset,
    setSelectedBlock,
  };
};

export default usePdfEditor;