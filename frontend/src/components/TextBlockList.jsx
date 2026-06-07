import React from 'react';
import { Type, Hash } from 'lucide-react';

/**
 * TextBlockList Component – red/white dark theme
 */
const TextBlockList = ({ blocks, selectedBlock, onSelectBlock }) => {
  if (blocks.length === 0) {
    return (
      <div className="text-center py-8 text-white/30">
        <Type className="w-10 h-10 mx-auto mb-2 opacity-40" />
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
              ? 'bg-red-900/30 border-l-4 border-red-500 shadow-md'
              : 'bg-[#0f0b0b] border border-red-950/40 hover:border-red-800/60 hover:bg-red-950/20'
          }`}
        >
          <div className="text-xs font-medium text-white/80 mb-1 line-clamp-2">
            {block.text.length > 60 ? block.text.substring(0, 60) + '…' : block.text}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/40">
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3" /> {block.fontSize}px
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: block.color }} />
              {block.color}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextBlockList;