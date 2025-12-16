import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FileUpload from './FileUpload';

const schema = yup.object({
  name: yup.string().required('Name wajib diisi'),
  type: yup.string().required('Type wajib dipilih').oneOf(['pdf', 'image']),
  issuer: yup.string().required('Issuer wajib diisi'),
  year: yup.string().required('Year wajib diisi').matches(/^\d{4}$/, 'Year harus 4 digit'),
  description: yup.string(),
  fileUrl: yup.string().url('URL harus valid').required('File wajib di-upload')
}).required();

export default function CertificationForm({ onSubmit, onCancel, initialData = null, isSubmitting = false }) {
  const [fileUrl, setFileUrl] = useState(initialData?.fileUrl || '');
  const [fileType, setFileType] = useState(initialData?.type || 'pdf');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData ? {
      name: initialData.name,
      type: initialData.type,
      issuer: initialData.issuer,
      year: initialData.year,
      description: initialData.description || '',
      fileUrl: initialData.fileUrl
    } : {
      type: 'pdf',
      year: new Date().getFullYear().toString()
    }
  });

  const selectedType = watch('type');

  useEffect(() => {
    setFileType(selectedType);
    // Clear file when type changes
    if (selectedType !== fileType && !initialData) {
      setFileUrl('');
      setValue('fileUrl', '');
    }
  }, [selectedType, fileType, initialData, setValue]);

  useEffect(() => {
    setValue('fileUrl', fileUrl);
  }, [fileUrl, setValue]);

  const handleFormSubmit = (data) => {
    const certificationData = {
      ...data,
      fileUrl: fileUrl
    };

    onSubmit(certificationData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Certification Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="QA Test Technique - Skill Specialization"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          File Type <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register('type')}
              type="radio"
              value="pdf"
              className="w-4 h-4"
            />
            <span className="text-gray-900 dark:text-white">PDF</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register('type')}
              type="radio"
              value="image"
              className="w-4 h-4"
            />
            <span className="text-gray-900 dark:text-white">Image</span>
          </label>
        </div>
        {errors.type && (
          <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Issuer */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Issuer <span className="text-red-500">*</span>
        </label>
        <input
          {...register('issuer')}
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="MySkill, Coursera, Google, dll"
        />
        {errors.issuer && (
          <p className="mt-1 text-sm text-red-500">{errors.issuer.message}</p>
        )}
      </div>

      {/* Year */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Year <span className="text-red-500">*</span>
        </label>
        <input
          {...register('year')}
          type="text"
          maxLength="4"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
          placeholder="2025"
        />
        {errors.year && (
          <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          rows="3"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white resize-none"
          placeholder="Software Quality Assurance - 5 Courses Completed"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          {fileType === 'pdf' ? 'PDF File' : 'Image'} <span className="text-red-500">*</span>
        </label>
        <FileUpload
          onUploadComplete={(url) => setFileUrl(url)}
          accept={fileType === 'pdf' ? 'application/pdf' : 'image/*'}
          maxSizeMB={fileType === 'pdf' ? 10 : 5}
          folder="certifications"
          currentFile={fileUrl}
        />
        {errors.fileUrl && !fileUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.fileUrl.message}</p>
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
            initialData ? 'Update Certification' : 'Tambah Certification'
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
