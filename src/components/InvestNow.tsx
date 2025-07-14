import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  DollarSign,
  Shield,
  BarChart3,
  PieChart,
  Calendar,
  Star,
  Eye,
  Heart,
} from "lucide-react";

interface Investment {
  id: string;
  title: string;
  description: string;
  category: string;
  expectedReturn: string;
  duration: string;
  minInvestment: number;
  totalRequired: number;
  currentAmount: number;
  investors: number;
  riskLevel: "low" | "medium" | "high";
  shariaCertified: boolean;
  imageUrl: string;
  tags: string[];
}

const InvestNow = () => {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [investmentAmount, setInvestmentAmount] = useState(1000);

  // Dummy investment opportunities data
  const investments: Investment[] = [
    {
      id: "1",
      title: t("investments.opportunities.opp1.title"),
      description: t("investments.opportunities.opp1.description"),
      category: "Real Estate",
      expectedReturn: "12-15%",
      duration: "24 months",
      minInvestment: 5000,
      totalRequired: 500000,
      currentAmount: 350000,
      investors: 45,
      riskLevel: "low",
      shariaCertified: true,
      imageUrl: "/placeholder.svg",
      tags: ["Residential", "Dubai", "High Demand"],
    },
    {
      id: "2",
      title: t("investments.opportunities.opp2.title"),
      description: t("investments.opportunities.opp2.description"),
      category: "Technology",
      expectedReturn: "18-25%",
      duration: "36 months",
      minInvestment: 2500,
      totalRequired: 300000,
      currentAmount: 180000,
      investors: 72,
      riskLevel: "medium",
      shariaCertified: true,
      imageUrl: "/placeholder.svg",
      tags: ["FinTech", "Growth", "Innovation"],
    },
    {
      id: "3",
      title: t("investments.opportunities.opp3.title"),
      description: t("investments.opportunities.opp3.description"),
      category: "Healthcare",
      expectedReturn: "10-14%",
      duration: "18 months",
      minInvestment: 1000,
      totalRequired: 200000,
      currentAmount: 120000,
      investors: 89,
      riskLevel: "low",
      shariaCertified: true,
      imageUrl: "/placeholder.svg",
      tags: ["Medical", "Essential", "Stable"],
    },
  ];

  const categories = [
    { id: "all", name: t("investments.categories.all") },
    { id: "real-estate", name: t("investments.categories.realEstate") },
    { id: "technology", name: t("investments.categories.technology") },
    { id: "healthcare", name: t("investments.categories.healthcare") },
    { id: "energy", name: t("investments.categories.energy") },
  ];

  const portfolioStats = [
    {
      label: t("investments.stats.totalValue"),
      value: "$2.5M",
      icon: DollarSign,
      change: "+12.5%",
    },
    {
      label: t("investments.stats.activeInvestments"),
      value: "15",
      icon: TrendingUp,
      change: "+3",
    },
    {
      label: t("investments.stats.avgReturn"),
      value: "14.2%",
      icon: BarChart3,
      change: "+2.1%",
    },
    {
      label: t("investments.stats.totalReturn"),
      value: "$350K",
      icon: PieChart,
      change: "+8.7%",
    },
  ];

  const filteredInvestments = investments.filter(
    (investment) =>
      selectedCategory === "all" ||
      investment.category.toLowerCase().replace(" ", "-") === selectedCategory
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-secondary-600 bg-secondary-100";
      case "high":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

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
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
              <TrendingUp className="text-primary-600" size={40} />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-primary-800 mb-4">
            {t("investments.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("investments.subtitle")}
          </p>
        </motion.div>

        {/* Portfolio Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-primary-800 mb-8">
            {t("investments.portfolio.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                    <stat.icon className="text-primary-600" size={24} />
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-primary-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 bg-white rounded-2xl p-2 shadow-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Investment Opportunities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredInvestments.map((investment, index) => (
            <motion.div
              key={investment.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48">
                <img
                  src={investment.imageUrl}
                  alt={investment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="bg-primary-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {investment.category}
                  </span>
                  {investment.shariaCertified && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                      <Shield size={12} className="mr-1" />
                      {t("investments.shariaCertified")}
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${getRiskColor(
                      investment.riskLevel
                    )}`}
                  >
                    {t(`investments.risk.${investment.riskLevel}`)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-800 mb-2">
                  {investment.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {investment.description}
                </p>

                {/* Investment Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">
                      {t("investments.expectedReturn")}:
                    </span>
                    <span className="font-semibold text-green-600">
                      {investment.expectedReturn}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">
                      {t("investments.duration")}:
                    </span>
                    <span className="font-semibold">{investment.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">
                      {t("investments.minInvestment")}:
                    </span>
                    <span className="font-semibold">
                      ${investment.minInvestment.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      {t("investments.progress")}
                    </span>
                    <span className="font-semibold">
                      {Math.round(
                        (investment.currentAmount / investment.totalRequired) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (investment.currentAmount /
                            investment.totalRequired) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>${investment.currentAmount.toLocaleString()}</span>
                    <span>${investment.totalRequired.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {investment.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      {investment.investors}
                    </span>
                    <span className="flex items-center">
                      <Star size={14} className="mr-1" />
                      4.8
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="group-hover:bg-primary-600 group-hover:text-white transition-colors"
                    >
                      {t("investments.details")}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      {t("investments.invest")}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Investment Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {t("investments.calculator.title")}
              </h3>
              <p className="text-primary-100 mb-6">
                {t("investments.calculator.description")}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("investments.calculator.amount")}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={investmentAmount}
                      onChange={(e) =>
                        setInvestmentAmount(Number(e.target.value))
                      }
                      className="flex-1"
                    />
                    <span className="font-bold text-xl">
                      ${investmentAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span>{t("investments.calculator.estimatedReturn")}:</span>
                    <span className="font-bold">
                      ${Math.round(investmentAmount * 1.14).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("investments.calculator.profit")}:</span>
                    <span className="font-bold text-green-300">
                      ${Math.round(investmentAmount * 0.14).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
                {t("investments.calculator.startInvesting")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestNow;
