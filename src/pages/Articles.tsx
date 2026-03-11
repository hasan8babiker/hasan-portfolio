import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

const articles = [
  {
    title: "How to Secure Your Linux System: A Beginner's Guide",
    excerpt: "Linux is powerful but often targeted. This guide covers essentials for hardening your setup including firewall configuration, SSH security, and user management.",
    date: "Nov 25, 2025",
    readTime: "8 min",
    tags: ["Linux", "Security", "Tutorial"],
    category: "System Security"
  },
  {
    title: "How Hackers Abuse Misconfigurations",
    excerpt: "Discuss common AWS S3 bucket exposures and prevention strategies. Learn how misconfigurations lead to data breaches and how to prevent them.",
    date: "Nov 20, 2025",
    readTime: "6 min",
    tags: ["Cloud Security", "AWS", "Best Practices"],
    category: "Cloud Security"
  },
  {
    title: "Python Scripts for Automating Recon",
    excerpt: "Code walkthrough for subdomain enumeration. Build your own reconnaissance tools using Python and automate your security workflows.",
    date: "Nov 15, 2025",
    readTime: "10 min",
    tags: ["Python", "Automation", "Recon"],
    category: "Development"
  },
  {
    title: "How to Analyze Malware Safely",
    excerpt: "Using virtual machines and tools like IDA Pro for safe malware analysis. Learn the fundamentals of reverse engineering and threat analysis.",
    date: "Nov 10, 2025",
    readTime: "12 min",
    tags: ["Malware Analysis", "Reverse Engineering"],
    category: "Malware Analysis"
  },
  {
    title: "Threat Hunting Basics",
    excerpt: "Log analysis with Splunk and ELK stack. Master the art of proactive threat hunting and learn to identify indicators of compromise.",
    date: "Nov 5, 2025",
    readTime: "9 min",
    tags: ["Threat Hunting", "SIEM", "Logs"],
    category: "Threat Hunting"
  },
  {
    title: "How to Use OSINT Tools",
    excerpt: "Comprehensive guide to Maltego and Shodan for intelligence gathering. Discover how to leverage open-source intelligence for security research.",
    date: "Oct 30, 2025",
    readTime: "7 min",
    tags: ["OSINT", "Tools", "Intelligence"],
    category: "OSINT"
  }
];

const Articles = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold">
                All <span className="text-primary">Articles</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive collection of cybersecurity insights, tutorials, and technical guides
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index % 6) }}
              >
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col group cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;