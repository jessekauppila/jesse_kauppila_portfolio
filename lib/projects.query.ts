/**
 * GraphQL query to fetch all published projects from Hygraph
 *
 * The description field is a Rich Text field that supports:
 * - Text formatting (bold, italic, headings)
 * - Links
 * - Lists (bulleted and numbered)
 * - Embedded assets (PDFs, images, etc.)
 *
 * We fetch both:
 * - `raw`: The JSON structure needed by the rich text renderer
 * - `text`: Plain text fallback if rich text isn't available
 */
export const PROJECTS_QUERY = /* GraphQL */ `
  query Projects {
    projects(orderBy: year_DESC, stage: PUBLISHED) {
      slug
      title
      client
      scope
      year
      category # Enum: software | fabrication | art
      description {
        raw # JSON structure for rich text rendering (links, PDFs, formatting)
        text # Plain text fallback
      }
      images {
        url
        fileName
      }
    }
  }
`;
