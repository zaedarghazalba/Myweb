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

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const projectsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProjects(projectsList);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
      toast.error('Gagal memuat projects', {
        duration: 3000,
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new project
  const addProject = async (projectData) => {
    try {
      const projectsRef = collection(db, 'projects');

      const newProject = {
        ...projectData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(projectsRef, newProject);

      toast.success('Project berhasil ditambahkan!', {
        duration: 2500,
        icon: '✅',
      });

      // Refresh list
      await fetchProjects();

      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('Error adding project:', err);
      toast.error('Gagal menambahkan project', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Update project
  const updateProject = async (id, projectData) => {
    try {
      const projectRef = doc(db, 'projects', id);

      const updatedData = {
        ...projectData,
        updatedAt: serverTimestamp()
      };

      await updateDoc(projectRef, updatedData);

      toast.success('Project berhasil diperbarui!', {
        duration: 2500,
        icon: '✅',
      });

      // Refresh list
      await fetchProjects();

      return { success: true };
    } catch (err) {
      console.error('Error updating project:', err);
      toast.error('Gagal memperbarui project', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      const projectRef = doc(db, 'projects', id);
      await deleteDoc(projectRef);

      toast.success('Project berhasil dihapus!', {
        duration: 2500,
        icon: '🗑️',
      });

      // Refresh list
      await fetchProjects();

      return { success: true };
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Gagal menghapus project', {
        duration: 3000,
        icon: '❌',
      });
      return { success: false, error: err.message };
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    addProject,
    updateProject,
    deleteProject
  };
}
