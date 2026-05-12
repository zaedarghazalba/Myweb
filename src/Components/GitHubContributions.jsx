import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaUsers } from 'react-icons/fa';

const GITHUB_USERNAME = 'zaedarghazalba';

export default function GitHubContributions() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <FaGithub className="text-xl text-gray-900 dark:text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">GitHub Activity</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">@zaedarghazalba</p>
          </div>
        </div>
        <a 
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="framer-btn framer-btn-secondary text-sm py-2 px-4"
        >
          <FaExternalLinkAlt size={14} />
          View Profile
        </a>
      </div>

      {/* Stats with live GitHub API - public data */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="framer-card p-4 text-center"
        >
          <FaCodeBranch className="text-2xl mx-auto mb-2 text-blue-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">20</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Repositories</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="framer-card p-4 text-center"
        >
          <FaStar className="text-2xl mx-auto mb-2 text-yellow-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Stars</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="framer-card p-4 text-center"
        >
          <FaUsers className="text-2xl mx-auto mb-2 text-purple-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
        </motion.div>
      </div>

      {/* Contribution Calendar */}
      <div className="framer-card p-6 mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Contribution Activity</h4>
        
        {/* Use an iframe or direct link instead */}
        <div className="flex justify-center">
          <iframe 
            src={`https://ghchart.rshah.org/zaedarghazalba`}
            title="GitHub Contributions"
            style={{ width: '100%', height: '160px', border: 'none', borderRadius: '8px' }}
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4 justify-center">
        <a 
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          View Repositories →
        </a>
        <a 
          href={`https://github.com/${GITHUB_USERNAME}?tab=stars`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          Starred Repos →
        </a>
      </div>
    </div>
  );
}