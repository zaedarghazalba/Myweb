import { Link, useLocation } from "react-router-dom";
import { User, FolderKanban, BadgeCheck } from "lucide-react";

export default function NavbarSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 w-60 h-screen bg-gray-900 text-white p-4 shadow-lg overflow-y-auto z-30">
      <div className="text-2xl font-bold mb-6">
        Zaedar Ghazalba
      </div>

      <nav className="flex flex-col gap-4 text-sm">
        <Link
          to="/"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
            location.pathname === '/'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
        >
          <User size={18} />
          Tentang Saya
        </Link>

        <Link
          to="/portfolio"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
            location.pathname === '/portfolio'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
        >
          <FolderKanban size={18} />
          Portofolio
        </Link>

        <Link
          to="/certifications"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
            location.pathname === '/certifications'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
        >
          <BadgeCheck size={18} />
          Sertifikasi
        </Link>
      </nav>
    </aside>
  );
}
