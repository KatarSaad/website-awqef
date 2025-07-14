
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Eye, Upload, Tag, Calendar, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreatePost, useUpdatePost } from "@/hooks/api/useContent";
import { CreatePostDto, PostResponseDto } from "@/api/generated";

interface PostEditorProps {
  post?: PostResponseDto;
  onSave?: (post: any) => void;
  onCancel?: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, onSave, onCancel }) => {
  const { t, language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    title: { en: "", ar: "" },
    content: { en: "", ar: "" },
    excerpt: { en: "", ar: "" },
    slug: "",
    tags: [] as string[],
    featuredImage: "",
    isFeatured: false,
    type: "BLOG" as const,
    categoryId: 0,
    publishedAt: "",
  });
  const [currentTag, setCurrentTag] = useState("");
  const [isDraft, setIsDraft] = useState(true);

  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  useEffect(() => {
    if (post) {
      setFormData({
        title: typeof post.title === 'object' ? post.title : { en: post.title as string, ar: "" },
        content: typeof post.content === 'object' ? post.content : { en: post.content as string, ar: "" },
        excerpt: typeof post.excerpt === 'object' ? post.excerpt : { en: post.excerpt as string || "", ar: "" },
        slug: post.slug,
        tags: post.tags || [],
        featuredImage: post.featuredImage || "",
        isFeatured: post.isFeatured || false,
        type: post.type || "BLOG",
        categoryId: post.categoryId || 0,
        publishedAt: post.publishedAt || "",
      });
      setIsDraft(!post.publishedAt);
    }
  }, [post]);

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    const postData: CreatePostDto = {
      slug: formData.slug,
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      featuredImage: formData.featuredImage,
      tags: formData.tags,
      isFeatured: formData.isFeatured,
      type: formData.type,
      categoryId: formData.categoryId || undefined,
    };

    try {
      if (post) {
        await updatePostMutation.mutateAsync({ id: post.id, data: postData });
      } else {
        await createPostMutation.mutateAsync(postData);
      }
      onSave?.(postData);
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6" dir={isRTL ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-900">
            {post ? t("blog.editPost") : t("blog.createPost")}
          </h1>
          <div className="flex items-center space-x-3">
            <Switch
              checked={!isDraft}
              onCheckedChange={(checked) => setIsDraft(!checked)}
            />
            <span className="text-sm text-gray-600">
              {isDraft ? t("blog.draft") : t("blog.published")}
            </span>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg border p-6 space-y-4">
          <h2 className="font-semibold text-lg">{t("blog.basicInfo")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t("blog.titleEn")}</label>
              <Input
                value={formData.title.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  title: { ...prev.title, en: e.target.value }
                }))}
                placeholder={t("blog.titlePlaceholder")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t("blog.titleAr")}</label>
              <Input
                value={formData.title.ar}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  title: { ...prev.title, ar: e.target.value }
                }))}
                placeholder={t("blog.titlePlaceholder")}
                dir="rtl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("blog.slug")}</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="post-url-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("blog.featuredImage")}</label>
            <div className="flex space-x-2">
              <Input
                value={formData.featuredImage}
                onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
              <Button variant="outline" size="sm">
                <Upload size={16} className="mr-1" />
                {t("common.upload")}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg border p-6 space-y-4">
          <h2 className="font-semibold text-lg">{t("blog.content")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t("blog.excerptEn")}</label>
              <Textarea
                value={formData.excerpt.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  excerpt: { ...prev.excerpt, en: e.target.value }
                }))}
                placeholder={t("blog.excerptPlaceholder")}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t("blog.excerptAr")}</label>
              <Textarea
                value={formData.excerpt.ar}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  excerpt: { ...prev.excerpt, ar: e.target.value }
                }))}
                placeholder={t("blog.excerptPlaceholder")}
                rows={3}
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t("blog.contentEn")}</label>
              <Textarea
                value={formData.content.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, en: e.target.value }
                }))}
                placeholder={t("blog.contentPlaceholder")}
                rows={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t("blog.contentAr")}</label>
              <Textarea
                value={formData.content.ar}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, ar: e.target.value }
                }))}
                placeholder={t("blog.contentPlaceholder")}
                rows={10}
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-lg border p-6 space-y-4">
          <h2 className="font-semibold text-lg">{t("blog.metadata")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t("blog.type")}</label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BLOG">{t("blog.types.blog")}</SelectItem>
                  <SelectItem value="NEWS">{t("blog.types.news")}</SelectItem>
                  <SelectItem value="EVENT">{t("blog.types.event")}</SelectItem>
                  <SelectItem value="PAGE">{t("blog.types.page")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
              />
              <label className="text-sm font-medium">{t("blog.featured")}</label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">{t("blog.tags")}</label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder={t("blog.addTag")}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button onClick={handleAddTag} variant="outline" size="sm">
                <Tag size={16} className="mr-1" />
                {t("common.add")}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={createPostMutation.isPending || updatePostMutation.isPending}
            >
              <Save size={16} className="mr-1" />
              {t("blog.saveDraft")}
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={createPostMutation.isPending || updatePostMutation.isPending}
            >
              <Globe size={16} className="mr-1" />
              {isDraft ? t("blog.publish") : t("blog.update")}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
