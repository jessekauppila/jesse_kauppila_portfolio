import type { RichTextContent } from '@graphcms/rich-text-types';

/**
 * Project categories
 */
export type Category = 'software' | 'fabrication' | 'art';

/**
 * Image item displayed in project galleries
 */
export type ImageItem = {
  src: string;
  alt?: string;
  caption?: string;
};

/**
 * Project type used throughout the application
 *
 * description: Rich text content (JSON structure) that can include
 *              links, formatting, embedded PDFs, etc.
 * descriptionText: Plain text fallback if rich text isn't available
 */
export type Project = {
  slug: string;
  title: string;
  client?: string;
  scope?: string;
  year?: number;
  category: Category;
  description?: RichTextContent; // Rich text structure (from Hygraph)
  descriptionText?: string; // Plain text fallback
  images: ImageItem[];
};

/**
 * Image response from GraphQL
 */
export type GraphQLImage = {
  url: string;
  fileName: string;
};

/**
 * Rich text response from GraphQL
 *
 * raw: JSON structure that can be rendered with @graphcms/rich-text-react-renderer
 * text: Plain text version (no formatting, links, etc.)
 */
export type GraphQLRichText = {
  raw: RichTextContent;
  text: string;
};

/**
 * Project response from GraphQL
 * Matches the structure returned by the PROJECTS_QUERY
 */
export type GraphQLProject = {
  slug: string;
  title: string;
  client?: string | null;
  scope?: string | null;
  year?: number | null;
  category: Category;
  description?: GraphQLRichText | null;
  images?: GraphQLImage[] | null;
};
