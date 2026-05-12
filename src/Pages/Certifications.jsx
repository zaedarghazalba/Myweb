import '../index.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward, FaTimes, FaExternalLinkAlt, FaCalendarAlt, FaBuilding, FaSearchPlus, FaFilePdf } from 'react-icons/fa';
import SEO from '../Components/SEO';
import { useCertifications } from '../hooks/useCertifications';

export default function Certifications() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const [selectedCert, setSelectedCert] = useState(null); // Full certification object

  // Fetch certifications from Firestore
  const { certifications: certs, loading } = useCertifications();

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
        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-6"
          >
            <FaAward className="text-3xl" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight leading-none">
            Certifications
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Professional certifications and achievements
          </p>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
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
        className="py-24 md:py-32 bg-gray-50/50 dark:bg-transparent"
      >
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-500">Loading credentials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {certs.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  onClick={() => setSelectedCert(cert)}
                  className="framer-card group cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl bg-white dark:bg-gray-900"
                >
                  {/* Certificate Thumbnail */}
                  <div className="relative h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {cert.fileUrl && (cert.fileUrl.includes('.pdf') || cert.fileUrl.includes('application/pdf') || cert.fileUrl.includes('raw') || cert.fileUrl.includes('/raw/')) ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20">
                        <FaFilePdf className="text-6xl text-red-500 mb-2" />
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">PDF Certificate</span>
                        <a 
                          href={cert.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Click to view
                        </a>
                      </div>
                    ) : (
                      <img
                        src={cert.fileUrl}
                        alt={cert.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <div className="bg-white/90 dark:bg-gray-900/90 p-3 rounded-full shadow-lg">
                          <FaSearchPlus className="text-blue-600 dark:text-blue-400 text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {cert.name}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaBuilding className="text-blue-500/50" />
                        <span>{cert.issuer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="text-blue-500/50" />
                        <span>Issued {cert.year}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        View Details <FaExternalLinkAlt size={10} />
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && certs.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
              <FaAward className="mx-auto text-6xl text-gray-200 dark:text-gray-800 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No certificates found</h3>
              <p className="text-gray-500">Stay tuned for more professional credentials.</p>
            </div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 py-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Total {certs.length} professional certifications obtained
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-2">
                {certs.slice(0, 5).map((c, i) => (
                  <img key={i} src={c.fileUrl} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 object-cover" alt="" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer - Minimal */}
      <footer className="text-center text-sm text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Zaedar Ghazalba • All rights reserved</p>
      </footer>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-10 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl max-h-[95vh] md:max-h-[90vh] bg-white dark:bg-gray-900 rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Responsive Position */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2.5 md:p-3 bg-black/40 hover:bg-black/60 md:bg-black/20 md:hover:bg-black/40 dark:bg-gray-800/80 dark:hover:bg-gray-700 text-white rounded-full transition-all backdrop-blur-sm shadow-lg border border-white/10"
              >
                <FaTimes size={18} />
              </button>

              {/* Modal Image Section - Optimized for Mobile */}
              <div className="w-full md:w-[55%] lg:w-[60%] h-[35vh] sm:h-[45vh] md:h-auto bg-gray-50 dark:bg-gray-800/30 flex items-center justify-center relative group shrink-0">
                {selectedCert.fileUrl && (selectedCert.fileUrl.includes('.pdf') || selectedCert.fileUrl.includes('application/pdf') || selectedCert.fileUrl.includes('raw') || selectedCert.fileUrl.includes('/raw/')) ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    <FaFilePdf className="text-8xl md:text-9xl text-red-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-4">Certificate is a PDF document</p>
                    <a
                      href={selectedCert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
                    >
                      <FaExternalLinkAlt />
                      Open PDF
                    </a>
                  </div>
                ) : (
                  <>
                    <img
                      src={selectedCert.fileUrl}
                      alt={selectedCert.name}
                      className="w-full h-full object-contain p-4 sm:p-6 md:p-10"
                    />
                    <a
                      href={selectedCert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 md:bottom-6 md:right-6 p-3 md:p-4 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 text-xs md:text-sm font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm border border-gray-100 dark:border-gray-800"
                    >
                      <FaExternalLinkAlt size={12} className="md:w-3.5 md:h-3.5" />
                      <span>Full View</span>
                    </a>
                  </>
                )}
              </div>

              {/* Modal Info Section - Scrollable on small screens */}
              <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-14 overflow-y-auto custom-scrollbar flex flex-col bg-white dark:bg-gray-900">
                <div className="mb-auto">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
                    Certificate Detail
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight tracking-tight">
                    {selectedCert.name}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12">
                    <div className="space-y-1">
                      <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Issuer</p>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                          <FaBuilding className="text-blue-500 text-sm" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm md:text-base leading-snug">{selectedCert.issuer}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Year</p>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                          <FaCalendarAlt className="text-blue-500 text-sm" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm md:text-base leading-snug">{selectedCert.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Description</p>
                    <div className="p-5 md:p-7 rounded-2xl md:rounded-[24px] bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base italic">
                        {selectedCert.description || "No specific description provided for this award. This certificate validates the expertise and achievements of Zaedar Ghazalba in this professional domain."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 md:mt-12">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-xl text-sm md:text-base"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
