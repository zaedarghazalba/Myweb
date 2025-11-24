import '../index.css';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import {
  FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub,
  FaBug, FaMobileAlt, FaCode, FaPhp, FaLaravel,
  FaPython, FaJs, FaReact, FaPalette
} from 'react-icons/fa';
import { SiKotlin, SiCanva, SiOpenai, SiGooglegemini, SiAnthropic } from 'react-icons/si';
import profileImg from '../Assets/profile.jpg';
import GitHubStats from '../Components/GitHubStats';
import GitHubContributions from '../Components/GitHubContributions';
import GitHubActivity from '../Components/GitHubActivity';
import TechStackInteractive from '../Components/TechStackInteractive';
import GitHubBadges from '../Components/GitHubBadges';
import PinnedRepos from '../Components/PinnedRepos';
import ProfileCard from '../Components/ProfileCard';
import SEO from '../Components/SEO';
import DecryptedText from '../Components/DecryptedText';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 dark:text-white relative">
      <SEO
        title="About - Zaedar Ghazalba"
        description="Zaedar Ghazalba adalah Junior Programmer yang berfokus pada Web Development, Mobile Development, QA Testing, dan Graphic Design. Berpengalaman dengan React, Laravel, Kotlin, dan Python."
        keywords="Zaedar Ghazalba, About, Junior Programmer Indonesia, Web Developer Indonesia, Mobile Developer, QA Tester, React Developer, Laravel, Kotlin, Python, Portfolio Developer Indonesia"
        type="profile"
      />

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start py-12 px-6">

        {/* H1 Intro */}
        <DecryptedText
          text="Hello World, I'm Zaedar Ghazalba"
          className="text-4xl sm:text-5xl font-bold text-center mb-4"
        />

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
        <div className="w-full max-w-7xl flex flex-col items-center space-y-10">

          {/* Profile Section - Side by Side */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Profile Card - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProfileCard
                image={profileImg}
                name="Zaedar Ghazalba"
                username="zaedarghazalba"
                title="QA Tester • Mobile Developer • Web Developer • Graphic Designer"
                bio="Saya Zaedar Ghazalba, seorang junior programmer yang antusias dan terus berproses dalam dunia teknologi. Memiliki semangat belajar yang tinggi dan dedikasi dalam mengembangkan kemampuan, saya cukup berpengalaman dalam membangun aplikasi mobile dan web. Selain itu, saya juga memiliki ketertarikan besar dalam bidang pengujian perangkat lunak (QA Testing) dan design grafis menggunakan berbagai tools modern karena percaya bahwa kualitas dan estetika adalah bagian penting dari sebuah produk digital."
              />
            </motion.div>

            {/* Biodata Card - Right Side */}
            <motion.div
              className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Biodata</h2>

              {/* Full Name */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Nama Lengkap</h3>
                <p className="text-lg sm:text-xl font-medium">Zaedar Ghazalba</p>
              </div>

              {/* Username */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Username</h3>
                <p className="text-lg sm:text-xl font-medium">@zaedarghazalba</p>
              </div>

              {/* Role */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Role</h3>
                <p className="text-base sm:text-lg">QA Tester • Mobile Developer • Web Developer • Graphic Designer</p>
              </div>

              {/* Social Media */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Sosial Media</h3>
                <div className="space-y-3">
                  <motion.a
                    href="https://github.com/zaedarghazalba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-800 dark:bg-gray-900 flex items-center justify-center text-white">
                      <FaGithub className="text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold">GitHub</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">@zaedarghazalba</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/zaedar-ghazalba-908aa3275/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center text-white">
                      <FaLinkedin className="text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold">LinkedIn</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Zaedar Ghazalba</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://instagram.com/zeedargh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-pink-600 flex items-center justify-center text-white">
                      <FaInstagram className="text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold">Instagram</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">@zeedargh</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://wa.me/6281250371835"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white">
                      <FaWhatsapp className="text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">+62 812-5037-1835</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=zaedaralba11202@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">zaedaralba11202@gmail.com</p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Keahlian */}
          <motion.div
            className="w-full bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-center">Keahlian</h2>

            {/* Roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
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
              <div className="flex items-center justify-center space-x-2 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl">
                <FaPalette className="text-purple-500 text-lg sm:text-xl flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">Graphic Designer</span>
              </div>
            </div>

            <hr className="mb-5 sm:mb-6 border-gray-300 dark:border-gray-600" />

            {/* Bahasa & Tools */}
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-center">Bahasa & Tools</h3>
            <div className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <Marquee
                gradient={false}
                speed={40}
                pauseOnHover={true}
                className="py-2"
              >
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-8 mx-4">
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                        <FaPhp className="text-purple-600 dark:text-purple-400 text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">PHP</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                        <FaLaravel className="text-red-600 dark:text-red-400 text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Laravel</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                        <SiKotlin className="text-orange-500 dark:text-orange-400 text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kotlin</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                        <FaPython className="text-blue-500 dark:text-blue-400 text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Python</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/50 transition-colors">
                        <FaJs className="text-yellow-500 dark:text-yellow-400 text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">JavaScript</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-900/50 transition-colors">
                        <FaReact className="text-cyan-500 dark:text-cyan-400 text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">React JS</span>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>

            <hr className="mb-5 sm:mb-6 border-gray-300 dark:border-gray-600" />

            {/* Design Grafis & AI Tools */}
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-center">Design Grafis & AI Tools</h3>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <Marquee
                gradient={false}
                speed={40}
                direction="right"
                pauseOnHover={true}
                className="py-2"
              >
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center gap-8 mx-4">
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-colors">
                        <SiCanva className="text-[#00C4CC] text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Canva</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                        <SiOpenai className="text-[#10A37F] text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">ChatGPT</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                        <SiGooglegemini className="text-[#8E75B2] text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Gemini</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px] group hover:scale-105">
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-colors">
                        <SiAnthropic className="text-[#D4A373] text-5xl" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Claude</span>
                    </div>
                  </div>
                ))}
              </Marquee>
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