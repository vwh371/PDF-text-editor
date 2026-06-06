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
