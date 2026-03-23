import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './styles.css'

export const metadata = {
  title: 'GoiTho.com - Dịch Vụ Sửa Chữa Nhà Uy Tín',
  description: 'Gọi thợ sửa chữa nhà uy tín tại Hà Nội & TP.HCM. Sửa điện, nước, sơn nhà, thợ mộc, chống thấm. Đội thợ lành nghề, giá hợp lý.',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
