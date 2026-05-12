import { useRef } from 'react';
import { FaCamera, FaUser } from 'react-icons/fa';
import { useProfilePhoto } from '../../hooks/useProfilePhoto';
import toast from 'react-hot-toast';

export default function ProfilePhotoSettings() {
  const { profilePhoto, loading, uploading, uploadProfilePhoto } = useProfilePhoto();
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar', {
        duration: 3000,
        icon: '⚠️',
      });
      return;
    }

    const maxSizeMB = 5;
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`Ukuran file maksimal ${maxSizeMB}MB`, {
        duration: 3000,
        icon: '⚠️',
      });
      return;
    }

    await uploadProfilePhoto(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="framer-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <FaCamera className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Foto Profil
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ubah foto profil yang ditampilkan di halaman About
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          {loading ? (
            <div className="w-32 h-32 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : profilePhoto ? (
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-4 ring-blue-500/20">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <FaUser className="text-4xl text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Format yang didukung: JPG, PNG, WebP (maksimal 5MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mengupload...</span>
              </>
            ) : (
              <>
                <FaCamera size={18} />
                <span>Upload Foto</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}