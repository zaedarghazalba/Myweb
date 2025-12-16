import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FileUpload from './FileUpload';
import { FaTimes } from 'react-icons/fa';

const schema = yup.object({
  title: yup.string().required('Title wajib diisi'),
  category: yup.string().required('Category wajib dipilih').oneOf(['design-graphics', 'motion-graphics', '3d-graphics']),
  description: yup.string().required('Description wajib diisi'),
  tags: yup.string().required('Tags wajib diisi'),
  imageUrl: yup.string().url('URL harus valid').required('Image wajib di-upload')
}).required();

export default function PortfolioForm({ onSubmit, onCancel, initialData = null, isSubmitting = false }) {
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData ? {
      title: initialData.title,
      category: initialData.category,
      description: initialData.description,
      tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags,
      imageUrl: initialData.imageUrl
    } : {
      category: 'design-graphics'
    }
  });

  useEffect(() => {
    setValue('imageUrl', imageUrl);
  }, [imageUrl, setValue]);

  const handleFormSubmit = (data) => {
    // Convert tags string to array
    const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    const portfolioData = {
      ...data,
      tags: tagsArray,
      imageUrl: imageUrl
    };

    onSubmit(portfolioData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register('title')}
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="Design Graphics Project Beauty Theme"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          {...register('category')}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
        >
          <option value="design-graphics">Design Graphics</option>
          <option value="motion-graphics">Motion Graphics</option>
          <option value="3d-graphics">3D Graphics</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('description')}
          rows="3"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white resize-none"
          placeholder="Creative graphic design showcasing visual storytelling"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Tags <span className="text-red-500">*</span>
        </label>
        <input
          {...register('tags')}
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="Visual Design, Branding, Illustration (pisahkan dengan koma)"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Pisahkan dengan koma (,)
        </p>
        {errors.tags && (
          <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Image <span className="text-red-500">*</span>
        </label>
        <FileUpload
          onUploadComplete={(url) => setImageUrl(url)}
          accept="image/*"
          maxSizeMB={5}
          folder="portfolio"
          currentFile={imageUrl}
        />
        {errors.imageUrl && !imageUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.imageUrl.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 framer-btn framer-btn-primary justify-center"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Menyimpan...</span>
            </div>
          ) : (
            initialData ? 'Update Portfolio' : 'Tambah Portfolio'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 framer-btn framer-btn-secondary justify-center"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
