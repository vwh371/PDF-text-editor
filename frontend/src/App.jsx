import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Toolbar from './components/Toolbar';
import CanvasArea from './components/CanvasArea';
import Sidebar from './components/Sidebar';
import usePdfEditor from './hooks/usePdfEditor';
import { ArrowLeft, FileText, Sparkles } from 'lucide-react';

function App() {
  const [showEditor, setShowEditor] = useState(false);
  const {
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
  } = usePdfEditor();

  return (
    <>
      {!showEditor ? (
        <LandingPage onGetStarted={() => setShowEditor(true)} />
      ) : (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-inter select-none">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-wide">PDFlow Workspace</h1>
                {fileName ? (
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                    Editing: <span className="text-slate-300 font-semibold max-w-[200px] truncate">{fileName}</span>
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 mt-0.5">Please upload a document to begin editing</p>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setShowEditor(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </header>

          {/* Editor Toolbar */}
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

          {/* Main workspace */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            {/* PDF Canvas Center */}
            <div className="flex-1 overflow-auto bg-slate-900 flex justify-center items-start p-8 scrollbar-custom">
              <CanvasArea
                pdfData={pdfData}
                currentPage={currentPage}
                zoom={zoom}
                textBlocks={textBlocks}
                selectedBlock={selectedBlock}
                onCanvasClick={handleCanvasClick}
                loading={loading}
              />
            </div>

            {/* Editing Sidebar Panel */}
            {sessionId && (
              <Sidebar
                textBlocks={textBlocks}
                currentPage={currentPage}
                selectedBlock={selectedBlock}
                onSelectBlock={setSelectedBlock}
                onApplyEdit={handleApplyEdit}
                onDeleteBlock={handleDeleteBlock}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;