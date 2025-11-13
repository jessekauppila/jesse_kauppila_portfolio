import type { Project } from '@/types/project';
import ProjectCardPro from '@/components/ProjectCardPro';

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
          <div className="w-layout-grid grid_3-col gap-xsmall text-align_center">
            {projects.map((p) => (
              <ProjectCardPro key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
