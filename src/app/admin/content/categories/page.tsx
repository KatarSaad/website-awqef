"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "@/api/generated/services/CategoryService";
import { CategoryResponseDto } from "@/api/generated/models/CategoryResponseDto";
import { CreateCategoryDto } from "@/api/generated/models/CreateCategoryDto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderTree, Plus, Search, Trash, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

// Helper function to get translated text
const getTranslatedText = (field: any, language: string) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field[language]) return field[language];
  return field.en || field.ar || "";
};

export default function AdminContentCategories() {
  const { t, language } = useLanguage();
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryType, setCategoryType] = useState<"content" | "project">(
    "content"
  );

  // Form state - using proper structure for TranslationDto
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
  });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin", "categories", categoryType],
    queryFn: () => CategoryService.categoryControllerListCategories(),
  });

  const categories = categoriesData || [];
  const filteredCategories = search
    ? categories.filter((category: CategoryResponseDto) => {
        const nameEn = getTranslatedText(category.name, "en");
        const nameAr = getTranslatedText(category.name, "ar");
        return (
          nameEn.toLowerCase().includes(search.toLowerCase()) ||
          nameAr.includes(search)
        );
      })
    : categories;

  const handleCreateCategory = async () => {
    try {
      // Convert form data to TranslationDto format
      const categoryData: CreateCategoryDto = {
        name: {
          en: formData.nameEn || "",
          ar: formData.nameAr || "",
        },
        description:
          formData.descriptionEn || formData.descriptionAr
            ? {
                en: formData.descriptionEn || "",
                ar: formData.descriptionAr || "",
              }
            : undefined,
      };

      await CategoryService.categoryControllerCreateCategory(categoryData);
      toast.success(t("common.success"));
      setIsCreating(false);
      refetch();
      resetForm();
    } catch (error) {
      toast.error(t("common.error"));
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await CategoryService.categoryControllerDeleteCategory(id);
      toast.success(t("common.success"));
      refetch();
    } catch (error) {
      toast.error(t("common.error"));
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("admin.categories.listTitle")}
        </h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t("admin.categories.newCategory")}
        </Button>
      </div>

      <Tabs
        defaultValue="content"
        value={categoryType}
        onValueChange={(value) =>
          setCategoryType(value as "content" | "project")
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">
            {t("admin.categories.contentCategories")}
          </TabsTrigger>
          <TabsTrigger value="project">
            {t("admin.categories.projectCategories")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t("admin.categories.contentCategories")}</CardTitle>
              <CardDescription>
                {t("admin.categories.manageContentCategories")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t("admin.categories.searchCategories")}
                    className="pl-8 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.categories.nameEn")}</TableHead>
                      <TableHead>{t("admin.categories.nameAr")}</TableHead>
                      <TableHead>{t("common.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredCategories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">
                          {t("admin.categories.noCategoriesFound")}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCategories.map(
                        (category: CategoryResponseDto) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <FolderTree className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {getTranslatedText(category.name, "en") ||
                                    t("admin.categories.unnamedCategory")}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell dir="rtl">
                              {getTranslatedText(category.name, "ar") || "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">
                                      {t("common.actions")}
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                      handleDeleteCategory(category.id)
                                    }
                                  >
                                    <Trash className="mr-2 h-4 w-4" />{" "}
                                    {t("common.delete")}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="project" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t("admin.categories.projectCategories")}</CardTitle>
              <CardDescription>
                {t("admin.categories.manageProjectCategories")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t("admin.categories.searchCategories")}
                    className="pl-8 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.categories.nameEn")}</TableHead>
                      <TableHead>{t("admin.categories.nameAr")}</TableHead>
                      <TableHead className="text-right">
                        {t("common.actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Similar content as above but for project categories */}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Category Dialog */}
      <Dialog
        open={isCreating}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreating(false);
            resetForm();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("admin.categories.createNewCategory")}</DialogTitle>
            <DialogDescription>
              {t("admin.categories.categoryDetails")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("admin.categories.nameEn")}
                </label>
                <Input
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("admin.categories.nameAr")}
                </label>
                <Input
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleInputChange}
                  dir="rtl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("admin.categories.descriptionEn")}
              </label>
              <Input
                name="descriptionEn"
                value={formData.descriptionEn}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("admin.categories.descriptionAr")}
              </label>
              <Input
                name="descriptionAr"
                value={formData.descriptionAr}
                onChange={handleInputChange}
                dir="rtl"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreating(false);
                resetForm();
              }}
            >
              {t("common.cancel")}
            </Button>
            <Button onClick={handleCreateCategory}>
              {t("admin.categories.createCategory")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
