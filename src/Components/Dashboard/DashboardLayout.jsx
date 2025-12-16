import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaFolderOpen, FaCertificate, FaRocket, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle';
import toast from 'react-hot-toast';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: FaHome, label: 'Home' },
    { to: '/dashboard/portfolio', icon: FaFolderOpen, label: 'Portfolio' },
    { to: '/dashboard/certifications', icon: FaCertificate, label: 'Certifications' },
    { to: '/dashboard/projects', icon: FaRocket, label: 'Projects' }
  ];

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success('Logout berhasil!', {
        duration: 1200,
        icon: '👋',
      });
      // Navigate after short delay
      setTimeout(() => {
        navigate('/dashboard/login');
      }, 1200);
    } else {
      toast.error('Logout gagal!', {
        duration: 3000,
        icon: '❌',
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Zaedar Ghazalba
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Admin
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
          >
            <FaSignOutAlt size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Content Management System
          </h2>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Lihat Website
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
}
