import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Shield,
  CheckCircle,
  FileText,
  Award,
  Users,
  Download,
  Eye,
} from "lucide-react";

interface Fatwa {
  id: string;
  title: string;
  scholar: string;
  date: string;
  summary: string;
  documentUrl: string;
  status: "approved" | "pending" | "under-review";
  category: string;
}

interface Certification {
  id: string;
  title: string;
  issuingBody: string;
  issueDate: string;
  expiryDate: string;
  documentUrl: string;
  badgeUrl: string;
}

const Compliance = () => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy data for fatwas
  const fatwas: Fatwa[] = [
    {
      id: "1",
      title: t("compliance.fatwas.fatwa1.title"),
      scholar: "Dr. Ahmed Al-Rashid",
      date: "2024-01-15",
      summary: t("compliance.fatwas.fatwa1.summary"),
      documentUrl: "/documents/fatwa-1.pdf",
      status: "approved",
      category: "Investment Products",
    },
    {
      id: "2",
      title: t("compliance.fatwas.fatwa2.title"),
      scholar: "Sheikh Mohamed Al-Qaradawi",
      date: "2024-01-10",
      summary: t("compliance.fatwas.fatwa2.summary"),
      documentUrl: "/documents/fatwa-2.pdf",
      status: "approved",
      category: "Real Estate",
    },
    {
      id: "3",
      title: t("compliance.fatwas.fatwa3.title"),
      scholar: "Dr. Yusuf Al-Mansouri",
      date: "2024-01-05",
      summary: t("compliance.fatwas.fatwa3.summary"),
      documentUrl: "/documents/fatwa-3.pdf",
      status: "under-review",
      category: "Technology",
    },
  ];

  // Dummy data for certifications
  const certifications: Certification[] = [
    {
      id: "1",
      title: "AAOIFI Compliance Certificate",
      issuingBody:
        "Accounting and Auditing Organization for Islamic Financial Institutions",
      issueDate: "2023-12-01",
      expiryDate: "2024-12-01",
      documentUrl: "/certificates/aaoifi-cert.pdf",
      badgeUrl: "/badges/aaoifi-badge.png",
    },
    {
      id: "2",
      title: "Islamic Finance Board Certification",
      issuingBody: "Islamic Financial Services Board",
      issueDate: "2023-11-15",
      expiryDate: "2024-11-15",
      documentUrl: "/certificates/ifsb-cert.pdf",
      badgeUrl: "/badges/ifsb-badge.png",
    },
  ];

  const complianceStats = [
    {
      label: t("compliance.stats.approvedFatwas"),
      value: "25+",
      icon: CheckCircle,
    },
    { label: t("compliance.stats.certifications"), value: "8", icon: Award },
    { label: t("compliance.stats.scholars"), value: "12", icon: Users },
    {
      label: t("compliance.stats.complianceRate"),
      value: "100%",
      icon: Shield,
    },
  ];

  const tabs = [
    { id: "overview", label: t("compliance.tabs.overview"), icon: Shield },
    { id: "fatwas", label: t("compliance.tabs.fatwas"), icon: FileText },
    {
      id: "certifications",
      label: t("compliance.tabs.certifications"),
      icon: Award,
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <Shield className="text-green-600" size={40} />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-primary-800 mb-4">
            {t("compliance.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("compliance.subtitle")}
          </p>
        </motion.div>

        {/* Compliance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {complianceStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-green-600" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-primary-800 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 bg-white rounded-2xl p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-primary-800 mb-6">
                  {t("compliance.overview.principles.title")}
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start space-x-3">
                      <CheckCircle className="text-green-500 mt-1" size={20} />
                      <p className="text-gray-700">
                        {t(`compliance.overview.principles.principle${item}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-primary-800 mb-6">
                  {t("compliance.overview.process.title")}
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary-800 mb-1">
                          {t(`compliance.overview.process.step${step}.title`)}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {t(
                            `compliance.overview.process.step${step}.description`
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "fatwas" && (
            <div className="space-y-6">
              {fatwas.map((fatwa, index) => (
                <motion.div
                  key={fatwa.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-primary-800">
                          {fatwa.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            fatwa.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : fatwa.status === "pending"
                              ? "bg-secondary-100 text-secondary-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {t(`compliance.status.${fatwa.status}`)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span>{fatwa.scholar}</span>
                        <span>{new Date(fatwa.date).toLocaleDateString()}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {fatwa.category}
                        </span>
                      </div>
                      <p className="text-gray-700">{fatwa.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Eye size={16} />
                      <span>{t("compliance.viewDocument")}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Download size={16} />
                      <span>{t("compliance.download")}</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                      <Award className="text-primary-600" size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary-800">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {cert.issuingBody}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {t("compliance.issueDate")}:
                      </span>
                      <span className="font-medium">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {t("compliance.expiryDate")}:
                      </span>
                      <span className="font-medium">
                        {new Date(cert.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Eye size={16} />
                      <span>{t("compliance.viewCertificate")}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Download size={16} />
                      <span>{t("compliance.download")}</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Compliance;
