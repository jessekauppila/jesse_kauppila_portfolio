
import type { Project, Category } from '@/types/project'
import ProjectCardPro from '@/components/ProjectCardPro'

export default function ProjectSection({ title, projects }:{ title: string, projects: Project[] }) {
  if (!projects.length) return null
  return (
    <section className="mb-12">
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => <ProjectCardPro key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
