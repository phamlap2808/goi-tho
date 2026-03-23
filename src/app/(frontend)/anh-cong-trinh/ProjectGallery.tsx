'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { FiMapPin, FiX, FiChevronLeft, FiChevronRight, FiGrid, FiMaximize2 } from 'react-icons/fi'

// Project data type
interface Project {
  id: string
  title: string
  description: string
  location: string
  folder: string
  images: string[]
  tags: string[]
}

// Static project data
const projects: Project[] = [
  {
    id: 'anh-tri',
    title: 'Cải tạo, sửa lại nhà Anh Trí',
    description: 'Cải tạo toàn diện căn nhà, nâng cấp không gian sống hiện đại và tiện nghi.',
    location: 'Trần Văn Quang, Q. Tân Bình, HCM',
    folder: 'anh-tri',
    images: Array.from({ length: 13 }, (_, i) => `${i + 1}.jpg`),
    tags: ['Cải tạo nhà', 'Sửa chữa'],
  },
  {
    id: 'anh-kien',
    title: 'Lắp đặt tủ gỗ 3 cánh nhà A. Kiên',
    description: 'Thiết kế và lắp đặt tủ gỗ 3 cánh theo yêu cầu, tối ưu không gian lưu trữ.',
    location: 'Nguyễn Văn Lượng, Gò Vấp, HCM',
    folder: 'anh-kien',
    images: ['1.jpg', '2.jpg'],
    tags: ['Nội thất', 'Tủ gỗ'],
  },
  {
    id: 'anh-nam',
    title: 'Sơn nhà, đánh bóng Sofa, cửa nhôm kính, sàn gỗ nhà A. Nam',
    description: 'Sơn toàn bộ nhà, đánh bóng Sofa, chuyển tủ bếp lên tầng trên, làm cửa nhôm kính chia phòng, đánh bóng sàn gỗ.',
    location: 'Khuất Duy Tiến, Thanh Xuân, Hà Nội',
    folder: 'anh-nam',
    images: [
      '1.JPG', '2.JPG', '3.JPG', '4.JPG', '5.JPG', '6.JPG',
      '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg',
      '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
    ],
    tags: ['Sơn nhà', 'Cửa nhôm kính', 'Sàn gỗ'],
  },
  {
    id: 'nha-hang-sen-dien',
    title: 'Sửa chữa hệ thống điện, lát nền gạch Nhà hàng Sen',
    description: 'Sửa chữa, bảo trì hệ thống điện và lát lại toàn bộ nền gạch cho nhà hàng.',
    location: '60 Lý Thái Tổ, Hoàn Kiếm, Hà Nội',
    folder: 'nha-hang-sen',
    images: Array.from({ length: 11 }, (_, i) => `${i + 1}.jpg`),
    tags: ['Sửa điện', 'Lát gạch', 'Thương mại'],
  },
  {
    id: 'anh-thai',
    title: 'Nội thất, trần thạch cao, lát sàn, sơn lại nhà A. Thái',
    description: 'Làm nội thất, trần thạch cao, lát sàn và sơn lại toàn bộ ngôi nhà.',
    location: 'Hiệp Thành, Quận 12, HCM',
    folder: 'anh-thai',
    images: Array.from({ length: 9 }, (_, i) => `${i + 1}.jpg`),
    tags: ['Nội thất', 'Trần thạch cao', 'Sơn nhà'],
  },
  {
    id: 'anh-hung-phu-nhuan',
    title: 'Thiết kế, lắp đặt cửa gỗ, tủ bếp - A. Hùng',
    description: 'Thiết kế và thi công lắp đặt hệ thống cửa gỗ cao cấp và tủ bếp theo yêu cầu.',
    location: 'Huỳnh Văn Bánh, Phú Nhuận, HCM',
    folder: 'anh-hung-phu-nhuan',
    images: ['1.JPG', '2.JPG', '3.JPG', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'],
    tags: ['Cửa gỗ', 'Tủ bếp', 'Nội thất'],
  },
  {
    id: 'kfc',
    title: 'Ốp lát, cải tạo mặt bằng hệ thống cửa hàng KFC',
    description: 'Ốp lát và cải tạo mặt bằng cho hệ thống cửa hàng KFC tại Hà Nội và HCM.',
    location: 'Hà Nội & HCM',
    folder: 'kfc-ha-noi',
    images: Array.from({ length: 11 }, (_, i) => `${i + 1}.jpg`),
    tags: ['Ốp lát', 'Thương mại', 'Cải tạo'],
  },
  {
    id: 'anh-hung',
    title: 'Xây mới nhà Anh Hùng',
    description: 'Xây dựng mới hoàn toàn căn nhà từ móng đến hoàn thiện.',
    location: 'Nguyễn Văn Trỗi, Q. Phú Nhuận, HCM',
    folder: 'anh-hung',
    images: Array.from({ length: 9 }, (_, i) => `${i + 1}.jpg`),
    tags: ['Xây mới', 'Nhà phố'],
  },
  {
    id: 'lixil',
    title: 'Đối tác lắp đặt thiết bị vệ sinh INAX - LIXIL',
    description: 'Lắp đặt toàn bộ thiết bị vệ sinh INAX - LIXIL: vòi sen nhiệt, bồn cầu điện tử và các thiết bị cao cấp.',
    location: 'HCM & Hà Nội',
    folder: 'lixil',
    images: Array.from({ length: 7 }, (_, i) => `${i + 1}.JPG`),
    tags: ['Thiết bị vệ sinh', 'INAX', 'Đối tác'],
  },
  {
    id: 'nha-hang-sen-son',
    title: 'Sơn lại & nâng cấp cải tạo Nhà hàng Sen',
    description: 'Sơn lại toàn bộ nhà hàng, nâng cấp và cải tạo không gian phục vụ khách hàng.',
    location: 'Lý Thái Tổ, Hoàn Kiếm, Hà Nội',
    folder: 'chi-trang',
    images: Array.from({ length: 12 }, (_, i) => `${i + 1}.JPG`),
    tags: ['Sơn nhà', 'Cải tạo', 'Thương mại'],
  },
]

// All unique tags
const allTags = Array.from(new Set(projects.flatMap(p => p.tags)))

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const filteredProjects = activeTag
    ? projects.filter(p => p.tags.includes(activeTag))
    : projects

  // Lightbox navigation
  const openLightbox = useCallback((project: Project, index: number) => {
    setSelectedProject(project)
    setLightboxIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const goNext = useCallback(() => {
    if (!selectedProject) return
    setLightboxIndex(prev =>
      prev < selectedProject.images.length - 1 ? prev + 1 : 0
    )
  }, [selectedProject])

  const goPrev = useCallback(() => {
    if (!selectedProject) return
    setLightboxIndex(prev =>
      prev > 0 ? prev - 1 : selectedProject.images.length - 1
    )
  }, [selectedProject])

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isLightboxOpen, closeLightbox, goNext, goPrev])

  return (
    <>
      {/* Filter tags */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap',
        justifyContent: 'center', marginBottom: 40,
      }}>
        <button
          onClick={() => setActiveTag(null)}
          style={{
            padding: '8px 20px', borderRadius: 50, border: 'none',
            background: !activeTag ? 'var(--primary)' : 'var(--bg-alt)',
            color: !activeTag ? 'white' : 'var(--text)',
            fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem',
            transition: 'all 0.2s',
          }}
        >
          Tất cả ({projects.length})
        </button>
        {allTags.map(tag => {
          const count = projects.filter(p => p.tags.includes(tag)).length
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              style={{
                padding: '8px 18px', borderRadius: 50, border: 'none',
                background: tag === activeTag ? 'var(--primary)' : 'var(--bg-alt)',
                color: tag === activeTag ? 'white' : 'var(--text-light)',
                fontWeight: 500, cursor: 'pointer', fontSize: '0.85rem',
                transition: 'all 0.2s',
              }}
            >
              {tag} ({count})
            </button>
          )
        })}
      </div>

      {/* Project grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 28,
      }}>
        {filteredProjects.map(project => (
          <div
            key={project.id}
            style={{
              background: 'white',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
            }}
          >
            {/* Cover image */}
            <div
              style={{ position: 'relative', width: '100%', paddingTop: '65%', overflow: 'hidden' }}
              onClick={() => openLightbox(project, 0)}
            >
              <Image
                src={`/access/${project.folder}/${project.images[0]}`}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={80}
              />
              {/* Image count badge */}
              <div style={{
                position: 'absolute', bottom: 12, right: 12,
                background: 'rgba(0,0,0,0.7)', color: 'white',
                padding: '6px 12px', borderRadius: 20,
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '0.8rem', fontWeight: 600, backdropFilter: 'blur(4px)',
              }}>
                <FiGrid size={14} />
                {project.images.length} ảnh
              </div>
              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0' }}
              >
                <div style={{
                  background: 'rgba(255,255,255,0.95)', padding: '10px 20px',
                  borderRadius: 8, fontWeight: 600, color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <FiMaximize2 /> Xem ảnh
                </div>
              </div>
            </div>

            {/* Thumbnail preview */}
            {project.images.length > 1 && (
              <div style={{
                display: 'flex', gap: 3, padding: '3px 12px 0',
                overflow: 'hidden',
              }}>
                {project.images.slice(1, 5).map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1, paddingTop: '18%', position: 'relative',
                      borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
                    }}
                    onClick={() => openLightbox(project, idx + 1)}
                  >
                    <Image
                      src={`/access/${project.folder}/${img}`}
                      alt={`${project.title} - ảnh ${idx + 2}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="100px"
                      quality={60}
                    />
                    {idx === 3 && project.images.length > 5 && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.55)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 700, fontSize: '0.9rem',
                      }}>
                        +{project.images.length - 5}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Info section */}
            <div style={{ padding: '16px 20px 20px' }}>
              <h3 style={{
                fontSize: '1rem', fontWeight: 700, marginBottom: 8,
                lineHeight: 1.4, color: 'var(--text)',
              }}>
                {project.title}
              </h3>
              <p style={{
                fontSize: '0.85rem', color: 'var(--text-light)',
                marginBottom: 12, lineHeight: 1.5,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {project.description}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500,
              }}>
                <FiMapPin size={14} />
                {project.location}
              </div>
              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 12px', borderRadius: 20,
                      background: 'var(--bg-alt)', fontSize: '0.75rem',
                      color: 'var(--text-light)', fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {isLightboxOpen && selectedProject && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
          onClick={closeLightbox}
        >
          {/* Header */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '16px 24px', display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
            zIndex: 10,
          }}>
            <div>
              <h3 style={{ color: 'white', fontSize: '1rem', margin: 0, fontWeight: 600 }}>
                {selectedProject.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                {lightboxIndex + 1} / {selectedProject.images.length}
              </p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); closeLightbox() }}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none',
                color: 'white', width: 44, height: 44, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '1.2rem',
              }}
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Image */}
          <div
            style={{
              position: 'relative', width: '90vw', height: '80vh',
              maxWidth: 1200,
            }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={`/access/${selectedProject.folder}/${selectedProject.images[lightboxIndex]}`}
              alt={`${selectedProject.title} - ảnh ${lightboxIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="90vw"
              quality={90}
              priority
            />
          </div>

          {/* Navigation arrows */}
          {selectedProject.images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); goPrev() }}
                style={{
                  position: 'absolute', left: 16, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.15)', border: 'none',
                  color: 'white', width: 48, height: 48, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', backdropFilter: 'blur(4px)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)' }}
              >
                <FiChevronLeft size={28} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); goNext() }}
                style={{
                  position: 'absolute', right: 16, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.15)', border: 'none',
                  color: 'white', width: 48, height: 48, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', backdropFilter: 'blur(4px)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)' }}
              >
                <FiChevronRight size={28} />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          <div style={{
            position: 'absolute', bottom: 16, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: 6, maxWidth: '80vw',
            overflowX: 'auto', padding: '8px 12px',
            background: 'rgba(0,0,0,0.5)', borderRadius: 12,
            backdropFilter: 'blur(8px)',
          }}
          onClick={e => e.stopPropagation()}
          >
            {selectedProject.images.map((img, idx) => (
              <div
                key={idx}
                style={{
                  width: 56, height: 42, position: 'relative',
                  borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
                  flexShrink: 0,
                  border: idx === lightboxIndex ? '2px solid white' : '2px solid transparent',
                  opacity: idx === lightboxIndex ? 1 : 0.6,
                  transition: 'opacity 0.2s, border 0.2s',
                }}
                onClick={() => setLightboxIndex(idx)}
              >
                <Image
                  src={`/access/${selectedProject.folder}/${img}`}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="56px"
                  quality={40}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
