import '../index.css';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin,
  FaBug, FaMobileAlt, FaCode, FaPhp, FaLaravel,
  FaPython, FaJs, FaReact
} from 'react-icons/fa';
import { SiKotlin } from 'react-icons/si';
import profileImg from '../Assets/profile.jpg';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={profileImg} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start py-12 px-6">

        {/* H1 Intro */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello World, I'm Zaedar Ghazalba
        </motion.h1>

        {/* Deskripsi singkat */}
        <motion.p
          className="text-lg text-center text-gray-700 dark:text-gray-300 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Seorang yang antusias di dunia pemrograman dan senang mempelajari hal baru.
        </motion.p>

        {/* Konten utama */}
        <div className="w-full max-w-4xl flex flex-col items-center space-y-10">

          {/* Nama */}
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Zaedar Ghazalba
          </motion.h1>

          {/* Biodata */}
          <motion.div
            className="text-center max-w-2xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-gray-400 mb-2">@zaedarghazalba</p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Saya Zaedar Ghazalba, seorang junior programmer yang antusias dan terus berproses dalam dunia teknologi. Memiliki semangat belajar yang tinggi dan dedikasi dalam mengembangkan kemampuan, saya cukup berpengalaman dalam membangun aplikasi mobile dan web. Selain itu, saya juga memiliki ketertarikan besar dalam bidang pengujian perangkat lunak (QA Testing) karena percaya bahwa kualitas adalah bagian penting dari sebuah produk digital.
            </p>

            {/* Sosial Media */}
            <div className="mt-4 flex justify-center space-x-6 text-2xl">
              <a href="https://wa.me/6281250371835" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform">
                <FaWhatsapp />
              </a>
              <a href="https://instagram.com/zeedargh" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition-transform">
                <FaInstagram />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=zaedaralba11202@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition-transform">
                <FaEnvelope />
              </a>
              <a href="https://www.linkedin.com/in/zaedar-ghazalba-908aa3275/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:scale-110 transition-transform">
                <FaLinkedin />
              </a>
            </div>
          </motion.div>

          {/* Keahlian */}
          <motion.div
            className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Keahlian</h2>

            {/* Roles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <FaBug className="text-red-500 text-xl" />
                <span>QA Tester</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FaMobileAlt className="text-green-500 text-xl" />
                <span>Mobile Developer</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FaCode className="text-yellow-500 text-xl" />
                <span>Web Developer</span>
              </div>
            </div>

            <hr className="mb-4 border-gray-600" />

            {/* Bahasa & Tools */}
            <h3 className="text-md font-semibold mb-4 text-center">Bahasa & Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center text-sm text-gray-700 dark:text-gray-300">
              <div className="flex flex-col items-center">
                <FaPhp className="text-purple-600 text-xl" />
                <span>PHP</span>
              </div>
              <div className="flex flex-col items-center">
                <FaLaravel className="text-red-600 text-xl" />
                <span>Laravel</span>
              </div>
              <div className="flex flex-col items-center">
                <SiKotlin className="text-orange-500 text-xl" />
                <span>Kotlin</span>
              </div>
              <div className="flex flex-col items-center">
                <FaPython className="text-blue-400 text-xl" />
                <span>Python</span>
              </div>
              <div className="flex flex-col items-center">
                <FaJs className="text-yellow-500 text-xl" />
                <span>JavaScript</span>
              </div>
              <div className="flex flex-col items-center">
                <FaReact className="text-cyan-400 text-xl" />
                <span>React JS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full text-center py-2 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 z-50">
        © {new Date().getFullYear()} Zaedar Ghazalba. All rights reserved.
      </footer>
    </div>
  );
}