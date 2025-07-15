"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { StatisticsList } from "@/components/content/statistics/StatisticsList";

interface StatType {
  number: number;
  suffix: string;
  label: string;
  labelAr: string;
  prefix?: string;
}

interface StatCardProps {
  stat: StatType;
  index: number;
  isInView: boolean;
}

const Stats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Trusted Globally
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of investors who trust us with their Islamic
            investment journey
          </p>
        </motion.div>
        <StatisticsList />
      </div>
    </section>
  );
};

const StatCard: React.FC<StatCardProps> = ({ stat, index, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.number;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="text-4xl md:text-5xl font-bold mb-4 text-primary">
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="text-lg font-medium text-gray-700 mb-2">{stat.label}</div>
      <div className="text-base text-gray-500" dir="rtl">
        {stat.labelAr}
      </div>
    </motion.div>
  );
};

export default Stats;
