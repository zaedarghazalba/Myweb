import '../index.css';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub,
  FaBug, FaMobileAlt, FaCode, FaPhp, FaLaravel,
  FaPython, FaJs, FaReact
} from 'react-icons/fa';
import { SiKotlin } from 'react-icons/si';
import profileImg from '../Assets/profile.jpg';
import GitHubStats from '../Components/GitHubStats';
import GitHubContributions from '../Components/GitHubContributions';
import GitHubActivity from '../Components/GitHubActivity';
import TechStackInteractive from '../Components/TechStackInteractive';
import GitHubBadges from '../Components/GitHubBadges';
import PinnedRepos from '../Components/PinnedRepos';
import ProfileCard from '../Components/ProfileCard';
export default function About() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 dark:text-white relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">

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

          {/* Profile Card */}
          <ProfileCard
            image={profileImg}
            name="Zaedar Ghazalba"
            username="zaedarghazalba"
            title="QA Tester • Mobile Developer • Web Developer"
            bio="Saya Zaedar Ghazalba, seorang junior programmer yang antusias dan terus berproses dalam dunia teknologi. Memiliki semangat belajar yang tinggi dan dedikasi dalam mengembangkan kemampuan, saya cukup berpengalaman dalam membangun aplikasi mobile dan web. Selain itu, saya juga memiliki ketertarikan besar dalam bidang pengujian perangkat lunak (QA Testing) karena percaya bahwa kualitas adalah bagian penting dari sebuah produk digital."
          />

          {/* Social Media Links */}
          <motion.div
            className="flex justify-center gap-3 sm:gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href="https://github.com/zaedarghazalba"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/zaedar-ghazalba-908aa3275/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-700 hover:bg-blue-600 flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://instagram.com/zeedargh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-pink-600 hover:bg-pink-500 flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://wa.me/6281250371835"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-600 hover:bg-green-500 flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=zaedaralba11202@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
            </motion.a>
          </motion.div>

          {/* Keahlian */}
          <motion.div
            className="w-full bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-center">Keahlian</h2>

            {/* Roles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="flex items-center justify-center space-x-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                <FaBug className="text-red-500 text-lg sm:text-xl flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">QA Tester</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
                <FaMobileAlt className="text-green-500 text-lg sm:text-xl flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">Mobile Developer</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl">
                <FaCode className="text-yellow-500 text-lg sm:text-xl flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">Web Developer</span>
              </div>
            </div>

            <hr className="mb-5 sm:mb-6 border-gray-300 dark:border-gray-600" />

            {/* Bahasa & Tools */}
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-center">Bahasa & Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FaPhp className="text-purple-600 text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm font-medium">PHP</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FaLaravel className="text-red-600 text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm font-medium">Laravel</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <SiKotlin className="text-orange-500 text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm font-medium">Kotlin</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FaPython className="text-blue-400 text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm font-medium">Python</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FaJs className="text-yellow-500 text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm font-medium">JavaScript</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FaReact className="text-cyan-400 text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm font-medium">React JS</span>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Interactive */}
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            <TechStackInteractive />
          </motion.div>

          {/* GitHub Badges/Achievements */}
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
          >
            <GitHubBadges />
          </motion.div>

          {/* Pinned Repositories */}
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
          >
            <PinnedRepos />
          </motion.div>

          {/* GitHub Stats Section */}
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">GitHub Statistics</h2>
            <GitHubStats />
          </motion.div>

          {/* GitHub Contributions Calendar */}
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3 }}
          >
            <GitHubContributions username="zaedarghazalba" />
          </motion.div>

          {/* GitHub Activity Timeline */}
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4 }}
          >
            <GitHubActivity />
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