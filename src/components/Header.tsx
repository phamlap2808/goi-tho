import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiPhone, FiMenu } from 'react-icons/fi'

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <Image
            src="/access/Logo app-02.png"
            alt="GoiTho.com - Gọi Thợ"
            width={56}
            height={56}
            priority
            style={{ objectFit: 'contain', borderRadius: '8px' }}
          />
        </Link>

        <nav className="nav">
          <Link href="/dich-vu">Dịch vụ</Link>
          <Link href="/anh-cong-trinh">Công trình</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/gioi-thieu">Giới thiệu</Link>
          <Link href="/lien-he">Liên hệ</Link>
          <Link href="/dat-lich" className="nav-cta">
            Đặt lịch ngay
          </Link>
        </nav>

        <div className="header-phones">
          <a href="tel:02473088088" className="header-phone">
            <FiPhone /> HN: 024 73 088 088
          </a>
          <a href="tel:02873078088" className="header-phone header-phone-secondary">
            <FiPhone /> HCM: 028 73 078 088
          </a>
        </div>

        <button className="mobile-menu-btn" aria-label="Menu">
          <FiMenu />
        </button>
      </div>
    </header>
  )
}
