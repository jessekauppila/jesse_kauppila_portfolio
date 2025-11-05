
'use client'
import { useState } from 'react'
import type { ImageItem } from '@/types/project'
import Image from 'next/image'

export default function CardCarousel({ images }: { images: ImageItem[] }) {
  const [i, setI] = useState(0)
  const next = () => setI((i+1) % images.length)
  const prev = () => setI((i-1+images.length) % images.length)

  const img = images[i]

  return (
    <div className="relative">
      <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-t-2xl">
        <Image
          src={img.src}
          alt={img.alt || ''}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          priority={false}
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 border border-black rounded-full px-2 py-1 text-xs shadow"
            aria-label="Previous image"
          >‹</button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 border border-black rounded-full px-2 py-1 text-xs shadow"
            aria-label="Next image"
          >›</button>
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1">
            {images.map((_, idx) => (
              <span key={idx} className={`dot ${idx===i?'active':''}`}></span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
