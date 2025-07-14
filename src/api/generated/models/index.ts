// Generated API models

export interface CreatePostDto {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  status?: 'draft' | 'published' | 'archived';
  type?: 'blog' | 'news' | 'event' | 'page';
  category?: string;
  tags?: string[];
  featuredImage?: string;
  authorId?: number;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  status?: 'draft' | 'published' | 'archived';
  type?: 'blog' | 'news' | 'event' | 'page';
  category?: string;
  tags?: string[];
  featuredImage?: string;
}

export interface PostResponseDto {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  type: 'blog' | 'news' | 'event' | 'page';
  category?: {
    id: number;
    name: string;
  };
  tags?: string[];
  featuredImage?: string;
  author?: {
    id: number;
    first_name?: string;
    family_name?: string;
    email: string;
    avatar?: string;
    bio?: string;
    title?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      facebook?: string;
    };
  };
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  views: number;
  comments?: any[];
  isFeatured?: boolean;
}

export interface TokenResponseDto {
  access_token: string;
  user: UserDto;
}

export interface UserDto {
  id: number;
  email: string;
  first_name?: string;
  family_name?: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
}

export * from './index';