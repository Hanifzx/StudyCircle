import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 z-30 h-16 bg-[#141927] border-b border-gray-700/50 flex items-center justify-between px-4 sm:px-6">
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
          <span className="text-sm text-gray-300 hidden sm:block">
            {user.fullName}
          </span>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
