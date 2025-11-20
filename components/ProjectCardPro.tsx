/**
 * Project Card Component
 *
 * Displays a project card with:
 * - Image slider (if images exist)
 * - Project title (link to project detail page)
 * - Tools/Scope and Client information
 * - Rich text description (with links, PDFs, formatting support)
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/types/project';
import RichTextRenderer from '@/components/RichText';

// Type declaration for Webflow global object
declare global {
  interface Window {
    Webflow?: {
      redraw?: {
        up?: () => void;
      };
    };
  }
}

export default function ProjectCardPro({
  project,
}: {
  project: Project;
}) {
  // Filter out any invalid images (without src)
  const validImages = (project.images || []).filter(
    (img) => img && img.src
  );

  // Ref to the slider element for Webflow reinitialization
  const sliderRef = useRef<HTMLDivElement>(null);

  // State for description expand/collapse
  // Default to expanded on tablet/PC, collapsed on mobile
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768; // Tablet breakpoint
    }
    return true; // Default to expanded for SSR
  });

  // Update expanded state based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsExpanded(true); // Auto-expand on tablet/PC
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reinitialize Webflow slider after component mounts
  useEffect(() => {
    if (!sliderRef.current || validImages.length === 0) return;

    // Function to initialize Webflow slider
    const initSlider = () => {
      // Check if Webflow is available
      if (typeof window !== 'undefined' && window.Webflow) {
        const Webflow = window.Webflow;

        // Trigger Webflow to reinitialize by calling redraw
        // This is the recommended way to reinitialize Webflow components
        if (Webflow.redraw && Webflow.redraw.up) {
          Webflow.redraw.up();
        }

        // Also trigger a resize event which causes Webflow to recalculate slider dimensions
        // This is what happens when you resize the window and it fixes the issue
        if (typeof window.dispatchEvent === 'function') {
          window.dispatchEvent(new Event('resize'));
        }
      }
    };

    // Wait for both DOM and Webflow to be ready
    const initialize = () => {
      // Use a small delay to ensure the slider DOM is fully rendered
      setTimeout(initSlider, 100);
    };

    // If Webflow is already loaded, initialize immediately
    if (typeof window !== 'undefined' && window.Webflow) {
      initialize();
    } else {
      // Wait for Webflow to load
      const checkWebflow = setInterval(() => {
        if (typeof window !== 'undefined' && window.Webflow) {
          clearInterval(checkWebflow);
          initialize();
        }
      }, 50);

      // Cleanup interval after 5 seconds
      setTimeout(() => clearInterval(checkWebflow), 5000);

      return () => clearInterval(checkWebflow);
    }
  }, [validImages.length]); // Re-run if images change

  return (
    <div className="card card_body padding-bottom_none on-secondary">
      <div className="flex_vertical gap-small height_100percent">
        <div className="w-layout-grid grid">
          {/* Image slider - shows project images */}
          {validImages.length > 0 ? (
            <div
              ref={sliderRef}
              data-delay="4000"
              data-animation="slide"
              className="slider-2 w-slider"
              data-autoplay="false"
              data-easing="ease"
              data-hide-arrows="false"
              data-disable-swipe="false"
              data-autoplay-limit="0"
              data-nav-spacing="3"
              data-duration="500"
              data-infinite="true"
            >
              <div className="w-slider-mask">
                {validImages.map((img, index) => (
                  <div
                    key={img.src + index}
                    className={
                      index === 0 ? 'slide w-slide' : 'w-slide'
                    }
                  >
                    <img
                      src={img.src}
                      alt={img.alt || ''}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="slider-image"
                    />
                  </div>
                ))}
              </div>
              <div className="w-slider-arrow-left">
                <div className="w-icon-slider-left"></div>
              </div>
              <div className="w-slider-arrow-right">
                <div className="w-icon-slider-right"></div>
              </div>
              <div className="w-slider-nav w-round w-num"></div>
            </div>
          ) : (
            <div className="slide w-slide">
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#999',
                }}
              >
                No image available
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

              {/* Right column: Description with expandable dropdown */}
              {project.description || project.descriptionText ? (
                <div className="paragraph">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="description-toggle"
                    aria-expanded={isExpanded}
                    aria-label={
                      isExpanded
                        ? 'Collapse description'
                        : 'Expand description'
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      margin: '0 auto 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'inherit',
                      opacity: 0.4,
                      transition:
                        'opacity 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.7';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.4';
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform: isExpanded
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isExpanded ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.3s ease-out',
                      overflow: 'hidden',
                    }}
                    className="description-content"
                  >
                    <div style={{ minHeight: 0 }}>
                      {project.description ? (
                        // Use RichText component if rich text is available
                        // This supports links, PDFs, formatting, etc.
                        <RichTextRenderer
                          content={project.description}
                        />
                      ) : (
                        // Fallback to plain text if rich text isn't available
                        <p style={{ whiteSpace: 'pre-line' }}>
                          {project.descriptionText}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
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
