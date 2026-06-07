import React, { useState } from 'react';
import EditPanel from './EditPanel';
import TextBlockList from './TextBlockList';
import { Lightbulb } from 'lucide-react';

/**
 * Sidebar Component – red/white dark theme
 */
const Sidebar = ({
  textBlocks,
  currentPage,
  selectedBlock,
  onSelectBlock,
  onApplyEdit,
  onDeleteBlock,
}) => {
  const [showTips, setShowTips] = useState(true);
  const currentPageBlocks = textBlocks.filter((b) => b.page === currentPage);

  return (
    <div className="w-full lg:w-96 bg-[#1c1010] border-l border-red-950/60 flex flex-col max-h-full overflow-y-auto scrollbar-custom shrink-0">

      {/* Text Blocks list */}
      <div className="p-5 border-b border-red-950/50">
        <h3 className="text-sm font-bold text-white/80 mb-4 flex items-center justify-between">
          <span>📋 Text Blocks</span>
          <span className="text-xs bg-red-600/20 text-red-400 border border-red-600/30 px-2 py-0.5 rounded-full">
            {currentPageBlocks.length}
          </span>
        </h3>
        <TextBlockList
          blocks={currentPageBlocks}
          selectedBlock={selectedBlock}
          onSelectBlock={onSelectBlock}
        />
      </div>

      {/* Edit Panel */}
      {selectedBlock && (
        <div className="p-5 border-b border-red-950/50">
          <EditPanel
            selectedBlock={selectedBlock}
            onApplyEdit={onApplyEdit}
            onDeleteBlock={onDeleteBlock}
          />
        </div>
      )}

      {/* Tips */}
      {showTips && (
        <div className="m-4 p-4 bg-red-900/10 border border-red-900/30 rounded-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <h4 className="text-xs font-bold text-white/70">Quick Tips</h4>
              </div>
              <ul className="space-y-1.5 text-xs text-white/50">
                {[
                  'Click text on the PDF canvas to select it',
                  'Edit font size & color in this panel',
                  'Press Apply Changes to update the preview',
                  'Save directly as a PDF when done',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowTips(false)}
              className="text-white/30 hover:text-white/60 text-xs ml-2"
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