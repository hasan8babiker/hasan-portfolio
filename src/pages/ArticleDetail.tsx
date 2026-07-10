import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { getArticleBySlug } from "@/data/articles";
import { ArticleSEO, Breadcrumbs, RelatedArticles } from "@/components/seo";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/articles" replace />;

  const wordCount = article.content.split(/\s+/).length;

  return (
    <div className="min-h-screen bg-background">
      <ArticleSEO
        title={article.title}
        description={article.excerpt}
        slug={article.slug}
        section="/articles"
        datePublished={article.date}
        tags={article.tags}
        wordCount={wordCount}
      />

      <article className="container max-w-3xl mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Breadcrumbs
            items={[
              { name: "Articles", path: "/articles" },
              { name: article.title, path: `/articles/${article.slug}` },
            ]}
          />

          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link to="/articles" aria-label="Back to all articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          <Badge variant="outline" className="mb-4">{article.category}</Badge>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={article.date}>{article.date}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{article.readTime} read</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose prose-invert max-w-none">
            {article.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-primary">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("```")) {
                const code = block.replace(/```\w*\n?/g, "").replace(/```$/, "");
                return (
                  <pre key={i} className="bg-secondary/50 border border-border rounded-lg p-4 overflow-x-auto my-4">
                    <code className="font-mono text-sm text-foreground">{code}</code>
                  </pre>
                );
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 my-4 text-muted-foreground">
                    {block.split("\n").map((li, j) => (
                      <li key={j}>{li.replace(/^-\s*/, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-muted-foreground leading-relaxed my-4">
                  {block.split(/(`[^`]+`)/).map((part, j) =>
                    part.startsWith("`") && part.endsWith("`") ? (
                      <code key={j} className="bg-secondary/50 px-1.5 py-0.5 rounded font-mono text-sm text-primary">
                        {part.slice(1, -1)}
                      </code>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
          </div>

          <RelatedArticles
            currentSlug={article.slug}
            currentTags={article.tags}
            currentCategory={article.category}
          />
        </motion.div>
      </article>
    </div>
  );
};

export default ArticleDetail;
