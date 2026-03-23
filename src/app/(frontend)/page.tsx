import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {
  FiZap,
  FiDroplet,
  FiHome,
  FiTool,
  FiWind,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiThumbsUp,
  FiArrowRight,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi'

// Map icon string to component
const iconMap: Record<string, React.ReactNode> = {
  FiZap: <FiZap />,
  FiDroplet: <FiDroplet />,
  FiHome: <FiHome />,
  FiTool: <FiTool />,
  FiWind: <FiWind />,
  FiShield: <FiShield />,
}

// Map service slug to real photo
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

// Project showcase images
const projectImages = [
  { src: '/access/anh-hung/5.jpg', title: 'Tủ bếp gỗ cao cấp', location: 'Quận 7, TP.HCM' },
  { src: '/access/chi-trang/1.JPG', title: 'Nội thất phòng khách', location: 'Cầu Giấy, Hà Nội' },
  { src: '/access/anh-kien/1.jpg', title: 'Tủ quần áo gỗ', location: 'Quận 2, TP.HCM' },
  { src: '/access/anh-nam/1.JPG', title: 'Xây dựng sân thượng', location: 'Đà Lạt' },
]

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch services from CMS
  let services: any[] = []
  try {
    const result = await payload.find({
      collection: 'services',
      sort: 'order',
      limit: 12,
    })
    services = result.docs
  } catch {
    // fallback if no data yet
  }

  // Fallback services if CMS is empty
  const fallbackServices = [
    { title: 'Sửa Điện', description: 'Sửa chữa hệ thống điện, thay ổ cắm, cầu dao, dây dẫn', icon: 'FiZap', slug: 'sua-dien' },
    { title: 'Sửa Nước', description: 'Sửa ống nước, vòi nước, bồn cầu, bình nóng lạnh', icon: 'FiDroplet', slug: 'sua-nuoc' },
    { title: 'Sơn Nhà', description: 'Sơn mới, sơn sửa, chống thấm tường, trần nhà', icon: 'FiHome', slug: 'son-nha' },
    { title: 'Thợ Mộc', description: 'Đóng tủ, kệ, sửa cửa, làm nội thất theo yêu cầu', icon: 'FiTool', slug: 'tho-moc' },
    { title: 'Sửa Máy Lạnh', description: 'Vệ sinh, bảo trì, sửa chữa điều hòa các loại', icon: 'FiWind', slug: 'may-lanh' },
    { title: 'Chống Thấm', description: 'Xử lý thấm dột trần, tường, sân thượng', icon: 'FiShield', slug: 'chong-tham' },
  ]

  const displayServices = services.length > 0 ? services : fallbackServices

  return (
    <>
      {/* HERO BANNER */}
      <section className="hero-banner">
        <div className="hero-banner-image">
          <Image
            src="/access/Illustrator-18.jpg"
            alt="GoiTho.com - Đội thợ chuyên nghiệp, đối tác INAX, Hafele, LIXIL"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="hero-banner-overlay" />
        </div>
        <div className="container hero-banner-content">
          <div className="hero-badge"><FiStar /> Dịch vụ được tin dùng #1</div>
          <h1>
            Sửa chữa nhà <span>nhanh chóng</span>, uy tín, giá hợp lý
          </h1>
          <p>
            GoiTho.com kết nối bạn với đội thợ lành nghề tại Hà Nội
            và TP. Hồ Chí Minh. Chỉ cần gọi, chúng tôi có mặt.
          </p>
          <div className="hero-actions">
            <Link href="/dat-lich" className="btn btn-primary btn-lg">
              <FiPhone /> Đặt lịch ngay
            </Link>
            <Link href="/dich-vu" className="btn btn-outline btn-lg">
              Xem dịch vụ <FiArrowRight />
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">5,000+</div>
              <div className="hero-stat-label">Công trình hoàn thành</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">98%</div>
              <div className="hero-stat-label">Khách hài lòng</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">24/7</div>
              <div className="hero-stat-label">Hỗ trợ khẩn cấp</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOTLINE BAR */}
      <section className="hotline-bar">
        <div className="container hotline-bar-inner">
          <a href="tel:02473088088" className="hotline-item">
            <FiPhone /> <strong>Hà Nội:</strong> 024 73 088 088
          </a>
          <span className="hotline-divider">|</span>
          <a href="tel:02873078088" className="hotline-item">
            <FiPhone /> <strong>TP.HCM:</strong> 028 73 078 088
          </a>
          <span className="hotline-divider">|</span>
          <span className="hotline-item hotline-web">www.goitho.com</span>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Dịch vụ sửa chữa nhà</h2>
            <p>Từ điện, nước đến sơn nhà, nội thất — chúng tôi phục vụ trọn gói</p>
          </div>
          <div className="services-grid">
            {displayServices.map((service, i) => {
              const imgSrc = serviceImageMap[service.slug]
              return (
                <Link
                  key={i}
                  href={`/dich-vu/${service.slug}`}
                  className="service-card"
                >
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
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY US - with team background */}
      <section className="section why-us-section">
        <div className="why-us-bg">
          <Image
            src="/access/img-1613-2.png"
            alt="Đội thợ GoiTho chuyên nghiệp"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          <div className="why-us-bg-overlay" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ color: 'white' }}>
            <h2 style={{ color: 'white' }}>Tại sao chọn GoiTho?</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)' }}>Cam kết chất lượng với mỗi công trình</p>
          </div>
          <div className="why-grid">
            <div className="why-card why-card-glass">
              <div className="why-icon"><FiCheckCircle /></div>
              <h3>Thợ lành nghề</h3>
              <p>Đội ngũ thợ có kinh nghiệm 5+ năm, được đào tạo chuyên nghiệp</p>
            </div>
            <div className="why-card why-card-glass">
              <div className="why-icon"><FiClock /></div>
              <h3>Phản hồi nhanh</h3>
              <p>Có mặt trong 30 phút cho các khu vực nội thành Hà Nội & TP.HCM</p>
            </div>
            <div className="why-card why-card-glass">
              <div className="why-icon"><FiStar /></div>
              <h3>Bảo hành dịch vụ</h3>
              <p>Cam kết bảo hành từ 3-12 tháng cho mọi dịch vụ sửa chữa</p>
            </div>
            <div className="why-card why-card-glass">
              <div className="why-icon"><FiThumbsUp /></div>
              <h3>Giá minh bạch</h3>
              <p>Báo giá trước khi làm, không phát sinh chi phí ẩn</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SHOWCASE */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Công trình tiêu biểu</h2>
            <p>Một số dự án chúng tôi đã hoàn thành</p>
          </div>
          <div className="projects-grid">
            {projectImages.map((project, i) => (
              <div key={i} className="project-card">
                <div className="project-image">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="project-overlay">
                  <h3>{project.title}</h3>
                  <p><FiMapPin /> {project.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/anh-cong-trinh" className="btn btn-outline-dark">
              Xem tất cả công trình <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Cần sửa chữa? Gọi ngay cho chúng tôi!</h2>
          <p>Đặt lịch online hoặc gọi điện trực tiếp, chúng tôi sẵn sàng hỗ trợ 24/7</p>
          <div className="cta-actions">
            <Link href="/dat-lich" className="btn">
              <FiPhone /> Đặt lịch miễn phí
            </Link>
            <a href="tel:02473088088" className="btn btn-cta-phone">
              <FiPhone /> 024 73 088 088
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

