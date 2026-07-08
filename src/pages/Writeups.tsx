import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, ArrowRight, Trophy } from "lucide-react";
import { writeups } from "@/data/writeups";

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Hard: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  Insane: "bg-red-500/10 text-red-400 border-red-500/30",
};

const WriteupsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Terminal className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold">
                All <span className="text-primary">Writeups</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every lab, CTF, and challenge I've documented — from beginner boxes to advanced exploits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {writeups.map((w, index) => (
              <motion.div
                key={w.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 * index }}
              >
                <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      <Trophy className="h-3 w-3 mr-1" />
                      {w.platform}
                    </Badge>
                    <Badge className={`${difficultyColor[w.difficulty]} border font-mono text-xs`}>
                      {w.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {w.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mb-3">{w.date} · {w.category}</p>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {w.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {w.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-primary" asChild>
                    <Link to={`/writeups/${w.slug}`}>
                      Read Writeup
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
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

export default WriteupsPage;
