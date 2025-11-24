import '../index.css';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import {
  FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub,
  FaBug, FaMobileAlt, FaCode, FaPhp, FaLaravel,
  FaPython, FaJs, FaReact, FaPalette, FaMapMarkerAlt, FaLink, FaUserFriends
} from 'react-icons/fa';
import { SiKotlin, SiCanva, SiOpenai, SiGooglegemini, SiAnthropic } from 'react-icons/si';
import { RiBookOpenLine, RiGitRepositoryLine, RiLayoutMasonryLine, RiBox3Line, RiStarLine } from 'react-icons/ri';
import profileImg from '../Assets/profile.jpg';
import GitHubStats from '../Components/GitHubStats';
import GitHubContributions from '../Components/GitHubContributions';
import GitHubActivity from '../Components/GitHubActivity';
import TechStackInteractive from '../Components/TechStackInteractive';
import GitHubBadges from '../Components/GitHubBadges';
import PinnedRepos from '../Components/PinnedRepos';
import SEO from '../Components/SEO';
import DecryptedText from '../Components/DecryptedText';
import ProfileCard from '../Components/ProfileCard';

export default function About() {
  return (
    <div className="min-h-screen relative text-[#1f2328] dark:text-[#c9d1d9] font-sans">
      <SEO
        title="Zaedar Ghazalba (zaedarghazalba)"
        description="Zaedar Ghazalba - Junior Programmer, Web Developer, Mobile Developer, QA Tester."
        keywords="Zaedar Ghazalba, GitHub Profile, Portfolio, Web Developer"
        type="profile"
      />

      {/* Main Container */}
      <main className="container mx-auto px-4 py-8 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Left Sidebar: Profile Info */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4">
            {/* Profile Card (Avatar Replacement) */}
            <div className="w-full mb-4">
              <ProfileCard
                image={profileImg}
                name="Zaedar Ghazalba"
                username="zaedarghazalba"
                title="QA Tester • Mobile Developer • Web Developer • Graphic Designer"
                bio="Saya Zaedar Ghazalba, seorang junior programmer yang antusias dan terus berproses dalam dunia teknologi. Memiliki semangat belajar yang tinggi dan dedikasi dalam mengembangkan kemampuan, saya cukup berpengalaman dalam membangun aplikasi mobile dan web. Selain itu, saya juga memiliki ketertarikan besar dalam bidang pengujian perangkat lunak (QA Testing) dan design grafis."
              />
            </div>

            {/* Follow Button */}
            <a
              href="mailto:zaedaralba11202@gmail.com"
              className="github-btn w-full justify-center bg-[#f6f8fa] dark:bg-[#21262d] border-[#d0d7de] dark:border-[#30363d] text-[#24292f] dark:text-[#c9d1d9] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] mb-4"
            >
              Contact Me
            </a>

            {/* Followers / Following */}
            <div className="flex items-center justify-center md:justify-start gap-1 text-sm text-[#656d76] dark:text-[#8b949e] mb-4">
              <FaUserFriends className="mr-1" />
              <span className="font-bold text-[#1f2328] dark:text-[#c9d1d9] hover:text-blue-500 cursor-pointer">128</span> followers
              <span className="mx-1">·</span>
              <span className="font-bold text-[#1f2328] dark:text-[#c9d1d9] hover:text-blue-500 cursor-pointer">45</span> following
            </div>

            {/* Details List */}
            <div className="flex flex-col gap-2 text-sm text-[#1f2328] dark:text-[#c9d1d9]">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#656d76] dark:text-[#8b949e] w-4" />
                <span>Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[#656d76] dark:text-[#8b949e] w-4" />
                <a href="mailto:zaedaralba11202@gmail.com" className="hover:text-blue-500 hover:underline truncate">zaedaralba11202@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <FaLink className="text-[#656d76] dark:text-[#8b949e] w-4" />
                <a href="https://zaedarghazalba.github.io" className="hover:text-blue-500 hover:underline truncate">zaedarghazalba.github.io</a>
              </div>
              <div className="flex items-center gap-2">
                <FaGithub className="text-[#656d76] dark:text-[#8b949e] w-4" />
                <a href="https://github.com/zaedarghazalba" className="hover:text-blue-500 hover:underline">@zaedarghazalba</a>
              </div>
              <div className="flex items-center gap-2">
                <FaLinkedin className="text-[#656d76] dark:text-[#8b949e] w-4" />
                <a href="https://linkedin.com/in/zaedar-ghazalba" className="hover:text-blue-500 hover:underline">Zaedar Ghazalba</a>
              </div>
              <div className="flex items-center gap-2">
                <FaInstagram className="text-[#656d76] dark:text-[#8b949e] w-4" />
                <a href="https://instagram.com/zeedargh" className="hover:text-blue-500 hover:underline">@zeedargh</a>
              </div>
            </div>

            <div className="border-t border-[#d0d7de] dark:border-[#30363d] my-4"></div>

            {/* Achievements / Badges (Moved to Sidebar) */}
            <div>
              <h3 className="font-semibold mb-2 text-sm">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                <img src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png" alt="Pull Shark" className="w-16 h-16 rounded-full border border-[#d0d7de] dark:border-[#30363d] p-1" title="Pull Shark" />
                <img src="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png" alt="YOLO" className="w-16 h-16 rounded-full border border-[#d0d7de] dark:border-[#30363d] p-1" title="YOLO" />
              </div>
            </div>
          </div>

          {/* Right Content: Tabs & Main Info */}
          <div className="md:col-span-8 lg:col-span-9">

            {/* GitHub Tabs */}
            <div className="github-tabs overflow-x-auto scrollbar-hide flex mb-6">
              <button className="github-tab-item active">
                <RiBookOpenLine className="text-lg" />
                <span>Overview</span>
              </button>
            </div>
            {/* README Section (Custom Profile Content) */}
            <div className="github-readme">
              <div className="github-readme-header flex justify-between items-center">
                <span>zaedarghazalba / README.md</span>
                <div className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <FaCode />
                </div>
              </div>
              <div className="github-readme-content prose dark:prose-invert max-w-none">

                {/* Header Intro */}
                <div className="text-center mb-8">
                  <DecryptedText
                    text="Hello World, I'm Zaedar Ghazalba"
                    className="text-3xl sm:text-4xl font-bold mb-4 border-b-0"
                  />
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Seorang yang antusias di dunia pemrograman dan senang mempelajari hal baru.
                  </p>
                </div>

                {/* Tech Stack Marquee */}
                <h3 className="text-center font-bold text-xl mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Tech Stack & Tools</h3>
                <div className="mb-8 relative">
                  <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex items-center gap-8 mx-4">
                        <FaPhp className="text-4xl text-[#777BB4]" title="PHP" />
                        <FaLaravel className="text-4xl text-[#FF2D20]" title="Laravel" />
                        <SiKotlin className="text-4xl text-[#7F52FF]" title="Kotlin" />
                        <FaPython className="text-4xl text-[#3776AB]" title="Python" />
                        <FaJs className="text-4xl text-[#F7DF1E]" title="JavaScript" />
                        <FaReact className="text-4xl text-[#61DAFB]" title="React" />
                        <SiCanva className="text-4xl text-[#00C4CC]" title="Canva" />
                        <SiOpenai className="text-4xl text-[#10A37F]" title="OpenAI" />
                        <SiGooglegemini className="text-4xl text-[#8E75B2]" title="Gemini" />
                        <SiAnthropic className="text-4xl text-[#8E75B2]" title="Anthropic" />
                      </div>
                    ))}
                  </Marquee>
                </div>

                {/* Skills Grid */}
                <h3 className="text-center font-bold text-xl mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Specializations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 not-prose">
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-700">
                    <FaBug className="text-red-500 text-2xl mb-2" />
                    <span className="font-semibold text-sm">QA Tester</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-700">
                    <FaMobileAlt className="text-green-500 text-2xl mb-2" />
                    <span className="font-semibold text-sm">Mobile Dev</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-700">
                    <FaCode className="text-yellow-500 text-2xl mb-2" />
                    <span className="font-semibold text-sm">Web Dev</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-700">
                    <FaPalette className="text-purple-500 text-2xl mb-2" />
                    <span className="font-semibold text-sm">Designer</span>
                  </div>
                </div>

                {/* Interactive Tech Stack */}
                <div className="not-prose">
                  <TechStackInteractive />
                </div>

              </div>
            </div>

            {/* Pinned Repositories */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-[16px] font-semibold text-[#1f2328] dark:text-[#c9d1d9]">Pinned</h2>
                <a href="#" className="text-xs text-[#0969da] dark:text-[#58a6ff] hover:underline">Customize your pins</a>
              </div>
              <PinnedRepos />
            </div>

            {/* Contribution Graph */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-[16px] font-semibold text-[#1f2328] dark:text-[#c9d1d9]">1,234 contributions in the last year</h2>
                <a href="#" className="text-xs text-[#0969da] dark:text-[#58a6ff] hover:underline">Contribution settings</a>
              </div>
              <GitHubContributions username="zaedarghazalba" />
            </div>

            {/* Activity Timeline */}
            <div className="mb-8">
              <h2 className="text-[16px] font-semibold text-[#1f2328] dark:text-[#c9d1d9] mb-4">Contribution activity</h2>
              <GitHubActivity />
            </div>

            {/* Stats (Optional placement) */}
            <div className="mb-8">
              <GitHubStats />
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-[#d0d7de] dark:border-[#30363d] text-center text-xs text-[#656d76] dark:text-[#8b949e]">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline">© {new Date().getFullYear()} Zaedar Ghazalba</a>
          <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline">Terms</a>
          <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline">Privacy</a>
          <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline">Security</a>
          <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline">Status</a>
          <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline">Docs</a>
          <a href="#" className="hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}