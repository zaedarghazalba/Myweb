import { useState, useRef } from 'react';
import { FaUpload, FaImage, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function FileUpload({
  onUploadComplete,
  accept = 'image/*',
  maxSizeMB = 5,
  folder = 'uploads',
  currentFile = null
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(currentFile);
  const fileInputRef = useRef(null);

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`File size harus kurang dari ${maxSizeMB}MB`, {
        duration: 3000,
        icon: '⚠️',
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Tipe file harus gambar (PNG, JPG, dll)', {
        duration: 3000,
        icon: '⚠️',
      });
      return;
    }

    // Upload to Cloudinary
    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    if (!cloudName || !uploadPreset) {
      toast.error('Cloudinary belum dikonfigurasi. Periksa .env.local', {
        duration: 4000,
        icon: '⚙️',
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', folder);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setProgress(percentComplete);
        }
      });

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const downloadURL = response.secure_url;

          setPreview(downloadURL);
          setUploading(false);
          setProgress(0);
          toast.success('Gambar berhasil di-upload!', {
            duration: 2500,
            icon: '✅',
          });

          if (onUploadComplete) {
            onUploadComplete(downloadURL, response.public_id);
          }
        } else {
          const errBody = JSON.parse(xhr.responseText);
          throw new Error(errBody?.error?.message || 'Upload failed');
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        toast.error('Upload gagal. Coba lagi.', {
          duration: 3000,
          icon: '❌',
        });
        setUploading(false);
        setProgress(0);
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
      xhr.send(formData);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload gagal. Coba lagi.', {
        duration: 3000,
        icon: '❌',
      });
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onUploadComplete) {
      onUploadComplete(null, null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!preview && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 text-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-50/10 transition-all duration-300 group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <FaUpload className="text-2xl text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>

          {uploading ? (
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Uploading... {progress}%
              </p>
              <div className="w-48 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-base font-bold text-gray-900 dark:text-white mb-1">
                Upload Certificate Image
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, or WEBP (max. {maxSizeMB}MB)
              </p>
            </>
          )}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative framer-card p-4 overflow-hidden group">
          <button
            onClick={handleRemove}
            className="absolute top-4 right-4 z-10 p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <FaTimes size={16} />
          </button>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FaImage className="text-blue-500 flex-shrink-0" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  Certificate image uploaded
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-full">
                {preview.split('/').pop()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
