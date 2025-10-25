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
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-center">Tech Stack & Skills</h3>

      {/* Category Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {techStack.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === index;

          return (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(isSelected ? null : index)}
              className={`relative p-6 rounded-lg overflow-hidden transition-all ${
                isSelected
                  ? 'ring-4 ring-blue-500 shadow-xl'
                  : 'hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`}></div>
              <div className="relative z-10 flex flex-col items-center">
                <Icon className="text-4xl mb-2" style={{ color: category.skills[0].color }} />
                <h4 className="text-sm font-semibold text-center">{category.category}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
          className="space-y-4"
        >
          <h4 className="text-xl font-semibold mb-4">
            {techStack[selectedCategory].category}
          </h4>

          {techStack[selectedCategory].skills.map((skill, idx) => {
            const SkillIcon = skill.icon;
            const isHovered = hoveredSkill === `${selectedCategory}-${idx}`;

            return (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredSkill(`${selectedCategory}-${idx}`)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <SkillIcon
                      className="text-2xl"
                      style={{ color: skill.color }}
                    />
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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

                {/* Hover tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-lg"
                  >
                    Proficiency: {skill.level}%
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {selectedCategory === null && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          Click on a category to view skills
        </p>
      )}
    </motion.div>
  );
}
