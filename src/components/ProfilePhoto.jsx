import { useState } from 'react'
import { Camera } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function ProfilePhoto() {
  const [imgError, setImgError] = useState(false)
  const { t } = useLanguage()

  if (imgError) {
    // Fallback placeholder when no photo exists
    return (
      <div
        className="w-full aspect-square flex flex-col items-center justify-center gap-3 border-2 border-dashed"
        style={{ 
          borderColor: 'var(--line)', 
          backgroundColor: 'transparent',
          borderRadius: '2rem'
        }}
      >
        <Camera size={32} style={{ color: 'var(--line)' }} aria-hidden="true" />
        <p className="font-inter text-xs text-center px-4" style={{ color: 'var(--muted)' }}>
          {t.about.addPhoto}<br />
          <span style={{ opacity: 0.6 }}>{t.about.replacePhoto} <code>public/profile.png</code></span>
        </p>
      </div>
    )
  }

  return (
    <div
      className="w-full aspect-square overflow-hidden"
      style={{ 
        border: '1px solid var(--line)',
        borderRadius: '2rem'
      }}
    >
      <img
        src="/profile.png"
        alt="Tran Thi Bich Nha — profile photo"
        className="w-full h-full object-cover object-center"
        onError={() => setImgError(true)}
        loading="eager"
      />
    </div>
  )
}
