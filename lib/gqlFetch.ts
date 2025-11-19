interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
  message?: string;
}

export async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
) {
  const res = await fetch(process.env.GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.GRAPHQL_TOKEN
        ? { Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store', // Disable caching to ensure fresh data from Hygraph
  });

  let json: GraphQLResponse<T>;
  try {
    json = await res.json();
  } catch {
    // If we can't parse JSON, throw with status code
    throw new Error(`GraphQL error: ${res.status} ${res.statusText}`);
  }

  // Check for GraphQL errors first (even if status is 200, GraphQL can return errors)
  if (json.errors) {
    const errorMessages = json.errors
      .map((e) => e.message)
      .join('; ');
    throw new Error(`GraphQL error: ${errorMessages}`);
  }

  // If status is not ok and no GraphQL errors, throw with status
  if (!res.ok) {
    throw new Error(
      `GraphQL error: ${res.status} ${res.statusText}${
        json.message ? ` - ${json.message}` : ''
      }`
    );
  }

  return json.data as T;
}
