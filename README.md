# Text Formatter

A simple and intuitive React SPA for formatting unstructured JSON and XML content.

## Features

- 🔧 **Format JSON and XML**: Automatically formats unstructured JSON and XML content
- 📋 **Copy to Clipboard**: One-click copy functionality for formatted output
- ↔️ **Resizable Panels**: Drag the desktop divider to shrink the right panel down to zero, or use Hide/Show right panel on any screen size. Collapsing keeps its content.
- 🔽 **Hide Differences**: Hide/show the bottom comparison area, including its status and errors, to give the editors more space without changing their content.
- 🧩 **Restructure JSON**: Convert JSON5-style data (unquoted keys, single quotes, comments, and trailing commas) to strict JSON in a copyable dialog without changing the original input.
- ✅ **Validate JSON**: Check either panel for strict JSON syntax and see validation errors in a dialog.
- ↩️ **Undo/Redo**: Native editor undo/redo is preserved when pasting and auto-formatting content (Ctrl+Z / Ctrl+Shift+Z, or Cmd on macOS).
- 🎨 **Clean UI**: Modern, responsive design with custom CSS utilities
- ⚡ **Real-time Formatting**: Formats content as you type
- 🔀 **Format Switching**: Easy toggle between JSON and XML formats
- 🛠️ **TypeScript**: Full TypeScript support for better development experience

## Technologies Used

- **React 19** with **TypeScript**
- **Vite** for fast development and building
- **Custom CSS utilities** for styling
- **Native JSON.stringify()** for JSON formatting
- **JSON5** for safely parsing relaxed JSON syntax without executing code
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

Each input panel also has **Restructure JSON** and **Validate JSON** buttons. For example, restructuring `{ teste: '123' }` produces `{ "teste": "123" }` with indentation. Validation is strict and rejects the original relaxed syntax. Unsupported JavaScript expressions and non-finite numbers are not converted.

On desktop, drag the divider all the way right to collapse the right panel; drag it back to restore it. The focused divider also supports arrow keys, Home/End, and double-click to reset to equal widths. **Hide right panel** / **Show right panel** works on mobile too.

Use **Hide differences** / **Show differences** to toggle the bottom comparison area. While hidden, the input panels expand into the available space; comparisons remain up to date when shown again.

Drag the horizontal divider above the differences to resize their height. It also supports up/down arrow keys, Home/End, and double-click to reset. Hiding and showing differences keeps the selected height.

Run `npm test` for the JSON conversion and validation tests.

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
