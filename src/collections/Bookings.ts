import type { CollectionConfig } from 'payload'

const serviceLabels: Record<string, string> = {
  dien: 'Sửa điện', nuoc: 'Sửa nước', son: 'Sơn nhà', xaydung: 'Thợ hồ / Xây dựng',
  moc: 'Thợ mộc', maylanh: 'Sửa máy lạnh', maygiat: 'Sửa máy giặt', tulanh: 'Sửa tủ lạnh',
  chongtham: 'Chống thấm', camera: 'Lắp camera', vesinhml: 'Vệ sinh máy lạnh', khac: 'Dịch vụ khác',
}

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'phone', 'serviceType', 'status', 'createdAt'],
    description: 'Quản lý đơn đặt lịch sửa chữa',
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          const serviceName = serviceLabels[doc.serviceType] || doc.serviceType
          const message = [
            `🔔 ĐƠN ĐẶT LỊCH MỚI`,
            `👤 Khách: ${doc.customerName}`,
            `📞 SĐT: ${doc.phone}`,
            `🔧 Dịch vụ: ${serviceName}`,
            `📍 Địa chỉ: ${doc.address}`,
            doc.problemDescription ? `📝 Mô tả: ${doc.problemDescription}` : '',
            doc.preferredDate ? `📅 Ngày: ${new Date(doc.preferredDate).toLocaleDateString('vi-VN')}` : '',
          ].filter(Boolean).join('\n')

          // Log to console (visible in server logs)
          console.log('\n' + '='.repeat(50))
          console.log(message)
          console.log('='.repeat(50) + '\n')

          // Send email via Resend if API key is configured
          if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your-resend-api-key') {
            try {
              const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  from: 'GoiTho <noreply@goitho.com>',
                  to: process.env.NOTIFICATION_EMAIL || 'contact@goitho.com',
                  subject: `[GoiTho] Đơn mới: ${serviceName} — ${doc.customerName}`,
                  text: message,
                }),
              })
              if (res.ok) {
                console.log('✅ Email thông báo đã gửi thành công')
              } else {
                console.error('❌ Gửi email thất bại:', await res.text())
              }
            } catch (err) {
              console.error('❌ Lỗi gửi email:', err)
            }
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Tên khách hàng',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Số điện thoại',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Địa chỉ',
    },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      label: 'Loại dịch vụ',
      options: [
        { label: 'Sửa điện', value: 'dien' },
        { label: 'Sửa nước', value: 'nuoc' },
        { label: 'Sơn nhà', value: 'son' },
        { label: 'Thợ hồ / Xây dựng', value: 'xaydung' },
        { label: 'Thợ mộc', value: 'moc' },
        { label: 'Sửa máy lạnh / Điều hòa', value: 'maylanh' },
        { label: 'Sửa máy giặt', value: 'maygiat' },
        { label: 'Sửa tủ lạnh', value: 'tulanh' },
        { label: 'Chống thấm', value: 'chongtham' },
        { label: 'Lắp đặt camera', value: 'camera' },
        { label: 'Vệ sinh máy lạnh', value: 'vesinhml' },
        { label: 'Dịch vụ khác', value: 'khac' },
      ],
    },
    {
      name: 'problemDescription',
      type: 'textarea',
      required: true,
      label: 'Mô tả vấn đề',
    },
    {
      name: 'preferredDate',
      type: 'date',
      label: 'Ngày mong muốn',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'preferredTime',
      type: 'select',
      label: 'Khung giờ mong muốn',
      options: [
        { label: 'Sáng (8h - 12h)', value: 'morning' },
        { label: 'Chiều (13h - 17h)', value: 'afternoon' },
        { label: 'Tối (18h - 21h)', value: 'evening' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Trạng thái',
      options: [
        { label: 'Mới', value: 'new' },
        { label: 'Đã liên hệ', value: 'contacted' },
        { label: 'Đã xác nhận', value: 'confirmed' },
        { label: 'Đang xử lý', value: 'in-progress' },
        { label: 'Hoàn thành', value: 'completed' },
        { label: 'Đã hủy', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Ghi chú nội bộ',
      admin: {
        position: 'sidebar',
        description: 'Ghi chú dành cho nhân viên',
      },
    },
  ],
}
