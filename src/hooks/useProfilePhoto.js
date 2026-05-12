import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'profile_photo_base64';

export function useProfilePhoto() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchProfilePhoto = useCallback(() => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
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

    const maxSizeMB = 2;
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
      const base64 = await convertToBase64(file);
      localStorage.setItem(STORAGE_KEY, base64);
      setProfilePhoto(base64);

      toast.success('Foto profil berhasil diperbarui!', {
        duration: 2500,
        icon: '✅',
      });

      return { success: true };
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

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}