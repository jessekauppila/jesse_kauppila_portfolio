export type Category = 'web' | 'fabrication' | 'art';

export type ImageItem = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  scope?: string;
  year?: number;
  category: Category;
  description?: string;
  images: ImageItem[];
};

// GraphQL response types matching the query structure
export type GraphQLImage = {
  url: string;
  fileName: string;
};

export type GraphQLRichText = {
  text: string;
};

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
