import '../index.css';
import { motion } from 'framer-motion';
import alibabaImg from '../Assets/alibaba.png';
import javascriptImg from '../Assets/javascript.png';
import dataengImg from '../Assets/dataeng.png';
import qaTestTechniquePdf from '../Assets/4CRM1mH950gKldWv9XuEJ7XpiDH3-UkCe9CHOQRh9hIbzWwAr.pdf';
import testPlanningPdf from '../Assets/4CRM1mH950gKldWv9XuEJ7XpiDH3-NSPddL0aolkbl0SgX7SB.pdf';
import testOrganizationPdf from '../Assets/4CRM1mH950gKldWv9XuEJ7XpiDH3-RhOjNGROYLxIbCtQwiZ0.pdf';
import testScenarioPdf from '../Assets/Tcase dan BDD.pdf';
import qaseIoPdf from '../Assets/qase io.pdf';
import { FaAward, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import SEO from '../Components/SEO';

export default function Certifications() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const certs = [
    {
      name: "QA Test Technique - Skill Specialization",
      type: "pdf",
      pdfUrl: qaTestTechniquePdf,
      issuer: "MySkill",
      year: "2025",
      description: "Software Quality Assurance - 5 Courses Completed"
    },
    {
      name: "Manage Test dengan Qase.io",
      type: "pdf",
      pdfUrl: qaseIoPdf,
      issuer: "MySkill",
      year: "2025",
      description: "QA Test Activity"
    },
    {
      name: "Test Scenario & Test Case",
      type: "pdf",
      pdfUrl: testScenarioPdf,
      issuer: "MySkill",
      year: "2025",
      description: "QA Test Activity"
    },
    {
      name: "Test Organization",
      type: "pdf",
      pdfUrl: testOrganizationPdf,
      issuer: "MySkill",
      year: "2025",
      description: "QA Test Activity"
    },
    {
      name: "Test Planning",
      type: "pdf",
      pdfUrl: testPlanningPdf,
      issuer: "MySkill",
      year: "2025",
      description: "QA Test Activity"
    },
    {
      name: "Alibaba Cloud Certified Developers",
      type: "image",
      image: alibabaImg,
      issuer: "Alibaba Cloud",
      year: "2024"
    },
    {
      name: "Sertifikasi Kompetensi JavaScript Basic",
      type: "image",
      image: javascriptImg,
      issuer: "Dicoding",
      year: "2023"
    },
    {
      name: "Data Engineering Professional Certification",
      type: "image",
      image: dataengImg,
      issuer: "RapidMiner",
      year: "2023"
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Certifications - Zaedar Ghazalba"
        description="Sertifikasi profesional Zaedar Ghazalba termasuk Alibaba Cloud Certified Developers, JavaScript Basic, dan Data Engineering Professional Certification."
        keywords="Certifications Zaedar Ghazalba, Alibaba Cloud Certified, JavaScript Certification, Data Engineering, Professional Certifications Indonesia, IT Certifications"
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
            Certifications
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Professional certifications and achievements
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Validated expertise across cloud computing, web development, and data engineering
          </p>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="framer-divider"></div>

      {/* Certifications Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="framer-card group"
              >
                {/* Certificate Display */}
                {cert.type === 'pdf' ? (
                  <div className="relative h-56 bg-gray-100 dark:bg-gray-900 rounded-t-xl overflow-hidden flex flex-col items-center justify-center p-6">
                    <FaFilePdf className="text-6xl text-red-500 dark:text-red-400 mb-4" />
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="framer-btn framer-btn-secondary text-sm flex items-center gap-2"
                    >
                      <FaExternalLinkAlt size={14} />
                      View Certificate
                    </a>
                    <div className="absolute top-3 right-3">
                      <FaAward className="text-2xl text-gray-900 dark:text-white opacity-50" />
                    </div>
                  </div>
                ) : (
                  <div className="relative h-56 bg-gray-100 dark:bg-gray-900 rounded-t-xl overflow-hidden flex items-center justify-center p-6">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <FaAward className="text-2xl text-gray-900 dark:text-white opacity-50" />
                    </div>
                  </div>
                )}

                {/* Certificate Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                    {cert.name}
                  </h3>
                  {cert.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {cert.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{cert.issuer}</span>
                    <span>{cert.year}</span>
                  </div>
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
              {certs.length} professional certifications
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer - Minimal */}
      <footer className="text-center text-sm text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Zaedar Ghazalba</p>
      </footer>
    </div>
  );
}
