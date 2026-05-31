import React from "react";

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  return (
    <div className={`border-b border-gray-700 ${className}`}>
      <nav className="flex gap-1 -mb-px" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.key)}
              className={`
                relative px-4 py-2.5 text-sm font-medium
                transition-all duration-200
                rounded-t-lg
                ${
                  isActive
                    ? "text-indigo-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }
              `}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
