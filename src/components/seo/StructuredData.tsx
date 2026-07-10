import { Helmet } from "react-helmet-async";
import { SITE, getCanonical } from "@/config/site";

/** Injects a JSON-LD <script> block into <head>. */
export const StructuredData = ({ data }: { data: object | object[] }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

/* ---------- Schema builders (Google-recommended shapes) ---------- */

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/articles?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/favicon.ico`,
  sameAs: [SITE.author.github, SITE.author.linkedin, `https://twitter.com/${SITE.author.twitter.replace("@", "")}`],
});

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.author.name,
  url: SITE.author.url,
  jobTitle: SITE.author.jobTitle,
  email: `mailto:${SITE.author.email}`,
  sameAs: [SITE.author.github, SITE.author.linkedin, `https://twitter.com/${SITE.author.twitter.replace("@", "")}`],
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: getCanonical(item.path),
  })),
});

export const blogPostingSchema = (opts: {
  title: string;
  description: string;
  slug: string;
  section: string; // e.g. "/articles" | "/writeups"
  datePublished: string;
  dateModified?: string;
  image?: string;
  tags?: string[];
  wordCount?: number;
}) => {
  const url = getCanonical(`${opts.section}/${opts.slug}`);
  const image = opts.image
    ? opts.image.startsWith("http") ? opts.image : `${SITE.url}${opts.image}`
    : `${SITE.url}${SITE.defaultImage}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: opts.title,
    description: opts.description,
    image,
    author: personSchema(),
    publisher: organizationSchema(),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    keywords: opts.tags?.join(", "),
    url,
    wordCount: opts.wordCount,
    inLanguage: "en",
  };
};
