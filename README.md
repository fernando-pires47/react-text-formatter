# Text Formatter

A simple and intuitive React SPA for formatting unstructured JSON and XML content.

## Features

- 🔧 **Format JSON and XML**: Automatically formats unstructured JSON and XML content
- 📋 **Copy to Clipboard**: One-click copy functionality for formatted output
- 🎨 **Clean UI**: Modern, responsive design with custom CSS utilities
- ⚡ **Real-time Formatting**: Formats content as you type
- 🔀 **Format Switching**: Easy toggle between JSON and XML formats
- 🛠️ **TypeScript**: Full TypeScript support for better development experience

## Technologies Used

- **React 19** with **TypeScript**
- **Vite** for fast development and building
- **Custom CSS utilities** for styling
- **Native JSON.stringify()** for JSON formatting
- **xml-formatter** for XML formatting

## Project Structure

```
src/
├── components/
│   ├── FormatSelector.tsx    # Dropdown to select JSON/XML format
│   ├── TextInput.tsx         # Input component for unformatted text
│   └── TextOutput.tsx        # Output component with copy functionality
├── utils/
│   ├── formatters.ts         # JSON and XML formatting logic
│   └── clipboard.ts          # Copy to clipboard utility
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Custom CSS utilities and styles
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

1. Select the format type (JSON or XML) from the dropdown
2. Paste your unstructured content in the input area
3. The formatted output will appear automatically in the output area
4. Click the "Copy" button to copy the formatted content to your clipboard

## Example Inputs

### JSON
```json
{"name":"John","age":30,"city":"New York","hobbies":["reading","swimming"]}
```

### XML
```xml
<root><name>John</name><age>30</age><city>New York</city><hobbies><hobby>reading</hobby><hobby>swimming</hobby></hobbies></root>
```

## How It Works

The application uses a simple architecture with three main components:
- **FormatSelector**: Dropdown to choose between JSON and XML formats
- **TextInput**: Input area for unformatted content
- **TextOutput**: Output area displaying formatted content with copy functionality

Error handling is built-in for invalid syntax and clipboard operations.

## License

MIT License
