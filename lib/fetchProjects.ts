
import { client, sanityEnabled } from '@/lib/sanity.client'
import { localProjects } from '@/data/projects.local'
import type { Project } from '@/types/project'
import { projectsQuery } from '@/lib/sanity.queries'

export async function fetchProjects(): Promise<Project[]> {
  if (!sanityEnabled || !client) return localProjects
  try {
    const data = await client.fetch(projectsQuery)
    // Map to our type (already structured in GROQ)
    return data as Project[]
  } catch (e) {
    console.error('[Sanity] fetch failed, using local data', e)
    return localProjects
  }
}
