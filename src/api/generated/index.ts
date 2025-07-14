
// Generated API types and exports
export interface PostResponseDto {
  id: number;
  title: string | { en: string; ar: string };
  content: string | { en: string; ar: string };
  excerpt: string | { en: string; ar: string };
  slug: string;
  featuredImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  type: 'BLOG' | 'NEWS' | 'EVENT' | 'PAGE';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  shares: number;
  author: {
    id: number;
    first_name: string;
    family_name: string;
    avatar?: string;
  };
  category?: {
    id: number;
    name: string | { en: string; ar: string };
    slug: string;
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  comments: Array<{
    id: number;
    content: string;
    author: string;
    createdAt: string;
  }>;
  isFeatured: boolean;
  readTime: number;
}

export interface CreatePostDto {
  title: string | { en: string; ar: string };
  content: string | { en: string; ar: string };
  excerpt?: string | { en: string; ar: string };
  slug: string;
  featuredImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  type: 'BLOG' | 'NEWS' | 'EVENT' | 'PAGE';
  publishedAt?: string;
  categoryId?: number;
  tags?: string[];
  isFeatured?: boolean;
}

export interface UpdatePostDto extends Partial<CreatePostDto> {}

export interface WebsiteCommentResponseDto {
  id: number;
  content: string;
  author: string;
  email: string;
  postId: number;
  parentId?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  replies: WebsiteCommentResponseDto[];
}

export interface CreateWebsiteCommentDto {
  content: string;
  author: string;
  email: string;
  postId: number;
  parentId?: number;
}

export interface UpdateWebsiteCommentDto extends Partial<CreateWebsiteCommentDto> {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface RatingResponseDto {
  id: number;
  rating: number;
  postId: number;
  userId?: number;
  createdAt: string;
}

export interface CreateRatingDto {
  rating: number;
  postId: number;
}

export interface ShareLogResponseDto {
  id: number;
  platform: string;
  postId: number;
  userId?: number;
  createdAt: string;
}

export interface CreateShareLogDto {
  platform: string;
  postId: number;
}
