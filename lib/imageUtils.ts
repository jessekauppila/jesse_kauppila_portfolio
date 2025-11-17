/**
 * Image URL transformation utilities
 * 
 * Transforms image URLs to optimize them for display, particularly for
 * Hygraph CDN images which support URL parameters for resizing.
 */

/**
 * Transforms a Hygraph CDN image URL to resize it to a specific height
 * while maintaining aspect ratio.
 * 
 * @param url - The original image URL
 * @param height - Target height in pixels (default: 500 for desktop)
 * @param isMobile - Whether this is for mobile viewport (uses 300px if true)
 * @returns Transformed URL with resize parameters, or original URL if not a Hygraph CDN URL
 * 
 * @example
 * transformImageUrl('https://ap-south-1.graphassets.com/...', 500)
 * // Returns: 'https://ap-south-1.graphassets.com/...?h=500&fit=max&auto=format'
 */
export function transformImageUrl(
  url: string,
  height: number = 500,
  isMobile: boolean = false
): string {
  if (!url) return url;

  // Target height: 300px for mobile, specified height for desktop
  const targetHeight = isMobile ? 300 : height;

  // Check if URL is from Hygraph CDN (graphassets.com)
  const isHygraphCDN = url.includes('graphassets.com');

  if (!isHygraphCDN) {
    // Return original URL if not from Hygraph CDN
    return url;
  }

  // Check if URL already has query parameters
  const hasQueryParams = url.includes('?');
  const separator = hasQueryParams ? '&' : '?';

  // Add transformation parameters
  // fit=max: maintains aspect ratio while constraining to height
  // auto=format: automatically serves optimal format (WebP when supported)
  return `${url}${separator}h=${targetHeight}&fit=max&auto=format`;
}

/**
 * Transforms an image URL for desktop display (500px height)
 */
export function transformImageUrlDesktop(url: string): string {
  return transformImageUrl(url, 500, false);
}

/**
 * Transforms an image URL for mobile display (300px height)
 */
export function transformImageUrlMobile(url: string): string {
  return transformImageUrl(url, 500, true);
}

/**
 * Transforms multiple image URLs at once
 * 
 * @param urls - Array of image URLs to transform
 * @param height - Target height in pixels
 * @param isMobile - Whether this is for mobile viewport
 * @returns Array of transformed URLs
 */
export function transformImageUrls(
  urls: string[],
  height: number = 500,
  isMobile: boolean = false
): string[] {
  return urls.map((url) => transformImageUrl(url, height, isMobile));
}

