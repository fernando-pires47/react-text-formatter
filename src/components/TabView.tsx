import React, { useMemo } from 'react';
import { diffContent, type DiffLine } from '../utils/diff';
import { formatPasted } from '../utils/formatters';

interface TabViewProps {
  left: string;
  right: string;
  onLeftChange: (value: string) => void;
  onRightChange: (value: string) => void;
}

const placeholder = 'Paste JSON or XML here...\n\nIt will be formatted automatically.';

const createPasteHandler =
  (value: string, onChange: (next: string) => void) =>
  (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text');
    if (!pasted) return;
    const result = formatPasted(pasted);
    const insert =
      result && result.success && result.formatted ? result.formatted : pasted;

    const el = event.currentTarget;
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    onChange(value.slice(0, start) + insert + value.slice(end));

    requestAnimationFrame(() => {
      el.focus();
      const pos = start + insert.length;
      el.setSelectionRange(pos, pos);
    });
  };

const DiffLineView: React.FC<{ line: DiffLine }> = ({ line }) => (
  <div className={`diff-line diff-${line.type}`}>
    <span className="diff-sign">
      {line.type === 'add' ? '+' : line.type === 'del' ? '-' : ' '}
    </span>
    <span className="diff-text">{'  '.repeat(line.indent)}{line.text}</span>
  </div>
);

const Pane: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="flex flex-col border-r border-border overflow-hidden last:border-r-0">
    <div className="px-6 py-2 flex justify-between items-center">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {value && (
        <button
          className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => onChange('')}
        >
          Clear
        </button>
      )}
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onPaste={createPasteHandler(value, onChange)}
      placeholder={placeholder}
      className="flex-1 w-full p-4 bg-background text-foreground border-0 resize-none focus:outline-none font-mono text-[0.9375rem] leading-relaxed placeholder:text-muted-foreground"
    />
  </div>
);

const TabView: React.FC<TabViewProps> = ({ left, right, onLeftChange, onRightChange }) => {
  const result = useMemo(() => diffContent(left, right), [left, right]);

  const changeCount = result.lines.filter((line) => line.type !== 'same').length;
  const hasError = Boolean(result.leftError || result.rightError || result.error);

  const status = result.error
    ? result.error
    : result.lines.length === 0
      ? 'Paste content on both sides to compare.'
      : result.changed
        ? `${changeCount} difference${changeCount === 1 ? '' : 's'} found`
        : 'Contents are identical';

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <div className="diff-inputs grid grid-cols-1 lg:grid-cols-2 border-b border-border">
        <Pane label="Left (A)" value={left} onChange={onLeftChange} />
        <Pane label="Right (B)" value={right} onChange={onRightChange} />
      </div>

      <div className="border-b border-border px-6 py-2">
        <span
          className={`text-xs font-medium uppercase tracking-wide ${
            hasError
              ? 'text-destructive'
              : result.changed
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-primary'
          }`}
        >
          {status}
        </span>
      </div>

      {result.leftError && (
        <div className="px-6 py-3">
          <p className="text-sm text-destructive">Left (A): {result.leftError}</p>
        </div>
      )}
      {result.rightError && (
        <div className="px-6 py-3">
          <p className="text-sm text-destructive">Right (B): {result.rightError}</p>
        </div>
      )}

      {!hasError && result.lines.length > 0 && (
        <div className="flex-1 overflow-auto py-4">
          {result.lines.map((line, index) => (
            <DiffLineView key={index} line={line} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TabView;
