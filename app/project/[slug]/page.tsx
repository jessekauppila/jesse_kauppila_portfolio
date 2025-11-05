
import { fetchProjects } from '@/lib/fetchProjects'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function ProjectPage({ params}:{ params: { slug: string } }) {
  const projects = await fetchProjects()
  const project = projects.find(p => p.slug === params.slug)
  if (!project) return notFound()

  return (
    <article className="prose max-w-none">
      <header className="mb-6 not-prose">
        <h1 className="text-2xl font-medium">{project.title}</h1>
        <p className="text-ink/60">
          {project.client ? project.client : ''}
          {project.client && project.scope ? ' · ' : ''}
          {project.scope}
          {project.year ? ` · ${project.year}` : ''}
        </p>
        {project.description && <p className="mt-3 max-w-prose">{project.description}</p>}
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {project.images.map((img, i) => (
          <figure key={img.src + i} className="not-prose">
            <div className="relative w-full aspect-[4/3] border border-black rounded-2xl overflow-hidden">
              <Image src={img.src} alt={img.alt||''} fill className="object-cover" />
            </div>
            {img.caption && <figcaption className="text-xs text-ink/60 mt-2">{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </article>
  )
}
