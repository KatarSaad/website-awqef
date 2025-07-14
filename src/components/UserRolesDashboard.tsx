"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  User,
  Building,
  Shield,
  Crown,
  Eye,
  MessageCircle,
  Plus,
  Edit,
  Megaphone,
  Archive,
  Trash2,
} from "lucide-react";

const UserRolesDashboard = () => {
  const { t, isRTL } = useLanguage();

  const userRoles = [
    {
      id: "guest",
      title: t("roles.guest"),
      icon: User,
      color: "grey",
      actions: [
        {
          id: "view-posts",
          title: t("actions.viewPosts"),
          icon: Eye,
          available: true,
        },
      ],
    },
    {
      id: "investor",
      title: t("roles.investor"),
      icon: Building,
      color: "primary",
      actions: [
        {
          id: "view-posts",
          title: t("actions.viewPosts"),
          icon: Eye,
          available: true,
        },
        {
          id: "comment",
          title: t("actions.comment"),
          icon: MessageCircle,
          available: true,
        },
      ],
    },
    {
      id: "institution",
      title: t("roles.institution"),
      icon: Shield,
      color: "secondary",
      actions: [
        {
          id: "view-posts",
          title: t("actions.viewPosts"),
          icon: Eye,
          available: true,
        },
        {
          id: "comment",
          title: t("actions.comment"),
          icon: MessageCircle,
          available: true,
        },
        {
          id: "create-post",
          title: t("actions.createPost"),
          icon: Plus,
          available: true,
        },
        {
          id: "edit-post",
          title: t("actions.editPost"),
          icon: Edit,
          available: true,
        },
      ],
    },
    {
      id: "admin",
      title: t("roles.admin"),
      icon: Crown,
      color: "accent",
      actions: [
        {
          id: "view-posts",
          title: t("actions.viewPosts"),
          icon: Eye,
          available: true,
        },
        {
          id: "comment",
          title: t("actions.comment"),
          icon: MessageCircle,
          available: true,
        },
        {
          id: "create-post",
          title: t("actions.createPost"),
          icon: Plus,
          available: true,
        },
        {
          id: "edit-post",
          title: t("actions.editPost"),
          icon: Edit,
          available: true,
        },
        {
          id: "publish-post",
          title: t("actions.publishPost"),
          icon: Megaphone,
          available: true,
        },
        {
          id: "archive-post",
          title: t("actions.archivePost"),
          icon: Archive,
          available: true,
        },
        {
          id: "delete-post",
          title: t("actions.deletePost"),
          icon: Trash2,
          available: true,
        },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      grey: "bg-grey-100 text-grey-700 border-grey-300",
      primary: "bg-primary-100 text-primary-700 border-primary-300",
      secondary: "bg-secondary-100 text-secondary-700 border-secondary-300",
      accent: "bg-accent-100 text-accent-700 border-accent-300",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.grey;
  };

  return (
    <section className="py-20 bg-background-light">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {t("userRoles.title")}
          </h2>
          <h3
            className="text-2xl md:text-3xl font-light text-primary-700 mb-6"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {t("userRoles.subtitle")}
          </h3>
          <p className="text-xl text-grey-600 max-w-2xl mx-auto">
            {t("userRoles.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {userRoles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-paper rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-grey-200"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${getColorClasses(
                  role.color
                )} flex items-center justify-center mb-6 mx-auto`}
              >
                <role.icon size={32} />
              </div>

              <h3 className="text-xl font-bold text-grey-900 mb-6 text-center">
                {role.title}
              </h3>

              <div className="space-y-3">
                {role.actions.map((action, actionIndex) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + actionIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      action.available
                        ? "bg-success-50 border-success-200 text-success-800"
                        : "bg-grey-50 border-grey-200 text-grey-500"
                    } ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <action.icon size={18} />
                    <span className="text-sm font-medium">{action.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-paper rounded-2xl p-8 shadow-lg border border-grey-200"
        >
          <h3 className="text-2xl font-bold text-primary-900 mb-6 text-center">
            {t("userRoles.flowTitle")}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {[
              t("userRoles.flowStep.create"),
              t("userRoles.flowStep.edit"),
              t("userRoles.flowStep.review"),
              t("userRoles.flowStep.publish"),
              t("userRoles.flowStep.archive"),
            ].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-grey-700 mt-2">
                    {step}
                  </span>
                </div>
                {index < 4 && (
                  <div className="w-8 h-0.5 bg-primary-300 hidden sm:block"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserRolesDashboard;
