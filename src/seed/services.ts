// Seed script for GoiTho.com services
// Run: npx tsx src/seed/services.ts

import { getPayload } from 'payload'
import config from '../payload.config'

const services: Array<{
  title: string
  slug: string
  icon: string
  order: number
  description: string
  status: 'active' | 'hidden'
}> = [
  {
    title: 'Sửa Điện',
    slug: 'sua-dien',
    icon: 'FiZap',
    order: 1,
    description: 'Sửa chữa hệ thống điện dân dụng, thay ổ cắm, cầu dao, dây dẫn an toàn.',
    status: 'active',
  },
  {
    title: 'Sửa Nước',
    slug: 'sua-nuoc',
    icon: 'FiDroplet',
    order: 2,
    description: 'Sửa ống nước, vòi nước, bồn cầu, bình nóng lạnh, máy bơm nước.',
    status: 'active',
  },
  {
    title: 'Sơn Nhà',
    slug: 'son-nha',
    icon: 'FiHome',
    order: 3,
    description: 'Sơn mới, sơn sửa, chống thấm tường, trần nhà. Dùng sơn cao cấp Dulux, Jotun.',
    status: 'active',
  },
  {
    title: 'Thợ Mộc',
    slug: 'tho-moc',
    icon: 'FiTool',
    order: 4,
    description: 'Đóng tủ, kệ, sửa cửa gỗ, làm nội thất gỗ theo yêu cầu.',
    status: 'active',
  },
  {
    title: 'Sửa Máy Lạnh',
    slug: 'may-lanh',
    icon: 'FiWind',
    order: 5,
    description: 'Vệ sinh, bảo trì, sửa chữa điều hòa tất cả các hãng: Daikin, Panasonic, LG, Samsung.',
    status: 'active',
  },
  {
    title: 'Chống Thấm',
    slug: 'chong-tham',
    icon: 'FiShield',
    order: 6,
    description: 'Xử lý thấm dột trần, tường, sân thượng, nhà vệ sinh triệt để.',
    status: 'active',
  },
  {
    title: 'Sửa Khóa',
    slug: 'sua-khoa',
    icon: 'FiTool',
    order: 7,
    description: 'Mở khóa cửa, thay ổ khóa, lắp khóa vân tay, khóa điện tử an toàn.',
    status: 'active',
  },
  {
    title: 'Lắp Đặt Thiết Bị',
    slug: 'lap-dat-thiet-bi',
    icon: 'FiTool',
    order: 8,
    description: 'Lắp đặt đèn, quạt trần, máy nước nóng, lavabo, bồn tắm, kệ treo tường.',
    status: 'active',
  },
  {
    title: 'Sửa Máy Giặt',
    slug: 'sua-may-giat',
    icon: 'FiTool',
    order: 9,
    description: 'Sửa chữa máy giặt Electrolux, LG, Samsung, Toshiba. Thay linh kiện chính hãng.',
    status: 'active',
  },
  {
    title: 'Sửa Tủ Lạnh',
    slug: 'sua-tu-lanh',
    icon: 'FiTool',
    order: 10,
    description: 'Sửa tủ lạnh không lạnh, xì gas, thay block, board mạch các hãng.',
    status: 'active',
  },
  {
    title: 'Thợ Hàn',
    slug: 'tho-han',
    icon: 'FiTool',
    order: 11,
    description: 'Hàn cửa sắt, lan can, mái tôn, khung sắt, cổng inox theo yêu cầu.',
    status: 'active',
  },
  {
    title: 'Vệ Sinh Nhà',
    slug: 've-sinh-nha',
    icon: 'FiHome',
    order: 12,
    description: 'Vệ sinh nhà sau xây dựng, tổng vệ sinh định kỳ, đánh bóng sàn gạch.',
    status: 'active',
  },
]

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  console.log('🌱 Bắt đầu seed dữ liệu dịch vụ...\n')

  for (const service of services) {
    try {
      // Check if already exists
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: service.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        // Update existing
        await payload.update({
          collection: 'services',
          id: existing.docs[0].id,
          data: service,
        })
        console.log(`  ✏️  Cập nhật: ${service.title}`)
      } else {
        // Create new
        await payload.create({
          collection: 'services',
          data: service,
        })
        console.log(`  ✅ Tạo mới: ${service.title}`)
      }
    } catch (err: any) {
      console.error(`  ❌ Lỗi ${service.title}:`, err.message)
    }
  }

  console.log(`\n🎉 Hoàn thành! Đã seed ${services.length} dịch vụ.`)
  process.exit(0)
}

seed()
