import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/mdx";
import { SEO, Breadcrumbs } from "@/components/seo";

const Posts = () => {
  const posts = getPosts();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="MDX Blog Posts"
        description="Long-form posts authored in MDX covering cybersecurity, development, and engineering topics."
        path="/posts"
      />
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold">
              All <span className="text-primary">Posts</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Blog posts authored in MDX.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Card key={post.slug} className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">MDX</Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>

                {post.excerpt && (
                  <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                )}

                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-colors" asChild>
                  <Link to={`/posts/${post.slug}`}>
                    Read Post
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Posts;
