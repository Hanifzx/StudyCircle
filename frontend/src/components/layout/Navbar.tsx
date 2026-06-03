import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header role="banner" className="fixed top-0 right-0 left-0 lg:left-60 z-30 h-16 bg-[#0B0F19]/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Hamburger – visible below lg */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2 hidden sm:flex">
            <span className="text-sm text-gray-200">
              {user.fullName}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold border border-primary-500/30">
              Lv. {user.level || 1}
            </span>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-lg transition-all duration-200"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
