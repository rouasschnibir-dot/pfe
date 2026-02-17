import { useState, useEffect } from 'react';
import { Menu, Search, ChevronDown } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';
import { useRole } from '../../contexts/RoleContext';
import ThemeToggle from '../ui/ThemeToggle';
import RoleSwitcher from '../ui/RoleSwitcher';
import NotificationDropdown from '../ui/NotificationDropdown';
import Breadcrumb from '../ui/Breadcrumb';

export default function Navbar() {
  const { toggleMobile } = useSidebar();
  const { currentRole } = useRole();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8
                  transition-all duration-300 ease-in-out
                  ${scrolled
                    ? 'mx-3 mt-3 rounded-2xl bg-surface-primary/80 backdrop-blur-xl shadow-md border border-border-secondary/50'
                    : 'lg:rounded-t-[20px] bg-surface-secondary/95 backdrop-blur-xl'
                  }`}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={toggleMobile}
          className="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl
                     hover:bg-surface-tertiary transition-colors duration-200 cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu size={20} className="text-text-secondary" />
        </button>

        {/* Breadcrumb */}
        <div className="hidden sm:block">
          <Breadcrumb />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1.5">
        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Divider */}
        <div className="hidden sm:block w-px h-7 bg-border-secondary mx-1" />

        {/* Search */}
        <button
          id="search-toggle"
          className="flex items-center justify-center w-9 h-9 rounded-xl
                     hover:bg-surface-tertiary transition-colors duration-200
                     cursor-pointer group"
          aria-label="Search"
        >
          <Search size={18} className="text-text-tertiary group-hover:text-text-primary transition-colors" />
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notification Dropdown */}
        <NotificationDropdown />

        {/* Divider */}
        <div className="hidden sm:block w-px h-7 bg-border-secondary mx-1.5" />

        {/* User menu */}
        <button
          id="user-menu-toggle"
          className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-xl
                     hover:bg-surface-tertiary transition-all duration-200
                     cursor-pointer group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full
                          bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
            <span className="text-white text-xs font-bold">IR</span>
          </div>
          <div className="hidden sm:flex flex-col items-start min-w-0">
            <span className="text-sm font-semibold text-text-primary leading-tight truncate">
              Ibrahim R.
            </span>
            <span className="text-[11px] text-text-tertiary leading-tight">
              {currentRole.shortLabel}
            </span>
          </div>
          <ChevronDown
            size={14}
            className="hidden sm:block text-text-tertiary group-hover:text-text-secondary
                       transition-colors"
          />
        </button>
      </div>
    </header>
  );
}
