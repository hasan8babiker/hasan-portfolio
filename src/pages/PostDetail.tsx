import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/mdx";

const PostDetail = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    const created: HTMLElement[] = [];

    document.title = `${post.title} — Hasan Portfolio`;

    const mk = (attrs: Record<string, string>) => {
      const el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
      created.push(el);
    };

    if (post.excerpt) mk({ name: "description", content: post.excerpt });
    mk({ property: "og:title", content: post.title });
    if (post.excerpt) mk({ property: "og:description", content: post.excerpt });
    mk({ property: "og:type", content: "article" });
    mk({ name: "twitter:card", content: "summary_large_image" });

    // JSON-LD
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt || "",
      url: window.location.href,
      datePublished: post.date || undefined,
      author: { "@type": "Person", name: "Hasan" },
    });
    document.head.appendChild(ld);
    created.push(ld);

    return () => created.forEach(c => c.remove());
  }, [post]);

  if (!post) return <Navigate to="/posts" replace />;

  const Component = post.Component;

  return (
    <div className="min-h-screen bg-background">
      <article className="container max-w-3xl mx-auto px-4 py-20">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </Button>

        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
        {post.date && <div className="text-sm text-muted-foreground mb-8">{post.date}</div>}

        <div className="prose prose-invert max-w-none">
          <Component />
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
