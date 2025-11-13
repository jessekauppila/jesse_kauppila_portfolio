import Link from 'next/link';
import type { Project } from '@/types/project';

export default function ProjectCardPro({
  project,
}: {
  project: Project;
}) {
  const validImages = (project.images || []).filter(
    (img) => img && img.src
  );

  return (
    <div className="card card_body padding-bottom_none on-secondary">
      <div className="flex_vertical gap-small height_100percent">
        <div className="w-layout-grid grid">
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
          <section className="section-3">
            <div className="w-layout-grid grid-2">
              <section>
                <h1 className="heading_h1 heading_h2">
                  <Link href={`/project/${project.slug}`}>
                    {project.title}
                  </Link>
                </h1>
                {project.scope && (
                  <p className="subheading">Tools: {project.scope}</p>
                )}
                {project.client && (
                  <p className="subheading">
                    Client: {project.client}
                  </p>
                )}
              </section>
              {project.description ? (
                <p className="paragraph">{project.description}</p>
              ) : (
                <p className="paragraph"></p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
