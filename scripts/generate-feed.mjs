import fs from "fs";
import path from "path";

const root = path.resolve(".");
const publicDir = path.join(root, "public");
const siteUrl = "https://hasan8babiker.github.io/hasan-portfolio";

const articlesJsonPath = path.join(root, "src", "data", "articles.json");
const mdxPostsDir = path.join(root, "src", "content", "articles");

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const parseFrontmatter = (source) => {
  const match = source.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return {};
  const yaml = match[1];
  const data = {};
  yaml.split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (/^['"].*['"]$/.test(value)) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });
  return data;
};

const readArticles = () => {
  const raw = fs.readFileSync(articlesJsonPath, "utf8");
  return JSON.parse(raw);
};

const readPosts = () => {
  if (!fs.existsSync(mdxPostsDir)) return [];
  return fs.readdirSync(mdxPostsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(mdxPostsDir, filename);
      const source = fs.readFileSync(filePath, "utf8");
      const data = parseFrontmatter(source);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title || filename.replace(/\.mdx$/, ""),
        date: data.date || null,
        excerpt: data.excerpt || "",
      };
    });
};

const articles = readArticles();
const posts = readPosts();

const now = new Date();
const today = now.toISOString().split("T")[0];

const staticPages = [
  { path: "/", priority: "1.0" },
  { path: "/articles", priority: "0.8" },
  { path: "/posts", priority: "0.8" },
  { path: "/writeups", priority: "0.8" },
];

const allItems = [
  ...articles.map((article) => ({
    path: "/articles/" + article.slug,
    title: article.title,
    date: article.date,
    excerpt: article.excerpt,
    type: "article",
  })),
  ...posts.map((post) => ({
    path: "/posts/" + post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    type: "post",
  })),
];

const sortedItems = allItems
  .slice()
  .sort((a, b) => new Date(b.date || today).valueOf() - new Date(a.date || today).valueOf());

const sitemapUrls = [
  ...staticPages,
  ...allItems.map((item) => ({
    path: item.path,
    lastmod: item.date || today,
    priority: item.type === "article" ? "0.7" : "0.7",
  })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (entry) => `  <url>
    <loc>${siteUrl}${entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const rssItemsXml = sortedItems
  .map((item) => `  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${siteUrl}${item.path}</link>
    <guid isPermaLink="true">${siteUrl}${item.path}</guid>
    <pubDate>${new Date(item.date || today).toUTCString()}</pubDate>
    <description>${escapeXml(item.excerpt || item.title)}</description>
  </item>`)
  .join("\n");

const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Hasan Portfolio Articles & Writeups</title>
    <link>${siteUrl}</link>
    <description>Latest articles and writeups from Hasan' portfolio.</description>
    <language>en-US</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
${rssItemsXml}
  </channel>
</rss>
`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.join(publicDir, "rss.xml"), rssXml, "utf8");
console.log(`Generated sitemap.xml and rss.xml in ${publicDir}`);
