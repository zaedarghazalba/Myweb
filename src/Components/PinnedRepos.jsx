import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaStar, FaCodeBranch, FaCircle } from 'react-icons/fa';
import { RiGitRepositoryLine } from 'react-icons/ri';
import githubService from '../services/githubService';

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
};

export default function PinnedRepos() {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        const repos = await githubService.getPinnedRepos();
        setPinnedRepos(repos.slice(0, 6)); // Get top 6
      } catch (error) {
        console.error('Error fetching pinned repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-[#d0d7de] dark:border-[#30363d] rounded-md p-4 h-32 animate-pulse bg-white dark:bg-[#0d1117]">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pinnedRepos.map((repo, index) => {
        const languageColor = languageColors[repo.language] || '#858585';

        return (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between p-4 rounded-md border border-[#d0d7de] dark:border-[#30363d] bg-white dark:bg-[#0d1117] hover:bg-[#f6f8fa] dark:hover:bg-[#161b22] transition-colors group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <RiGitRepositoryLine className="text-[#656d76] dark:text-[#8b949e]" />
                <span className="font-semibold text-[#0969da] dark:text-[#58a6ff] group-hover:underline cursor-pointer">
                  {repo.name}
                </span>
                <span className="text-xs border border-[#d0d7de] dark:border-[#30363d] rounded-full px-2 py-0.5 text-[#656d76] dark:text-[#8b949e] font-medium">
                  Public
                </span>
              </div>

              <p className="text-xs text-[#656d76] dark:text-[#8b949e] mb-4 line-clamp-2">
                {repo.description || 'No description provided'}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#656d76] dark:text-[#8b949e]">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <FaCircle style={{ color: languageColor }} className="text-[10px]" />
                  <span>{repo.language}</span>
                </div>
              )}
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1 hover:text-[#0969da] dark:hover:text-[#58a6ff]">
                  <FaStar />
                  <span>{repo.stargazers_count}</span>
                </div>
              )}
              {repo.forks_count > 0 && (
                <div className="flex items-center gap-1 hover:text-[#0969da] dark:hover:text-[#58a6ff]">
                  <FaCodeBranch />
                  <span>{repo.forks_count}</span>
                </div>
              )}
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
