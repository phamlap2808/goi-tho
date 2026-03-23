import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'status'],
    description: 'Quản lý danh sách dịch vụ sửa chữa',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tên dịch vụ',
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
      label: 'Mô tả ngắn',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Nội dung chi tiết',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon (tên icon)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh đại diện',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Thứ tự hiển thị',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Hoạt động', value: 'active' },
        { label: 'Ẩn', value: 'hidden' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
