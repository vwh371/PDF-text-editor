import React, { useState, useEffect } from 'react';
import { Edit2, Check, Trash2, Type, Palette, Maximize2 } from 'lucide-react';

/**
 * EditPanel Component
 * Provides form controls for editing selected text block
 * 
 * @param {Object} selectedBlock - The text block being edited
 * @param {Function} onApplyEdit - Handler to apply changes
 * @param {Function} onDeleteBlock - Handler to delete the block
 */
const EditPanel = ({ selectedBlock, onApplyEdit, onDeleteBlock }) => {
  // Local state for form inputs
  const [text, setText] = useState(selectedBlock?.text || '');
  const [fontSize, setFontSize] = useState(selectedBlock?.fontSize || 12);
  const [color, setColor] = useState(selectedBlock?.color || '#000000');

  // Update local state when selected block changes
  useEffect(() => {
    if (selectedBlock) {
      setText(selectedBlock.text);
      setFontSize(selectedBlock.fontSize);
      setColor(selectedBlock.color);
    }
  }, [selectedBlock]);

  /**
   * Apply edit handler
   * Calls parent handler with current form values
   */
  const handleApply = () => {
    onApplyEdit(selectedBlock.id, text, fontSize, color);
  };

  return (
    <div className="space-y-4">
      {/* Panel Header */}
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Edit2 className="w-5 h-5 text-blue-500" />
        Edit Text
      </h3>

      {/* Text Content Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Text Content
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="3"
          className="input-field resize-none"
          placeholder="Enter your text here..."
        />
      </div>

      {/* Font Size and Color Controls */}
      <div className="grid grid-cols-2 gap-4">
        {/* Font Size Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            Font Size (px)
          </label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            min="6"
            max="72"
            className="input-field"
          />
        </div>
        
        {/* Color Picker Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Text Color
          </label>
          <div className="flex gap-2">
            {/* Color picker swatch */}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
            />
            {/* Hex color text input */}
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 input-field"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        {/* Apply Changes Button */}
        <button
          onClick={handleApply}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          Apply Changes
        </button>
        
        {/* Delete Block Button */}
        <button
          onClick={onDeleteBlock}
          className="btn btn-danger w-full flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete Block
        </button>
      </div>
    </div>
  );
};

export default EditPanel;