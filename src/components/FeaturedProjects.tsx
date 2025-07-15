"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/api/useProjects";

const FeaturedProjects = () => {
  const { t, isRTL, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch projects data
  const { data: projectsData, isLoading } = useProjects();
  const projects = projectsData?.data || [];
  // Mock data if no projects are available
  const mockProjects = [
    {
      id: 1,
      title: {
        en: "Sustainable Housing Project",
        ar: "مشروع الإسكان المستدام",
      },
      description: {
        en: "Building eco-friendly homes for communities in need",
        ar: "بناء منازل صديقة للبيئة للمجتمعات المحتاجة",
      },
      raisedAmount: 250000,
      targetAmount: 500000,
      category: { name: { en: "Housing", ar: "الإسكان" } },
      status: "active",
      featuredImage:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1000",
    },
    {
      id: 2,
      title: {
        en: "Clean Water Initiative",
        ar: "مبادرة المياه النظيفة",
      },
      description: {
        en: "Providing clean water access to rural communities",
        ar: "توفير الوصول إلى المياه النظيفة للمجتمعات الريفية",
      },
      raisedAmount: 120000,
      targetAmount: 300000,
      category: { name: { en: "Infrastructure", ar: "البنية التحتية" } },
      status: "active",
      featuredImage:
        "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1000",
    },
    {
      id: 3,
      title: { en: "Education Fund", ar: "صندوق التعليم" },
      description: {
        en: "Supporting education for underprivileged children",
        ar: "دعم التعليم للأطفال المحرومين",
      },
      raisedAmount: 75000,
      targetAmount: 150000,
      category: { name: { en: "Education", ar: "التعليم" } },
      status: "active",
      featuredImage:
        "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1000",
    },
    {
      id: 4,
      title: { en: "Healthcare Clinic", ar: "عيادة الرعاية الصحية" },
      description: {
        en: "Building a modern healthcare facility in underserved areas",
        ar: "بناء مرفق رعاية صحية حديث في المناطق المحرومة من الخدمات",
      },
      raisedAmount: 320000,
      targetAmount: 400000,
      category: { name: { en: "Healthcare", ar: "الرعاية الصحية" } },
      status: "active",
      featuredImage:
        "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1000",
    },
    {
      id: 5,
      title: { en: "Renewable Energy", ar: "الطاقة المتجددة" },
      description: {
        en: "Installing solar panels in rural communities",
        ar: "تركيب ألواح شمسية في المجتمعات الريفية",
      },
      raisedAmount: 180000,
      targetAmount: 350000,
      category: { name: { en: "Energy", ar: "الطاقة" } },
      status: "active",
      featuredImage:
        "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1000",
    },
  ];

  // Get translated text helper
  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || field.ar || Object.values(field)[0] || "";
  };

  // Add images to projects if they don't have them
  const projectsWithImages = projects.map((project) => {
    if (!project.featuredImage) {
      // Use reliable static images instead of dynamic ones
      const staticImages = [
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1000",
        "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1000",
        "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1000",
        "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1000",
        "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1000",
      ];

      return {
        ...project,
        featuredImage:
          staticImages[Math.floor(Math.random() * staticImages.length)],
      };
    }
    return project;
  });

  // Use projects with images or mock data if no projects
  const featuredProjects =
    projectsWithImages.length > 0
      ? projectsWithImages.slice(0, 5)
      : mockProjects;

  // Auto-play functionality with faster transitions (2 seconds)
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, featuredProjects.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Remove console log

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProjects.length - 1 : prevIndex - 1
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate progress percentage
  const calculateProgress = (raised: number, target: number) => {
    return Math.min(Math.round((raised / target) * 100), 100);
  };

  return (
    <section
      className="py-24 bg-gray-50 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("featuredProjects.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mt-6">
            {t("featuredProjects.subtitle")}
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={carouselRef}
          >
            {/* Main Carousel */}
            <div className="overflow-hidden rounded-2xl shadow-xl w-full max-w-[1000px] mx-auto transition-all duration-300">
              <div className="relative h-[400px] md:h-[550px]">
                <AnimatePresence mode="wait">
                  {featuredProjects.map(
                    (project, index) =>
                      index === currentIndex && (
                        <motion.div
                          key={project.id}
                          initial={{
                            opacity: 0,
                            x: 100 * (index > currentIndex ? 1 : -1),
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: -100 * (index > currentIndex ? -1 : 1),
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                            {/* Image Section */}
                            <div className="relative h-full">
                              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
                              <div
                                className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-600"
                                style={{
                                  backgroundImage: project.featuredImage
                                    ? `url(${project.featuredImage})`
                                    : "none",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                }}
                              ></div>
                            </div>

                            {/* Content Section */}
                            <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                              <div className="space-y-6">
                                <div>
                                  <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                                    {getTranslatedText(
                                      project.category?.name
                                    ) || t("projects.category")}
                                  </Badge>
                                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                                    {getTranslatedText(project.title)}
                                  </h3>
                                  <p className="text-gray-600 line-clamp-3">
                                    {getTranslatedText(project.description)}
                                  </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                      style={{
                                        width: `${calculateProgress(
                                          project.raisedAmount || 0,
                                          project.targetAmount || 1
                                        )}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">
                                      {formatCurrency(
                                        project.raisedAmount || 0
                                      )}{" "}
                                      {t("projects.raised")}
                                    </span>
                                    <span className="text-gray-500">
                                      {calculateProgress(
                                        project.raisedAmount || 0,
                                        project.targetAmount || 1
                                      )}
                                      %
                                    </span>
                                    <span className="font-medium">
                                      {formatCurrency(
                                        project.targetAmount || 0
                                      )}{" "}
                                      {t("projects.goal")}
                                    </span>
                                  </div>
                                </div>

                                <div className="pt-4">
                                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                    {t("projects.viewDetails")}
                                    <ExternalLink size={16} className="ml-2" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-20"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-20"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 text-black ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Thumbnail Preview */}
            <div className="hidden md:flex justify-center mt-8 space-x-4">
              {featuredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-primary ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className="w-20 h-12 bg-gradient-to-br from-primary-200 to-primary-600"
                    style={{
                      backgroundImage: project.featuredImage
                        ? `url(${project.featuredImage})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t("featuredProjects.viewAll")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
