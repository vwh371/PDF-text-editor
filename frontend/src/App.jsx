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
        /* ── Editor Workspace: full-screen, no gaps ─────── */
        <div
          style={{ height: '100vh', width: '100vw' }}
          className="flex flex-col bg-[#0f0b0b] text-white overflow-hidden"
        >
          {/* ── Header ────────────────────────────────────── */}
          <header className="flex items-center justify-between px-6 py-3 bg-[#1c1010] border-b border-red-950/60 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-600/15 border border-red-600/30">
                <FileText className="w-4.5 h-4.5 text-red-400" />
              </div>
              <div>
                <h1 className="text-base font-black text-white tracking-wide">PDFlow Workspace</h1>
                {fileName ? (
                  <p className="text-xs text-white/40 flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
                    Editing:{' '}
                    <span className="text-white/70 font-semibold max-w-[200px] truncate">
                      {fileName}
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-white/30 mt-0.5">Upload a PDF file to start editing</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowEditor(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/10 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </header>

          {/* ── Toolbar ───────────────────────────────────── */}
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

          {/* ── Main workspace ────────────────────────────── */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
            {/* PDF canvas */}
            <div className="flex-1 overflow-auto bg-[#150d0d] flex justify-center items-start p-8 scrollbar-custom min-h-0">
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

            {/* Sidebar – only once a file is loaded */}
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