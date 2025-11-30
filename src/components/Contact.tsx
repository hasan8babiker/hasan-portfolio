import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, BookOpen } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/hasanbabiker",
    handle: "@hasanbabiker",
    color: "hover:text-[#6e5494]"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/hasanbabiker",
    handle: "Hasan Babiker",
    color: "hover:text-[#0077b5]"
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    url: "https://x.com/hasanbabiker",
    handle: "@hasanbabiker",
    color: "hover:text-[#1da1f2]"
  },
  {
    name: "TikTok",
    icon: BookOpen,
    url: "https://tiktok.com/@hasanbabiker_cyber",
    handle: "@hasanbabiker_cyber",
    color: "hover:text-[#ff0050]"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:hasan.babiker@example.com",
    handle: "hasan.babiker@example.com",
    color: "hover:text-primary"
  }
];

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always open to collaborations, questions, or opportunities in cybersecurity. Let's connect!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ${link.color}`}>
                    <link.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{link.name}</h3>
                    <p className="text-sm text-muted-foreground">{link.handle}</p>
                  </div>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Card className="p-8 bg-card border-border">
            <h3 className="text-2xl font-bold mb-4">Let's Build Something Together</h3>
            <p className="text-muted-foreground mb-6">
              Whether you have a project idea, need security consulting, or just want to discuss the latest in cybersecurity, I'd love to hear from you.
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a href="mailto:hasan.babiker@example.com">
                <Mail className="mr-2 h-5 w-5" />
                Send Me an Email
              </a>
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-16 pt-8 border-t border-border"
      >
        <p className="text-muted-foreground text-sm">
          © 2025 Hasan Babiker. Building a safer digital world, one line of code at a time.
        </p>
      </motion.div>
    </section>
  );
};
