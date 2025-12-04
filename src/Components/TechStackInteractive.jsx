import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaPhp, FaLaravel, FaPython, FaJs, FaReact,
  FaNodeJs, FaDocker, FaGitAlt, FaDatabase
} from 'react-icons/fa';
import {
  SiKotlin, SiMysql, SiPostgresql, SiMongodb,
  SiTailwindcss, SiExpress, SiPostman
} from 'react-icons/si';

const techStack = [
  {
    category: 'Languages',
    icon: FaJs,
    color: 'from-yellow-400 to-yellow-600',
    skills: [
      { name: 'JavaScript', icon: FaJs, level: 85, color: '#f1e05a' },
      { name: 'Python', icon: FaPython, level: 80, color: '#3572A5' },
      { name: 'PHP', icon: FaPhp, level: 85, color: '#4F5D95' },
      { name: 'Kotlin', icon: SiKotlin, level: 75, color: '#A97BFF' },
    ]
  },
  {
    category: 'Frameworks',
    icon: FaReact,
    color: 'from-blue-400 to-blue-600',
    skills: [
      { name: 'React JS', icon: FaReact, level: 85, color: '#61dafb' },
      { name: 'Laravel', icon: FaLaravel, level: 80, color: '#FF2D20' },
      { name: 'Node.js', icon: FaNodeJs, level: 75, color: '#68A063' },
      { name: 'Express', icon: SiExpress, level: 70, color: '#000000' },
    ]
  },
  {
    category: 'Databases',
    icon: FaDatabase,
    color: 'from-green-400 to-green-600',
    skills: [
      { name: 'MySQL', icon: SiMysql, level: 85, color: '#00758F' },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 70, color: '#336791' },
      { name: 'MongoDB', icon: SiMongodb, level: 65, color: '#47A248' },
    ]
  },
  {
    category: 'Tools & Others',
    icon: FaGitAlt,
    color: 'from-purple-400 to-purple-600',
    skills: [
      { name: 'Git', icon: FaGitAlt, level: 85, color: '#F05032' },
      { name: 'Docker', icon: FaDocker, level: 70, color: '#2496ED' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: '#06B6D4' },
      { name: 'Postman', icon: SiPostman, level: 80, color: '#FF6C37' },
    ]
  }
];

export default function TechStackInteractive() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="w-full">
      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {techStack.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === index;

          return (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(isSelected ? null : index)}
              className={`relative p-4 sm:p-6 rounded-xl overflow-hidden transition-all border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161b22] ${isSelected
                  ? 'ring-2 ring-blue-500'
                  : 'hover:bg-gray-100 dark:hover:bg-[#21262d]'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5`}></div>
              <div className="relative z-10 flex flex-col items-center">
                <Icon className="text-3xl sm:text-4xl mb-2" style={{ color: category.skills[0].color }} />
                <h4 className="text-xs sm:text-sm font-semibold text-center text-[#1f2328] dark:text-[#c9d1d9]">{category.category}</h4>
                <span className="text-[10px] sm:text-xs text-[#656d76] dark:text-[#8b949e] mt-1">
                  {category.skills.length} skills
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Skills Display */}
      {selectedCategory !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 sm:space-y-4"
        >
          <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#1f2328] dark:text-[#c9d1d9]">
            {techStack[selectedCategory].category}
          </h4>

          {techStack[selectedCategory].skills.map((skill, idx) => {
            const SkillIcon = skill.icon;

            return (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <SkillIcon
                      className="text-xl sm:text-2xl flex-shrink-0"
                      style={{ color: skill.color }}
                    />
                    <span className="font-medium text-sm sm:text-base text-[#1f2328] dark:text-[#c9d1d9]">{skill.name}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 ml-2">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.2 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {selectedCategory === null && (
        <p className="text-center text-[#656d76] dark:text-[#8b949e] py-8 border-t border-gray-200 dark:border-gray-700 mt-4">
          Select a category above to view detailed skills
        </p>
      )}
    </div>
  );
}
