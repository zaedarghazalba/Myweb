import '../index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import githubService from '../services/githubService';
import RepoCard from '../Components/RepoCard';
import { FaFilter, FaPalette, FaCode, FaPaintBrush, FaVideo, FaCube, FaTimes, FaChevronLeft, FaChevronRight, FaInfoCircle, FaEyeSlash } from 'react-icons/fa';

export default function Portfolio() {
  const [portfolioType, setPortfolioType] = useState('design'); // 'design' or 'webdev'
  const [designCategory, setDesignCategory] = useState('design-graphics'); // 'design-graphics', 'motion-graphics', '3d-graphics'
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  // Design Graphics Portfolio - from designgraph folder
  const designGraphicsPortfolio = [
    {
      id: 1,
      title: 'Design Graphics Project Beauty Theme',
      category: 'Design Graphics',
      description: 'Creative graphic design showcasing visual storytelling',
      image: '/images/portfolio/design-graphics/1.png',
      tags: ['Visual Design', 'Branding', 'Illustration']
    },
    {
      id: 2,
      title: 'Design Graphics Project Social Media Theme',
      category: 'Design Graphics',
      description: 'Modern graphic design with bold typography and colors',
      image: '/images/portfolio/design-graphics/2.png',
      tags: ['Typography', 'Color Theory', 'Layout Design']
    },
    {
      id: 3,
      title: 'Design Graphics Project Other Theme',
      category: 'Design Graphics',
      description: 'Innovative graphic design combining art and functionality',
      image: '/images/portfolio/design-graphics/3.png',
      tags: ['Digital Art', 'Visual Communication', 'Creative Design']
    }
  ];

  // Motion Graphics Portfolio
  const motionGraphicsPortfolio = [
    {
      id: 4,
      title: 'Comming Soon Animation',
      category: 'Motion Graphics',
      description: 'Dynamic brand animation with smooth transitions',
      image: '',
      tags: ['Animation', 'Motion Design', 'Branding']
    },
    {
      id: 5,
      title: 'Comming Soon Animation UI',
      category: 'Motion Graphics',
      description: 'Interactive UI animations for better user experience',
      image: '',
      tags: ['UI Animation', 'Micro-interactions', 'UX']
    },
    {
      id: 6,
      title: 'Comming Soon Animation',
      category: 'Motion Graphics',
      description: 'Engaging explainer video with custom illustrations',
      image: '',
      tags: ['Video', 'Storytelling', 'Animation']
    }
  ];

  // 3D Graphics Portfolio
  const graphicsPortfolio3D = [
    {
      id: 7,
      title: 'Comming Soon Animation',
      category: '3D Graphics',
      description: 'Photorealistic 3D product visualization',
      image: '',
      tags: ['3D Modeling', 'Rendering', 'Product Visualization']
    },
    {
      id: 8,
      title: 'Comming Soon Animation',
      category: '3D Graphics',
      description: 'Creative 3D character modeling and texturing',
      image: '',
      tags: ['Character Design', '3D Art', 'Modeling']
    },
    {
      id: 9,
      title: 'Comming Soon Animation',
      category: '3D Graphics',
      description: 'Realistic 3D architectural renders and walkthroughs',
      image: '',
      tags: ['Architecture', 'Visualization', '3D Rendering']
    }
  ];

  // Get current portfolio based on category
  const getCurrentPortfolio = () => {
    switch(designCategory) {
      case 'design-graphics':
        return designGraphicsPortfolio;
      case 'motion-graphics':
        return motionGraphicsPortfolio;
      case '3d-graphics':
        return graphicsPortfolio3D;
      default:
        return designGraphicsPortfolio;
    }
  };

  // Lightbox functions
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => {
    const portfolio = getCurrentPortfolio();
    setCurrentImageIndex((prev) => (prev + 1) % portfolio.length);
  };

  const goToPrevious = () => {
    const portfolio = getCurrentPortfolio();
    setCurrentImageIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset';
      }
      if (e.key === 'ArrowRight') {
        const portfolio = getCurrentPortfolio();
        setCurrentImageIndex((prev) => (prev + 1) % portfolio.length);
      }
      if (e.key === 'ArrowLeft') {
        const portfolio = getCurrentPortfolio();
        setCurrentImageIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, designCategory]);

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
          <>
            {/* Category Filter Buttons */}
            <motion.div
              className="mb-6 flex gap-3 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.button
                onClick={() => setDesignCategory('design-graphics')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  designCategory === 'design-graphics'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaintBrush />
                <span className="text-sm sm:text-base">Design Graphics</span>
              </motion.button>

              <motion.button
                onClick={() => setDesignCategory('motion-graphics')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  designCategory === 'motion-graphics'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaVideo />
                <span className="text-sm sm:text-base">Motion Graphics</span>
              </motion.button>

              <motion.button
                onClick={() => setDesignCategory('3d-graphics')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  designCategory === '3d-graphics'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCube />
                <span className="text-sm sm:text-base">3D Graphics</span>
              </motion.button>
            </motion.div>

            {/* Portfolio Grid */}
            <motion.div
              key={designCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {getCurrentPortfolio().map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden h-48 sm:h-56 cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-4xl">🔍</span>
                    </div>
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
          </>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Top Right Buttons */}
            <div className="absolute top-4 right-4 z-[110] flex gap-2">
              {/* Toggle Info Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
                title={showInfo ? "Sembunyikan Info" : "Tampilkan Info"}
              >
                {showInfo ? <FaEyeSlash size={24} /> : <FaInfoCircle size={24} />}
              </motion.button>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                onClick={closeLightbox}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
                title="Tutup"
              >
                <FaTimes size={24} />
              </motion.button>
            </div>

            {/* Previous Button */}
            {getCurrentPortfolio().length > 1 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
              >
                <FaChevronLeft size={24} />
              </motion.button>
            )}

            {/* Next Button */}
            {getCurrentPortfolio().length > 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
              >
                <FaChevronRight size={24} />
              </motion.button>
            )}

            {/* Image Container */}
            <motion.div
              key={currentImageIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={getCurrentPortfolio()[currentImageIndex]?.image}
                  alt={getCurrentPortfolio()[currentImageIndex]?.title}
                  className={`max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-300 ${
                    showInfo ? 'max-h-[75vh]' : 'max-h-[90vh]'
                  }`}
                />
              </div>
            </motion.div>

            {/* Image Counter - Always Visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 left-4 z-[110] px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium"
            >
              {currentImageIndex + 1} / {getCurrentPortfolio().length}
            </motion.div>

            {/* Image Info - Positioned at bottom */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  key={`info-${currentImageIndex}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-white/10 max-w-4xl mx-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-2">
                    {getCurrentPortfolio()[currentImageIndex]?.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {getCurrentPortfolio()[currentImageIndex]?.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getCurrentPortfolio()[currentImageIndex]?.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
