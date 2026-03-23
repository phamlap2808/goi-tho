import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { FiZap, FiDroplet, FiHome, FiTool, FiWind, FiShield, FiArrowRight } from 'react-icons/fi'

const iconMap: Record<string, React.ReactNode> = {
  FiZap: <FiZap />,
  FiDroplet: <FiDroplet />,
  FiHome: <FiHome />,
  FiTool: <FiTool />,
  FiWind: <FiWind />,
  FiShield: <FiShield />,
}

// Map service slug to real photo (same as homepage)
const serviceImageMap: Record<string, string> = {
  'son-nha': '/access/anh-tri/5.jpg',
  'tho-moc': '/access/anh-thai/4.jpg',
  'noi-that': '/access/chi-thanh/1.jpg',
  'sua-dien': '/access/anh-thai/1.jpg',
  'sua-nuoc': '/access/nha-hang-sen/1.jpg',
  'cua-nhom-kinh': '/access/anh-hung/3.jpg',
  'chong-tham': '/access/anh-tri/1.jpg',
  'tho-ho': '/access/kfc-ha-noi/1.jpg',
  'may-lanh': '/access/anh-hung/1.jpg',
  'sua-may-giat': '/access/lixil/1.JPG',
  'sua-tu-lanh': '/access/nha-hang-sen/7.jpg',
  'tho-han': '/access/anh-hung-phu-nhuan/1.JPG',
  've-sinh-nha': '/access/anh-tri/8.jpg',
  'sua-khoa': '/access/anh-hung-phu-nhuan/3.JPG',
  'lap-dat-thiet-bi': '/access/lixil/3.JPG',
}

export const metadata = {
  title: 'Dịch Vụ Sửa Chữa Nhà | GoiTho.com',
  description: 'Danh sách đầy đủ dịch vụ sửa chữa nhà tại GoiTho.com: sửa điện, nước, sơn nhà, thợ mộc, máy lạnh, chống thấm và nhiều hơn nữa.',
}

export default async function ServicesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let services: any[] = []
  try {
    const result = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
    services = result.docs
  } catch { /* empty */ }

  const fallbackServices = [
    { title: 'Sửa Điện', description: 'Sửa chữa hệ thống điện, thay ổ cắm, cầu dao, dây dẫn an toàn', icon: 'FiZap', slug: 'sua-dien' },
    { title: 'Sửa Nước', description: 'Sửa ống nước, vòi nước, bồn cầu, bình nóng lạnh', icon: 'FiDroplet', slug: 'sua-nuoc' },
    { title: 'Sơn Nhà', description: 'Sơn mới, sơn sửa, chống thấm tường, trần nhà chuyên nghiệp', icon: 'FiHome', slug: 'son-nha' },
    { title: 'Thợ Mộc', description: 'Đóng tủ, kệ, sửa cửa gỗ, làm nội thất theo yêu cầu', icon: 'FiTool', slug: 'tho-moc' },
    { title: 'Sửa Máy Lạnh', description: 'Vệ sinh, bảo trì, sửa chữa điều hòa tất cả các hãng', icon: 'FiWind', slug: 'may-lanh' },
    { title: 'Chống Thấm', description: 'Xử lý thấm dột trần, tường, sân thượng triệt để', icon: 'FiShield', slug: 'chong-tham' },
  ]

  const displayServices = services.length > 0 ? services : fallbackServices

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Tất cả dịch vụ sửa chữa</h2>
            <p>Chọn dịch vụ bạn cần, chúng tôi sẽ liên hệ ngay</p>
          </div>
          <div className="services-grid">
            {displayServices.map((service, i) => {
              const imgSrc = serviceImageMap[service.slug]
              return (
                <Link key={i} href={`/dich-vu/${service.slug}`} className="service-card">
                  {imgSrc ? (
                    <div className="service-image">
                      <Image
                        src={imgSrc}
                        alt={service.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  ) : (
                    <div className="service-icon">
                      {iconMap[service.icon] || <FiTool />}
                    </div>
                  )}
                  <div className="service-info">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12 }}>
                      Xem chi tiết <FiArrowRight />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

