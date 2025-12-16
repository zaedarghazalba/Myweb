import { Link, useLocation } from "react-router-dom";
import { User, FolderKanban, Rocket, BadgeCheck, Lock } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { to: "/", icon: User, label: "About" },
    { to: "/portfolio", icon: FolderKanban, label: "Portfolio" },
    { to: "/projects", icon: Rocket, label: "Projects" },
    { to: "/certifications", icon: BadgeCheck, label: "Certifications" },
  ];

  // Add Dashboard link if authenticated
  if (isAuthenticated) {
    navItems.push({ to: "/dashboard", icon: Lock, label: "Dashboard" });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Framer-style Minimal Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Name - Simple & Bold */}
            <Link
              to="/"
              className="text-base font-semibold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              Zaedar Ghazalba
            </Link>

            {/* Navigation Items - Minimal Pills */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900'
                      }
                    `}
                  >
                    <Icon size={16} strokeWidth={2} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - More Breathing Room */}
      <main className="flex-1 w-full overflow-x-hidden pt-16">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Theme Toggle Button */}
      <ThemeToggle />
    </div>
  );
}
