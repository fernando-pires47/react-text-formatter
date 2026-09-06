import TabBar from './components/TabBar';
import TabView from './components/TabView';
import { useTabs } from './state/useTabs';

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
              <button
                onClick={clearAll}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-200"
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
