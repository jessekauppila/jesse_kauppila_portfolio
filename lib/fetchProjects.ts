import { localProjects } from '@/data/projects.local';
import type { Project, GraphQLProject } from '@/types/project';
import { gqlFetch } from '@/lib/gqlFetch';
import { PROJECTS_QUERY } from '@/lib/projects.query';

export async function fetchProjects(): Promise<Project[]> {
  const useGraphQL = !!process.env.GRAPHQL_ENDPOINT;
  if (!useGraphQL) return localProjects;

  try {
    const data = await gqlFetch<{ projects: GraphQLProject[] }>(
      PROJECTS_QUERY
    );

    const mapped: Project[] = data.projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      client: p.client ?? undefined,
      scope: p.scope ?? undefined,
      year: p.year ?? undefined,
      category: p.category,
      description: p.description?.text ?? undefined,
      images: (p.images ?? [])
        .filter((img) => img && img.url) // Filter out images without valid URLs
        .map((img) => ({
          src: img.url,
          alt: img.fileName,
          caption: undefined,
        })),
    }));

    return mapped;
  } catch (e) {
    console.error('[GraphQL] fetch failed, using local fallback', e);
    return localProjects;
  }
}
