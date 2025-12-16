import { motion } from 'framer-motion';
import { FaFolderOpen, FaCertificate, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const cards = [
    {
      title: 'Portfolio',
      description: 'Kelola portfolio design graphics, motion graphics, dan 3D graphics',
      icon: FaFolderOpen,
      link: '/dashboard/portfolio',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Certifications',
      description: 'Kelola sertifikat dan credentials',
      icon: FaCertificate,
      link: '/dashboard/certifications',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Projects',
      description: 'Kelola project web development',
      icon: FaRocket,
      link: '/dashboard/projects',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Selamat datang! Kelola konten portfolio Anda dari sini.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={card.link}>
                <div className="framer-card group hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
