import React from 'react';
// Import icons from lucide-react
import { Upload, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw, Save, Loader } from 'lucide-react';

/**
 * Toolbar Component
 * Provides controls for file upload, zoom, page navigation, and PDF actions
 * 
 * @param {Function} onFileUpload - Handler for file upload
 * @param {string} fileName - Name of uploaded file
 * @param {number} zoom - Current zoom level
 * @param {Function} setZoom - Function to update zoom level
 * @param {number} currentPage - Current page number
 * @param {Function} setCurrentPage - Function to change page
 * @param {number} pageCount - Total number of pages
 * @param {Function} onReset - Handler for resetting edits
 * @param {Function} onSave - Handler for saving PDF
 * @param {boolean} loading - Loading state indicator
 * @param {string} sessionId - Current session ID
 */
const Toolbar = ({ 
  onFileUpload, 
  fileName, 
  zoom, 
  setZoom, 
  currentPage, 
  setCurrentPage, 
  pageCount, 
  onReset, 
  onSave, 
  loading,
  sessionId 
}) => {
  // Zoom in handler - increases zoom by 0.1, max 3.0
  const handleZoomIn = () => setZoom(Math.min(3, zoom + 0.1));
