import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Calendar, Terminal } from "lucide-react";
import { getWriteupBySlug } from "@/data/writeups";
import { ArticleSEO, Breadcrumbs } from "@/components/seo";

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Hard: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  Insane: "bg-red-500/10 text-red-400 border-red-500/30",
};

const WriteupDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const w = slug ? getWriteupBySlug(slug) : undefined;

  if (!w) return <Navigate to="/writeups" replace />;

  return (
    <div className="min-h-screen bg-background">
      <ArticleSEO
        title={w.title}
        description={w.summary}
        slug={w.slug}
        section="/writeups"
        datePublished={w.date}
        tags={w.tags}
        wordCount={w.content.split(/\s+/).length}
      />
      <article className="container max-w-3xl mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Breadcrumbs
            items={[
              { name: "Writeups", path: "/writeups" },
              { name: w.title, path: `/writeups/${w.slug}` },
            ]}
          />
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link to="/writeups">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Writeups
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="font-mono">
              <Trophy className="h-3 w-3 mr-1" />
              {w.platform}
            </Badge>
            <Badge className={`${difficultyColor[w.difficulty]} border font-mono`}>{w.difficulty}</Badge>
            <Badge variant="outline" className="font-mono">
              <Terminal className="h-3 w-3 mr-1" />
              {w.category}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{w.title}</h1>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Calendar className="h-4 w-4" />
            <span>{w.date}</span>
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{w.summary}</p>

          <div className="flex flex-wrap gap-2 mb-10">
            {w.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose prose-invert max-w-none">
            {w.content.split("\n\n").map((block, i) => {
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
        </motion.div>
      </article>
    </div>
  );
};

export default WriteupDetail;
