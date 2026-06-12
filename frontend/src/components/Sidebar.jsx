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
    <div className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col max-h-full overflow-y-auto scrollbar-custom shrink-0 text-slate-800">

      {/* Text Blocks list */}
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
          <span>📋 Text Blocks</span>
          <span className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-bold">
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
        <div className="p-5 border-b border-slate-100">
          <EditPanel
            selectedBlock={selectedBlock}
            onApplyEdit={onApplyEdit}
            onDeleteBlock={onDeleteBlock}
          />
        </div>
      )}

      {/* Tips */}
      {showTips && (
        <div className="m-4 p-4 bg-green-50/50 border border-green-100 rounded-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold text-slate-700">Quick Tips</h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                {[
                  'Click text on the PDF canvas to select it',
                  'Edit font size & color in this panel',
                  'Press Apply Changes to update the preview',
                  'Save directly as a PDF when done',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowTips(false)}
              className="text-slate-400 hover:text-slate-600 text-xs ml-2"
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