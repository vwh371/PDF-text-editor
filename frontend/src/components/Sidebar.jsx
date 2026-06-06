import React, { useState } from 'react';
import EditPanel from './EditPanel';
import TextBlockList from './TextBlockList';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Sidebar Component
 * Displays list of text blocks and edit panel for selected block
 * 
 * @param {Array} textBlocks - All text blocks from PDF
 * @param {number} currentPage - Current page number
 * @param {Object} selectedBlock - Currently selected text block
 * @param {Function} onSelectBlock - Handler for selecting a block
 * @param {Function} onApplyEdit - Handler for applying edits
 * @param {Function} onDeleteBlock - Handler for deleting a block
 */
const Sidebar = ({ 
  textBlocks, 
  currentPage, 
  selectedBlock, 
  onSelectBlock, 
  onApplyEdit, 
  onDeleteBlock 
}) => {
  // State for showing/hiding tips section
  const [showTips, setShowTips] = useState(true);
  
  // Filter blocks for current page only
  const currentPageBlocks = textBlocks.filter(block => block.page === currentPage);

  return (
    <div className="w-full lg:w-96 bg-gray-50 border-l border-gray-200 flex flex-col max-h-[80vh] overflow-y-auto scrollbar-custom">
      
      {/* Text Blocks List Section */}
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
          <span>📋 Text Blocks</span>
          {/* Badge showing count of text blocks on current page */}
          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {currentPageBlocks.length}
          </span>
        </h3>
        {/* Render list of text blocks */}
        <TextBlockList
          blocks={currentPageBlocks}
          selectedBlock={selectedBlock}
          onSelectBlock={onSelectBlock}
        />
      </div>

      {/* Edit Panel - Only shown when a block is selected */}
      {selectedBlock && (
        <div className="p-5 border-b border-gray-200">
          <EditPanel
            selectedBlock={selectedBlock}
            onApplyEdit={onApplyEdit}
            onDeleteBlock={onDeleteBlock}
          />
        </div>
      )}

      {/* Tips Section - Helpful hints for users */}
      {showTips && (
        <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 m-4 rounded-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Tips header */}
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h4 className="font-semibold text-gray-800">Quick Tips</h4>
              </div>
              {/* Tips list */}
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Click text on PDF to select
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Edit font size & color
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Save directly as PDF
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  No Word conversion needed
                </li>
              </ul>
            </div>
            {/* Close tips button */}
            <button
              onClick={() => setShowTips(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;