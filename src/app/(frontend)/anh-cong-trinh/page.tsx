import Link from 'next/link'
import React from 'react'
import { FiPhone } from 'react-icons/fi'
import ProjectGallery from './ProjectGallery'

export const metadata = {
  title: 'Ảnh Công Trình | GoiTho.com',
  description: 'Xem các công trình sửa chữa, xây dựng tiêu biểu đã được GoiTho.com thực hiện tại Hà Nội & TP.HCM.',
}

export default function ProjectsPage() {
  return (
    <>
      {/* Hero banner */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '60px 0 50px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40,
          width: 150, height: 150, borderRadius: '50%',
          background: 'rgba(255,255,255,0.02)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800, marginBottom: 16,
            background: 'linear-gradient(to right, #fff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Công Trình Tiêu Biểu
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem',
            maxWidth: 600, margin: '0 auto 24px',
            lineHeight: 1.6,
          }}>
            Những dự án sửa chữa, thi công, xây mới đã được GoiTho.com hoàn thành tại Hà Nội & TP.HCM
          </p>
          {/* Stats */}
          <div style={{
            display: 'flex', gap: 40, justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { num: '10+', label: 'Công trình' },
              { num: '200+', label: 'Ảnh thực tế' },
              { num: '2', label: 'Thành phố' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  color: '#ffd700', fontSize: '1.6rem', fontWeight: 800,
                }}>
                  {stat.num}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem',
                  marginTop: 4,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section className="section" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="container">
          <ProjectGallery />
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Bạn muốn sửa chữa nhà?</h2>
          <p>Liên hệ để được tư vấn miễn phí — thợ giỏi, giá hợp lý</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dat-lich" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>
              Đặt lịch sửa chữa
            </Link>
            <a
              href="tel:0788616817"
              className="btn"
              style={{
                background: 'transparent', border: '2px solid white',
                color: 'white', fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              <FiPhone /> Gọi ngay: 0788 616 817
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
