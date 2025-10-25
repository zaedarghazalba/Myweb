import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette } from 'react-icons/fa';
import SimpleParticlesBackground from './SimpleParticlesBackground';
import AnimatedBackground from './AnimatedBackground';
import ThreeBackground from './ThreeBackground';

const backgrounds = [
  { id: 'simple', name: 'Particles', component: SimpleParticlesBackground },
  { id: 'animated', name: 'Wave Grid', component: AnimatedBackground },
  { id: 'three', name: 'Spheres', component: ThreeBackground },
  { id: 'none', name: 'None', component: null },
];

export default function BackgroundSelector() {
  const [selectedBg, setSelectedBg] = useState('simple');
  const [isOpen, setIsOpen] = useState(false);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem('bgPreference');
    if (saved) {
      setSelectedBg(saved);
    }
  }, []);

  // Save preference
  const handleSelectBackground = (bgId) => {
    setSelectedBg(bgId);
    localStorage.setItem('bgPreference', bgId);
    setIsOpen(false);
  };

  const SelectedBackgroundComponent = backgrounds.find(
    (bg) => bg.id === selectedBg
  )?.component;

  return (
    <>
      {/* Render selected background with key to force unmount */}
      {SelectedBackgroundComponent && (
        <SelectedBackgroundComponent key={selectedBg} />
      )}

      {/* Floating button to open selector */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Change Background"
      >
        <FaPalette className="text-xl" />
      </motion.button>

      {/* Background selector panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Selector panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-40 right-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 w-64"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Choose Background
              </h3>

              <div className="space-y-2">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => handleSelectBackground(bg.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      selectedBg === bg.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{bg.name}</span>
                      {selectedBg === bg.id && (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Your preference will be saved
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
