import React, { useState } from 'react';
import type { Tab } from '../state/useTabs';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string | null;
  onSelectTab: (id: string) => void;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  onRenameTab: (id: string, name: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onAddTab,
  onCloseTab,
  onRenameTab,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const commitRename = () => {
    if (editingId) {
      const name = draft.trim();
      if (name) onRenameTab(editingId, name);
    }
    setEditingId(null);
  };

  return (
    <div className="border-b border-gray-800 px-6 py-2 flex items-center space-x-2">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab-btn ${tab.id === activeTabId ? 'active' : ''}`}
          onClick={() => onSelectTab(tab.id)}
          onDoubleClick={() => {
            setEditingId(tab.id);
            setDraft(tab.name);
          }}
        >
          {editingId === tab.id ? (
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onBlur={commitRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitRename();
                if (e.key === 'Escape') setEditingId(null);
              }}
              className="tab-rename"
            />
          ) : (
            <span className="tab-name">{tab.name}</span>
          )}
          <button
            className="tab-close"
            aria-label={`Close ${tab.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onCloseTab(tab.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
      <button className="tab-add" onClick={onAddTab} title="New tab">
        +
      </button>
    </div>
  );
};

export default TabBar;
