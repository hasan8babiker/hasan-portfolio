import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Zap, BookOpen } from "lucide-react";

const journalEntries = [
  {
    date: "Nov 28, 2025",
    learned: "Deepened my knowledge of Wireshark packet analysis during a CTF challenge",
    built: "Enhanced my packet sniffer to filter by protocol",
    ctf: "Completed the 'Web Exploitation' room on TryHackMe",
    skills: ["Python Threading", "Network Analysis", "CTF"],
    icon: Zap
  },
  {
    date: "Nov 21, 2025",
    learned: "Explored AWS security configurations and IAM best practices",
    built: "Created a script to audit S3 bucket permissions",
    ctf: "Ranked top 50 in the CyberDefenders Blue Team CTF",
    skills: ["Cloud Security", "AWS", "Automation"],
    icon: Trophy
  },
  {
    date: "Nov 14, 2025",
    learned: "Studied advanced SQL injection techniques and prevention methods",
    built: "Developed a web vulnerability scanner proof-of-concept",
    ctf: "Solved 5 challenges in HackTheBox",
    skills: ["Web Security", "SQL", "Pentesting"],
    icon: BookOpen
  },
  {
    date: "Nov 7, 2025",
    learned: "Completed course on malware analysis fundamentals",
    built: "Set up an isolated malware analysis lab environment",
    ctf: "Participated in the Global CyberSecurity Challenge",
    skills: ["Malware Analysis", "Virtual Machines", "Forensics"],
    icon: Zap
  }
];

export const ProgressJournal = () => {
  return (
    <section id="progress" className="py-20 px-4 bg-secondary/20">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Progress <span className="text-primary">Journal</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Documenting my daily learning and achievements in cybersecurity
          </p>
        </motion.div>

        <div className="space-y-6">
          {journalEntries.map((entry, index) => (
            <motion.div
              key={entry.date}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <entry.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-primary">{entry.date}</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                          What I Learned
                        </h4>
                        <p className="text-foreground">{entry.learned}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                          Tool/Feature Built
                        </h4>
                        <p className="text-foreground">{entry.built}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                          CTF/Challenge
                        </h4>
                        <p className="text-foreground">{entry.ctf}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {entry.skills.map((skill) => (
                          <Badge 
                            key={skill}
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
