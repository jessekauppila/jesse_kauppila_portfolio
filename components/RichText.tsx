'use client';

/**
 * Rich Text Renderer Component
 *
 * This component takes the JSON structure from Hygraph's Rich Text field
 * and renders it as React elements with proper formatting, links, and embedded assets.
 *
 * What it does:
 * - Converts JSON structure to React elements
 * - Renders links as clickable Next.js Link components
 * - Handles PDF downloads with styled download buttons
 * - Formats text (bold, italic, headings, lists, etc.)
 * - Supports embedded images and other assets
 *
 * The @graphcms/rich-text-react-renderer package does the heavy lifting
 * of parsing the JSON structure. We just customize how each element renders.
 */

import { RichText } from '@graphcms/rich-text-react-renderer';
import type { RichTextContent } from '@graphcms/rich-text-types';
import Link from 'next/link';

type RichTextProps = {
  content: RichTextContent; // The JSON structure from Hygraph
  className?: string; // Optional CSS class
};

export default function RichTextRenderer({
  content,
  className,
}: RichTextProps) {
  return (
    <div className={className}>
      {/* 
        The RichText component from @graphcms/rich-text-react-renderer
        takes the JSON structure and converts it to React elements.
        
        We provide a 'renderers' object to customize how each element type renders.
        This lets us control styling, add Next.js Link components, handle PDFs, etc.
      */}
      <RichText
        content={content}
        renderers={{
          // Headings - different sizes for h1, h2, h3
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4 mt-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-3 mt-5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-2 mt-4">
              {children}
            </h3>
          ),

          // Paragraphs - spacing and line height for readability
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),

          // Text formatting
          bold: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          italic: ({ children }) => (
            <em className="italic">{children}</em>
          ),

          // Links - use Next.js Link component for better performance
          // Supports opening in new tab if specified in Hygraph
          a: ({ children, href, openInNewTab }) => {
            const linkHref = href || '#';
            // Use Next.js Link for internal routes, regular <a> for external URLs
            if (linkHref.startsWith('/') && linkHref !== '#') {
              return (
                <Link
                  href={linkHref as any}
                  target={openInNewTab ? '_blank' : undefined}
                  rel={
                    openInNewTab ? 'noopener noreferrer' : undefined
                  }
                  className="text-link"
                >
                  {children}
                </Link>
              );
            }
            // Use regular <a> tag for external URLs or fallback
            return (
              <a
                href={linkHref}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-link"
              >
                {children}
              </a>
            );
          },

          // Lists - bulleted and numbered
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="ml-4">{children}</li>,

          // Code formatting - inline code and code blocks
          code: ({ children }) => (
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),
          code_block: ({ children }) => (
            <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
              <code>{children}</code>
            </pre>
          ),

          // Embedded assets - this is where PDFs, images, and other files are handled
          embed: {
            // When a file asset is embedded in the rich text
            Asset: ({ node }) => {
              const url = node.url;
              const mimeType = node.mimeType || '';

              // Handle PDF files - create a styled download button
              if (mimeType === 'application/pdf') {
                return (
                  <div className="my-4">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      {/* PDF icon */}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download PDF: {node.fileName || 'Document'}
                    </a>
                  </div>
                );
              }

              // Handle images - display them inline
              if (mimeType.startsWith('image/')) {
                return (
                  <img
                    src={url}
                    alt={node.fileName || ''}
                    className="my-4 rounded-lg max-w-full h-auto"
                  />
                );
              }

              // Generic file download - for other file types
              return (
                <div className="my-4">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    {node.fileName || 'Download file'}
                  </a>
                </div>
              );
            },
          },
        }}
      />
    </div>
  );
}
