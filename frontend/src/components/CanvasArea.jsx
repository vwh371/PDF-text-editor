import React, { useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileText } from 'lucide-react';

/**
 * CanvasArea Component – red/white dark theme
 */
const CanvasArea = ({
  pdfData,
  currentPage,
  zoom,
  textBlocks,
  selectedBlock,
  onCanvasClick,
  loading,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (pdfData && canvasRef.current) renderPDFPage();
  }, [pdfData, currentPage, zoom, textBlocks]);

  const renderPDFPage = async () => {
    try {
      const loadingTask = pdfjsLib.getDocument({ data: pdfData.slice() });
      const pdf         = await loadingTask.promise;
      const page        = await pdf.getPage(currentPage + 1);
      const viewport    = page.getViewport({ scale: zoom });
      const canvas      = canvasRef.current;
      const context     = canvas.getContext('2d');

      canvas.width  = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      drawTextOverlays(viewport);
    } catch (err) {
      console.error('Render error:', err);
    }
  };

  const drawTextOverlays = (viewport) => {
    const canvas    = canvasRef.current;
    const ctx       = canvas.getContext('2d');
    const scale     = viewport.scale;
    const pageBlocks = textBlocks.filter((b) => b.page === currentPage);

    pageBlocks.forEach((block) => {
      ctx.save();
      const isSelected = selectedBlock?.id === block.id;
      ctx.strokeStyle = isSelected ? '#ef4444' : '#dc2626';
      ctx.fillStyle   = isSelected ? 'rgba(239,68,68,0.15)' : 'rgba(220,38,38,0.07)';
      ctx.lineWidth   = isSelected ? 3 : 1.5;

      const x = block.x * scale;
      const y = (block.y - block.fontSize) * scale;
      const w = block.width * scale;
      const h = block.height * scale;

      ctx.strokeRect(x, y, w, h);
      ctx.fillRect(x, y, w, h);

      ctx.font      = `${block.fontSize * scale}px 'Inter', Arial`;
      ctx.fillStyle = block.color;
      ctx.fillText(block.text, block.x * scale, block.y * scale);
      ctx.restore();
    });
  };

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    const rect   = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width  / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    onCanvasClick((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY, zoom);
  };

  if (!pdfData && !loading) {
    return (
      <div className="flex-1 w-full h-full flex items-center justify-center min-h-[500px]">
        <div className="text-center text-white/30">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-red-900/10 border border-red-900/20 mx-auto mb-5">
            <FileText className="w-10 h-10 text-red-700/60" />
          </div>
          <h3 className="text-lg font-bold text-white/50 mb-2">No PDF Loaded</h3>
          <p className="text-sm">Click "Upload PDF" in the toolbar to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-start justify-center">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="cursor-pointer rounded-lg shadow-2xl shadow-black/60 max-w-full h-auto"
        style={{ backgroundColor: 'white' }}
      />
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
          <div className="bg-[#1c1010] border border-red-900/50 rounded-xl p-4 flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500" />
            <span className="text-sm text-white/70">Processing…</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasArea;