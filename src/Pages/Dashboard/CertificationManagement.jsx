import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCertificate, FaFilePdf, FaImage } from 'react-icons/fa';
import { useCertifications } from '../../hooks/useCertifications';
import CertificationForm from '../../Components/Dashboard/CertificationForm';

export default function CertificationManagement() {
  const { certifications, loading, addCertification, updateCertification, deleteCertification } = useCertifications();
  const [showModal, setShowModal] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    setEditingCertification(null);
    setShowModal(true);
  };

  const handleEdit = (certification) => {
    setEditingCertification(certification);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteCertification(id);
    setDeleteConfirm(null);
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    if (editingCertification) {
      await updateCertification(editingCertification.id, data);
    } else {
      await addCertification(data);
    }

    setIsSubmitting(false);
    setShowModal(false);
    setEditingCertification(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Certification Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola sertifikat dan credentials (PDF & Image)
          </p>
        </div>
        <button onClick={handleAdd} className="framer-btn framer-btn-primary">
          <FaPlus size={16} />
          Tambah Certification
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading certifications...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && certifications.length === 0 && (
        <div className="framer-card text-center py-20">
          <FaCertificate className="mx-auto text-6xl text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Belum ada certification
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Mulai tambahkan certification pertama Anda
          </p>
          <button onClick={handleAdd} className="framer-btn framer-btn-primary">
            <FaPlus size={16} />
            Tambah Certification
          </button>
        </div>
      )}

      {/* Certifications Grid */}
      {!loading && certifications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="framer-card group"
            >
              {/* File Preview */}
              <div className="relative overflow-hidden h-48 rounded-t-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                {cert.type === 'pdf' ? (
                  <div className="flex flex-col items-center gap-3">
                    <FaFilePdf className="text-6xl text-red-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">PDF Certificate</span>
                  </div>
                ) : (
                  <img
                    src={cert.fileUrl}
                    alt={cert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Type Badge */}
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-lg mb-2 ${
                  cert.type === 'pdf'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                  {cert.type.toUpperCase()}
                </span>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {cert.name}
                </h3>

                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Issuer:</strong> {cert.issuer}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Year:</strong> {cert.year}
                  </p>
                  {cert.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="flex-1 framer-btn framer-btn-secondary text-sm"
                  >
                    <FaEdit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(cert)}
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
                  {editingCertification ? 'Edit Certification' : 'Tambah Certification'}
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
              <CertificationForm
                onSubmit={handleSubmit}
                onCancel={() => setShowModal(false)}
                initialData={editingCertification}
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
                  Hapus Certification?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Certification "<strong>{deleteConfirm.name}</strong>" akan dihapus permanen.
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
