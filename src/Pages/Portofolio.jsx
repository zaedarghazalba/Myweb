import '../index.css';
import project1 from '../Assets/antrian-klinik.png';
import project2 from '../Assets/antrian-klinik-mobile.png';

export default function Portfolio() {
  const projects = [
    {
      title: "Aplikasi Antrian Klinik",
      description: "Sistem manajemen antrian berbasis web.",
      image: project1,
      link: "https://github.com/zaedarghazalba/antrian-klinik"
    },
    {
      title: "Aplikasi Antrian Klinik Mobile",
      description: "Sistem manajemen antrian berbasis mobile android.",
      image: project2,
      link: "https://github.com/zaedarghazalba/ar-mobil"
    }
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6">Portofolio</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-sm sm:text-base mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  Lihat Proyek
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
