import fs from "fs";
import path from "path";

const root = path.resolve(".");
const publicDir = path.join(root, "public");
const siteUrl = "https://hasan8babiker.github.io/hasan-portfolio";

const escapeXml = (v) =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const parseFrontmatter = (source) => {
  const match = source.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return {};
  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (/^['"].*['"]$/.test(value)) value = value.slice(1, -1);
    data[key] = value;
  });
  return data;
};

// Sources
const articles = JSON.parse(fs.readFileSync(path.join(root, "src/data/articles.json"), "utf8"));

// Parse writeups.ts (simple regex — matches the plain-object array we author)
const writeupsSrc = fs.readFileSync(path.join(root, "src/data/writeups.ts"), "utf8");
const writeups = [...writeupsSrc.matchAll(/slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"[\s\S]*?summary:\s*"([^"]+)"/g)]
  .map((m) => ({ slug: m[1], title: m[2], date: m[3], excerpt: m[4] }));

// MDX posts
const mdxDir = path.join(root, "src/content/articles");
const posts = fs.existsSync(mdxDir)
  ? fs.readdirSync(mdxDir).filter((f) => f.endsWith(".mdx")).map((filename) => {
      const src = fs.readFileSync(path.join(mdxDir, filename), "utf8");
      const fm = parseFrontmatter(src);
      return { slug: filename.replace(/\.mdx$/, ""), title: fm.title || filename, date: fm.date || null, excerpt: fm.excerpt || "" };
    })
  : [];

const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/articles", priority: "0.8", changefreq: "weekly" },
  { path: "/writeups", priority: "0.8", changefreq: "weekly" },
  { path: "/posts", priority: "0.8", changefreq: "weekly" },
];

const contentItems = [
  ...articles.map((a) => ({ path: `/articles/${a.slug}`, title: a.title, date: a.date, excerpt: a.excerpt, type: "article" })),
  ...writeups.map((w) => ({ path: `/writeups/${w.slug}`, title: w.title, date: w.date, excerpt: w.excerpt, type: "writeup" })),
  ...posts.map((p) => ({ path: `/posts/${p.slug}`, title: p.title, date: p.date, excerpt: p.excerpt, type: "post" })),
];

// ---------- sitemap.xml ----------
const sitemapEntries = [
  ...staticPages.map((p) => ({ ...p, lastmod: today })),
  ...contentItems.map((it) => ({ path: it.path, lastmod: it.date || today, changefreq: "monthly", priority: "0.7" })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) => `  <url>
    <loc>${siteUrl}${e.path}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

// ---------- rss.xml ----------
const rssItems = [...contentItems]
  .sort((a, b) => new Date(b.date || today) - new Date(a.date || today))
  .map(
    (it) => `  <item>
    <title>${escapeXml(it.title)}</title>
    <link>${siteUrl}${it.path}</link>
    <guid isPermaLink="true">${siteUrl}${it.path}</guid>
    <pubDate>${new Date(it.date || today).toUTCString()}</pubDate>
    <category>${it.type}</category>
    <description>${escapeXml(it.excerpt || it.title)}</description>
  </item>`
  )
  .join("\n");

const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hasan Babiker — Articles &amp; Writeups</title>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Cybersecurity articles, CTF writeups, and Python security tools by Hasan Babiker.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);
fs.writeFileSync(path.join(publicDir, "rss.xml"), rssXml);
console.log(`✓ sitemap.xml (${sitemapEntries.length} urls) + rss.xml (${contentItems.length} items) written to ${publicDir}`);
