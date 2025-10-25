import '../index.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import githubService from '../services/githubService';
import RepoCard from '../Components/RepoCard';
import { FaGithub, FaFilter } from 'react-icons/fa';

export default function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const reposData = await githubService.getUserRepos();
        setRepos(reposData);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Filter repos
  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filter === 'all') return matchesSearch;
    if (filter === 'starred') return matchesSearch && repo.stargazers_count > 0;
    if (filter === 'forked') return matchesSearch && repo.fork;
    return matchesSearch && repo.language === filter;
  });

  // Get unique languages
  const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];

  return (
    <motion.div
      className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-4 sm:p-8 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaGithub className="text-4xl" />
            <h1 className="text-3xl sm:text-4xl font-bold">GitHub Portfolio</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Explore my open source projects and contributions
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <FaFilter className="text-gray-500 flex-shrink-0" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All ({repos.length})
            </button>
            <button
              onClick={() => setFilter('starred')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                filter === 'starred'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Starred
            </button>
            {languages.slice(0, 5).map(lang => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  filter === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading repositories...</p>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && filteredRepos.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No repositories found
            </p>
          </motion.div>
        )}

        {!loading && filteredRepos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!loading && repos.length > 0 && (
          <motion.div
            className="mt-8 text-center text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>
              Showing {filteredRepos.length} of {repos.length} repositories
            </p>
          </motion.div>
        )}
      </div>

      <footer className="fixed bottom-0 left-0 w-full text-center py-2 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 z-50">
        © {new Date().getFullYear()} Zaedar Ghazalba. All rights reserved.
      </footer>
    </motion.div>
  );
}
