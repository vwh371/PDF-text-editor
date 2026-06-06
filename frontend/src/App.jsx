import React, { useState, useEffect, useCallback } from 'react';
import { pdfjs } from 'pdfjs-dist';
// Import custom components
import Toolbar from './components/Toolbar';
import CanvasArea from './components/CanvasArea';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';
// Import API service and custom hook
import { pdfApi } from './services/api';
import usePdfEditor from './hooks/usePdfEditor';
// Import icons from lucide-react
import { FileText, Edit3, Zap } from 'lucide-react';

// Configure PDF.js worker for rendering PDFs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

function App() {
  // Use custom hook for PDF editor state and functions
  const {
    sessionId,           // Unique session identifier
    textBlocks,          // Array of text blocks extracted from PDF
    selectedBlock,       // Currently selected text block for editing
    currentPage,         // Current page being viewed
    pageCount,           // Total number of pages in PDF
    pdfData,             // Raw PDF data for rendering
    loading,             // Loading state indicator
    fileName,            // Name of uploaded file
    zoom,                // Zoom level for PDF rendering
    setZoom,             // Function to update zoom level
    setCurrentPage,      // Function to change current page
    handleFileUpload,    // Handler for file upload
    handleCanvasClick,   // Handler for clicking on canvas
    handleApplyEdit,     // Handler for applying text edits
    handleDeleteBlock,   // Handler for deleting text blocks
    handleSavePDF,       // Handler for saving edited PDF
    handleReset,         // Handler for resetting to original
    setSelectedBlock,    // Function to set selected block
  } = usePdfEditor();

  // State for showing/hiding tips section
  const [showTips, setShowTips] = useState(true);

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Main application card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo and title */}
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-400" />
                PDFlow Edit Pro
              </h1>
              <p className="text-gray-300 mt-2 text-sm">
                Edit PDF Text Directly • No Word Conversion • Save Time ⚡
              </p>
            </div>
            {/* Display file name if uploaded */}
            {fileName && (
              <div className="bg-gray-700 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  <span>{fileName}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toolbar Component */}
        <Toolbar
          onFileUpload={handleFileUpload}
          fileName={fileName}
          zoom={zoom}
          setZoom={setZoom}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
          onReset={handleReset}
          onSave={handleSavePDF}
          loading={loading}
          sessionId={sessionId}
        />

        {/* Main Editor Area - Flex layout for responsive design */}
        <div className="flex flex-col lg:flex-row min-h-[70vh]">
          
          {/* Canvas Area - PDF rendering and text overlay */}
          <CanvasArea
            pdfData={pdfData}
            currentPage={currentPage}
            zoom={zoom}
            textBlocks={textBlocks}
            selectedBlock={selectedBlock}
            onCanvasClick={handleCanvasClick}
            loading={loading}
          />

          {/* Sidebar - Text blocks list and edit panel */}
          <Sidebar
            textBlocks={textBlocks}
            currentPage={currentPage}
            selectedBlock={selectedBlock}
            onSelectBlock={setSelectedBlock}
            onApplyEdit={handleApplyEdit}
            onDeleteBlock={handleDeleteBlock}
          />
        </div>

        {/* Footer Tips Section - Dismissible */}
        {showTips && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>💡 <strong>Pro Tip:</strong> Click directly on any text in the PDF to select and edit it</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">🎨 Use color picker to change text color</span>
                <span className="hidden lg:inline">•</span>
                <span className="hidden lg:inline">🔍 Zoom in for precise editing</span>
              </div>
              {/* Close tips button */}
              <button
                onClick={() => setShowTips(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay - Shown during async operations */}
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default App;