import { Helmet } from "react-helmet-async";
import { SITE, getCanonical } from "@/config/site";

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;              // e.g. "/articles"
  image?: string;             // absolute or root-relative
  type?: "website" | "article" | "profile";
  keywords?: string[];
  noindex?: boolean;
  children?: React.ReactNode; // for extra JSON-LD or meta
}

/**
 * <SEO /> — universal head manager for every route.
 * Renders: title, description, canonical, robots, Open Graph, Twitter cards.
 * Every meta property targets Google, Bing, Facebook, LinkedIn, Twitter/X,
 * WhatsApp, Telegram, Discord, and Slack link previews.
 */
export const SEO = ({
  title,
  description = SITE.description,
  path = "/",
  image = SITE.defaultImage,
  type = "website",
  keywords = SITE.keywords,
  noindex = false,
  children,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.title;
  const canonical = getCanonical(path);
  const imageUrl = image.startsWith("http") ? image : `${SITE.url.replace(/\/hasan-portfolio$/, "")}${image}`;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={SITE.author.name} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"}
      />

      {/* Open Graph — Facebook, LinkedIn, WhatsApp, Discord, Slack */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={SITE.locale} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.author.twitter} />
      <meta name="twitter:creator" content={SITE.author.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Telegram picks up og:*, but this hint improves rich previews */}
      <meta name="theme-color" content="#00e5ff" />

      {children}
    </Helmet>
  );
};
