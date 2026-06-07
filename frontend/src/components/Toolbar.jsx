import React from 'react';
import { Upload, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw, Save, Loader } from 'lucide-react';

/**
 * Toolbar Component – red/white dark theme
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
  sessionId,
}) => {
  const handleZoomIn  = () => setZoom(Math.min(3, zoom + 0.1));
  const handleZoomOut = () => setZoom(Math.max(0.8, zoom - 0.1));

  return (
    <div className="bg-[#1c1010] border-b border-red-950/60 px-6 py-3 shrink-0">
      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* Upload */}
        <div className="flex items-center gap-3">
          <label className="btn btn-primary cursor-pointer flex items-center gap-2 text-sm">
            <Upload className="w-4 h-4" />
            Upload PDF
            <input type="file" accept=".pdf" onChange={onFileUpload} disabled={loading} className="hidden" />
          </label>
          {fileName && (
            <div className="hidden sm:block text-xs text-white/50 bg-white/5 border border-red-950/50 px-3 py-1 rounded-full truncate max-w-[200px]">
              📄 {fileName.length > 28 ? fileName.substring(0, 28) + '…' : fileName}
            </div>
          )}
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-1 bg-[#0f0b0b] rounded-lg border border-red-950/60 p-1">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 0.8}
            className="p-1.5 hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-40"
          >
            <ZoomOut className="w-4 h-4 text-white/70" />
          </button>
          <span className="w-14 text-center font-medium text-xs text-white/70">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="p-1.5 hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-40"
          >
            <ZoomIn className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0 || !sessionId}
            className="p-1.5 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5 text-white/70" />
          </button>
          <div className="bg-[#0f0b0b] px-3 py-1 rounded-lg border border-red-950/60 text-xs">
            <span className="font-bold text-white">{currentPage + 1}</span>
            <span className="text-white/40"> / {pageCount || 1}</span>
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
            disabled={currentPage === pageCount - 1 || !sessionId}
            className="p-1.5 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            disabled={!sessionId || loading}
            className="btn btn-warning flex items-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={onSave}
            disabled={!sessionId || loading}
            className="btn btn-success flex items-center gap-2 text-sm"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save PDF
          </button>
        </div>

      </div>
    </div>
  );
};

export default Toolbar;