import articlesData from "./articles.json";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  content: string;
}

export const articles: Article[] = articlesData;

export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);
