import { motion } from 'framer-motion';
import { FaStar, FaCodeBranch, FaBook, FaUsers } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import githubService from '../services/githubService';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, profileData] = await Promise.all([
          githubService.getUserStats(),
          githubService.getUserProfile()
        ]);
        setStats(statsData);
        setProfile(profileData);
      } catch (error) {
        console.error('Error loading GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading GitHub stats...</p>
      </div>
    );
  }

  if (!stats || !profile) {
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-400">
        Unable to load GitHub stats
      </div>
    );
  }

  const statCards = [
    {
      icon: <FaBook />,
      label: 'Public Repositories',
      value: stats.publicRepos || profile.public_repos,
      color: 'text-blue-500'
    },
    {
      icon: <FaStar />,
      label: 'Total Stars',
      value: stats.totalStars,
      color: 'text-yellow-500'
    },
    {
      icon: <FaCodeBranch />,
      label: 'Total Forks',
      value: stats.totalForks,
      color: 'text-green-500'
    },
    {
      icon: <FaUsers />,
      label: 'Followers',
      value: profile.followers,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="w-full">
      {/* GitHub Profile Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={profile.avatar_url}
            alt={profile.name}
            className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700"
          />
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @{profile.login}
            </a>
          </div>
        </div>
        {profile.bio && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">{profile.bio}</p>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-3xl ${stat.color} mb-2`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Languages */}
      {stats.languages && Object.keys(stats.languages).length > 0 && (
        <motion.div
          className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">Top Languages</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.languages)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([language, count]) => (
                <span
                  key={language}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {language} ({count})
                </span>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
