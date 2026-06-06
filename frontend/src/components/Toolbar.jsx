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
  
  // Zoom out handler - decreases zoom by 0.1, min 0.8
  const handleZoomOut = () => setZoom(Math.max(0.8, zoom - 0.1));

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* File Upload Section */}
        <div className="flex items-center gap-3">
          <label className="btn btn-primary cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload PDF
            {/* Hidden file input */}
            <input
              type="file"
              accept=".pdf"
              onChange={onFileUpload}
              disabled={loading}
              className="hidden"
            />
          </label>
          {/* Display file name if available */}
          {fileName && (
            <div className="hidden sm:block text-sm text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
              📄 {fileName.length > 30 ? fileName.substring(0, 30) + '...' : fileName}
            </div>
          )}
        </div>
