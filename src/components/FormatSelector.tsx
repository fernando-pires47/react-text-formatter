import React from 'react';
import type { FormatType } from '../utils/formatters';

interface FormatSelectorProps {
  value: FormatType;
  onChange: (format: FormatType) => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="format-select" className="text-sm font-medium text-gray-300">
        Format:
      </label>
      <select
        id="format-select"
        value={value}
        onChange={(e) => onChange(e.target.value as FormatType)}
        className="bg-gray-800 border border-gray-700 text-gray-100 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="json">JSON</option>
        <option value="xml">XML</option>
      </select>
    </div>
  );
};

export default FormatSelector;