import type { Project } from '@/types/project';

export const localProjects: Project[] = [
  {
    slug: 'wind-map-tool',
    title: 'Wind Map Tool',
    client: 'Internal / Personal',
    scope: 'Next.js, Deck.gl, Mapbox, Neon',
    year: 2025,
    category: 'software',
    description:
      'Interactive weather & avalanche tool with multi-station overlays and wind sprites.',
    images: [
      { src: '/images/placeholders/p1.jpg', caption: 'Overview' },
      {
        src: '/images/placeholders/p2.jpg',
        caption: 'Station drawer',
      },
      {
        src: '/images/placeholders/p3.jpg',
        caption: 'Wind rose sprites',
      },
    ],
  },
  {
    slug: 'cnc-fixture',
    title: 'CNC Composite Fixture',
    client: 'Joby Aviation',
    scope: 'Robotics, CAD/CAM, Shopfloor UI',
    year: 2021,
    category: 'fabrication',
    description:
      'Robotic layup fixture and operator interface to streamline composite manufacturing.',
    images: [
      { src: '/images/placeholders/p4.jpg' },
      { src: '/images/placeholders/p5.jpg' },
    ],
  },
  {
    slug: 'light-series',
    title: 'Light Series',
    client: '—',
    scope: 'Archival prints',
    year: 2023,
    category: 'art',
    description:
      'Explorations of light and surface through repetition and subtle variation.',
    images: [
      { src: '/images/placeholders/p6.jpg' },
      { src: '/images/placeholders/p7.jpg' },
      { src: '/images/placeholders/p8.jpg' },
    ],
  },
];
