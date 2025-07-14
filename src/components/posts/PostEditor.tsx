"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCreatePost, useUpdatePost } from "@/hooks/api/useContent";
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  Image,
  Tag,
  Calendar,
  Settings,
  Globe,
  FileText,
  BarChart3,
} from "lucide-react";

interface PostEditorProps {
  post?: any;
  onClose: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, onClose }) => {
  const { language, isRTL, t } = useLanguage();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const [formData, setFormData] = useState({
    slug: "",
    title: { en: "", ar: "" },
    content: { en: "", ar: "" },
    excerpt: { en: "", ar: "" },
    featuredImage: "",
    tags: [] as string[],
    isFeatured: false,
    type: "BLOG" as const,
    categoryId: undefined as number | undefined,
  });

  const [newTag, setNewTag] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        slug: post.slug || "",
        title: post.title || { en: "", ar: "" },
        content: post.content || { en: "", ar: "" },
        excerpt: post.excerpt || { en: "", ar: "" },
        featuredImage: post.featuredImage || "",
        tags: post.tags || [],
        isFeatured: post.isFeatured || false,
        type: post.type || "BLOG",
        categoryId: post.categoryId,
      });
    }
  }, [post]);

  const handleSave = async (isDraft = true) => {
    try {
      const payload = {
        ...formData,
        publishedAt: isDraft ? null : new Date().toISOString(),
      };

      if (post) {
        await updatePost.mutateAsync({ id: post.id, data: payload });
      } else {
        await createPost.mutateAsync(payload);
      }

      onClose();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div
      className="min-h-screen bg-background-default"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background-default border-b border-border z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onClose}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {post ? "Edit Post" : "Create New Post"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {post
                    ? "Update your existing post"
                    : "Write and publish your new post"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 y-10">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? "Edit" : "Preview"}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave(true)}
                disabled={createPost.isLoading || updatePost.isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={() => handleSave(false)}
                disabled={createPost.isLoading || updatePost.isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Main Editor */}
          <div className="flex-1 p-6">
            {previewMode ? (
              <Card className="border-0 shadow-lg bg-card">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    {formData.featuredImage && (
                      <img
                        src={formData.featuredImage}
                        alt={formData.title[language]}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    )}
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                      {formData.title[language] || formData.title.en}
                    </h1>
                    <div className="text-muted-foreground mb-6">
                      {formData.excerpt[language] || formData.excerpt.en}
                    </div>
                    <div
                      className="text-foreground"
                      dangerouslySetInnerHTML={{
                        __html: (
                          formData.content[language] || formData.content.en
                        ).replace(/\n/g, "<br>"),
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Title & Slug */}
                <Card className="border-0 shadow-md bg-card">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Post Details
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tabs value={language} onValueChange={() => {}}>
                      <TabsList>
                        <TabsTrigger value="en">English</TabsTrigger>
                        <TabsTrigger value="ar">العربية</TabsTrigger>
                      </TabsList>

                      <TabsContent value="en" className="space-y-4">
                        <div>
                          <Label htmlFor="title-en">Title (English)</Label>
                          <Input
                            id="title-en"
                            value={formData.title.en}
                            onChange={(e) => {
                              const newTitle = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                title: { ...prev.title, en: newTitle },
                                slug: generateSlug(newTitle),
                              }));
                            }}
                            placeholder="Enter post title in English"
                            className="text-lg font-semibold"
                          />
                        </div>
                        <div>
                          <Label htmlFor="excerpt-en">Excerpt (English)</Label>
                          <Textarea
                            id="excerpt-en"
                            value={formData.excerpt.en}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                excerpt: {
                                  ...prev.excerpt,
                                  en: e.target.value,
                                },
                              }))
                            }
                            placeholder="Brief description of your post"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="content-en">Content (English)</Label>
                          <Textarea
                            id="content-en"
                            value={formData.content.en}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                content: {
                                  ...prev.content,
                                  en: e.target.value,
                                },
                              }))
                            }
                            placeholder="Write your post content here..."
                            rows={15}
                            className="font-mono"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="ar" className="space-y-4">
                        <div>
                          <Label htmlFor="title-ar">العنوان (العربية)</Label>
                          <Input
                            id="title-ar"
                            value={formData.title.ar}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                title: { ...prev.title, ar: e.target.value },
                              }))
                            }
                            placeholder="أدخل عنوان المنشور بالعربية"
                            className="text-lg font-semibold text-right"
                            dir="rtl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="excerpt-ar">المقتطف (العربية)</Label>
                          <Textarea
                            id="excerpt-ar"
                            value={formData.excerpt.ar}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                excerpt: {
                                  ...prev.excerpt,
                                  ar: e.target.value,
                                },
                              }))
                            }
                            placeholder="وصف مختصر للمنشور"
                            rows={3}
                            dir="rtl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="content-ar">المحتوى (العربية)</Label>
                          <Textarea
                            id="content-ar"
                            value={formData.content.ar}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                content: {
                                  ...prev.content,
                                  ar: e.target.value,
                                },
                              }))
                            }
                            placeholder="اكتب محتوى المنشور هنا..."
                            rows={15}
                            className="font-mono text-right"
                            dir="rtl"
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div>
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            slug: e.target.value,
                          }))
                        }
                        placeholder="url-friendly-slug"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 p-6 space-y-6">
            {/* Post Settings */}
            <Card className="border-0 shadow-md bg-card">
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Post Settings
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="type">Post Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BLOG">Blog</SelectItem>
                      <SelectItem value="NEWS">News</SelectItem>
                      <SelectItem value="EVENT">Event</SelectItem>
                      <SelectItem value="PAGE">Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="featured-image">Featured Image URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="featured-image"
                      value={formData.featuredImage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          featuredImage: e.target.value,
                        }))
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button variant="outline" size="sm">
                      <Image className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.featuredImage && (
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="mt-2 w-full h-32 object-cover rounded-md"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        isFeatured: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border-0 shadow-md bg-card">
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Tags
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analytics (if editing existing post) */}
            {post && (
              <Card className="border-0 shadow-md bg-card">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Analytics
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Views</span>
                    <span className="font-medium">{post.views || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comments</span>
                    <span className="font-medium">
                      {post.comments?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ratings</span>
                    <span className="font-medium">
                      {post.ratings?.length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
