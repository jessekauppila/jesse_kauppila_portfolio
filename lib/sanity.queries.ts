
import { groq } from 'next-sanity'

export const projectsQuery = groq`
*[_type == "project"]|order(year desc){
  "slug": slug.current,
  title,
  client,
  scope,
  year,
  "category": category,
  description,
  images[]{asset->{"src": url, "alt": originalFilename}, caption}
}`))
