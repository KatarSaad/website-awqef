import React from "react";
import { Helmet } from "react-helmet-async";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: object;
}

const Seo: React.FC<SeoProps> = ({
  title = "Awqef - Islamic Investment Platform",
  description = "Leading Islamic investment platform offering Sharia-compliant investment opportunities. Grow your wealth ethically with our curated halal investment options.",
  keywords = "Islamic investment, Sharia compliant, halal investment, Islamic finance, ethical investing, sukuk, Islamic banking, awqaf",
  canonical = "https://awqef.com/",
  image = "https://awqef.com/og-image.jpg",
  type = "website",
  structuredData,
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Awqef Investment Platform" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@awqef_invest" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Language and Regional Tags */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ar_SA" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Awqef Investment Platform" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/icon.jpg" />
      <link rel="alternate icon" href="/icon.ico" />

      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
    </Helmet>
  );
};

export default Seo;
