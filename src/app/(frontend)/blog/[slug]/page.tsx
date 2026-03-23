import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiCalendar, FiArrowLeft, FiTag } from 'react-icons/fi'
import React from 'react'

const categoryLabels: Record<string, string> = {
  tips: 'Mẹo sửa chữa',
  knowledge: 'Kiến thức',
  news: 'Tin tức',
  guides: 'Hướng dẫn',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const result = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    const post = result.docs[0]
    if (post) {
      return {
        title: `${post.title} | GoiTho.com Blog`,
        description: post.excerpt || `Đọc bài viết ${post.title} trên GoiTho.com`,
      }
    }
  } catch {}

  return { title: 'Bài viết | GoiTho.com', description: 'Blog & mẹo sửa nhà GoiTho.com' }
}

// Render richText content from Payload
function RichTextContent({ content }: { content: any }) {
  if (!content?.root?.children) return null

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (node.type === 'text') {
      let text: React.ReactNode = node.text
      if (node.format & 1) text = <strong key={index}>{text}</strong>
      if (node.format & 2) text = <em key={index}>{text}</em>
      return text
    }

    const children = node.children?.map((child: any, i: number) => renderNode(child, i))

    switch (node.type) {
      case 'paragraph':
        return <p key={index} style={{ marginBottom: 16, lineHeight: 1.8 }}>{children}</p>
      case 'heading': {
        const level = parseInt(node.tag?.replace('h', '') || '2', 10)
        return React.createElement(`h${level}`, { key: index, style: { marginTop: 32, marginBottom: 16 } }, children)
      }
      case 'list':
        return node.listType === 'number'
          ? <ol key={index} style={{ marginBottom: 16, paddingLeft: 24 }}>{children}</ol>
          : <ul key={index} style={{ marginBottom: 16, paddingLeft: 24 }}>{children}</ul>
      case 'listitem':
        return <li key={index} style={{ marginBottom: 8, lineHeight: 1.7 }}>{children}</li>
      case 'link':
        return <a key={index} href={node.fields?.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>{children}</a>
      case 'quote':
        return (
          <blockquote key={index} style={{
            borderLeft: '4px solid var(--primary)', paddingLeft: 20,
            margin: '24px 0', color: 'var(--text-light)', fontStyle: 'italic',
          }}>
            {children}
          </blockquote>
        )
      default:
        return <div key={index}>{children}</div>
    }
  }

  return <div>{content.root.children.map((node: any, i: number) => renderNode(node, i))}</div>
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let post: any = null
  try {
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    })
    post = result.docs[0]
  } catch {}

  if (!post) notFound()

  return (
    <>
      {/* Breadcrumb */}
      <section style={{ background: 'var(--bg-alt)', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: 'var(--text-light)' }}>
            <Link href="/" style={{ color: 'var(--primary)' }}>Trang chủ</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: 'var(--primary)' }}>Blog</Link>
            <span>/</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>{post.title}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Meta */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, fontSize: '0.9rem', color: 'var(--text-light)', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FiCalendar />
              {new Date(post.publishedDate || post.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {post.category && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--primary-light)', color: 'var(--primary)',
                padding: '4px 12px', borderRadius: 6, fontWeight: 600,
              }}>
                <FiTag /> {categoryLabels[post.category] || post.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.3, marginBottom: 24, color: 'var(--text)' }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p style={{
              fontSize: '1.15rem', color: 'var(--text-light)',
              lineHeight: 1.7, marginBottom: 32,
              paddingBottom: 24, borderBottom: '1px solid var(--border)',
            }}>
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <article className="blog-content">
            <RichTextContent content={post.content} />
          </article>

          {/* Back */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
            <Link href="/blog" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              <FiArrowLeft /> Quay lại Blog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Cần thợ sửa chữa?</h2>
          <p>Đặt lịch ngay hôm nay — miễn phí tư vấn và báo giá</p>
          <Link href="/dat-lich" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>
            Đặt lịch sửa chữa
          </Link>
        </div>
      </section>
    </>
  )
}
