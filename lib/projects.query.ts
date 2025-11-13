export const PROJECTS_QUERY = /* GraphQL */ `
  query Projects {
    projects(orderBy: year_DESC, stage: PUBLISHED) {
      slug
      title
      client
      scope
      year
      category # Enum: web | fabrication | art
      description {
        text
      }
      images {
        url
        fileName
      }
    }
  }
`;
