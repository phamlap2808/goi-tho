import React from 'react'
import Link from 'next/link'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi'

export const metadata = {
  title: 'Liên Hệ | GoiTho.com',
  description: 'Liên hệ GoiTho.com — dịch vụ sửa chữa nhà uy tín tại Hà Nội & TP.HCM. Gọi ngay 090 123 4567.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ padding: '48px 0' }}>
        <div className="container">
          <div className="hero-content" style={{ maxWidth: 700 }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: 16, fontWeight: 800 }}>
              Liên hệ với chúng tôi
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              Gọi Thợ luôn sẵn sàng hỗ trợ bạn. Liên hệ ngay để được tư vấn miễn phí!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>

            {/* Contact Cards */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 32 }}>Thông tin liên hệ</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Phone */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 24, background: 'var(--bg-alt)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 48, height: 48, background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.2rem', flexShrink: 0 }}>
                    <FiPhone />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 4 }}>Hotline</h3>
                    <a href="tel:0901234567" style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '1.1rem' }}>090 123 4567</a>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: 4 }}>Hà Nội & TP.HCM</p>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 24, background: 'var(--bg-alt)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 48, height: 48, background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.2rem', flexShrink: 0 }}>
                    <FiMail />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 4 }}>Email</h3>
                    <a href="mailto:contact@goitho.com" style={{ color: 'var(--primary)' }}>contact@goitho.com</a>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: 4 }}>Phản hồi trong 30 phút</p>
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 24, background: 'var(--bg-alt)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 48, height: 48, background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.2rem', flexShrink: 0 }}>
                    <FiMapPin />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 4 }}>Địa chỉ</h3>
                    <p style={{ fontSize: '0.95rem' }}>Hà Nội & TP. Hồ Chí Minh</p>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: 4 }}>Phục vụ tận nơi toàn thành phố</p>
                  </div>
                </div>

                {/* Hours */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 24, background: 'var(--bg-alt)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 48, height: 48, background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.2rem', flexShrink: 0 }}>
                    <FiClock />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 4 }}>Giờ làm việc</h3>
                    <p style={{ fontSize: '0.95rem' }}>Thứ 2 — Chủ nhật</p>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: 4 }}>7:00 — 21:00 (cả ngày lễ)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 32 }}>Khu vực phục vụ</h2>
              <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', height: 400 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119059.62951137851!2d105.74466835000002!3d21.022778750000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1709800000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Khu vực phục vụ GoiTho.com — Hà Nội"
                />
              </div>
              <p style={{ textAlign: 'center', marginTop: 16, color: 'var(--text-light)', fontSize: '0.9rem' }}>
                Phục vụ tất cả quận/huyện tại Hà Nội & TP.HCM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Đặt lịch sửa chữa ngay</h2>
          <p>Điền form đặt lịch, chúng tôi sẽ liên hệ lại trong 15 phút</p>
          <Link href="/dat-lich" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>
            <FiSend /> Đặt lịch ngay
          </Link>
        </div>
      </section>
    </>
  )
}
