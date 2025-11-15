import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaStar, FaCodeBranch, FaCircle, FaExternalLinkAlt, FaEye, FaInfoCircle } from 'react-icons/fa';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Swift: '#ffac45',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  Shell: '#89e051',
  Dart: '#00B4AB',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
};

export default function RepoCard({ repo, index = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const languageColor = languageColors[repo.language] || '#858585';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <motion.div
      className="relative h-full min-h-[280px]"
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          whileHover={{ scale: 1.02, y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 flex-1 min-w-0"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="truncate">{repo.name}</span>
                <FaExternalLinkAlt className="text-xs flex-shrink-0" />
              </a>
              <button
                onClick={() => setIsFlipped(true)}
                className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                title="View details"
              >
                <FaInfoCircle className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
              {repo.description || 'No description provided'}
            </p>

            {/* Footer Info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <FaCircle style={{ color: languageColor }} className="text-xs" />
                  <span>{repo.language}</span>
                </div>
              )}
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span>{repo.stargazers_count}</span>
                </div>
              )}
              {repo.forks_count > 0 && (
                <div className="flex items-center gap-1">
                  <FaCodeBranch className="text-blue-500" />
                  <span>{repo.forks_count}</span>
                </div>
              )}
            </div>

            {/* Updated date */}
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {formatDate(repo.updated_at)}
            </div>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl p-5 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col h-full text-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">{repo.name}</h3>
              <button
                onClick={() => setIsFlipped(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                title="Back to front"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow space-y-3 text-sm">
              {/* Repository Stats */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FaStar className="text-yellow-300" />
                  Repository Stats
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-white/70">Stars</div>
                    <div className="font-semibold">{repo.stargazers_count}</div>
                  </div>
                  <div>
                    <div className="text-white/70">Forks</div>
                    <div className="font-semibold">{repo.forks_count}</div>
                  </div>
                  {repo.watchers_count > 0 && (
                    <>
                      <div>
                        <div className="text-white/70">Watchers</div>
                        <div className="font-semibold">{repo.watchers_count}</div>
                      </div>
                      <div>
                        <div className="text-white/70">Issues</div>
                        <div className="font-semibold">{repo.open_issues_count || 0}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-semibold mb-2">Topics</h4>
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-white/20 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* License */}
              {repo.license && (
                <div className="text-xs text-white/80">
                  License: {repo.license.name}
                </div>
              )}
            </div>

            {/* View on GitHub Button */}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-4 text-center font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <FaExternalLinkAlt className="text-sm" />
              View on GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
