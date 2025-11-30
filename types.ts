/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface ShowcaseItem {
  id: string;
  name: string;
  category: string;
  image: string;
  stat: string;
  description: string;
}

export type VisualType = 'moodboard' | 'social-grid' | 'dashboard' | 'scroll-preview' | 'video-hover' | 'gallery' | 'standard' | '3d-model';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  visualType: VisualType;
  images: string[]; // Array of images for grids/scrolls
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  INDUSTRIES = 'industries',
  ABOUT = 'about',
  PROCESS = 'process',
  TESTIMONIALS = 'testimonials'
}