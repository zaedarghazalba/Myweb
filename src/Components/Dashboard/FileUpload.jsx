import { useState, useRef } from 'react';
import { FaUpload, FaImage, FaFilePdf, FaTimes } from 'react-icons/fa';
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
    const acceptTypes = accept.split(',').map(t => t.trim());
    const isValidType = acceptTypes.some(type => {
      if (type === 'image/*') return file.type.startsWith('image/');
      if (type === 'application/pdf') return file.type === 'application/pdf';
      return file.type === type;
    });

    if (!isValidType) {
      toast.error('Tipe file tidak valid', {
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
          toast.success('File berhasil di-upload!', {
            duration: 2500,
            icon: '✅',
          });

          if (onUploadComplete) {
            onUploadComplete(downloadURL, response.public_id);
          }
        } else {
          throw new Error('Upload failed');
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

      // Send request
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/upload`);
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

  const isPDF = preview && (preview.includes('.pdf') || preview.includes('application/pdf'));
  const isImage = preview && !isPDF;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!preview && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />

          <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />

          {uploading ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uploading... {progress}%
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                Klik untuk upload file
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {accept === 'image/*' && `PNG, JPG (max. ${maxSizeMB}MB)`}
                {accept === 'application/pdf' && `PDF (max. ${maxSizeMB}MB)`}
                {accept === 'image/*,application/pdf' && `PNG, JPG, PDF (max. ${maxSizeMB}MB)`}
              </p>
            </>
          )}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative framer-card p-4">
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <FaTimes />
          </button>

          {isImage && (
            <div className="flex items-center gap-4">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <FaImage className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Image uploaded
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-full">
                  {preview}
                </p>
              </div>
            </div>
          )}

          {isPDF && (
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaFilePdf className="text-4xl text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <FaFilePdf className="text-red-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    PDF uploaded
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-full break-all">
                  {preview}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
