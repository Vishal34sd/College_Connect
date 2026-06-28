import { Link } from "react-router-dom";
import { HiSun, HiMoon, HiPlus } from "react-icons/hi2";

const Navbar = ({ isDark, toggleDarkMode }) => {
  return (
    <nav className="sticky top-0 z-40 glass-card !rounded-none border-x-0 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-md shadow-primary-500/25 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-600 dark:text-gray-300 transition-all duration-200"
              aria-label="Toggle dark mode"
              id="dark-mode-toggle"
            >
              {isDark ? (
                <HiSun className="w-5 h-5" />
              ) : (
                <HiMoon className="w-5 h-5" />
              )}
            </button>

            <Link to="/create" className="btn-primary" id="nav-create-task">
              <HiPlus className="w-5 h-5" />
              <span className="hidden sm:inline">New Task</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
