import { useState } from 'react'
import { Camera } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function ProfilePhoto() {
  const [imgError, setImgError] = useState(false)
  const { t } = useLanguage()

  if (imgError) {
    return (
      <div
        className="w-full aspect-square flex flex-col items-center justify-center gap-3 border-2 border-dashed"
        style={{ borderColor: 'var(--line-strong)', backgroundColor: 'transparent', borderRadius: '2rem' }}
      >
        <Camera size={32} style={{ color: 'var(--line-strong)' }} aria-hidden="true" />
        <p className="font-inter text-xs text-center px-4" style={{ color: 'var(--muted)' }}>
          {t.about.addPhoto}<br />
          <span style={{ opacity: 0.6 }}>{t.about.replacePhoto} <code>public/profile.png</code></span>
        </p>
      </div>
    )
  }

  return (
    <div
      className="relative w-full aspect-square overflow-hidden"
      style={{ border: '1px solid var(--line-strong)', borderRadius: '2rem', boxShadow: 'var(--shadow-lg)' }}
    >
      <img
        src="/profile.png"
        alt="Tran Thi Bich Nha — profile photo"
        className="w-full h-full object-cover object-center"
        onError={() => setImgError(true)}
        loading="eager"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 62%, rgba(27,23,18,0.14))' }}
      />
    </div>
  )
}
