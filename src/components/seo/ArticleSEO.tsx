import { SEO } from "./SEO";
import { StructuredData, blogPostingSchema } from "./StructuredData";

interface ArticleSEOProps {
  title: string;
  description: string;
  slug: string;
  section?: "/articles" | "/writeups" | "/posts";
  datePublished: string;
  dateModified?: string;
  image?: string;
  tags?: string[];
  wordCount?: number;
}

/**
 * All-in-one <head> block for a single article/writeup page.
 * Emits: SEO tags + BlogPosting JSON-LD (with author, publisher, dates).
 */
export const ArticleSEO = ({
  title,
  description,
  slug,
  section = "/articles",
  datePublished,
  dateModified,
  image,
  tags,
  wordCount,
}: ArticleSEOProps) => {
  const path = `${section}/${slug}`;
  return (
    <>
      <SEO
        title={title}
        description={description}
        path={path}
        image={image}
        type="article"
        keywords={tags}
      />
      <StructuredData
        data={blogPostingSchema({
          title,
          description,
          slug,
          section,
          datePublished,
          dateModified,
          image,
          tags,
          wordCount,
        })}
      />
    </>
  );
};
