import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaImage } from 'react-icons/fa';
import { usePortfolios } from '../../hooks/usePortfolios';
import PortfolioForm from '../../Components/Dashboard/PortfolioForm';

export default function PortfolioManagement() {
  const { portfolios, loading, addPortfolio, updatePortfolio, deletePortfolio } = usePortfolios();
  const [showModal, setShowModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    setEditingPortfolio(null);
    setShowModal(true);
  };

  const handleEdit = (portfolio) => {
    setEditingPortfolio(portfolio);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deletePortfolio(id);
    setDeleteConfirm(null);
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    if (editingPortfolio) {
      await updatePortfolio(editingPortfolio.id, data);
    } else {
      await addPortfolio(data);
    }

    setIsSubmitting(false);
    setShowModal(false);
    setEditingPortfolio(null);
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'design-graphics':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'motion-graphics':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case '3d-graphics':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Portfolio Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola portfolio design graphics, motion graphics, dan 3D graphics
          </p>
        </div>
        <button onClick={handleAdd} className="framer-btn framer-btn-primary">
          <FaPlus size={16} />
          Tambah Portfolio
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading portfolios...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && portfolios.length === 0 && (
        <div className="framer-card text-center py-20">
          <FaImage className="mx-auto text-6xl text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Belum ada portfolio
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Mulai tambahkan portfolio pertama Anda
          </p>
          <button onClick={handleAdd} className="framer-btn framer-btn-primary">
            <FaPlus size={16} />
            Tambah Portfolio
          </button>
        </div>
      )}

      {/* Portfolio Grid */}
      {!loading && portfolios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="framer-card group"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48 rounded-t-xl bg-gray-100 dark:bg-gray-900">
                {portfolio.imageUrl ? (
                  <img
                    src={portfolio.imageUrl}
                    alt={portfolio.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaImage className="text-4xl text-gray-300 dark:text-gray-700" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category Badge */}
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-lg mb-2 ${getCategoryBadgeColor(portfolio.category)}`}>
                  {portfolio.category}
                </span>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {portfolio.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {portfolio.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {portfolio.tags?.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                  {portfolio.tags?.length > 2 && (
                    <span className="px-2 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                      +{portfolio.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(portfolio)}
                    className="flex-1 framer-btn framer-btn-secondary text-sm"
                  >
                    <FaEdit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(portfolio)}
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
                  {editingPortfolio ? 'Edit Portfolio' : 'Tambah Portfolio'}
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
              <PortfolioForm
                onSubmit={handleSubmit}
                onCancel={() => setShowModal(false)}
                initialData={editingPortfolio}
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
                  Hapus Portfolio?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Portfolio "<strong>{deleteConfirm.title}</strong>" akan dihapus permanen.
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
