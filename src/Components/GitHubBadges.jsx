import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaFire, FaCode, FaStar, FaAward } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import githubService from '../services/githubService';

export default function GitHubBadges() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await githubService.getUserStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  // Calculate badges based on achievements
  const badges = [
    {
      id: 1,
      title: 'Code Enthusiast',
      description: `${stats?.totalRepos || 0} public repositories`,
      icon: FaCode,
      color: 'from-blue-400 to-blue-600',
      earned: (stats?.totalRepos || 0) > 5,
    },
    {
      id: 2,
      title: 'Star Collector',
      description: `${stats?.totalStars || 0} stars earned`,
      icon: FaStar,
      color: 'from-yellow-400 to-yellow-600',
      earned: (stats?.totalStars || 0) > 0,
    },
    {
      id: 3,
      title: 'Open Source Contributor',
      description: `${stats?.totalForks || 0} repositories forked`,
      icon: FaTrophy,
      color: 'from-green-400 to-green-600',
      earned: (stats?.totalForks || 0) > 0,
    },
    {
      id: 4,
      title: 'Multi-Language Master',
      description: `Proficient in ${Object.keys(stats?.languages || {}).length} languages`,
      icon: FaMedal,
      color: 'from-purple-400 to-purple-600',
      earned: Object.keys(stats?.languages || {}).length > 3,
    },
    {
      id: 5,
      title: 'Active Developer',
      description: 'Consistent contributions',
      icon: FaFire,
      color: 'from-red-400 to-red-600',
      earned: (stats?.totalRepos || 0) > 10,
    },
    {
      id: 6,
      title: 'Repository Champion',
      description: 'Quality over quantity',
      icon: FaAward,
      color: 'from-indigo-400 to-indigo-600',
      earned: (stats?.totalStars || 0) > 5,
    },
  ];

  const earnedBadges = badges.filter(badge => badge.earned);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Achievements</h3>
        <span className="text-sm font-semibold px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
          {earnedBadges.length}/{badges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          const isEarned = badge.earned;

          return (
            <motion.div
              key={badge.id}
              className={`relative p-5 rounded-lg overflow-hidden transition-all ${
                isEarned
                  ? 'bg-gradient-to-br shadow-md hover:shadow-xl cursor-pointer'
                  : 'bg-gray-100 dark:bg-gray-700 opacity-50'
              }`}
              style={
                isEarned
                  ? { backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }
                  : {}
              }
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={isEarned ? { scale: 1.05, rotate: 2 } : {}}
            >
              {/* Background Pattern */}
              {isEarned && (
                <div className="absolute inset-0 opacity-10">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${badge.color}`}
                  ></div>
                </div>
              )}

              <div className="relative z-10">
                {/* Badge Icon */}
                <div className="flex items-center justify-center mb-3">
                  <div
                    className={`p-4 rounded-full ${
                      isEarned
                        ? `bg-gradient-to-br ${badge.color} text-white`
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                    }`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                </div>

                {/* Badge Info */}
                <div className="text-center">
                  <h4
                    className={`font-bold mb-1 ${
                      isEarned
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {badge.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      isEarned
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {badge.description}
                  </p>
                </div>

                {/* Lock Icon for unearned badges */}
                {!isEarned && (
                  <div className="absolute top-2 right-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* Earned checkmark */}
                {isEarned && (
                  <motion.div
                    className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Message */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {earnedBadges.length === badges.length ? (
          <p className="text-green-600 dark:text-green-400 font-semibold">
            🎉 Congratulations! You've unlocked all achievements!
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Keep coding to unlock more achievements! 💪
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
