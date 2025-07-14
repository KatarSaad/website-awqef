"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, FileText } from "lucide-react";
import { useCreatePost } from "@/hooks/api/useContent";
import { useCreateWebsiteComment } from "@/hooks/api/useWebsiteComments";
import { useCreateRating } from "@/hooks/api/useRatings";
import { useCreateShareLog } from "@/hooks/api/useShareLogs";
import { useCreateFaq } from "@/hooks/api/useFaqs";
import { useCreateContentReference } from "@/hooks/api/useContentReferences";
import { CreatePostDto } from "@/api/generated/models/CreatePostDto";
import { CreateContentReferenceDto } from "@/api/generated/models/CreateContentReferenceDto";

const translation = (en: string, ar: string) => ({ en, ar });
const randomString = (length = 6) =>
  Math.random()
    .toString(36)
    .substring(2, 2 + length);
const randomUrl = () =>
  `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 10000)}`;

interface ContentSeedButtonProps {
  onSeedComplete?: () => void;
}

export const ContentSeedButton: React.FC<ContentSeedButtonProps> = ({
  onSeedComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const createPost = useCreatePost().mutateAsync;
  const createWebsiteComment = useCreateWebsiteComment().mutateAsync;
  const createRating = useCreateRating().mutateAsync;
  const createShareLog = useCreateShareLog().mutateAsync;
  const createFaq = useCreateFaq().mutateAsync;
  const createContentReference = useCreateContentReference().mutateAsync;

  const seedContent = async () => {
    setLoading(true);
    try {
      // 1. Seed Posts (Sections are not a separate entity, so we use posts as main content)
      const posts = [];
      // 1a. Create a section post to use as sectionId for content references
      const sectionPost = await createPost({
        slug: `section-${randomString(6)}`,
        title: translation("Seed Section", "قسم افتراضي"),
        content: translation("Section content", "محتوى القسم"),
        tags: ["section", "seed"],
        type: CreatePostDto.type.BLOG,
      });
      const sectionId = sectionPost?.id;
      for (let i = 0; i < 5; i++) {
        const post = await createPost({
          slug: `post-${randomString(6)}`,
          title: translation(
            `Post ${randomString(4)}`,
            `مقال ${randomString(4)}`
          ),
          content: translation(`Content EN ${i + 1}`, `محتوى AR ${i + 1}`),
          tags: ["test", "seed"],
          type: CreatePostDto.type.BLOG,
        });
        if (post) posts.push(post);
      }

      // 2. Seed Comments, Ratings, Share Logs, Content References for each post
      for (const post of posts) {
        const postId = post?.id;
        if (!postId) continue;
        await createWebsiteComment({
          postId,
          authorId: 1,
          content: "Seeded comment for post",
        });
        await createRating({
          postId,
          userId: 1,
          value: Math.floor(Math.random() * 5) + 1,
        });
        await createShareLog({
          postId,
          platform: "facebook",
          userId: 1,
        });
        if (sectionId) {
          await createContentReference({
            sectionId,
            contentType: CreateContentReferenceDto.contentType.POST,
            contentId: postId,
            order: 1,
          });
        }
      }

      // 3. Seed FAQs
      for (let i = 0; i < 5; i++) {
        await createFaq({
          question: translation(`FAQ Q${i + 1} EN`, `سؤال ${i + 1} AR`),
          answer: translation(`FAQ A${i + 1} EN`, `جواب ${i + 1} AR`),
          order: i + 1,
        });
      }

      toast.success("Successfully seeded all content entities!");
      onSeedComplete?.();
    } catch (err) {
      console.error("Seed content error:", err);
      toast.error("Failed to seed content: " + (err as any)?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={seedContent}
      disabled={loading}
      className="flex items-center justify-center h-24 flex-col space-y-2 bg-green-600 hover:bg-green-700 w-full"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <FileText size={24} />
      )}
      <span className="text-sm font-medium">
        {loading ? "Seeding..." : "Seed Content"}
      </span>
      <span className="text-xs opacity-75">5 posts + sub-entities</span>
    </Button>
  );
};
