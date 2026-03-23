// Seed script for GoiTho.com projects (sample construction work)
// Run: npx tsx src/seed/projects.ts

import { getPayload } from 'payload'
import config from '../payload.config'

const projects: Array<{
  title: string; slug: string; description: string;
  location: string; completedDate: string; status: 'published' | 'draft';
}> = [
  {
    title: 'Sửa chữa biệt thự cổ điển — Ba Đình',
    slug: 'biet-thu-co-dien-ba-dinh',
    description: 'Sửa chữa toàn diện biệt thự phong cách Pháp tại quận Ba Đình, Hà Nội. Bao gồm thay hệ thống điện nước, sơn lại toàn bộ và xử lý chống thấm.',
    location: 'Ba Đình, Hà Nội',
    completedDate: '2025-11-15',
    status: 'published',
  },
  {
    title: 'Sửa chữa văn phòng — Trần Thái Tông',
    slug: 'van-phong-tran-thai-tong',
    description: 'Cải tạo nội thất văn phòng 200m² trên đường Trần Thái Tông, Cầu Giấy. Lắp đặt hệ thống điện, đèn LED, sàn gỗ và vách ngăn.',
    location: 'Cầu Giấy, Hà Nội',
    completedDate: '2025-09-20',
    status: 'published',
  },
  {
    title: 'Cải tạo cửa hàng KFC — Thanh Xuân',
    slug: 'cai-tao-kfc-thanh-xuan',
    description: 'Sửa chữa và nâng cấp hệ thống điện, nước, máy lạnh cho cửa hàng KFC tại quận Thanh Xuân.',
    location: 'Thanh Xuân, Hà Nội',
    completedDate: '2025-08-10',
    status: 'published',
  },
  {
    title: 'Chống thấm chung cư — Hoàng Mai',
    slug: 'chong-tham-chung-cu-hoang-mai',
    description: 'Xử lý triệt để thấm dột sân thượng và nhà vệ sinh cho căn hộ chung cư tầng 15. Sử dụng công nghệ Sika.',
    location: 'Hoàng Mai, Hà Nội',
    completedDate: '2025-07-05',
    status: 'published',
  },
  {
    title: 'Sơn lại nhà phố — Quận 7, HCM',
    slug: 'son-lai-nha-pho-quan-7',
    description: 'Sơn toàn bộ nhà phố 3 tầng với sơn Dulux Weathershield. Bao gồm cạo sơn cũ, bả lại bề mặt và sơn 3 lớp theo tiêu chuẩn.',
    location: 'Quận 7, TP.HCM',
    completedDate: '2025-06-18',
    status: 'published',
  },
  {
    title: 'Thay toàn bộ hệ thống nước — Đống Đa',
    slug: 'thay-he-thong-nuoc-dong-da',
    description: 'Thay mới toàn bộ hệ thống ống nước PPR cho nhà 4 tầng. Lắp đặt máy bơm tăng áp và bình nóng lạnh Ariston.',
    location: 'Đống Đa, Hà Nội',
    completedDate: '2025-05-22',
    status: 'published',
  },
]

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  console.log('🌱 Bắt đầu seed dữ liệu công trình...\n')

  for (const project of projects) {
    try {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: project.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({ collection: 'projects', id: existing.docs[0].id, data: project })
        console.log(`  ✏️  Cập nhật: ${project.title}`)
      } else {
        await payload.create({ collection: 'projects', data: project })
        console.log(`  ✅ Tạo mới: ${project.title}`)
      }
    } catch (err: any) {
      console.error(`  ❌ Lỗi ${project.title}:`, err.message)
    }
  }

  console.log(`\n🎉 Hoàn thành! Đã seed ${projects.length} công trình.`)
  process.exit(0)
}

seed()
