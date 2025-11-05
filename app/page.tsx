import { fetchProjects } from '@/lib/fetchProjects';
import ProjectSection from '@/components/ProjectSection';

export default async function HomePage() {
  const projects = await fetchProjects();
  const web = projects.filter((p) => p.category === 'web');
  const fab = projects.filter((p) => p.category === 'fabrication');
  const art = projects.filter((p) => p.category === 'art');

  return (
    <>
      <ProjectSection title="Web / App Projects" projects={web} />
      <ProjectSection title="Fabrication Projects" projects={fab} />
      <ProjectSection title="Art Projects" projects={art} />
    </>
  );
}
