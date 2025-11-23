import { Link, useLocation } from "react-router-dom";
import { User, FolderKanban, Rocket, BadgeCheck } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import HyperspeedBackground from "./HyperspeedBackground";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-gray-900 dark:text-white relative">
      {/* Hyperspeed Background */}
      <HyperspeedBackground />

      {/* Navigation Bar - tampil di semua ukuran layar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white px-4 py-3 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg md:text-xl font-bold">Zaedar Ghazalba</div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
            >
              <User size={20} />
              <span className="hidden sm:inline text-sm">Tentang Saya</span>
            </Link>

            <Link
              to="/portfolio"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/portfolio'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
            >
              <FolderKanban size={20} />
              <span className="hidden sm:inline text-sm">Portofolio</span>
            </Link>

            <Link
              to="/projects"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/projects'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
            >
              <Rocket size={20} />
              <span className="hidden sm:inline text-sm">Project Online</span>
            </Link>

            <Link
              to="/certifications"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/certifications'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
            >
              <BadgeCheck size={20} />
              <span className="hidden sm:inline text-sm">Sertifikasi</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full overflow-x-hidden mt-16">
        <div className="w-full max-w-7xl mx-auto px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>

      {/* Theme Toggle Button */}
      <ThemeToggle />
    </div>
  );
}
