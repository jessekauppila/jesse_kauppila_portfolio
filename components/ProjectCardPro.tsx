
import Link from 'next/link'
import type { Project } from '@/types/project'
import CardCarousel from '@/components/CardCarousel'

export default function ProjectCardPro({ project }: { project: Project }) {
  return (
    <article className="card overflow-hidden">
      {/* Image on top (mobile-first) */}
      <CardCarousel images={project.images} />
      <div className="card-body">
        <header className="mb-2">
          <h3 className="text-lg font-medium leading-6">
            <Link href={`/project/${project.slug}`} className="hover:opacity-80 underline-offset-4">
              {project.title}
            </Link>
          </h3>
          <p className="text-xs text-ink/60">
            {project.client ? project.client : ''}
            {project.client && project.scope ? ' · ' : ''}
            {project.scope}
            {project.year ? ` · ${project.year}` : ''}
          </p>
        </header>
        {project.description && (
          <p className="text-sm leading-relaxed">{project.description}</p>
        )}
      </div>
    </article>
  )
}
