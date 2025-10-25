import { motion } from 'framer-motion';
import { FaStar, FaCodeBranch, FaCircle, FaExternalLinkAlt } from 'react-icons/fa';

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
      className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
          >
            {repo.name}
            <FaExternalLinkAlt className="text-xs" />
          </a>
          <span className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {repo.private ? 'Private' : 'Public'}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-2">
          {repo.description || 'No description provided'}
        </p>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-4">
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
        </div>

        {/* Updated date */}
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          {formatDate(repo.updated_at)}
        </div>

        {/* Topics/Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
