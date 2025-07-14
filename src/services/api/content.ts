import { ContentService, CreatePostDto, UpdatePostDto } from "@/api/generated";
import { handleApiError } from "@/lib/api-client";

export const contentApi = {
  // Posts
  getAllPosts: async (page = 1, limit = 10, search = "", categoryId = 0) => {
    try {
      const response = await ContentService.contentControllerListPosts(
        page,
        limit,
        search,
        categoryId
      );
      // Handle the paginated response structure
      if (response && typeof response === "object" && "data" in response) {
        return { ...response, success: true };
      }
      // Fallback for direct array response
      const posts = Array.isArray(response) ? response : [];
      return { data: posts, total: posts.length, page, limit, success: true };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return {
        data: [],
        total: 0,
        page,
        limit,
        success: false,
        message: handleApiError(error),
      };
    }
  },

  getPostById: async (id: number) => {
    try {
      const response = await ContentService.contentControllerGetPost(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching post:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  createPost: async (data: CreatePostDto) => {
    try {
      const response = await ContentService.contentControllerCreatePost(data);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating post:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  updatePost: async (id: number, data: UpdatePostDto) => {
    try {
      const response = await ContentService.contentControllerUpdatePost(
        id.toString(),
        data
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error updating post:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  deletePost: async (id: number) => {
    try {
      await ContentService.contentControllerDeletePost(id.toString());
      return { success: true };
    } catch (error) {
      console.error("Error deleting post:", error);
      return { success: false, message: handleApiError(error) };
    }
  },

  // Comments
  createComment: async (data: any) => {
    try {
      const response = await ContentService.contentControllerCreateComment(
        data
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating comment:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  getCommentsForProject: async (projectId: number) => {
    try {
      const response =
        await ContentService.contentControllerGetCommentsForProject(
          projectId.toString()
        );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching comments:", error);
      return { data: [], success: false, message: handleApiError(error) };
    }
  },

  // Ratings
  createRating: async (data: any) => {
    try {
      const response = await ContentService.contentControllerCreateRating(data);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating rating:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  getRatingsForPost: async (postId: number) => {
    try {
      const response = await ContentService.contentControllerGetRatingsForPost(
        postId.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching ratings:", error);
      return { data: [], success: false, message: handleApiError(error) };
    }
  },

  // FAQ
  createFaq: async (data: any) => {
    try {
      const response = await ContentService.contentControllerCreateFaq(data);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating FAQ:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  getFaq: async (id: number) => {
    try {
      const response = await ContentService.contentControllerGetFaq(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching FAQ:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  // Statistics
  createStatistic: async (data: any) => {
    try {
      const response = await ContentService.contentControllerCreateStatistic(
        data
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating statistic:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  getStatistic: async (id: number) => {
    try {
      const response = await ContentService.contentControllerGetStatistic(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching statistic:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  // Sections
  createSection: async (data: any) => {
    try {
      const response = await ContentService.contentControllerCreateSection(
        data
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating section:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  getSection: async (id: number) => {
    try {
      const response = await ContentService.contentControllerGetSection(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching section:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  // Content References
  createReference: async (data: any) => {
    try {
      const response = await ContentService.contentControllerCreateReference(
        data
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating reference:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  getReference: async (id: number) => {
    try {
      const response = await ContentService.contentControllerGetReference(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching reference:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  // Share logs
  createShare: async (data: any) => {
    try {
      const response = await ContentService.contentControllerCreateShare(data);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating share:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  getShare: async (id: number) => {
    try {
      const response = await ContentService.contentControllerGetShare(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching share:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  getPostBySlug: async (slug: string) => {
    try {
      const response = await ContentService.contentControllerListPosts(
        1,
        100,
        "",
        0
      );
      const posts: any[] = response?.data || [];
      const post = posts.find((p) => p.slug === slug);
      if (post) {
        return { data: post, success: true };
      }
      return { data: null, success: false, message: "Post not found" };
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },
};
