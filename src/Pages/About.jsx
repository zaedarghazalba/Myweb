import '../index.css';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  FaInstagram, FaEnvelope, FaLinkedin, FaGithub,
  FaBug, FaMobileAlt, FaCode, FaPalette, FaMapMarkerAlt, FaDownload,
  FaBriefcase, FaGraduationCap, FaCalendar, FaChevronDown
} from 'react-icons/fa';
import SEO from '../Components/SEO';
import TechStackInteractive from '../Components/TechStackInteractive';

export default function About() {
  const [showCVDropdown, setShowCVDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCVDropdown(false);
      }
    }

    if (showCVDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCVDropdown]);
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const skills = [
    { icon: FaBug, label: 'QA Testing', color: 'text-gray-900 dark:text-white' },
    { icon: FaMobileAlt, label: 'Mobile Dev', color: 'text-gray-900 dark:text-white' },
    { icon: FaCode, label: 'Web Dev', color: 'text-gray-900 dark:text-white' },
    { icon: FaPalette, label: 'Design', color: 'text-gray-900 dark:text-white' },
  ];

  const experiences = [
    {
      title: 'Junior Web Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: 'Developing web applications using React, Laravel, and modern web technologies.',
      achievements: [
        'Built responsive web applications with React and Tailwind CSS',
        'Implemented REST APIs using Laravel',
        'Collaborated with clients to deliver custom solutions'
      ]
    },
    {
      title: 'Mobile App Developer',
      company: 'Personal Projects',
      period: '2022 - 2023',
      description: 'Created mobile applications using Kotlin for Android platform.',
      achievements: [
        'Developed native Android applications',
        'Implemented clean architecture patterns',
        'Published apps with positive user feedback'
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
        title="Zaedar Ghazalba - Portfolio"
        description="Junior Programmer specializing in Web Development, Mobile Development, and QA Testing."
        keywords="Zaedar Ghazalba, Web Developer, Mobile Developer, QA Tester"
        type="profile"
      />

      {/* Hero Section - Framer Style: Large, Bold, Minimal */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="py-24 md:py-32 lg:py-40"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Large Bold Heading - Framer Style */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight leading-none">
            Zaedar Ghazalba
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Junior programmer yang antusias dalam dunia teknologi
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Berpengalaman dalam membangun aplikasi mobile dan web, dengan ketertarikan
            besar dalam QA Testing dan design grafis.
          </p>

          {/* CTA Buttons - Clean & Minimal */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:zaedaralba11202@gmail.com"
              className="framer-btn framer-btn-primary"
            >
              <FaEnvelope size={18} />
              Contact Me
            </a>

            {/* CV Download Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowCVDropdown(!showCVDropdown)}
                className="framer-btn framer-btn-secondary flex items-center gap-2"
              >
                <FaDownload size={18} />
                Download CV
                <FaChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${showCVDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {showCVDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 left-0 w-full min-w-[200px] bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden z-10"
                >
                  <a
                    href="/cv-programmer.pdf"
                    download="Zaedar-CV-Programmer.pdf"
                    className="block px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    onClick={() => setShowCVDropdown(false)}
                  >
                    <div className="flex items-center gap-2">
                      <FaCode size={16} />
                      <span className="font-medium">CV Programmer</span>
                    </div>
                  </a>
                  <div className="border-t border-gray-200 dark:border-gray-800"></div>
                  <a
                    href="/cv-designer.pdf"
                    download="Zaedar-CV-Designer.pdf"
                    className="block px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    onClick={() => setShowCVDropdown(false)}
                  >
                    <div className="flex items-center gap-2">
                      <FaPalette size={16} />
                      <span className="font-medium">CV Designer</span>
                    </div>
                  </a>
                </motion.div>
              )}
            </div>

            <a
              href="https://github.com/zaedarghazalba"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-btn framer-btn-secondary"
            >
              <FaGithub size={18} />
              View GitHub
            </a>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Skills Section - Ultra Minimal */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Specializations
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* Tech Stack - Interactive */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Tech Stack
          </h2>
          <TechStackInteractive />
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Work Experience */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto">
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
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-3">
                      <FaCalendar size={14} />
                      <span>{exp.period}</span>
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

      {/* Education */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto">
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
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-3">
                      <FaCalendar size={14} />
                      <span>{edu.period}</span>
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

      {/* Contact Section - Clean CTA */}
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

      {/* Footer - Minimal */}
      <footer className="text-center text-sm text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Zaedar Ghazalba</p>
      </footer>
    </div>
  );
}
