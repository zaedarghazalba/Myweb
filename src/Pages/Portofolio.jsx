import '../index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import githubService from '../services/githubService';
import RepoCard from '../Components/RepoCard';
import { FaFilter, FaPalette, FaCode, FaPaintBrush, FaVideo, FaCube, FaTimes, FaChevronLeft, FaChevronRight, FaInfoCircle, FaEyeSlash } from 'react-icons/fa';
import SEO from '../Components/SEO';

export default function Portfolio() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const [portfolioType, setPortfolioType] = useState('design');
  const [designCategory, setDesignCategory] = useState('design-graphics');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  // Design Graphics Portfolio
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCurrentPortfolio = useCallback(() => {
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
  }, [designCategory]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
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
  }, [lightboxOpen, designCategory, getCurrentPortfolio]);

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

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filter === 'all') return matchesSearch;
    if (filter === 'starred') return matchesSearch && repo.stargazers_count > 0;
    if (filter === 'forked') return matchesSearch && repo.fork;
    return matchesSearch && repo.language === filter;
  });

  const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];

  return (
    <div className="min-h-screen">
      <SEO
        title="Portfolio - Zaedar Ghazalba"
        description="Lihat portfolio karya Zaedar Ghazalba meliputi Web Development, Design Graphics, Motion Graphics, dan 3D Graphics. Project React, Laravel, dan berbagai design kreatif."
        keywords="Portfolio Zaedar Ghazalba, Web Development Portfolio, Graphic Design Portfolio, React Projects, Laravel Projects, Design Graphics Indonesia, Motion Graphics, 3D Graphics"
        type="website"
      />

      {/* Hero Section - Framer Style */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="py-24 md:py-32 lg:py-40"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight leading-none">
            Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Explore my creative works and projects
          </p>

          {/* Toggle Buttons - Minimal Style */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setPortfolioType('design')}
              className={`framer-btn ${
                portfolioType === 'design' ? 'framer-btn-primary' : 'framer-btn-secondary'
              }`}
            >
              <FaPalette size={18} />
              Design Grafis
            </button>
            <button
              onClick={() => setPortfolioType('webdev')}
              className={`framer-btn ${
                portfolioType === 'webdev' ? 'framer-btn-primary' : 'framer-btn-secondary'
              }`}
            >
              <FaCode size={18} />
              Web Developer
            </button>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Design Grafis Portfolio */}
      {portfolioType === 'design' && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="py-24 md:py-32"
        >
          <div className="max-w-7xl mx-auto">
            {/* Category Filter Buttons */}
            <div className="mb-12 flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setDesignCategory('design-graphics')}
                className={`framer-btn ${
                  designCategory === 'design-graphics' ? 'framer-btn-primary' : 'framer-btn-secondary'
                }`}
              >
                <FaPaintBrush size={16} />
                Design Graphics
              </button>
              <button
                onClick={() => setDesignCategory('motion-graphics')}
                className={`framer-btn ${
                  designCategory === 'motion-graphics' ? 'framer-btn-primary' : 'framer-btn-secondary'
                }`}
              >
                <FaVideo size={16} />
                Motion Graphics
              </button>
              <button
                onClick={() => setDesignCategory('3d-graphics')}
                className={`framer-btn ${
                  designCategory === '3d-graphics' ? 'framer-btn-primary' : 'framer-btn-secondary'
                }`}
              >
                <FaCube size={16} />
                3D Graphics
              </button>
            </div>

            {/* Portfolio Grid */}
            <motion.div
              key={designCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {getCurrentPortfolio().map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="framer-card group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-64 rounded-t-xl bg-gray-100 dark:bg-gray-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Web Developer Portfolio */}
      {portfolioType === 'webdev' && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="py-24 md:py-32"
        >
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
              />

              {/* Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <FaFilter className="text-gray-500 flex-shrink-0" />
                <button
                  onClick={() => setFilter('all')}
                  className={`framer-btn framer-btn-sm ${
                    filter === 'all' ? 'framer-btn-primary' : 'framer-btn-secondary'
                  }`}
                >
                  All ({repos.length})
                </button>
                <button
                  onClick={() => setFilter('starred')}
                  className={`framer-btn framer-btn-sm ${
                    filter === 'starred' ? 'framer-btn-primary' : 'framer-btn-secondary'
                  }`}
                >
                  Starred
                </button>
                {languages.slice(0, 5).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setFilter(lang)}
                    className={`framer-btn framer-btn-sm ${
                      filter === lang ? 'framer-btn-primary' : 'framer-btn-secondary'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading repositories...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredRepos.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No repositories found
                </p>
              </div>
            )}

            {/* Repositories Grid */}
            {!loading && filteredRepos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.map((repo, index) => (
                  <RepoCard key={repo.id} repo={repo} index={index} />
                ))}
              </div>
            )}

            {/* Stats */}
            {!loading && repos.length > 0 && (
              <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
                <p>
                  Showing {filteredRepos.length} of {repos.length} repositories
                </p>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Footer - Minimal */}
      <footer className="text-center text-sm text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Zaedar Ghazalba</p>
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

            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 left-4 z-[110] px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium"
            >
              {currentImageIndex + 1} / {getCurrentPortfolio().length}
            </motion.div>

            {/* Image Info */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  key={`info-${currentImageIndex}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10 max-w-4xl mx-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-white text-xl font-bold mb-2">
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
    </div>
  );
}
