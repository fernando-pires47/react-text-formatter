import TabBar from './components/TabBar';
import TabView from './components/TabView';
import { useTabs } from './state/useTabs';
import { useTheme } from './state/useTheme';

function App() {
  const {
    tabs,
    activeTab,
    activeTabId,
    selectTab,
    addTab,
    closeTab,
    renameTab,
    updateTab,
    clearAll,
  } = useTabs();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/logo.png"
                  alt="Text Formatter"
                  className="h-8 w-8 object-contain"
                />
                <h1 className="text-xl font-semibold text-foreground">
                  Text Formatter
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                className="p-2 rounded-md bg-card border-[1.5px] border-border text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer"
              >
                {theme === 'dark' ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-card border-[1.5px] border-border text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={selectTab}
        onAddTab={addTab}
        onCloseTab={closeTab}
        onRenameTab={renameTab}
      />

      {/* Active Tab Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab && (
          <TabView
            left={activeTab.left}
            right={activeTab.right}
            onLeftChange={(value) => updateTab(activeTab.id, { left: value })}
            onRightChange={(value) => updateTab(activeTab.id, { right: value })}
          />
        )}
      </div>
    </div>
  );
}

export default App;
