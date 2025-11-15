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

import { useEffect, useRef } from 'react';
import Link from 'next/link';
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
                      loading="lazy"
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
