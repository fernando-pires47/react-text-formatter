import React, { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';

interface TextOutputProps {
  value: string;
  title: string;
  error?: string;
}

const TextOutput: React.FC<TextOutputProps> = ({ value, title, error }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    
    const success = await copyToClipboard(value);
    setCopySuccess(success);
    
    if (success) {
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-800 px-6 py-3 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">{title}</h3>
        {value && !error && (
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              copySuccess
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      
      <div className="flex-1 p-0">
        {error ? (
          <div className="w-full h-full p-6 bg-red-900/20 border-red-700/30">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-300">Formatting Error</h4>
                <p className="text-sm text-red-400 mt-1">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <textarea
            value={value}
            readOnly
            className="w-full h-full p-6 bg-gray-900 text-gray-100 border-0 resize-none font-mono text-sm leading-relaxed focus:outline-none"
            style={{ minHeight: 'calc(100vh - 200px)' }}
            placeholder="Formatted output will appear here..."
          />
        )}
      </div>
    </div>
  );
};

export default TextOutput;