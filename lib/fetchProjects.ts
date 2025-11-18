import type { Project, GraphQLProject } from '@/types/project';
import { gqlFetch } from '@/lib/gqlFetch';
import { PROJECTS_QUERY } from '@/lib/projects.query';

/**
 * Custom error class for GraphQL fetch failures
 */
export class GraphQLFetchError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'GraphQLFetchError';
  }
}

/**
 * Fetches projects from Hygraph (GraphQL)
 *
 * If GRAPHQL_ENDPOINT is not set, throws an error.
 * If the fetch fails, throws a GraphQLFetchError with details.
 *
 * Maps GraphQL response to our Project type, including:
 * - Rich text description (raw JSON structure)
 * - Plain text description fallback
 */
export async function fetchProjects(): Promise<Project[]> {
  const endpoint = process.env.GRAPHQL_ENDPOINT;

  if (!endpoint) {
    const error = new GraphQLFetchError(
      'GRAPHQL_ENDPOINT environment variable is not set. Cannot fetch projects.'
    );
    console.error('[fetchProjects]', error.message);
    throw error;
  }

  try {
    // Fetch projects from Hygraph
    const data = await gqlFetch<{ projects: GraphQLProject[] }>(
      PROJECTS_QUERY
    );

    if (!data?.projects) {
      throw new GraphQLFetchError(
        'GraphQL response missing projects data'
      );
    }

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
    // Create a detailed error message
    const errorMessage =
      e instanceof Error
        ? `Failed to fetch projects from GraphQL: ${e.message}`
        : 'Failed to fetch projects from GraphQL: Unknown error';

    const error = new GraphQLFetchError(errorMessage, e);
    console.error('[fetchProjects] GraphQL fetch failed:', {
      message: error.message,
      endpoint,
      originalError: e,
    });

    throw error;
  }
}
