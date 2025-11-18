/**
 * Project Detail Page
 *
 * Displays a full project page with:
 * - Project title
 * - Metadata (Client, Tools, Year) with improved styling
 * - Rich text description (with links, PDFs, formatting)
 * - Project images in a grid layout
 */

import { fetchProjects, GraphQLFetchError } from '@/lib/fetchProjects';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import RichTextRenderer from '@/components/RichText';

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch all projects and find the one matching the slug
  let projects;
  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error('[ProjectPage] Failed to fetch projects:', error);
    // Return error UI
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Unable to load project</h1>
          <p className="text-gray-600 mb-4">
            {error instanceof GraphQLFetchError
              ? error.message
              : 'An error occurred while fetching the project. Please try again later.'}
          </p>
          {process.env.NODE_ENV === 'development' && error instanceof Error && (
            <pre className="text-xs text-left bg-gray-100 p-4 rounded mt-4 overflow-auto">
              {error.stack}
            </pre>
          )}
        </div>
      </div>
    );
  }

  const project = projects.find((p) => p.slug === params.slug);

  // If project not found, show 404
  if (!project) return notFound();

  return (
    <article className="prose max-w-none">
      <header className="mb-6 not-prose">
        {/* Project title */}
        <h1 className="text-2xl font-medium">{project.title}</h1>

        {/* Project metadata - Client, Tools, Year with improved styling */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
          {project.client && (
            <span>
              <span className="font-semibold">Client:</span>{' '}
              {project.client}
            </span>
          )}
          {project.scope && (
            <span>
              <span className="font-semibold">Tools:</span>{' '}
              {project.scope}
            </span>
          )}
          {project.year && (
            <span>
              <span className="font-semibold">Year:</span>{' '}
              {project.year}
            </span>
          )}
        </div>

        {/* Project description - supports rich text (links, PDFs, formatting) */}
        {project.description && (
          <div className="mt-4 max-w-prose">
            <RichTextRenderer content={project.description} />
          </div>
        )}
        {/* Fallback to plain text if rich text isn't available */}
        {!project.description && project.descriptionText && (
          <p
            className="mt-4 max-w-prose"
            style={{ whiteSpace: 'pre-line' }}
          >
            {project.descriptionText}
          </p>
        )}
      </header>

      {/* Project images grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {project.images.map((img, i) => (
          <figure key={img.src + i} className="not-prose">
            <div className="relative w-full aspect-[4/3] border border-black rounded-2xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt || ''}
                fill
                className="object-cover"
              />
            </div>
            {/* Image caption if available */}
            {img.caption && (
              <figcaption className="text-xs text-ink/60 mt-2">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </article>
  );
}
