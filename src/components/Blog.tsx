import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "How to Secure Your Linux System: A Beginner's Guide",
    excerpt: "Linux is powerful but often targeted. This guide covers essentials for hardening your setup including firewall configuration, SSH security, and user management.",
    date: "Nov 25, 2025",
    readTime: "8 min",
    tags: ["Linux", "Security", "Tutorial"]
  },
  {
    title: "How Hackers Abuse Misconfigurations",
    excerpt: "Discuss common AWS S3 bucket exposures and prevention strategies. Learn how misconfigurations lead to data breaches and how to prevent them.",
    date: "Nov 20, 2025",
    readTime: "6 min",
    tags: ["Cloud Security", "AWS", "Best Practices"]
  },
  {
    title: "Python Scripts for Automating Recon",
    excerpt: "Code walkthrough for subdomain enumeration. Build your own reconnaissance tools using Python and automate your security workflows.",
    date: "Nov 15, 2025",
    readTime: "10 min",
    tags: ["Python", "Automation", "Recon"]
  },
  {
    title: "How to Analyze Malware Safely",
    excerpt: "Using virtual machines and tools like IDA Pro for safe malware analysis. Learn the fundamentals of reverse engineering and threat analysis.",
    date: "Nov 10, 2025",
    readTime: "12 min",
    tags: ["Malware Analysis", "Reverse Engineering"]
  },
  {
    title: "Threat Hunting Basics",
    excerpt: "Log analysis with Splunk and ELK stack. Master the art of proactive threat hunting and learn to identify indicators of compromise.",
    date: "Nov 5, 2025",
    readTime: "9 min",
    tags: ["Threat Hunting", "SIEM", "Logs"]
  },
  {
    title: "How to Use OSINT Tools",
    excerpt: "Comprehensive guide to Maltego and Shodan for intelligence gathering. Discover how to leverage open-source intelligence for security research.",
    date: "Oct 30, 2025",
    readTime: "7 min",
    tags: ["OSINT", "Tools", "Intelligence"]
  }
];

export const Blog = () => {
  return (
    <section id="blog" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Cybersecurity <span className="text-primary">Blog</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Tips, tricks, and tutorials for aspiring security professionals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
            >
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col group cursor-pointer">
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-between group-hover:text-primary"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};
