/**
 * Project Card Component with Embla Carousel
 *
 * Displays a project card with:
 * - Image slider using Embla Carousel (if images exist)
 * - Project title (link to project detail page)
 * - Tools/Scope and Client information
 * - Rich text description (with links, PDFs, formatting support)
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import type { Project } from '@/types/project';
import RichTextRenderer from '@/components/RichText';
import { transformImageUrl } from '@/lib/imageUtils';

export default function ProjectCardProEmbla({
  project,
}: {
  project: Project;
}) {
  // Filter out any invalid images (without src)
  const validImages = (project.images || []).filter(
    (img) => img && img.src
  );

  // Detect if mobile viewport
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Transform image URLs for optimal sizing
  const transformedImages = validImages.map((img) => ({
    ...img,
    src: transformImageUrl(img.src, 500, isMobile),
  }));

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    []
  );

  // Navigation state
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Update selected index and scroll snaps
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="card card_body padding-bottom_none on-secondary">
      <div className="flex_vertical gap-small height_100percent">
        <div className="w-layout-grid grid">
          {/* Image slider - shows project images using Embla */}
          {transformedImages.length > 0 ? (
            <div className="embla">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {transformedImages.map((img, index) => (
                    <div className="embla__slide" key={img.src + index}>
                      <div className="embla__slide__img">
                        <Image
                          src={img.src}
                          alt={img.alt || ''}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              {transformedImages.length > 1 && (
                <>
                  <button
                    className="embla__button embla__button--prev"
                    onClick={scrollPrev}
                    aria-label="Previous slide"
                  >
                    <svg
                      className="embla__button__svg"
                      viewBox="0 0 532 532"
                    >
                      <path
                        fill="currentColor"
                        d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.423 332.731 33.874 355.66 11.354Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="embla__button embla__button--next"
                    onClick={scrollNext}
                    aria-label="Next slide"
                  >
                    <svg
                      className="embla__button__svg"
                      viewBox="0 0 532 532"
                    >
                      <path
                        fill="currentColor"
                        d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0a5994246.277 5994246.277 0 0 0 229.332 229.454 35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2C359.808 337.577 199.269 498.126 176.34 520.646Z"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Navigation dots */}
              {transformedImages.length > 1 && (
                <div className="embla__dots">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      className={`embla__dot ${
                        index === selectedIndex ? 'embla__dot--selected' : ''
                      }`}
                      onClick={() => scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="embla">
              <div className="embla__viewport">
                <div className="embla__container">
                  <div className="embla__slide">
                    <div
                      style={{
                        padding: '2rem',
                        textAlign: 'center',
                        color: '#999',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      No image available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project metadata and description */}
          <section className="section-3">
            <div className="w-layout-grid grid-2">
              {/* Left column: Title and metadata */}
              <section>
                <h1 className="heading_h1 heading_h2">
                  {project.title}
                </h1>
                {/* Tools/Scope - with improved styling */}
                {project.scope && (
                  <p className="subheading">
                    <strong>Tools:</strong> {project.scope}
                  </p>
                )}
                {/* Client - with improved styling */}
                {project.client && (
                  <p className="subheading">
                    <strong>Client:</strong> {project.client}
                  </p>
                )}
              </section>

              {/* Right column: Description */}
              {project.description ? (
                // Use RichText component if rich text is available
                // This supports links, PDFs, formatting, etc.
                <div className="paragraph">
                  <RichTextRenderer content={project.description} />
                </div>
              ) : project.descriptionText ? (
                // Fallback to plain text if rich text isn't available
                <p
                  className="paragraph"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {project.descriptionText}
                </p>
              ) : (
                // Empty paragraph if no description
                <p className="paragraph"></p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

