import type { Project } from '@/types/project';
import ProjectCardPro from '@/components/ProjectCardPro';
import ProjectCardProEmbla from '@/components/ProjectCardProEmbla';

export default function ProjectSection({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  if (!projects.length) return null;
  return (
    <section>
      <div className="container">
        <div className="container">
          <h1 className="heading_h1">{title}</h1>

          {/* Original Webflow Slider Version */}
          <div style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                marginBottom: '1rem',
                fontSize: '1.25rem',
                fontWeight: '600',
              }}
            >
              Webflow Slider (Original)
            </h2>
            <div className="w-layout-grid grid_3-col gap-xsmall text-align_center">
              {projects.map((p) => (
                <ProjectCardPro
                  key={`webflow-${p.slug}`}
                  project={p}
                />
              ))}
            </div>
          </div>

          {/* Embla Carousel Version */}
          <div>
            <h2
              style={{
                marginBottom: '1rem',
                fontSize: '1.25rem',
                fontWeight: '600',
              }}
            >
              Embla Carousel (New)
            </h2>
            <div className="w-layout-grid grid_3-col gap-xsmall text-align_center">
              {projects.map((p) => (
                <ProjectCardProEmbla
                  key={`embla-${p.slug}`}
                  project={p}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
