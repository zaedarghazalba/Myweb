import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GitHubContributions({ username = 'zaedarghazalba' }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use GitHub's contribution graph image
  const contributionImageUrl = `https://ghchart.rshah.org/${username}`;
  const githubStatsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true`;
  const githubStreakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true`;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-6">GitHub Contributions</h3>

      {/* Contribution Graph */}
      <div className="mb-6">
        {!imageLoaded && !imageError && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contributions...</p>
          </div>
        )}

        {imageError && (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            <p>Unable to load contribution graph</p>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View on GitHub →
            </a>
          </div>
        )}

        <img
          src={contributionImageUrl}
          alt="GitHub Contributions"
          className={`w-full rounded-lg ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
        />
      </div>

      {/* GitHub Stats and Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-hidden">
          <img
            src={githubStatsUrl}
            alt="GitHub Stats"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-hidden">
          <img
            src={githubStreakUrl}
            alt="GitHub Streak"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-2"
        >
          View Full Profile on GitHub →
        </a>
      </div>
    </motion.div>
  );
}
