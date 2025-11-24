import '../index.css';
import { motion } from 'framer-motion';
import alibabaImg from '../Assets/alibaba.png';
import javascriptImg from '../Assets/javascript.png';
import dataengImg from '../Assets/dataeng.png';
import SEO from '../Components/SEO';

export default function Certifications() {
  const certs = [
    {
      name: "Alibaba Cloud Certified Developers",
      image: alibabaImg,
    },
    {
      name: "Sertifikasi Kompetensi JavaScript Basic",
      image: javascriptImg,
    },
    {
      name: "Data Engineering Professional Certification",
      image: dataengImg,
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-6 sm:p-12">
      <SEO
        title="Certifications - Zaedar Ghazalba"
        description="Sertifikasi profesional Zaedar Ghazalba termasuk Alibaba Cloud Certified Developers, JavaScript Basic, dan Data Engineering Professional Certification."
        keywords="Certifications Zaedar Ghazalba, Alibaba Cloud Certified, JavaScript Certification, Data Engineering, Professional Certifications Indonesia, IT Certifications"
        type="website"
      />
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-2xl sm:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Sertifikasi
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-48 object-contain p-4 bg-gray-100 dark:bg-gray-700"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-center">{cert.name}</h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full text-center py-2 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 z-50">
        © {new Date().getFullYear()} Zaedar Ghazalba. All rights reserved.
      </footer>
    </div>
  );
}
