import React from 'react';
import { Type, Hash } from 'lucide-react';

/**
 * TextBlockList Component
 * Displays a list of clickable text blocks from the current PDF page
 * 
 * @param {Array} blocks - Array of text blocks for current page
 * @param {Object} selectedBlock - Currently selected block
 * @param {Function} onSelectBlock - Handler for block selection
 */
const TextBlockList = ({ blocks, selectedBlock, onSelectBlock }) => {
  // Show empty state if no blocks exist
  if (blocks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Type className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No text blocks on this page</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-custom">
      {/* Map through blocks and render each as a clickable card */}
      {blocks.map((block) => (
        <div
          key={block.id}
          onClick={() => onSelectBlock(block)}
          className={`
            p-3 rounded-lg cursor-pointer transition-all duration-200
            ${selectedBlock?.id === block.id 
              ? 'bg-blue-50 border-l-4 border-blue-500 shadow-md'   // Selected block styling
              : 'bg-white border border-gray-200 hover:shadow-md hover:border-blue-300'  // Hover styling
            }
          `}
        >
          {/* Block text preview - truncate if too long */}
          <div className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
            {block.text.length > 60 ? block.text.substring(0, 60) + '...' : block.text}
          </div>
          {/* Block metadata - font size and color */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              {block.fontSize}px
            </span>
            <span className="flex items-center gap-1">
              {/* Color preview circle */}
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: block.color }}
              ></div>
              {block.color}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextBlockList;