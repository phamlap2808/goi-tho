import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/">
              <Image
                src="/access/Logo app-02.png"
                alt="GoiTho.com"
                width={50}
                height={50}
                style={{ objectFit: 'contain', borderRadius: '10px' }}
              />
            </Link>
            <p>
              Dịch vụ sửa chữa nhà uy tín tại Hà Nội và TP. Hồ Chí Minh.
              Đội ngũ thợ lành nghề, giá cả hợp lý, phục vụ tận tâm.
            </p>
          </div>

          <div className="footer-col">
            <h4>Dịch vụ</h4>
            <Link href="/dich-vu/sua-dien">Sửa điện</Link>
            <Link href="/dich-vu/sua-nuoc">Sửa nước</Link>
            <Link href="/dich-vu/son-nha">Sơn nhà</Link>
            <Link href="/dich-vu/tho-moc">Thợ mộc</Link>
            <Link href="/dich-vu/may-lanh">Sửa máy lạnh</Link>
            <Link href="/dich-vu/chong-tham">Chống thấm</Link>
          </div>

          <div className="footer-col">
            <h4>Liên kết</h4>
            <Link href="/gioi-thieu">Giới thiệu</Link>
            <Link href="/blog">Blog & Mẹo hay</Link>
            <Link href="/anh-cong-trinh">Ảnh công trình</Link>
            <Link href="/dat-lich">Đặt lịch</Link>
            <Link href="/lien-he">Liên hệ</Link>
          </div>

          <div className="footer-col">
            <h4>Liên hệ</h4>
            <div className="footer-contact-item">
              <FiPhone /> <strong>HN:</strong> 024 73 088 088
            </div>
            <div className="footer-contact-item">
              <FiPhone /> <strong>HCM:</strong> 028 73 078 088
            </div>
            <div className="footer-contact-item">
              <FiMail /> lienhe@goitho.com
            </div>
            <div className="footer-contact-item">
              <FiMapPin /> Hà Nội & TP. HCM
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {year} GoiTho.com — Dịch vụ sửa chữa nhà uy tín | www.goitho.com
        </div>
      </div>
    </footer>
  )
}
