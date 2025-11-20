import '../index.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import githubService from '../services/githubService';
import RepoCard from '../Components/RepoCard';
import { FaFilter, FaPalette, FaCode } from 'react-icons/fa';

export default function Portfolio() {
  const [portfolioType, setPortfolioType] = useState('design'); // 'design' or 'webdev'
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for design portfolio
  const designPortfolio = [
    {
      id: 1,
      title: 'Brand Identity Design',
      category: 'Branding',
      description: 'Complete brand identity design including logo, color palette, and guidelines',
      image: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Brand+Identity',
      tags: ['Logo Design', 'Branding', 'Visual Identity']
    },
    {
      id: 2,
      title: 'UI/UX Mobile App',
      category: 'UI/UX Design',
      description: 'Modern mobile application interface design with user-centered approach',
      image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Mobile+UI',
      tags: ['UI Design', 'UX Design', 'Mobile']
    },
    {
      id: 3,
      title: 'Social Media Graphics',
      category: 'Social Media',
      description: 'Eye-catching social media graphics for various platforms',
      image: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Social+Media',
      tags: ['Instagram', 'Facebook', 'Graphics']
    },
    {
      id: 4,
      title: 'Poster Design',
      category: 'Print Design',
      description: 'Creative poster designs for events and marketing campaigns',
      image: 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Poster+Design',
      tags: ['Poster', 'Print', 'Marketing']
    },
    {
      id: 5,
      title: 'Website Landing Page',
      category: 'Web Design',
      description: 'Responsive landing page design with modern aesthetics',
      image: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Landing+Page',
      tags: ['Web Design', 'Landing Page', 'Responsive']
    },
    {
      id: 6,
      title: 'Packaging Design',
      category: 'Product Design',
      description: 'Product packaging design with attention to detail',
      image: 'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Packaging',
      tags: ['Packaging', 'Product', 'Branding']
    }
  ];

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

    if (portfolioType === 'webdev') {
      fetchRepos();
    } else {
      setLoading(false);
    }
  }, [portfolioType]);

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
      className="w-full max-w-full overflow-x-hidden pb-20 sm:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Portfolio</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
            Explore my creative works and projects
          </p>

          {/* Toggle Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <motion.button
              onClick={() => setPortfolioType('design')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                portfolioType === 'design'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPalette className="text-lg sm:text-xl" />
              <span className="text-sm sm:text-base">Design Grafis</span>
            </motion.button>

            <motion.button
              onClick={() => setPortfolioType('webdev')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                portfolioType === 'webdev'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-blue-500/50'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCode className="text-lg sm:text-xl" />
              <span className="text-sm sm:text-base">Web Developer</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Design Grafis Portfolio */}
        {portfolioType === 'design' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {designPortfolio.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Web Developer Portfolio */}
        {portfolioType === 'webdev' && (
          <>
            {/* Search and Filter */}
            <motion.div
              className="mb-5 sm:mb-6 space-y-3 sm:space-y-4"
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base shadow-sm"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                <FaFilter className="text-gray-500 flex-shrink-0 text-xs sm:text-sm" />
                <button
                  onClick={() => setFilter('all')}
                  className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all text-xs sm:text-sm ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                  }`}
                >
                  All ({repos.length})
                </button>
                <button
                  onClick={() => setFilter('starred')}
                  className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all text-xs sm:text-sm ${
                    filter === 'starred'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                  }`}
                >
                  Starred
                </button>
                {languages.slice(0, 5).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setFilter(lang)}
                    className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all text-xs sm:text-sm ${
                      filter === lang
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
          </>
        )}
      </div>

      <footer className="fixed bottom-0 left-0 w-full text-center py-2 sm:py-2.5 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-xs sm:text-sm text-gray-600 dark:text-gray-400 z-50">
        © {new Date().getFullYear()} Zaedar Ghazalba. All rights reserved.
      </footer>
    </motion.div>
  );
}
