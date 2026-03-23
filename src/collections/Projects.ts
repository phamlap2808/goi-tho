import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'status', 'completedDate'],
    description: 'Quản lý dự án / công trình đã thực hiện',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tên dự án',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Đường dẫn (slug)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả dự án',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Địa điểm',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Hình ảnh dự án',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Chú thích',
        },
      ],
    },
    {
      name: 'googlePhotosUrl',
      type: 'text',
      label: 'Link Google Photos',
      admin: {
        description: 'Đường dẫn album Google Photos (nếu có)',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Loại dịch vụ',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'completedDate',
      type: 'date',
      label: 'Ngày hoàn thành',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Đã xuất bản', value: 'published' },
        { label: 'Bản nháp', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
