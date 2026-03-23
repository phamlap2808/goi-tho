import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import React from 'react'
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi'

export const metadata = {
  title: 'Blog & Mẹo Hay | GoiTho.com',
  description: 'Chia sẻ kinh nghiệm, mẹo hay về sửa chữa nhà, bảo trì thiết bị, và kiến thức hữu ích cho gia đình.',
}

export default async function BlogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let posts: any[] = []
  try {
    const result = await payload.find({
      collection: 'posts',
      sort: '-createdAt',
      limit: 12,
      where: { status: { equals: 'published' } },
    })
    posts = result.docs
  } catch { /* empty */ }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Blog & Mẹo Sửa Nhà</h2>
          <p>Kiến thức hữu ích giúp bạn chăm sóc ngôi nhà tốt hơn</p>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-light)' }}>
            <p style={{ fontSize: '1.1rem' }}>Bài viết đang được cập nhật. Hãy quay lại sau nhé!</p>
            <Link href="/" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
              Về trang chủ
            </Link>
          </div>
        ) : (
          <div className="services-grid">
            {posts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="service-card">
                <div style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: '0.8rem', color: 'var(--text-light)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FiCalendar /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                  {post.category && (
                    <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                      {post.category}
                    </span>
                  )}
                </div>
                <h3>{post.title}</h3>
                {post.excerpt && <p>{post.excerpt}</p>}
                <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12 }}>
                  Đọc tiếp <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
