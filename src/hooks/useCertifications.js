import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

export function useCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all certifications
  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const certificationsRef = collection(db, 'certifications');
      const q = query(certificationsRef, orderBy('year', 'desc'));
      const snapshot = await getDocs(q);

      const certificationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCertifications(certificationsList);
    } catch (err) {
      console.error('Error fetching certifications:', err);
      setError(err.message);
      toast.error('Gagal memuat certifications', {
        duration: 3000,
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new certification
  const addCertification = async (certificationData) => {
    try {
      const certificationsRef = collection(db, 'certifications');

      const newCertification = {
        ...certificationData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(certificationsRef, newCertification);

      toast.success('Certification berhasil ditambahkan!', {
        duration: 2500,
        icon: '✅',
      });

      // Refresh list
      await fetchCertifications();

      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('Error adding certification:', err);
      toast.error('Gagal menambahkan certification', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Update certification
  const updateCertification = async (id, certificationData) => {
    try {
      const certificationRef = doc(db, 'certifications', id);

      const updatedData = {
        ...certificationData,
        updatedAt: serverTimestamp()
      };

      await updateDoc(certificationRef, updatedData);

      toast.success('Certification berhasil diperbarui!', {
        duration: 2500,
        icon: '✅',
      });

      // Refresh list
      await fetchCertifications();

      return { success: true };
    } catch (err) {
      console.error('Error updating certification:', err);
      toast.error('Gagal memperbarui certification', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Delete certification
  const deleteCertification = async (id) => {
    try {
      const certificationRef = doc(db, 'certifications', id);
      await deleteDoc(certificationRef);

      toast.success('Certification berhasil dihapus!', {
        duration: 2500,
        icon: '🗑️',
      });

      // Refresh list
      await fetchCertifications();

      return { success: true };
    } catch (err) {
      console.error('Error deleting certification:', err);
      toast.error('Gagal menghapus certification', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  return {
    certifications,
    loading,
    error,
    refetch: fetchCertifications,
    addCertification,
    updateCertification,
    deleteCertification
  };
}
