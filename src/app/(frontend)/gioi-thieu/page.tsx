import React from 'react'
import Link from 'next/link'
import { FiCheckCircle, FiUsers, FiAward, FiMapPin, FiPhone, FiArrowRight } from 'react-icons/fi'

export const metadata = {
  title: 'Giới Thiệu | GoiTho.com',
  description: 'Tìm hiểu về GoiTho.com — dịch vụ sửa chữa nhà uy tín hàng đầu tại Hà Nội và TP.HCM. Đội ngũ thợ lành nghề, tận tâm, giá hợp lý.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ padding: '64px 0' }}>
        <div className="container">
          <div className="hero-content">
            <h1>Về <span>GoiTho.com</span></h1>
            <p>
              GoiTho.com ra đời từ nhu cầu thực tế: bạn cần sửa nhà, nhưng không biết
              gọi ai cho tin cậy. Chúng tôi kết nối bạn với những người thợ giỏi nhất,
              minh bạch về giá cả, và cam kết chất lượng.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 20 }}>Câu chuyện của chúng tôi</h2>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 16 }}>
            Xuất phát từ một đội thợ nhỏ tại Hà Nội, GoiTho.com đã không ngừng phát triển
            để trở thành nền tảng kết nối dịch vụ sửa chữa nhà uy tín. Chúng tôi hiểu rằng
            ngôi nhà là tổ ấm, và mỗi sự cố — dù nhỏ — đều cần được giải quyết nhanh chóng,
            chuyên nghiệp.
          </p>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 16 }}>
            Với hơn 5,000 công trình đã hoàn thành và tỷ lệ khách hàng hài lòng lên đến 98%,
            chúng tôi tự hào là đơn vị được hàng nghìn gia đình tin tưởng lựa chọn.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Giá trị cốt lõi</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon"><FiCheckCircle /></div>
              <h3>Chất lượng</h3>
              <p>Cam kết hoàn thành đúng tiến độ, đúng chất lượng, bảo hành dài hạn</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><FiUsers /></div>
              <h3>Tận tâm</h3>
              <p>Đội ngũ lắng nghe, tư vấn miễn phí và hỗ trợ sau dịch vụ</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><FiAward /></div>
              <h3>Uy tín</h3>
              <p>Minh bạch giá cả, không phát sinh chi phí ẩn, báo giá trước khi làm</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><FiMapPin /></div>
              <h3>Phủ rộng</h3>
              <p>Phục vụ tại Hà Nội và TP. Hồ Chí Minh, mở rộng liên tục</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Cần sửa chữa? Hãy để chúng tôi giúp bạn!</h2>
          <p>Đặt lịch ngay hoặc gọi điện, chúng tôi luôn sẵn sàng</p>
          <Link href="/dat-lich" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>
            <FiPhone /> Đặt lịch miễn phí
          </Link>
        </div>
      </section>
    </>
  )
}
