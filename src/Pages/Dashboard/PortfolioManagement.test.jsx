import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PortfolioManagement from './PortfolioManagement';
import { usePortfolios } from '../../hooks/usePortfolios';

// Mock the usePortfolios hook
jest.mock('../../hooks/usePortfolios');

// Mock PortfolioForm component
jest.mock('../../Components/Dashboard/PortfolioForm', () => {
  return function MockPortfolioForm({ onSubmit, onCancel, initialData, isSubmitting }) {
    return (
      <div data-testid="portfolio-form">
        <button onClick={() => onSubmit({ title: 'Test', category: 'design-graphics', description: 'Test', tags: ['test'], imageUrl: 'test.jpg' })}>
          Submit Form
        </button>
        <button onClick={onCancel}>Cancel Form</button>
        {initialData && <div data-testid="initial-data">{initialData.title}</div>}
        {isSubmitting && <div data-testid="submitting">Submitting...</div>}
      </div>
    );
  };
});

describe('PortfolioManagement', () => {
  const mockAddPortfolio = jest.fn();
  const mockUpdatePortfolio = jest.fn();
  const mockDeletePortfolio = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    usePortfolios.mockReturnValue({
      portfolios: [],
      loading: true,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    expect(screen.getByText('Loading portfolios...')).toBeInTheDocument();
  });

  it('renders empty state when no portfolios', () => {
    usePortfolios.mockReturnValue({
      portfolios: [],
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    expect(screen.getByText('Belum ada portfolio')).toBeInTheDocument();
    expect(screen.getByText('Mulai tambahkan portfolio pertama Anda')).toBeInTheDocument();
  });

  it('renders portfolio grid with portfolios', () => {
    const mockPortfolios = [
      {
        id: '1',
        title: 'Portfolio 1',
        category: 'design-graphics',
        description: 'Description 1',
        tags: ['tag1', 'tag2'],
        imageUrl: 'https://test.com/image1.jpg',
      },
      {
        id: '2',
        title: 'Portfolio 2',
        category: 'motion-graphics',
        description: 'Description 2',
        tags: ['tag3', 'tag4'],
        imageUrl: 'https://test.com/image2.jpg',
      },
    ];

    usePortfolios.mockReturnValue({
      portfolios: mockPortfolios,
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    expect(screen.getByText('Portfolio 1')).toBeInTheDocument();
    expect(screen.getByText('Portfolio 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('opens add modal when "Tambah Portfolio" button is clicked', () => {
    usePortfolios.mockReturnValue({
      portfolios: [],
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    const addButtons = screen.getAllByText('Tambah Portfolio');
    const addButton = addButtons.find(btn => btn.tagName === 'BUTTON');
    fireEvent.click(addButton);

    expect(screen.getByTestId('portfolio-form')).toBeInTheDocument();
  });

  it('opens edit modal when Edit button is clicked', () => {
    const mockPortfolios = [
      {
        id: '1',
        title: 'Portfolio 1',
        category: 'design-graphics',
        description: 'Description 1',
        tags: ['tag1'],
        imageUrl: 'https://test.com/image1.jpg',
      },
    ];

    usePortfolios.mockReturnValue({
      portfolios: mockPortfolios,
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(screen.getByTestId('portfolio-form')).toBeInTheDocument();
    expect(screen.getByText('Edit Portfolio')).toBeInTheDocument();
    expect(screen.getByTestId('initial-data')).toHaveTextContent('Portfolio 1');
  });

  it('opens delete confirmation modal when Hapus button is clicked', () => {
    const mockPortfolios = [
      {
        id: '1',
        title: 'Portfolio 1',
        category: 'design-graphics',
        description: 'Description 1',
        tags: ['tag1'],
        imageUrl: 'https://test.com/image1.jpg',
      },
    ];

    usePortfolios.mockReturnValue({
      portfolios: mockPortfolios,
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    const deleteButton = screen.getByText('Hapus');
    fireEvent.click(deleteButton);

    expect(screen.getByText('Hapus Portfolio?')).toBeInTheDocument();
    expect(screen.getByText(/Portfolio 1.*akan dihapus permanen/i)).toBeInTheDocument();
  });

  it('calls addPortfolio when submitting new portfolio', async () => {
    usePortfolios.mockReturnValue({
      portfolios: [],
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    // Open add modal
    const addButtons = screen.getAllByText('Tambah Portfolio');
    const addButton = addButtons.find(btn => btn.tagName === 'BUTTON');
    fireEvent.click(addButton);

    // Submit form
    const submitButton = screen.getByText('Submit Form');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddPortfolio).toHaveBeenCalledWith({
        title: 'Test',
        category: 'design-graphics',
        description: 'Test',
        tags: ['test'],
        imageUrl: 'test.jpg',
      });
    });
  });

  it('calls updatePortfolio when submitting edited portfolio', async () => {
    const mockPortfolios = [
      {
        id: '1',
        title: 'Portfolio 1',
        category: 'design-graphics',
        description: 'Description 1',
        tags: ['tag1'],
        imageUrl: 'https://test.com/image1.jpg',
      },
    ];

    usePortfolios.mockReturnValue({
      portfolios: mockPortfolios,
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    // Open edit modal
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    // Submit form
    const submitButton = screen.getByText('Submit Form');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdatePortfolio).toHaveBeenCalledWith('1', {
        title: 'Test',
        category: 'design-graphics',
        description: 'Test',
        tags: ['test'],
        imageUrl: 'test.jpg',
      });
    });
  });

  it('calls deletePortfolio when confirming deletion', async () => {
    const mockPortfolios = [
      {
        id: '1',
        title: 'Portfolio 1',
        category: 'design-graphics',
        description: 'Description 1',
        tags: ['tag1'],
        imageUrl: 'https://test.com/image1.jpg',
      },
    ];

    usePortfolios.mockReturnValue({
      portfolios: mockPortfolios,
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    // Open delete confirmation
    const deleteButton = screen.getByText('Hapus');
    fireEvent.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByText('Ya, Hapus');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeletePortfolio).toHaveBeenCalledWith('1');
    });
  });

  it('closes modal when cancel button is clicked', () => {
    usePortfolios.mockReturnValue({
      portfolios: [],
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    // Open add modal
    const addButtons = screen.getAllByText('Tambah Portfolio');
    const addButton = addButtons.find(btn => btn.tagName === 'BUTTON');
    fireEvent.click(addButton);

    expect(screen.getByTestId('portfolio-form')).toBeInTheDocument();

    // Click cancel
    const cancelButton = screen.getByText('Cancel Form');
    fireEvent.click(cancelButton);

    // Modal should be closed
    expect(screen.queryByTestId('portfolio-form')).not.toBeInTheDocument();
  });

  it('displays category badge with correct color', () => {
    const mockPortfolios = [
      {
        id: '1',
        title: 'Design Portfolio',
        category: 'design-graphics',
        description: 'Test',
        tags: ['tag1'],
        imageUrl: 'test.jpg',
      },
      {
        id: '2',
        title: 'Motion Portfolio',
        category: 'motion-graphics',
        description: 'Test',
        tags: ['tag2'],
        imageUrl: 'test2.jpg',
      },
      {
        id: '3',
        title: '3D Portfolio',
        category: '3d-graphics',
        description: 'Test',
        tags: ['tag3'],
        imageUrl: 'test3.jpg',
      },
    ];

    usePortfolios.mockReturnValue({
      portfolios: mockPortfolios,
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    expect(screen.getByText('design-graphics')).toBeInTheDocument();
    expect(screen.getByText('motion-graphics')).toBeInTheDocument();
    expect(screen.getByText('3d-graphics')).toBeInTheDocument();
  });

  it('displays limited tags with +N indicator', () => {
    const mockPortfolios = [
      {
        id: '1',
        title: 'Portfolio',
        category: 'design-graphics',
        description: 'Test',
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
        imageUrl: 'test.jpg',
      },
    ];

    usePortfolios.mockReturnValue({
      portfolios: mockPortfolios,
      loading: false,
      addPortfolio: mockAddPortfolio,
      updatePortfolio: mockUpdatePortfolio,
      deletePortfolio: mockDeletePortfolio,
    });

    render(<PortfolioManagement />);

    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('+3')).toBeInTheDocument();
  });
});
