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

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all portfolios
  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const portfoliosRef = collection(db, 'portfolios');
      const q = query(portfoliosRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const portfoliosList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPortfolios(portfoliosList);
    } catch (err) {
      console.error('Error fetching portfolios:', err);
      setError(err.message);
      toast.error('Gagal memuat portfolio', {
        duration: 3000,
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new portfolio
  const addPortfolio = async (portfolioData) => {
    try {
      const portfoliosRef = collection(db, 'portfolios');

      const newPortfolio = {
        ...portfolioData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(portfoliosRef, newPortfolio);

      toast.success('Portfolio berhasil ditambahkan!', {
        duration: 2500,
        icon: '✅',
      });

      // Refresh list
      await fetchPortfolios();

      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('Error adding portfolio:', err);
      toast.error('Gagal menambahkan portfolio', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Update portfolio
  const updatePortfolio = async (id, portfolioData) => {
    try {
      const portfolioRef = doc(db, 'portfolios', id);

      const updatedData = {
        ...portfolioData,
        updatedAt: serverTimestamp()
      };

      await updateDoc(portfolioRef, updatedData);

      toast.success('Portfolio berhasil diperbarui!', {
        duration: 2500,
        icon: '✅',
      });

      // Refresh list
      await fetchPortfolios();

      return { success: true };
    } catch (err) {
      console.error('Error updating portfolio:', err);
      toast.error('Gagal memperbarui portfolio', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Delete portfolio
  const deletePortfolio = async (id) => {
    try {
      const portfolioRef = doc(db, 'portfolios', id);
      await deleteDoc(portfolioRef);

      toast.success('Portfolio berhasil dihapus!', {
        duration: 2500,
        icon: '🗑️',
      });

      // Refresh list
      await fetchPortfolios();

      return { success: true };
    } catch (err) {
      console.error('Error deleting portfolio:', err);
      toast.error('Gagal menghapus portfolio', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return {
    portfolios,
    loading,
    error,
    refetch: fetchPortfolios,
    addPortfolio,
    updatePortfolio,
    deletePortfolio
  };
}
