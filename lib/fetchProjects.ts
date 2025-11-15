import { localProjects } from '@/data/projects.local';
import type { Project, GraphQLProject } from '@/types/project';
import { gqlFetch } from '@/lib/gqlFetch';
import { PROJECTS_QUERY } from '@/lib/projects.query';

/**
 * Fetches projects from either Hygraph (GraphQL) or local fallback data
 *
 * If GRAPHQL_ENDPOINT is set, fetches from Hygraph.
 * Otherwise, returns local projects data.
 *
 * Maps GraphQL response to our Project type, including:
 * - Rich text description (raw JSON structure)
 * - Plain text description fallback
 */
export async function fetchProjects(): Promise<Project[]> {
  const useGraphQL = !!process.env.GRAPHQL_ENDPOINT;
  if (!useGraphQL) return localProjects;

  try {
    // Fetch projects from Hygraph
    const data = await gqlFetch<{ projects: GraphQLProject[] }>(
      PROJECTS_QUERY
    );

    // Map GraphQL response to our Project type
    const mapped: Project[] = data.projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      client: p.client ?? undefined,
      scope: p.scope ?? undefined,
      year: p.year ?? undefined,
      category: p.category,
      // Rich text structure (for rendering with RichText component)
      description: p.description?.raw ?? undefined,
      // Plain text fallback (if rich text isn't available)
      descriptionText: p.description?.text ?? undefined,
      // Map images from GraphQL format to our ImageItem format
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
    // If GraphQL fetch fails, fall back to local data
    console.error('[GraphQL] fetch failed, using local fallback', e);
    return localProjects;
  }
}
