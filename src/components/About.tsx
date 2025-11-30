import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Shield, Code, Target, Cpu } from "lucide-react";

const skills = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Threat detection, vulnerability assessment, and security automation"
  },
  {
    icon: Code,
    title: "Python Development",
    description: "Building security tools and automation scripts"
  },
  {
    icon: Target,
    title: "Penetration Testing",
    description: "Ethical hacking and security auditing"
  },
  {
    icon: Cpu,
    title: "Cloud Security",
    description: "AWS and Azure security implementations"
  }
];

export const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Passionate about fortifying digital defenses in an increasingly connected world
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-card border-border h-full">
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  My journey into cybersecurity began during my computer science studies, where I was fascinated 
                  by the cat-and-mouse game between hackers and defenders. After earning my degree, I dove into 
                  hands-on roles, starting as a junior analyst and quickly specializing in threat detection and automation.
                </p>
                <p>
                  My focus lies at the intersection of Python programming and cybersecurity automation. I believe 
                  in leveraging code to streamline security processes—whether it's scripting reconnaissance tools 
                  or building dashboards for real-time monitoring.
                </p>
                <p>
                  Currently, I'm deepening my expertise in advanced topics like malware analysis, cloud security 
                  (AWS and Azure), and ethical hacking certifications. I'm also exploring machine learning for 
                  anomaly detection in network traffic.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-card border-border h-full">
              <h3 className="text-2xl font-bold mb-4">Future Goals</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Looking ahead, my roadmap includes contributing to open-source security projects, pursuing a 
                  master's in cybersecurity, and eventually leading a team in blue team operations. Along the way, 
                  I'm building practical tools to solve real-world problems.
                </p>
                <p>
                  When I'm not coding or hunting threats, you'll find me participating in CTFs, blogging about 
                  security tips, or sharing knowledge on social media.
                </p>
                <p className="text-foreground font-semibold">
                  Let's connect and build a safer digital space together!
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full">
                <skill.icon className="h-10 w-10 text-primary mb-4" />
                <h4 className="text-lg font-bold mb-2">{skill.title}</h4>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
