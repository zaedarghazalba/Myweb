import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from './FileUpload';
import toast from 'react-hot-toast';

describe('FileUpload', () => {
  const mockOnUploadComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.XMLHttpRequest = jest.fn(() => ({
      open: jest.fn(),
      send: jest.fn(),
      upload: {
        addEventListener: jest.fn(),
      },
      addEventListener: jest.fn((event, handler) => {
        if (event === 'load') {
          // Simulate successful upload
          setTimeout(() => {
            global.XMLHttpRequest.mock.instances[0].status = 200;
            global.XMLHttpRequest.mock.instances[0].responseText = JSON.stringify({
              secure_url: 'https://cloudinary.com/test-image.jpg',
              public_id: 'test-public-id',
            });
            handler();
          }, 0);
        }
      }),
    }));
  });

  afterEach(() => {
    delete global.XMLHttpRequest;
  });

  it('renders upload area when no file is uploaded', () => {
    render(<FileUpload onUploadComplete={mockOnUploadComplete} />);

    expect(screen.getByText('Klik untuk upload file')).toBeInTheDocument();
    expect(screen.getByText(/PNG, JPG/i)).toBeInTheDocument();
  });

  it('displays current file preview when currentFile is provided', () => {
    const currentFile = 'https://example.com/image.jpg';
    render(<FileUpload onUploadComplete={mockOnUploadComplete} currentFile={currentFile} />);

    expect(screen.getByAltText('Preview')).toHaveAttribute('src', currentFile);
    expect(screen.getByText('Image uploaded')).toBeInTheDocument();
  });

  it('shows error toast when file size exceeds limit', () => {
    render(<FileUpload onUploadComplete={mockOnUploadComplete} maxSizeMB={1} />);

    const file = new File(['a'.repeat(2 * 1024 * 1024)], 'large-file.jpg', {
      type: 'image/jpeg',
    });

    const input = document.querySelector('input[type="file"]');
    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(input);

    expect(toast.error).toHaveBeenCalledWith('File size harus kurang dari 1MB', {
      duration: 3000,
      icon: '⚠️',
    });
  });

  it('shows error toast when file type is invalid', () => {
    render(<FileUpload onUploadComplete={mockOnUploadComplete} accept="image/*" />);

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    const input = document.querySelector('input[type="file"]');
    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(input);

    expect(toast.error).toHaveBeenCalledWith('Tipe file tidak valid', {
      duration: 3000,
      icon: '⚠️',
    });
  });

  it('shows error when Cloudinary is not configured', async () => {
    delete process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    delete process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    render(<FileUpload onUploadComplete={mockOnUploadComplete} />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    const input = document.querySelector('input[type="file"]');
    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Cloudinary belum dikonfigurasi. Periksa .env.local',
        {
          duration: 4000,
          icon: '⚙️',
        }
      );
    });

    // Restore env vars
    process.env.REACT_APP_CLOUDINARY_CLOUD_NAME = 'test-cloud';
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET = 'test-preset';
  });

  it('handles file removal', () => {
    const currentFile = 'https://example.com/image.jpg';
    render(<FileUpload onUploadComplete={mockOnUploadComplete} currentFile={currentFile} />);

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(mockOnUploadComplete).toHaveBeenCalledWith(null, null);
  });

  it('displays PDF preview correctly', () => {
    const pdfUrl = 'https://example.com/document.pdf';
    render(<FileUpload onUploadComplete={mockOnUploadComplete} currentFile={pdfUrl} accept="application/pdf" />);

    expect(screen.getByText('PDF uploaded')).toBeInTheDocument();
  });

  it('accepts image and PDF files when accept is set to both', () => {
    render(<FileUpload onUploadComplete={mockOnUploadComplete} accept="image/*,application/pdf" />);

    expect(screen.getByText(/PNG, JPG, PDF/i)).toBeInTheDocument();
  });

  it('validates file type correctly for images', () => {
    render(<FileUpload onUploadComplete={mockOnUploadComplete} accept="image/*" />);

    const validFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('textbox', { hidden: true });

    Object.defineProperty(input, 'files', {
      value: [validFile],
      writable: false,
    });

    fireEvent.change(input);

    // Should not show invalid type error
    expect(toast.error).not.toHaveBeenCalledWith('Tipe file tidak valid', expect.any(Object));
  });

  it('shows upload progress during upload', async () => {
    const mockXHR = {
      open: jest.fn(),
      send: jest.fn(),
      status: 200,
      responseText: JSON.stringify({
        secure_url: 'https://cloudinary.com/test.jpg',
        public_id: 'test-id',
      }),
      upload: {
        addEventListener: jest.fn((event, handler) => {
          if (event === 'progress') {
            handler({ lengthComputable: true, loaded: 50, total: 100 });
          }
        }),
      },
      addEventListener: jest.fn((event, handler) => {
        if (event === 'load') {
          setTimeout(() => handler(), 10);
        }
      }),
    };

    global.XMLHttpRequest = jest.fn(() => mockXHR);

    render(<FileUpload onUploadComplete={mockOnUploadComplete} />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('textbox', { hidden: true });

    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(input);

    // Check that upload was initiated
    expect(mockXHR.open).toHaveBeenCalled();
    expect(mockXHR.send).toHaveBeenCalled();
  });
});
