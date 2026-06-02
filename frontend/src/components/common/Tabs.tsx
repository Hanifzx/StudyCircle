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
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.key)}
            className={`
              px-4 py-1.5 text-sm font-medium rounded-full border transition-colors
              ${
                isActive
                  ? "bg-[#FEF08A] text-black border-[#FEF08A]"
                  : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
