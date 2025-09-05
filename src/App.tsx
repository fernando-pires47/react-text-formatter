import { useState, useEffect } from 'react';
import FormatSelector from './components/FormatSelector';
import TextInput from './components/TextInput';
import TextOutput from './components/TextOutput';
import { formatContent, type FormatType } from './utils/formatters';

function App() {
  const [formatType, setFormatType] = useState<FormatType>('json');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | undefined>();

  // Auto-format when input or format type changes
  useEffect(() => {
    if (inputText.trim()) {
      const result = formatContent(inputText, formatType);
      if (result.success) {
        setOutputText(result.formatted || '');
        setError(undefined);
      } else {
        setOutputText('');
        setError(result.error);
      }
    } else {
      setOutputText('');
      setError(undefined);
    }
  }, [inputText, formatType]);

  const getPlaceholder = () => {
    return formatType === 'json' 
      ? 'Paste your unformatted JSON here...\n\nExample:\n{"name":"John","age":30,"city":"New York"}'
      : 'Paste your unformatted XML here...\n\nExample:\n<root><name>John</name><age>30</age></root>';
  };

  return (
    <div className="dark min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-blue-400">{"{}"}</span>
                <h1 className="text-xl font-semibold text-white">
                  Text Formatter
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FormatSelector value={formatType} onChange={setFormatType} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Input Section */}
          <div className="border-r border-gray-800 bg-gray-900 flex flex-col">
            <div className="flex-1 h-full">
              <TextInput
                value={inputText}
                onChange={setInputText}
                placeholder={getPlaceholder()}
                title="Input"
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gray-900 flex flex-col">
            <div className="flex-1 h-full">
              <TextOutput
                value={outputText}
                title="Formatted Output"
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;