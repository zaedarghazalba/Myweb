import '../index.css';
import alibabaImg from '../Assets/alibaba.png';
import javascriptImg from '../Assets/javascript.png';
import dataengImg from '../Assets/dataeng.png';

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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8">Sertifikasi</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-48 object-contain p-4 bg-gray-100 dark:bg-gray-700"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-center">{cert.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
