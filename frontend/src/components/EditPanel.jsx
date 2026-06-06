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
