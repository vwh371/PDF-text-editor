import React from 'react';
import { Type, Hash } from 'lucide-react';

/**
 * TextBlockList Component – red/white dark theme
 */
const TextBlockList = ({ blocks, selectedBlock, onSelectBlock }) => {
  if (blocks.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        <Type className="w-10 h-10 mx-auto mb-2 opacity-45 text-slate-300" />
        <p className="text-xs">No text blocks on this page</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-custom">
      {blocks.map((block) => (
        <div
          key={block.id}
          onClick={() => onSelectBlock(block)}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedBlock?.id === block.id
              ? 'bg-green-50 border-l-4 border-green-500 shadow-sm'
              : 'bg-slate-50 border border-slate-250/60 hover:border-green-400 hover:bg-green-50/10'
          }`}
        >
          <div className="text-xs font-semibold text-slate-700 mb-1 line-clamp-2">
            {block.text.length > 60 ? block.text.substring(0, 60) + '…' : block.text}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3 text-slate-400" /> {block.fontSize}px
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: block.color }} />
              {block.color}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextBlockList;