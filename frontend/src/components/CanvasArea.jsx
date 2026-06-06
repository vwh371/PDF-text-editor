import React, { useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileText } from 'lucide-react';

/**
 * CanvasArea Component
 * Renders PDF pages and handles text selection via clicks
 * 
 * @param {ArrayBuffer} pdfData - Raw PDF data
 * @param {number} currentPage - Current page index
 * @param {number} zoom - Zoom level for rendering
 * @param {Array} textBlocks - Array of text blocks with positions
 * @param {Object} selectedBlock - Currently selected text block
 * @param {Function} onCanvasClick - Handler for canvas clicks
 * @param {boolean} loading - Loading state indicator
 */
const CanvasArea = ({ 
  pdfData, 
  currentPage, 
  zoom, 
  textBlocks, 
  selectedBlock, 
  onCanvasClick, 
  loading 
}) => {
  // Reference to canvas element for direct DOM manipulation
  const canvasRef = useRef(null);

  // Re-render when PDF data, page, zoom, or text blocks change
  useEffect(() => {
    if (pdfData && canvasRef.current) {
      renderPDFPage();
    }
  }, [pdfData, currentPage, zoom, textBlocks]);

  /**
   * Renders the current PDF page on canvas
   * Uses pdf.js library for rendering
   */
  const renderPDFPage = async () => {
    try {
      // Load PDF document from array buffer
      const loadingTask = pdfjsLib.getDocument({ data: pdfData.slice() });
      const pdf = await loadingTask.promise;
      // Get specific page
      const page = await pdf.getPage(currentPage + 1);
      
      // Calculate viewport based on zoom level
      const viewport = page.getViewport({ scale: zoom });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // Render PDF page to canvas
      await page.render({ canvasContext: context, viewport }).promise;
      // Draw editable text overlays
      drawTextOverlays(viewport);
    } catch (error) {
      console.error('Render error:', error);
    }
  };

  /**
   * Draws interactive text overlays on top of rendered PDF
   * Shows bounding boxes and makes text blocks clickable
   * 
   * @param {Object} viewport - PDF.js viewport object with scale factor
   */
  const drawTextOverlays = (viewport) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const scale = viewport.scale;
    // Filter text blocks for current page only
    const pageBlocks = textBlocks.filter(block => block.page === currentPage);
    
    pageBlocks.forEach(block => {
      ctx.save();
      // Different styling for selected vs unselected blocks
      ctx.strokeStyle = selectedBlock?.id === block.id ? '#ef4444' : '#3b82f6';
      ctx.fillStyle = selectedBlock?.id === block.id ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = selectedBlock?.id === block.id ? 3 : 2;
      
      // Calculate scaled coordinates
      const x = block.x * scale;
      const y = (block.y - block.fontSize) * scale;
      const width = block.width * scale;
      const height = block.height * scale;
      
      // Draw bounding box and fill
      ctx.strokeRect(x, y, width, height);
      ctx.fillRect(x, y, width, height);
      
      // Draw the actual text
      ctx.font = `${block.fontSize * scale}px 'Inter', Arial`;
      ctx.fillStyle = block.color;
      ctx.fillText(block.text, block.x * scale, block.y * scale);
      ctx.restore();
    });
  };

  /**
   * Handles click events on canvas
   * Calculates click position and finds which text block was clicked
   * 
   * @param {MouseEvent} e - Click event
   */
  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    
    // Calculate click coordinates relative to canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    // Pass click to parent component
    onCanvasClick(mouseX, mouseY, zoom);
  };

  // Show placeholder when no PDF is loaded
  if (!pdfData && !loading) {
    return (
      <div className="flex-1 bg-gray-800 flex items-center justify-center min-h-[600px]">
        <div className="text-center text-white">
          <FileText className="w-20 h-20 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No PDF Loaded</h3>
          <p className="text-gray-300">Click "Upload PDF" to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-800 flex items-center justify-center p-6 min-h-[600px] relative">
      {/* Canvas element for PDF rendering */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="cursor-pointer rounded-lg shadow-2xl max-w-full h-auto"
        style={{ backgroundColor: 'white' }}
      />
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasArea;