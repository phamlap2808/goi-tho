'use client'

import React, { useState } from 'react'
import { FiSend, FiCheckCircle } from 'react-icons/fi'

const serviceOptions = [
  'Sửa điện',
  'Sửa nước',
  'Sơn nhà',
  'Thợ mộc',
  'Sửa máy lạnh',
  'Chống thấm',
  'Sửa khóa',
  'Lắp đặt thiết bị',
  'Khác',
]

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email') || undefined,
          service: data.get('service'),
          address: data.get('address'),
          description: data.get('description'),
          preferredDate: data.get('date') || undefined,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        alert('Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp 090 123 4567')
      }
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp 090 123 4567')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', color: 'var(--success)', marginBottom: 16 }}>
            <FiCheckCircle />
          </div>
          <h2 style={{ marginBottom: 12 }}>Đặt lịch thành công!</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: 24 }}>
            Chúng tôi đã nhận được yêu cầu và sẽ liên hệ bạn trong vòng 30 phút.
          </p>
          <a href="/" className="btn btn-primary">Về trang chủ</a>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="section-header">
          <h2>Đặt lịch sửa chữa</h2>
          <p>Điền thông tin bên dưới, chúng tôi sẽ liên hệ bạn ngay</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={labelStyle}>Họ tên *</label>
            <input name="name" required placeholder="Nguyễn Văn A" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Số điện thoại *</label>
            <input name="phone" type="tel" required placeholder="090 xxx xxxx" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" placeholder="email@example.com" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Dịch vụ cần *</label>
            <select name="service" required style={inputStyle}>
              <option value="">— Chọn dịch vụ —</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Địa chỉ *</label>
            <input name="address" required placeholder="Số nhà, đường, quận/huyện" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Ngày mong muốn</label>
            <input name="date" type="date" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Mô tả vấn đề</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Mô tả chi tiết sự cố hoặc yêu cầu của bạn..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ justifyContent: 'center', fontSize: '1.05rem', padding: '16px 32px' }}
          >
            {loading ? 'Đang gửi...' : (
              <><FiSend /> Gửi yêu cầu</>
            )}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-light)' }}>
            Hoặc gọi trực tiếp: <a href="tel:0901234567" style={{ color: 'var(--secondary)', fontWeight: 700 }}>090 123 4567</a>
          </p>
        </form>
      </div>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 6,
  fontWeight: 600,
  fontSize: '0.9rem',
  color: 'var(--text)',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '1rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
}
