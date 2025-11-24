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
    PushEvent: <FaCode className="text-gray-500" />,
    CreateEvent: <FaPlus className="text-gray-500" />,
    WatchEvent: <FaStar className="text-gray-500" />,
    ForkEvent: <FaCodeBranch className="text-gray-500" />,
    DeleteEvent: <FaTrash className="text-gray-500" />,
    PublicEvent: <FaEye className="text-gray-500" />,
  };
  return icons[type] || <FaGithub className="text-gray-500" />;
};

const getEventDescription = (event) => {
  const repo = <span className="font-semibold text-[#1f2328] dark:text-[#c9d1d9] hover:text-[#0969da] dark:hover:text-[#58a6ff] cursor-pointer">{event.repo.name}</span>;

  switch (event.type) {
    case 'PushEvent':
      const commits = event.payload.commits?.length || 0;
      return <span>Pushed {commits} commit{commits !== 1 ? 's' : ''} to {repo}</span>;

    case 'CreateEvent':
      const refType = event.payload.ref_type;
      return <span>Created {refType} {event.payload.ref || ''} in {repo}</span>;

    case 'WatchEvent':
      return <span>Starred {repo}</span>;

    case 'ForkEvent':
      return <span>Forked {repo}</span>;

    case 'DeleteEvent':
      return <span>Deleted {event.payload.ref_type} in {repo}</span>;

    case 'PublicEvent':
      return <span>Made {repo} public</span>;

    case 'PullRequestEvent':
      const action = event.payload.action;
      return <span>{action.charAt(0).toUpperCase() + action.slice(1)} pull request in {repo}</span>;

    case 'IssuesEvent':
      return <span>{event.payload.action} an issue in {repo}</span>;

    default:
      return <span>{event.type.replace('Event', '')} in {repo}</span>;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto"></div>
      </div>
    );
  }

  if (activity.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No recent activity found
      </div>
    );
  }

  return (
    <div className="relative pl-4 border-l-2 border-[#d0d7de] dark:border-[#30363d] ml-2 space-y-6">
      {activity.map((event, index) => (
        <motion.div
          key={event.id}
          className="relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[25px] top-1 bg-[#f6f8fa] dark:bg-[#0d1117] p-1 rounded-full border-2 border-[#d0d7de] dark:border-[#30363d]">
            <div className="text-xs">{getEventIcon(event.type)}</div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline justify-between">
              <div className="text-sm text-[#656d76] dark:text-[#8b949e]">
                {getEventDescription(event)}
              </div>
              <span className="text-xs text-[#656d76] dark:text-[#8b949e] whitespace-nowrap ml-2">
                {formatDate(event.created_at)}
              </span>
            </div>

            {/* Commit messages for push events */}
            {event.type === 'PushEvent' && event.payload.commits?.length > 0 && (
              <div className="mt-2 text-xs text-[#656d76] dark:text-[#8b949e] font-mono bg-[#f6f8fa] dark:bg-[#161b22] p-2 rounded">
                {event.payload.commits.slice(0, 2).map((commit, idx) => (
                  <div key={idx} className="truncate">
                    {commit.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
