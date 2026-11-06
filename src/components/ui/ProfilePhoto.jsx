'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

// Фото владельца: /public/images/profile.webp.
// Пока файла нет — показываем монограмму (случайные фото людей не подставляются).
export default function ProfilePhoto({ priority = false, className = '' }) {
  const { t } = useLanguage();
  const imgRef = useRef(null);
  const hasPhoto = process.env.NEXT_PUBLIC_HAS_PHOTO === '1';
  const [state, setState] = useState(hasPhoto ? 'loading' : 'missing'); // loading | ok | missing

  useEffect(() => {
    if (!hasPhoto) return;
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) setState(img.naturalWidth > 0 ? 'ok' : 'missing');
  }, []);

  return (
    <div className={`relative overflow-hidden bg-[#10101a] ${className}`}>
      {/* Placeholder */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="absolute inset-0 grid-lines opacity-70" />
        <div className="absolute h-2/3 w-2/3 rounded-full bg-[radial-gradient(closest-side,rgba(109,92,255,0.45),transparent)] blur-xl" />
        <span className="relative font-display text-[clamp(3rem,9vw,6rem)] font-semibold tracking-tight text-white/90">
          {t.photo.monogram}
        </span>
      </div>
      {hasPhoto && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={imgRef}
        src="/images/profile.webp"
        srcSet="/images/profile-480.webp 480w, /images/profile-768.webp 768w, /images/profile.webp 960w"
        sizes="(min-width: 1024px) 420px, (min-width: 768px) 460px, (min-width: 480px) 420px, 100vw"
        width={960}
        height={960}
        alt={t.photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setState('ok')}
        onError={() => setState('missing')}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
          state === 'ok' ? 'opacity-100' : 'opacity-0'
        }`}
        style={state === 'missing' ? { display: 'none' } : undefined}
      />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
    </div>
  );
}
