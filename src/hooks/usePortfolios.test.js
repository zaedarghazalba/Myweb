import { renderHook, waitFor } from '@testing-library/react';
import { usePortfolios } from './usePortfolios';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

// Mock Firebase functions
jest.mock('../config/firebase', () => ({
  db: {},
}));

describe('usePortfolios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPortfolios', () => {
    it('should fetch portfolios successfully', async () => {
      const mockPortfolios = [
        {
          id: '1',
          title: 'Test Portfolio 1',
          category: 'design-graphics',
          description: 'Test description',
          tags: ['tag1', 'tag2'],
          imageUrl: 'https://test.com/image1.jpg',
        },
        {
          id: '2',
          title: 'Test Portfolio 2',
          category: 'motion-graphics',
          description: 'Test description 2',
          tags: ['tag3', 'tag4'],
          imageUrl: 'https://test.com/image2.jpg',
        },
      ];

      const mockDocs = mockPortfolios.map((p) => ({
        id: p.id,
        data: () => ({ ...p }),
      }));

      getDocs.mockResolvedValue({
        docs: mockDocs,
      });

      collection.mockReturnValue('portfolios');
      query.mockReturnValue('query');
      orderBy.mockReturnValue('orderBy');

      const { result } = renderHook(() => usePortfolios());

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.portfolios).toHaveLength(2);
      expect(result.current.portfolios[0].title).toBe('Test Portfolio 1');
      expect(result.current.error).toBe(null);
    });

    it('should handle fetch error', async () => {
      const errorMessage = 'Failed to fetch';
      getDocs.mockRejectedValue(new Error(errorMessage));

      collection.mockReturnValue('portfolios');
      query.mockReturnValue('query');
      orderBy.mockReturnValue('orderBy');

      const { result } = renderHook(() => usePortfolios());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(toast.error).toHaveBeenCalledWith('Gagal memuat portfolio', {
        duration: 3000,
        icon: '❌',
      });
    });
  });

  describe('addPortfolio', () => {
    it('should add portfolio successfully', async () => {
      const mockPortfolioData = {
        title: 'New Portfolio',
        category: 'design-graphics',
        description: 'New description',
        tags: ['new-tag'],
        imageUrl: 'https://test.com/new-image.jpg',
      };

      const mockDocRef = { id: 'new-id' };
      addDoc.mockResolvedValue(mockDocRef);
      collection.mockReturnValue('portfolios');

      // Mock getDocs for refetch
      getDocs.mockResolvedValue({ docs: [] });
      query.mockReturnValue('query');
      orderBy.mockReturnValue('orderBy');

      const { result } = renderHook(() => usePortfolios());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const response = await result.current.addPortfolio(mockPortfolioData);

      expect(response.success).toBe(true);
      expect(response.id).toBe('new-id');
      expect(addDoc).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Portfolio berhasil ditambahkan!', {
        duration: 2500,
        icon: '✅',
      });
    });

    it('should handle add portfolio error', async () => {
      const mockPortfolioData = {
        title: 'New Portfolio',
        category: 'design-graphics',
        description: 'New description',
        tags: ['new-tag'],
        imageUrl: 'https://test.com/new-image.jpg',
      };

      const errorMessage = 'Failed to add';
      addDoc.mockRejectedValue(new Error(errorMessage));
      collection.mockReturnValue('portfolios');
      getDocs.mockResolvedValue({ docs: [] });
      query.mockReturnValue('query');
      orderBy.mockReturnValue('orderBy');

      const { result } = renderHook(() => usePortfolios());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const response = await result.current.addPortfolio(mockPortfolioData);

      expect(response.success).toBe(false);
      expect(response.error).toBe(errorMessage);
      expect(toast.error).toHaveBeenCalledWith('Gagal menambahkan portfolio', {
        duration: 3000,
        icon: '❌',
      });
    });
  });

  describe('updatePortfolio', () => {
    it('should update portfolio successfully', async () => {
      const mockPortfolioData = {
        title: 'Updated Portfolio',
        category: 'motion-graphics',
        description: 'Updated description',
        tags: ['updated-tag'],
        imageUrl: 'https://test.com/updated-image.jpg',
      };

      updateDoc.mockResolvedValue();
      doc.mockReturnValue('doc-ref');
      getDocs.mockResolvedValue({ docs: [] });
      collection.mockReturnValue('portfolios');
      query.mockReturnValue('query');
      orderBy.mockReturnValue('orderBy');

      const { result } = renderHook(() => usePortfolios());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const response = await result.current.updatePortfolio('test-id', mockPortfolioData);

      expect(response.success).toBe(true);
      expect(updateDoc).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Portfolio berhasil diperbarui!', {
        duration: 2500,
        icon: '✅',
      });
    });

    it('should handle update portfolio error', async () => {
      const errorMessage = 'Failed to update';
      updateDoc.mockRejectedValue(new Error(errorMessage));
      doc.mockReturnValue('doc-ref');
      getDocs.mockResolvedValue({ docs: [] });
      collection.mockReturnValue('portfolios');
      query.mockReturnValue('query');
      orderBy.mockReturnValue('orderBy');

      const { result } = renderHook(() => usePortfolios());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const response = await result.current.updatePortfolio('test-id', {});

      expect(response.success).toBe(false);
      expect(response.error).toBe(errorMessage);
      expect(toast.error).toHaveBeenCalledWith('Gagal memperbarui portfolio', {
        duration: 3000,
        icon: '❌',
      });
    });
  });

  describe('deletePortfolio', () => {
    it('should delete portfolio successfully', async () => {
      deleteDoc.mockResolvedValue();
      doc.mockReturnValue('doc-ref');
      getDocs.mockResolvedValue({ docs: [] });
      collection.mockReturnValue('portfolios');
      query.mockReturnValue('query');
      orderBy.mockReturnValue('orderBy');

      const { result } = renderHook(() => usePortfolios());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const response = await result.current.deletePortfolio('test-id');

      expect(response.success).toBe(true);
      expect(deleteDoc).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Portfolio berhasil dihapus!', {
        duration: 2500,
        icon: '🗑️',
      });
    });

    it('should handle delete portfolio error', async () => {
      const errorMessage = 'Failed to delete';
      deleteDoc.mockRejectedValue(new Error(errorMessage));
      doc.mockReturnValue('doc-ref');
      getDocs.mockResolvedValue({ docs: [] });
      collection.mockReturnValue('portfolios');
      query.mockReturnValue('query');
      orderBy.mockReturnValue('orderBy');

      const { result } = renderHook(() => usePortfolios());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const response = await result.current.deletePortfolio('test-id');

      expect(response.success).toBe(false);
      expect(response.error).toBe(errorMessage);
      expect(toast.error).toHaveBeenCalledWith('Gagal menghapus portfolio', {
        duration: 3000,
        icon: '❌',
      });
    });
  });
});
