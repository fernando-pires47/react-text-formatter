import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  title: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, title }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-800 px-6 py-3">
        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="flex-1 p-0">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full p-6 bg-gray-900 text-gray-100 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed placeholder-gray-500"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        />
      </div>
    </div>
  );
};

export default TextInput;