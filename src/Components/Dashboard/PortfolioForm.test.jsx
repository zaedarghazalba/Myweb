import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PortfolioForm from './PortfolioForm';

// Mock FileUpload component
jest.mock('./FileUpload', () => {
  return function MockFileUpload({ onUploadComplete, currentFile }) {
    return (
      <div data-testid="file-upload">
        <button
          onClick={() => onUploadComplete('https://test.com/image.jpg')}
        >
          Upload Image
        </button>
        {currentFile && <div data-testid="current-file">{currentFile}</div>}
      </div>
    );
  };
});

describe('PortfolioForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
  });

  it('renders submit button with correct text for new portfolio', () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByText('Tambah Portfolio')).toBeInTheDocument();
  });

  it('renders submit button with correct text for editing portfolio', () => {
    const initialData = {
      title: 'Existing Portfolio',
      category: 'design-graphics',
      description: 'Test description',
      tags: ['tag1', 'tag2'],
      imageUrl: 'https://test.com/existing.jpg',
    };

    render(
      <PortfolioForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        initialData={initialData}
      />
    );

    expect(screen.getByText('Update Portfolio')).toBeInTheDocument();
  });

  it('populates form fields with initial data', () => {
    const initialData = {
      title: 'Test Title',
      category: 'motion-graphics',
      description: 'Test Description',
      tags: ['tag1', 'tag2'],
      imageUrl: 'https://test.com/image.jpg',
    };

    render(
      <PortfolioForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        initialData={initialData}
      />
    );

    expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('motion-graphics')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('tag1, tag2')).toBeInTheDocument();
    expect(screen.getByTestId('current-file')).toHaveTextContent('https://test.com/image.jpg');
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const submitButton = screen.getByText('Tambah Portfolio');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Title wajib diisi')).toBeInTheDocument();
      expect(screen.getByText('Description wajib diisi')).toBeInTheDocument();
      expect(screen.getByText('Tags wajib diisi')).toBeInTheDocument();
      expect(screen.getByText('Image wajib di-upload')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Fill in form fields
    const titleInput = screen.getByPlaceholderText(/Design Graphics Project/i);
    const descInput = screen.getByPlaceholderText(/Creative graphic design/i);
    const tagsInput = screen.getByPlaceholderText(/Visual Design, Branding/i);

    fireEvent.change(titleInput, { target: { value: 'New Portfolio' } });
    fireEvent.change(descInput, { target: { value: 'New Description' } });
    fireEvent.change(tagsInput, { target: { value: 'tag1, tag2, tag3' } });

    // Simulate image upload
    const uploadButton = screen.getByText('Upload Image');
    fireEvent.click(uploadButton);

    // Submit form
    const submitButton = screen.getByText('Tambah Portfolio');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Portfolio',
        category: 'design-graphics',
        description: 'New Description',
        tags: ['tag1', 'tag2', 'tag3'],
        imageUrl: 'https://test.com/image.jpg',
      });
    });
  });

  it('converts tags string to array correctly', async () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByPlaceholderText(/Design Graphics Project/i);
    const descInput = screen.getByPlaceholderText(/Creative graphic design/i);
    const tagsInput = screen.getByPlaceholderText(/Visual Design, Branding/i);

    fireEvent.change(titleInput, { target: { value: 'Test' } });
    fireEvent.change(descInput, { target: { value: 'Test' } });
    fireEvent.change(tagsInput, { target: { value: 'tag1,  tag2  , tag3' } });

    // Upload image
    fireEvent.click(screen.getByText('Upload Image'));

    // Submit
    fireEvent.click(screen.getByText('Tambah Portfolio'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: ['tag1', 'tag2', 'tag3'],
        })
      );
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByText('Batal');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('disables buttons when isSubmitting is true', () => {
    render(
      <PortfolioForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isSubmitting={true}
      />
    );

    const submitButton = screen.getByRole('button', { name: /Menyimpan/i });
    const cancelButton = screen.getByText('Batal');

    expect(submitButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('shows loading state when submitting', () => {
    render(
      <PortfolioForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isSubmitting={true}
      />
    );

    expect(screen.getByText('Menyimpan...')).toBeInTheDocument();
  });

  it('validates category selection', async () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const categorySelect = document.querySelector('select');

    expect(categorySelect).toHaveValue('design-graphics'); // Default value

    fireEvent.change(categorySelect, { target: { value: 'motion-graphics' } });
    expect(categorySelect).toHaveValue('motion-graphics');

    fireEvent.change(categorySelect, { target: { value: '3d-graphics' } });
    expect(categorySelect).toHaveValue('3d-graphics');
  });

  it('validates URL format for image', async () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByPlaceholderText(/Design Graphics Project/i);
    const descInput = screen.getByPlaceholderText(/Creative graphic design/i);
    const tagsInput = screen.getByPlaceholderText(/Visual Design, Branding/i);

    fireEvent.change(titleInput, { target: { value: 'Test' } });
    fireEvent.change(descInput, { target: { value: 'Test' } });
    fireEvent.change(tagsInput, { target: { value: 'test' } });

    // Don't upload image (invalid state)
    fireEvent.click(screen.getByText('Tambah Portfolio'));

    await waitFor(() => {
      expect(screen.getByText('Image wajib di-upload')).toBeInTheDocument();
    });
  });

  it('filters out empty tags', async () => {
    render(<PortfolioForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByPlaceholderText(/Design Graphics Project/i);
    const descInput = screen.getByPlaceholderText(/Creative graphic design/i);
    const tagsInput = screen.getByPlaceholderText(/Visual Design, Branding/i);

    fireEvent.change(titleInput, { target: { value: 'Test' } });
    fireEvent.change(descInput, { target: { value: 'Test' } });
    fireEvent.change(tagsInput, { target: { value: 'tag1,,tag2,  ,tag3' } });

    fireEvent.click(screen.getByText('Upload Image'));
    fireEvent.click(screen.getByText('Tambah Portfolio'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: ['tag1', 'tag2', 'tag3'],
        })
      );
    });
  });
});
