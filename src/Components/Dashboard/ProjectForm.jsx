import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FileUpload from './FileUpload';

const schema = yup.object({
  name: yup.string().required('Name wajib diisi'),
  description: yup.string().required('Description wajib diisi'),
  technologies: yup.string().required('Technologies wajib diisi'),
  liveUrl: yup.string().url('URL harus valid').required('Live URL wajib diisi'),
  category: yup.string().required('Category wajib diisi'),
  features: yup.string().required('Features wajib diisi'),
  screenshotUrl: yup.string().url('URL harus valid')
}).required();

export default function ProjectForm({ onSubmit, onCancel, initialData = null, isSubmitting = false }) {
  const [screenshotUrl, setScreenshotUrl] = useState(initialData?.screenshotUrl || '');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData ? {
      name: initialData.name,
      description: initialData.description,
      technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : '',
      liveUrl: initialData.liveUrl,
      category: initialData.category,
      features: Array.isArray(initialData.features) ? initialData.features.join(', ') : '',
      screenshotUrl: initialData.screenshotUrl || ''
    } : {}
  });

  useEffect(() => {
    setValue('screenshotUrl', screenshotUrl);
  }, [screenshotUrl, setValue]);

  const handleFormSubmit = (data) => {
    // Convert comma-separated strings to arrays
    const technologiesArray = data.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
    const featuresArray = data.features.split(',').map(feature => feature.trim()).filter(feature => feature);

    const projectData = {
      ...data,
      technologies: technologiesArray,
      features: featuresArray,
      screenshotUrl: screenshotUrl || ''
    };

    onSubmit(projectData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Project Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="Budget Planner"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <input
          {...register('category')}
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="Web Application, Mobile App, etc."
        />
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
          rows="4"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white resize-none"
          placeholder="A comprehensive budget planning application..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Technologies <span className="text-red-500">*</span>
        </label>
        <input
          {...register('technologies')}
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="React, JavaScript, CSS, Vercel (pisahkan dengan koma)"
        />
        {errors.technologies && (
          <p className="mt-1 text-sm text-red-500">{errors.technologies.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Pisahkan setiap teknologi dengan koma (,)
        </p>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Key Features <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('features')}
          rows="3"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white resize-none"
          placeholder="Track income and expenses, Budget planning tools, Financial goal setting (pisahkan dengan koma)"
        />
        {errors.features && (
          <p className="mt-1 text-sm text-red-500">{errors.features.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Pisahkan setiap fitur dengan koma (,)
        </p>
      </div>

      {/* Live URL */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Live URL <span className="text-red-500">*</span>
        </label>
        <input
          {...register('liveUrl')}
          type="url"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="https://example.vercel.app"
        />
        {errors.liveUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.liveUrl.message}</p>
        )}
      </div>

      {/* Screenshot Upload (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Screenshot (Opsional)
        </label>
        <FileUpload
          onUploadComplete={(url) => setScreenshotUrl(url)}
          accept="image/*"
          maxSizeMB={5}
          folder="projects"
          currentFile={screenshotUrl}
        />
        {errors.screenshotUrl && screenshotUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.screenshotUrl.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Jika tidak di-upload, akan menggunakan icon default
        </p>
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
            initialData ? 'Update Project' : 'Tambah Project'
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
