import '../index.css';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaRocket } from 'react-icons/fa';
import SEO from '../Components/SEO';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  // Fetch projects from Firestore
  const { projects, loading } = useProjects();

  return (
    <div className="min-h-screen">
      <SEO
        title="Online Projects - Zaedar Ghazalba"
        description="Project live dan aplikasi yang telah di-deploy oleh Zaedar Ghazalba. Termasuk Budget Planner dan berbagai aplikasi web modern lainnya."
        keywords="Online Projects Zaedar Ghazalba, Live Projects, Budget Planner, React Applications, Web Applications, Deployed Projects Indonesia"
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
            Online Projects
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Live projects and deployed applications
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore my deployed applications built with modern web technologies
          </p>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-24">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      )}

      {/* Projects Section */}
      {!loading && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="py-24 md:py-32"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="framer-card group"
              >
                {/* Project Image */}
                <div className="relative h-64 md:h-80 bg-gray-100 dark:bg-gray-900 overflow-hidden rounded-t-xl mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <FaRocket className="text-5xl md:text-6xl mx-auto mb-4 text-gray-900 dark:text-white opacity-90" />
                      <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                        Live Application
                      </p>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 bg-white dark:bg-gray-900 text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-800">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="px-6 pb-6">
                  {/* Project Name */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    {project.name}
                  </h2>

                  {/* Description */}
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white uppercase tracking-wide">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-gray-900 dark:bg-white rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white uppercase tracking-wide">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white text-sm rounded-lg border border-gray-200 dark:border-gray-800 font-medium"
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
                    className="framer-btn framer-btn-primary w-full justify-center"
                  >
                    <FaExternalLinkAlt size={16} />
                    View Live Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center text-gray-600 dark:text-gray-400"
            >
              <p className="text-sm md:text-base">
                Showing {projects.length} deployed {projects.length === 1 ? 'project' : 'projects'}
              </p>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Footer - Minimal */}
      <footer className="text-center text-sm text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Zaedar Ghazalba</p>
      </footer>
    </div>
  );
}
