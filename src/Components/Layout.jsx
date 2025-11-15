import { Link, useLocation } from "react-router-dom";
import { User, FolderKanban, Rocket, BadgeCheck } from "lucide-react";
import NavbarSidebar from "./NavbarSidebar";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative">
      {/* Desktop Sidebar - hanya tampil di desktop */}
      <div className="hidden md:block">
        <NavbarSidebar />
      </div>

      {/* Spacer untuk sidebar di desktop */}
      <div className="hidden md:block w-60 flex-shrink-0"></div>

      {/* Mobile Navigation Bar - hanya tampil di mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white px-4 py-3 z-40 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Zaedar Ghazalba</div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={`p-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
              title="Tentang Saya"
            >
              <User size={20} />
            </Link>

            <Link
              to="/portfolio"
              className={`p-2 rounded-lg transition-colors ${
                location.pathname === '/portfolio'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
              title="Portfolio"
            >
              <FolderKanban size={20} />
            </Link>

            <Link
              to="/projects"
              className={`p-2 rounded-lg transition-colors ${
                location.pathname === '/projects'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
              title="Project Online"
            >
              <Rocket size={20} />
            </Link>

            <Link
              to="/certifications"
              className={`p-2 rounded-lg transition-colors ${
                location.pathname === '/certifications'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
              title="Sertifikasi"
            >
              <BadgeCheck size={20} />
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full overflow-x-hidden mt-16 md:mt-0">
        <div className="w-full max-w-full px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
