import { Link } from "react-router-dom";
import {
  User,
  FolderKanban,
  BadgeCheck,
} from "lucide-react";

export default function NavbarSidebar() {
  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-white p-4 shadow-lg">
      <div className="text-2xl font-bold mb-6">Zaedar Ghazalba</div>

      <nav className="flex flex-col gap-4 text-sm">
        <Link
          to="/"
          className="flex items-center gap-3 hover:bg-gray-800 rounded-lg px-3 py-2 transition"
        >
          <User size={18} />
          Tentang Saya
        </Link>

        <Link
          to="/portfolio"
          className="flex items-center gap-3 hover:bg-gray-800 rounded-lg px-3 py-2 transition"
        >
          <FolderKanban size={18} />
          Portofolio
        </Link>

        <Link
          to="/certifications"
          className="flex items-center gap-3 hover:bg-gray-800 rounded-lg px-3 py-2 transition"
        >
          <BadgeCheck size={18} />
          Sertifikasi
        </Link>
      </nav>
    </aside>
  );
}
