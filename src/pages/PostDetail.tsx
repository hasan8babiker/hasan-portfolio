import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/mdx";
import { ArticleSEO, Breadcrumbs } from "@/components/seo";

const PostDetail = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/posts" replace />;

  const Component = post.Component;

  return (
    <div className="min-h-screen bg-background">
      <ArticleSEO
        title={post.title}
        description={post.excerpt || post.title}
        slug={post.slug}
        section="/posts"
        datePublished={post.date || new Date().toISOString().slice(0, 10)}
      />
      <article className="container max-w-3xl mx-auto px-4 py-20">
        <Breadcrumbs
          items={[
            { name: "Posts", path: "/posts" },
            { name: post.title, path: `/posts/${post.slug}` },
          ]}
        />
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/posts" aria-label="Back to all posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </Button>

        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
        {post.date && (
          <time dateTime={post.date} className="text-sm text-muted-foreground mb-8 block">
            {post.date}
          </time>
        )}

        <div className="prose prose-invert max-w-none">
          <Component />
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
