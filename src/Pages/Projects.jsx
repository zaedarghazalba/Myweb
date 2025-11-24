import '../index.css';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCode, FaRocket } from 'react-icons/fa';
import SEO from '../Components/SEO';

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: 'Budget Planner',
      description: 'A comprehensive budget planning application that helps users manage their finances, track expenses, and set financial goals. Built with modern web technologies for a smooth user experience.',
      technologies: ['React', 'JavaScript', 'CSS', 'Vercel'],
      liveUrl: 'https://budgetplanner-beta.vercel.app/',
      screenshot: `https://api.screenshotone.com/take?url=https://budgetplanner-beta.vercel.app/&viewport_width=1200&viewport_height=800&device_scale_factor=1&image_quality=80&format=jpg&block_ads=true&block_cookie_banners=true&block_trackers=true&cache=true`,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      category: 'Web Application',
      features: [
        'Track income and expenses',
        'Budget planning tools',
        'Financial goal setting',
        'Responsive design'
      ]
    }
  ];

  return (
    <motion.div
      className="w-full max-w-full overflow-x-hidden pb-20 sm:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="Online Projects - Zaedar Ghazalba"
        description="Project live dan aplikasi yang telah di-deploy oleh Zaedar Ghazalba. Termasuk Budget Planner dan berbagai aplikasi web modern lainnya."
        keywords="Online Projects Zaedar Ghazalba, Live Projects, Budget Planner, React Applications, Web Applications, Deployed Projects Indonesia"
        type="website"
      />
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <FaRocket className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Online Projects</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Live projects and deployed applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            >
              {/* Project Image */}
              <div className={`relative h-48 sm:h-56 bg-gradient-to-br ${project.gradient} overflow-hidden group`}>
                {/* Screenshot overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-center text-white p-4">
                    <FaRocket className="text-4xl sm:text-5xl mx-auto mb-3 opacity-90" />
                    <p className="text-sm sm:text-base font-semibold">Live Application</p>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-xs sm:text-sm font-semibold rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <p className="text-white text-sm font-semibold">Click to view live demo</p>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6">
                {/* Project Name */}
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {project.name}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                    <FaCode className="text-blue-600 dark:text-blue-400" />
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs sm:text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm sm:text-base shadow-lg shadow-blue-500/30"
                >
                  <FaExternalLinkAlt className="text-xs sm:text-sm" />
                  View Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-8 text-center text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm sm:text-base">
            Showing {projects.length} deployed {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </motion.div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full text-center py-2 sm:py-2.5 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-xs sm:text-sm text-gray-600 dark:text-gray-400 z-50">
        © {new Date().getFullYear()} Zaedar Ghazalba. All rights reserved.
      </footer>
    </motion.div>
  );
}
