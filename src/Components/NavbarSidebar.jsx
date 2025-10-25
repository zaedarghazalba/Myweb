import { Link } from "react-router-dom";
import { User, FolderKanban, BadgeCheck, X } from "lucide-react";

export default function NavbarSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay di mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed z-50 md:translate-x-0 md:sticky md:top-0 transition-transform duration-300
           w-60 h-screen bg-gray-900 text-white p-4 shadow-lg overflow-y-auto`}
      >
        {/* Tombol close di mobile */}
        <div className="flex items-center justify-between md:hidden mb-6">
          <div className="text-xl font-bold">Menu</div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="text-2xl font-bold mb-6 hidden md:block">
          Zaedar Ghazalba
        </div>

        <nav className="flex flex-col gap-4 text-sm">
          <Link to="/" onClick={onClose} className="flex items-center gap-3 hover:bg-gray-800 rounded-lg px-3 py-2 transition">
            <User size={18} />
            Tentang Saya
          </Link>

          <Link to="/portfolio" onClick={onClose} className="flex items-center gap-3 hover:bg-gray-800 rounded-lg px-3 py-2 transition">
            <FolderKanban size={18} />
            Portofolio
          </Link>

          <Link to="/certifications" onClick={onClose} className="flex items-center gap-3 hover:bg-gray-800 rounded-lg px-3 py-2 transition">
            <BadgeCheck size={18} />
            Sertifikasi
          </Link>
        </nav>
      </aside>
    </>
  );
}
