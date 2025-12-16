import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaRocket, FaExternalLinkAlt } from 'react-icons/fa';
import { useProjects } from '../../hooks/useProjects';
import ProjectForm from '../../Components/Dashboard/ProjectForm';

export default function ProjectManagement() {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    setDeleteConfirm(null);
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    if (editingProject) {
      await updateProject(editingProject.id, data);
    } else {
      await addProject(data);
    }

    setIsSubmitting(false);
    setShowModal(false);
    setEditingProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Project Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola online projects dan deployed applications
          </p>
        </div>
        <button onClick={handleAdd} className="framer-btn framer-btn-primary">
          <FaPlus size={16} />
          Tambah Project
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className="framer-card text-center py-20">
          <FaRocket className="mx-auto text-6xl text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Belum ada project
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Mulai tambahkan project pertama Anda
          </p>
          <button onClick={handleAdd} className="framer-btn framer-btn-primary">
            <FaPlus size={16} />
            Tambah Project
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="framer-card"
            >
              {/* Screenshot or Default Icon */}
              <div className="relative overflow-hidden h-48 rounded-t-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                {project.screenshotUrl ? (
                  <img
                    src={project.screenshotUrl}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <FaRocket className="text-5xl mx-auto mb-3 text-gray-900 dark:text-white opacity-90" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Live Application
                    </p>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1.5 bg-white dark:bg-gray-900 text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-800">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-lg border border-gray-200 dark:border-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                    Key Features
                  </p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {project.features?.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-900 dark:bg-white rounded-full flex-shrink-0"></span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {project.features?.length > 3 && (
                      <li className="text-gray-500 dark:text-gray-500">
                        +{project.features.length - 3} more...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Live URL */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
                >
                  <FaExternalLinkAlt size={12} />
                  <span className="truncate">{project.liveUrl}</span>
                </a>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 framer-btn framer-btn-secondary text-sm"
                  >
                    <FaEdit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(project)}
                    className="flex-1 framer-btn bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 text-sm"
                  >
                    <FaTrash size={14} />
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="framer-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingProject ? 'Edit Project' : 'Tambah Project'}
                </h2>
                <button
                  onClick={() => !isSubmitting && setShowModal(false)}
                  disabled={isSubmitting}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <ProjectForm
                onSubmit={handleSubmit}
                onCancel={() => setShowModal(false)}
                initialData={editingProject}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="framer-card w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrash className="text-2xl text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Hapus Project?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Project "<strong>{deleteConfirm.name}</strong>" akan dihapus permanen.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 framer-btn framer-btn-secondary"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm.id)}
                    className="flex-1 framer-btn bg-red-600 hover:bg-red-700 text-white"
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
