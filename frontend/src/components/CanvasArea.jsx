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
