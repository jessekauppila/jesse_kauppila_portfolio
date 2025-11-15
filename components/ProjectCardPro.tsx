/**
 * Project Card Component
 *
 * Displays a project card with:
 * - Image slider (if images exist)
 * - Project title (link to project detail page)
 * - Tools/Scope and Client information
 * - Rich text description (with links, PDFs, formatting support)
 */

import Link from 'next/link';
import type { Project } from '@/types/project';
import RichTextRenderer from '@/components/RichText';

export default function ProjectCardPro({
  project,
}: {
  project: Project;
}) {
  // Filter out any invalid images (without src)
  const validImages = (project.images || []).filter(
    (img) => img && img.src
  );

  return (
    <div className="card card_body padding-bottom_none on-secondary">
      <div className="flex_vertical gap-small height_100percent">
        <div className="w-layout-grid grid">
          {/* Image slider - shows project images */}
          {validImages.length > 0 ? (
            <div
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
                  <Link href={`/project/${project.slug}`}>
                    {project.title}
                  </Link>
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
