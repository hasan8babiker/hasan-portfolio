import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { articles, Article } from "@/data/articles";

interface Props {
  currentSlug: string;
  currentTags: string[];
  currentCategory: string;
  section?: string; // "/articles"
}

/** Score by shared tags + category → surface up to 3 related articles. */
const score = (a: Article, tags: string[], category: string) => {
  const tagHits = a.tags.filter((t) => tags.includes(t)).length;
  const catHit = a.category === category ? 2 : 0;
  return tagHits + catHit;
};

export const RelatedArticles = ({
  currentSlug,
  currentTags,
  currentCategory,
  section = "/articles",
}: Props) => {
  const related = articles
    .filter((a) => a.slug !== currentSlug)
    .map((a) => ({ a, s: score(a, currentTags, currentCategory) }))
    .sort((x, y) => y.s - x.s)
    .slice(0, 3)
    .map((x) => x.a);

  // Prev / Next by date order
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const idx = sorted.findIndex((a) => a.slug === currentSlug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  if (related.length === 0 && !prev && !next) return null;

  return (
    <aside className="mt-16 pt-10 border-t border-border" aria-label="Related content">
      {related.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {related.map((a) => (
              <Link key={a.slug} to={`${section}/${a.slug}`} className="group">
                <Card className="p-4 h-full hover:border-primary/50 transition-colors">
                  <Badge variant="outline" className="mb-2 text-xs">{a.category}</Badge>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{a.excerpt}</p>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}

      {(prev || next) && (
        <nav className="flex justify-between gap-4" aria-label="Article pagination">
          {prev ? (
            <Link to={`${section}/${prev.slug}`} className="flex-1 group">
              <Card className="p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </div>
                <div className="font-medium text-sm group-hover:text-primary line-clamp-1">
                  {prev.title}
                </div>
              </Card>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link to={`${section}/${next.slug}`} className="flex-1 group text-right">
              <Card className="p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                  Next <ArrowRight className="h-3 w-3" />
                </div>
                <div className="font-medium text-sm group-hover:text-primary line-clamp-1">
                  {next.title}
                </div>
              </Card>
            </Link>
          ) : <div className="flex-1" />}
        </nav>
      )}
    </aside>
  );
};
