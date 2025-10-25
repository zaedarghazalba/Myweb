import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import githubService from '../services/githubService';
import {
  FaStar,
  FaCodeBranch,
  FaCode,
  FaEye,
  FaTrash,
  FaPlus,
  FaGithub
} from 'react-icons/fa';

const getEventIcon = (type) => {
  const icons = {
    PushEvent: <FaCode className="text-green-500" />,
    CreateEvent: <FaPlus className="text-blue-500" />,
    WatchEvent: <FaStar className="text-yellow-500" />,
    ForkEvent: <FaCodeBranch className="text-purple-500" />,
    DeleteEvent: <FaTrash className="text-red-500" />,
    PublicEvent: <FaEye className="text-cyan-500" />,
  };
  return icons[type] || <FaGithub className="text-gray-500" />;
};

const getEventDescription = (event) => {
  const repo = event.repo.name;

  switch (event.type) {
    case 'PushEvent':
      const commits = event.payload.commits?.length || 0;
      return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repo}`;

    case 'CreateEvent':
      const refType = event.payload.ref_type;
      return `Created ${refType} ${event.payload.ref || ''} in ${repo}`;

    case 'WatchEvent':
      return `Starred ${repo}`;

    case 'ForkEvent':
      return `Forked ${repo}`;

    case 'DeleteEvent':
      return `Deleted ${event.payload.ref_type} in ${repo}`;

    case 'PublicEvent':
      return `Made ${repo} public`;

    case 'PullRequestEvent':
      const action = event.payload.action;
      return `${action.charAt(0).toUpperCase() + action.slice(1)} pull request in ${repo}`;

    case 'IssuesEvent':
      return `${event.payload.action} an issue in ${repo}`;

    default:
      return `${event.type.replace('Event', '')} in ${repo}`;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));

  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 30) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

export default function GitHubActivity() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activityData = await githubService.getRecentActivity();
        setActivity(activityData.slice(0, 10)); // Show latest 10 activities
      } catch (error) {
        console.error('Error fetching activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading activity...</p>
        </div>
      </motion.div>
    );
  }

  if (activity.length === 0) {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          No recent activity found
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activity.map((event, index) => (
          <motion.div
            key={event.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Icon */}
            <div className="text-2xl flex-shrink-0 mt-1">
              {getEventIcon(event.type)}
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                {getEventDescription(event)}
              </p>

              {/* Commit messages for push events */}
              {event.type === 'PushEvent' && event.payload.commits?.length > 0 && (
                <div className="mt-2 pl-3 border-l-2 border-gray-300 dark:border-gray-600">
                  {event.payload.commits.slice(0, 3).map((commit, idx) => (
                    <p
                      key={idx}
                      className="text-xs text-gray-600 dark:text-gray-400 truncate"
                    >
                      {commit.message}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {formatDate(event.created_at)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Link */}
      <div className="mt-6 text-center">
        <a
          href="https://github.com/zaedarghazalba"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-2"
        >
          View all activity on GitHub
          <FaGithub />
        </a>
      </div>
    </motion.div>
  );
}
