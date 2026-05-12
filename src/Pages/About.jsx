import '../index.css';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaEnvelope, FaLinkedin, FaGithub,
  FaBug, FaMobileAlt, FaCode, FaPalette, FaMapMarkerAlt, FaDownload,
  FaBriefcase, FaGraduationCap, FaCalendar, FaAward, FaRobot
} from 'react-icons/fa';
import SEO from '../Components/SEO';
import TechStackInteractive from '../Components/TechStackInteractive';
import GitHubContributions from '../Components/GitHubContributions';

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const skills = [
    { icon: FaBug, label: 'QA Testing', color: 'text-gray-600 dark:text-gray-400' },
    { icon: FaMobileAlt, label: 'Mobile Dev', color: 'text-gray-600 dark:text-gray-400' },
    { icon: FaCode, label: 'Web Dev', color: 'text-gray-600 dark:text-gray-400' },
    { icon: FaPalette, label: 'Design', color: 'text-gray-600 dark:text-gray-400' },
    { icon: FaRobot, label: 'AI Tools', color: 'text-gray-600 dark:text-gray-400' },
  ];

  const experiences = [
    {
      title: 'WordPress Developer',
      company: 'Akseleratech',
      period: 'July 2025 - Present',
      description: 'Developing and maintaining company website using WordPress with focus on performance optimization and modern web technologies.',
      achievements: [
        'Develop and maintain company website using WordPress',
        'Migrate multiple pages from WordPress to Next.js to improve performance and stability',
        'Build PWA (Progressive Web App)-based registration page for faster, more responsive, and offline-capable experience',
        'Collaborate with design and backend teams to ensure optimal integration',
        'Perform SEO optimization using WordPress SEO plugins (Yoast/RankMath) to improve website visibility'
      ]
    },
    {
      title: 'Mobile & Web Developer',
      company: 'Freelance - Yogyakarta',
      period: 'June 2023 - Present',
      description: 'Developing web and mobile applications using Laravel and Kotlin, with focus on API integration and responsive UI/UX.',
      achievements: [
        'Developed clinic mobile application and web with queue feature',
        'Created Dukcapil mobile project with queue base and queue feature',
        'Built Posyandu mobile project with queue feature',
        'Implemented REST APIs to connect web and mobile applications',
        'Designed responsive and user-friendly interfaces'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Informatics',
      institution: 'Yogyakarta University of Technology',
      period: 'September 2021 - August 2025',
      gpa: '3.76 / 4.00',
      description: 'Focused on web and mobile application development, database management, and software engineering with 144 credits completed.'
    },
    {
      degree: 'Senior High School - MIPA',
      institution: 'Kulon Progo Abu Bakar Boarding School',
      period: 'July 2018 - May 2021',
      description: 'Focused on Mathematics and Natural Sciences (MIPA) with boarding school education.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Zaedar Ghazalba - Portfolio Website"
        description="Junior Programmer specializing in Web Development, Mobile Development, and QA Testing."
        keywords="Zaedar Ghazalba, Web Developer, Mobile Developer, QA Tester"
        type="profile"
      />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen flex"
      >
        {/* Left Side - Photo */}
        <div className="hidden lg:block lg:absolute lg:left-0 lg:top-0 lg:w-1/2 lg:h-full z-0">
          <div className="relative w-full h-full">
            <img 
              src="/profile-photo.jpg" 
              alt="Zaedar Ghazalba"
              className="w-full h-full object-cover object-left"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Cinematic Gradient Mask - blend to center */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, transparent 0%, transparent 40%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 90%, black 100%)'
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="relative z-10 w-full lg:w-1/2 lg:ml-auto flex items-center">
          <div className="w-full px-8 lg:px-16 py-16 lg:py-0">
            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
              Zaedar Ghazalba
            </h1>

            {/* Professional Title */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Open to Work</span>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-6 font-light leading-relaxed">
              Junior Full-Stack Developer | Mobile Developer | QA Engineer
            </p>

            {/* Summary */}
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              <span className="font-semibold text-gray-900 dark:text-white">2+ years</span> of experience building 
              <span className="font-semibold text-gray-900 dark:text-white"> scalable web & mobile applications</span>. 
              Passionate about <span className="font-semibold text-gray-900 dark:text-white">delivering quality software</span> through 
              clean code, comprehensive testing, and user-centric design.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-sm">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">2+</div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-500">Years Exp</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">10+</div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-500">Projects</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">5+</div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-500">Certifications</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:zaedaralba11202@gmail.com"
                className="framer-btn framer-btn-primary"
              >
                <FaEnvelope size={18} />
                Contact Me
              </a>
              <a
                href="/cv-programmer.pdf"
                download="Zaedar-CV-Programmer.pdf"
                className="framer-btn framer-btn-secondary"
              >
                <FaDownload size={18} />
                Download CV
              </a>
              <a
                href="https://github.com/zaedarghazalba"
                target="_blank"
                rel="noopener noreferrer"
                className="framer-btn framer-btn-secondary"
              >
                <FaGithub size={18} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/zaedar-ghazalba"
                target="_blank"
                rel="noopener noreferrer"
                className="framer-btn framer-btn-secondary"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Specializations Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Specializations
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="framer-card text-center group"
                >
                  <Icon className={`${skill.color} text-4xl mx-auto mb-4`} />
                  <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                    {skill.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Tech Stack Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Tech Stack
          </h2>
          <TechStackInteractive />
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Work Experience Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Work Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="framer-card"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-xl text-gray-900 dark:text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                      {exp.company}
                    </p>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-gray-400 dark:text-gray-500" size={12} />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* GitHub Contributions Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            GitHub Activity
          </h2>
          <GitHubContributions />
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Education Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Education
          </h2>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="framer-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <FaGraduationCap className="text-xl text-gray-900 dark:text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-gray-400 dark:text-gray-500" size={12} />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{edu.period}</span>
                    </div>
                    {edu.gpa && (
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium rounded-full">
                          GPA: {edu.gpa}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            Interested in working together? Feel free to reach out.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://github.com/zaedarghazalba"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-btn framer-btn-secondary"
            >
              <FaGithub size={18} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/zaedar-ghazalba"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-btn framer-btn-secondary"
            >
              <FaLinkedin size={18} />
              LinkedIn
            </a>
            <a
              href="https://instagram.com/zeedargh"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-btn framer-btn-secondary"
            >
              <FaInstagram size={18} />
              Instagram
            </a>
            <a
              href="mailto:zaedaralba11202@gmail.com"
              className="framer-btn framer-btn-secondary"
            >
              <FaEnvelope size={18} />
              Email
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <FaMapMarkerAlt />
            <span>Indonesia</span>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Interested in My Work?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore my projects and certifications to see what I've been working on.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/projects"
              className="framer-btn framer-btn-primary"
            >
              <FaCode size={18} />
              View Projects
            </a>
            <a
              href="/certifications"
              className="framer-btn framer-btn-secondary"
            >
              <FaAward size={18} />
              View Certifications
            </a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Zaedar Ghazalba</p>
      </footer>
    </div>
  );
}
