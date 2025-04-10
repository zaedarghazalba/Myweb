import '../index.css';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaBug, FaMobileAlt, FaCode, FaPhp, FaLaravel, FaPython, FaJs, FaReact } from 'react-icons/fa';
import { SiKotlin } from 'react-icons/si';
import profileImg from '../Assets/profile.jpg'; // Pastikan path-nya sesuai

export default function About() {
  return (
    <div className="relative bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-6 sm:p-12 flex items-center justify-center overflow-hidden">
      
      {/* Gambar Background Transparan */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src={profileImg}
          alt="Zaedar Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Foto dan Biodata */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        

          {/* Biodata */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Zaedar Ghazalba</h1>
            <p className="text-gray-500 dark:text-gray-400 text-base mb-4">@zaedarghazalba</p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify">
            Saya Zaedar Ghazalba, seorang junior programmer yang antusias dan terus berproses dalam dunia teknologi. Memiliki semangat belajar yang tinggi dan dedikasi dalam mengembangkan kemampuan, saya cukup berpengalaman dalam membangun aplikasi mobile dan web. Selain itu, saya juga memiliki ketertarikan besar dalam bidang pengujian perangkat lunak (QA Testing) karena percaya bahwa kualitas adalah bagian penting dari sebuah produk digital.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
            <a
                href="https://wa.me/6281250371835"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 text-2xl transition-transform hover:scale-110"
            >
                <FaWhatsapp />
            </a>
            <a
                href="https://instagram.com/zeedargh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 text-2xl transition-transform hover:scale-110"
            >
                <FaInstagram />
            </a>
            <a
                href="mailto:zaedaralba11202@gmail.com"
                className="text-blue-500 hover:text-blue-600 text-2xl transition-transform hover:scale-110"
            >
                <FaEnvelope />
            </a>
            <a
                href="https://www.linkedin.com/in/zaedar-ghazalba-908aa3275/" // ganti URL ini jika berbeda
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 text-2xl transition-transform hover:scale-110"
            >
                <FaLinkedin />
            </a>
            </div>
            </div>
        </div>

        {/* Card Keahlian */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Keahlian</h2>

          <div className="space-y-4">
            {/* Role */}
            <div className="flex items-center space-x-3">
              <FaBug className="text-red-500 text-xl" />
              <span className="font-medium">QA Tester</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMobileAlt className="text-green-500 text-xl" />
              <span className="font-medium">Mobile Developer</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaCode className="text-yellow-500 text-xl" />
              <span className="font-medium">Web Developer</span>
            </div>

            <hr className="my-4 border-gray-600" />

            {/* Tools & Languages */}
            <h3 className="text-md font-semibold">Bahasa & Tools:</h3>
            <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-700 dark:text-gray-300">
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
          </div>
        </div>
      </div>
    </div>
  );
}
