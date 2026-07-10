export type PostMeta = {
  slug: string;
  title?: string;
  date?: string;
  excerpt?: string;
};

type MDXModule = {
  default: any;
  frontmatter?: Record<string, any>;
  attributes?: Record<string, any>;
};

// Import all mdx files under src/content/articles
const modules = import.meta.glob('../content/articles/*.mdx', { eager: true }) as Record<string, MDXModule>;

const posts = Object.entries(modules).map(([path, mod]) => {
  const parts = path.split('/');
  const file = parts[parts.length - 1];
  const slug = file.replace(/\.mdx?$/, "");
  const fm = (mod as any).frontmatter || (mod as any).attributes || {};
  return {
    slug,
    title: fm.title || slug,
    date: fm.date || null,
    excerpt: fm.excerpt || null,
    Component: mod.default,
    raw: mod,
  } as PostMeta & { Component: any; raw: any };
});

posts.sort((a, b) => {
  const ad = a.date ? new Date(a.date).getTime() : 0;
  const bd = b.date ? new Date(b.date).getTime() : 0;
  return bd - ad;
});

export const getPosts = () => posts;
export const getPostBySlug = (slug: string) => posts.find(p => p.slug === slug);
