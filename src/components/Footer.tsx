"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Shield,
  Award,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t("footer.platform.title") || "Platform",
      links: [
        {
          name: t("footer.platform.howItWorks") || "How It Works",
          href: "/how-it-works",
        },
        {
          name: t("footer.platform.investments") || "Investment Options",
          href: "/investments",
        },
        {
          name: t("footer.platform.sharia") || "Sharia Compliance",
          href: "/sharia",
        },
        {
          name: t("footer.platform.calculator") || "Returns Calculator",
          href: "/calculator",
        },
      ],
    },
    {
      title: t("footer.company.title") || "Company",
      links: [
        { name: t("footer.company.about") || "About Us", href: "/about" },
        { name: t("footer.company.team") || "Our Team", href: "/team" },
        { name: t("footer.company.careers") || "Careers", href: "/careers" },
        { name: t("footer.company.press") || "Press & Media", href: "/press" },
      ],
    },
    {
      title: t("footer.resources.title") || "Resources",
      links: [
        { name: t("footer.resources.blog") || "Blog", href: "/blog" },
        {
          name: t("footer.resources.research") || "Research",
          href: "/research",
        },
        { name: t("footer.resources.help") || "Help Center", href: "/help" },
        {
          name: t("footer.resources.webinars") || "Webinars",
          href: "/webinars",
        },
      ],
    },
    {
      title: t("footer.legal.title") || "Legal",
      links: [
        { name: t("footer.legal.terms") || "Terms of Service", href: "/terms" },
        {
          name: t("footer.legal.privacy") || "Privacy Policy",
          href: "/privacy",
        },
        { name: t("footer.legal.risks") || "Risk Disclosure", href: "/risks" },
        {
          name: t("footer.legal.compliance") || "Compliance",
          href: "/compliance",
        },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const certifications = [
    { icon: Shield, text: "Sharia Certified", textAr: "معتمد شرعياً" },
    { icon: Award, text: "Regulated Platform", textAr: "منصة منظمة" },
    { icon: Globe, text: "Global Reach", textAr: "انتشار عالمي" },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-800 py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <h4 className="text-2xl font-semibold mb-6" dir="rtl">
              ابق على اطلاع
            </h4>
            <p className="text-primary-200 mb-8 text-lg">
              Get the latest insights on Islamic investment opportunities and
              market trends
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-primary-900 placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-secondary-400"
              />
              <button className="bg-secondary-500 hover:bg-secondary-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary-400 to-secondary-300 bg-clip-text text-transparent mb-2">
                  Awqef
                </h2>
                <h3
                  className="text-xl font-semibold text-primary-200"
                  dir="rtl"
                >
                  أوقاف
                </h3>
              </div>
              <p className="text-primary-200 mb-6 leading-relaxed">
                Leading Islamic investment platform connecting investors with
                Sharia-compliant opportunities worldwide.
              </p>
              <p className="text-primary-300 mb-6 leading-relaxed" dir="rtl">
                منصة الاستثمار الإسلامي الرائدة التي تربط المستثمرين بالفرص
                المتوافقة مع الشريعة في جميع أنحاء العالم.
              </p>

              {/* Certifications */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <cert.icon size={16} className="text-success-400" />
                    <span className="text-sm text-primary-200">
                      {cert.text}
                    </span>
                    <span className="text-xs text-primary-300" dir="rtl">
                      ({cert.textAr})
                    </span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-800 hover:bg-secondary-600 p-3 rounded-full transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h4 className="text-lg font-semibold mb-2">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-primary-200 hover:text-secondary-400 transition-colors duration-300 block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-primary-950 py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Mail size={20} className="text-secondary-400" />
              <span className="text-primary-200">info@awqef.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Phone size={20} className="text-secondary-400" />
              <span className="text-primary-200">+971 4 123 4567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <MapPin size={20} className="text-secondary-400" />
              <span className="text-primary-200">Saudi Arabia</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-primary-950 border-t border-primary-800 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-300 text-sm">
              © {currentYear} Awqef Investment Platform. All rights reserved.
            </p>
            <p className="text-primary-400 text-sm" dir="rtl">
              © {currentYear} منصة أوقاف للاستثمار. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
