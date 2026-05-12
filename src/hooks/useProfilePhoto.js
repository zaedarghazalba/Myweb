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
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'uploads');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const downloadURL = data.secure_url;

      localStorage.setItem('profile_photo_url', downloadURL);
      setProfilePhoto(downloadURL);

      toast.success('Foto profil berhasil diperbarui!', {
        duration: 2500,
        icon: '✅',
      });

      return { success: true, url: downloadURL };
    } catch (err) {
      console.error('Error uploading profile photo:', err);
      toast.error('Gagal mengupload foto profil', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    } finally {
      setUploading(false);
    }
  };

  return {
    profilePhoto,
    loading,
    uploading,
    uploadProfilePhoto,
    refetch: fetchProfilePhoto
  };
}