import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export function useProfilePhoto() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchProfilePhoto = useCallback(() => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('profile_photo_url');
      if (stored) {
        setProfilePhoto(stored);
      }
    } catch (err) {
      console.error('Error fetching profile photo:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfilePhoto();
  }, [fetchProfilePhoto]);

  const uploadProfilePhoto = async (file) => {
    if (!file) return { success: false };

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      toast.error('Cloudinary belum dikonfigurasi. Periksa .env.local', {
        duration: 4000,
        icon: '⚙️',
      });
      return { success: false };
    }

    const maxSizeMB = 5;
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`Ukuran file maksimal ${maxSizeMB}MB`, {
        duration: 3000,
        icon: '⚠️',
      });
      return { success: false };
    }

    setUploading(true);
    
    return new Promise((resolve) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'uploads');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          const downloadURL = data.secure_url;

          localStorage.setItem('profile_photo_url', downloadURL);
          setProfilePhoto(downloadURL);

          toast.success('Foto profil berhasil diperbarui!', {
            duration: 2500,
            icon: '✅',
          });

          resolve({ success: true, url: downloadURL });
        } else {
          let errorMsg = 'Upload failed';
          try {
            const errData = JSON.parse(xhr.responseText);
            errorMsg = errData.error?.message || errorMsg;
          } catch (e) {}
          
          console.error('Cloudinary error:', xhr.status, xhr.responseText);
          toast.error('Gagal mengupload foto profil: ' + errorMsg, {
            duration: 3000,
            icon: '❌',
          });
          resolve({ success: false, error: errorMsg });
        }
        setUploading(false);
      });

      xhr.addEventListener('error', () => {
        toast.error('Gagal mengupload foto profil', {
          duration: 3000,
          icon: '❌',
        });
        setUploading(false);
        resolve({ success: false, error: 'Network error' });
      });

      xhr.send(formData);
    });
  };

  return {
    profilePhoto,
    loading,
    uploading,
    uploadProfilePhoto,
    refetch: fetchProfilePhoto
  };
}