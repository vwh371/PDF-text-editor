import React, { useState, useEffect } from 'react';
import { Edit2, Check, Trash2, Type, Palette, Maximize2 } from 'lucide-react';

/**
 * EditPanel Component – red/white dark theme
 */
const EditPanel = ({ selectedBlock, onApplyEdit, onDeleteBlock }) => {
  const [text, setText]         = useState(selectedBlock?.text     || '');
  const [fontSize, setFontSize] = useState(selectedBlock?.fontSize || 12);
  const [color, setColor]       = useState(selectedBlock?.color    || '#ffffff');

  useEffect(() => {
    if (selectedBlock) {
      setText(selectedBlock.text);
      setFontSize(selectedBlock.fontSize);
      setColor(selectedBlock.color);
    }
  }, [selectedBlock]);

  const handleApply = () => onApplyEdit(selectedBlock.id, text, fontSize, color);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
        <Edit2 className="w-4 h-4 text-green-600" />
        Edit Text Block
      </h3>

      {/* Text */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5" /> Text Content
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="input-field resize-none text-sm font-inter"
          placeholder="Enter your text…"
        />
      </div>

      {/* Font size + color */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" /> Size (px)
          </label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            min="6"
            max="72"
            className="input-field text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" /> Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded border border-slate-200 cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 input-field text-xs"
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-1">
        <button onClick={handleApply} className="btn btn-primary w-full flex items-center justify-center gap-2 text-sm">
          <Check className="w-4 h-4" /> Apply Changes
        </button>
        <button onClick={onDeleteBlock} className="btn btn-danger w-full flex items-center justify-center gap-2 text-sm">
          <Trash2 className="w-4 h-4" /> Delete Block
        </button>
      </div>
    </div>
  );
};

export default EditPanel;