import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Password Strength Checker",
    description: "Evaluates password strength based on length, complexity, and common patterns. Integrates breach checks using APIs and provides actionable feedback.",
    tools: ["Python", "Tkinter", "Regex", "APIs"],
    github: "https://github.com/hasanbabiker/password-strength-checker"
  },
  {
    title: "Port Scanner",
    description: "Custom port scanner for network reconnaissance. Scans open ports on target IPs to identify vulnerabilities with stealth modes.",
    tools: ["Python", "Socket", "Scapy", "Threading"],
    github: "https://github.com/hasanbabiker/port-scanner"
  },
  {
    title: "Subdomain Finder",
    description: "Automates subdomain enumeration using DNS queries and wordlists, useful for penetration testing to uncover hidden assets.",
    tools: ["Python", "DNS Resolver", "Sublist3r"],
    github: "https://github.com/hasanbabiker/subdomain-finder"
  },
  {
    title: "File Integrity Checker",
    description: "Monitors file changes using MD5/SHA-256 hashing to detect tampering, ideal for securing critical systems.",
    tools: ["Python", "Hashlib", "Logging"],
    github: "https://github.com/hasanbabiker/file-integrity-checker"
  },
  {
    title: "Network Packet Sniffer",
    description: "Captures and analyzes network packets in real-time, displaying protocols, IPs, and payloads for traffic inspection.",
    tools: ["Python", "Scapy", "Wireshark"],
    github: "https://github.com/hasanbabiker/packet-sniffer"
  },
  {
    title: "Threat Intelligence Tools",
    description: "Queries VirusTotal for file/hash analysis and Have I Been Pwned for breach checks, automating threat intelligence gathering.",
    tools: ["Python", "VirusTotal API", "HIBP API", "JSON"],
    github: "https://github.com/hasanbabiker/threat-intel-tools"
  },
  {
    title: "Red Team Toolkit",
    description: "Modular toolkit for red teaming including payload delivery and post-exploitation scripts for ethical penetration testing.",
    tools: ["Python", "Metasploit", "Paramiko"],
    github: "https://github.com/hasanbabiker/red-team-tools"
  },
  {
    title: "Blue Team Dashboard",
    description: "Web-based dashboard for monitoring logs, alerts, and security metrics using Python backends with real-time visualization.",
    tools: ["Python", "Flask", "Matplotlib", "SQLite"],
    github: "https://github.com/hasanbabiker/blue-team-dashboard"
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-secondary/20">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Cybersecurity tools and automation scripts built with Python
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index % 4) }}
            >
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool) => (
                    <Badge 
                      key={tool} 
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/50 hover:bg-primary/10"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
