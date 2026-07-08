export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: "secure-your-linux-system",
    title: "How to Secure Your Linux System: A Beginner's Guide",
    excerpt: "Linux is powerful but often targeted. This guide covers essentials for hardening your setup including firewall configuration, SSH security, and user management.",
    date: "Nov 25, 2025",
    readTime: "8 min",
    tags: ["Linux", "Security", "Tutorial"],
    category: "System Security",
    content: `Linux powers most of the internet's infrastructure, which also makes it a prime target for attackers. This guide walks through the essentials of hardening a fresh Linux install.

## 1. Keep Your System Updated
Run \`sudo apt update && sudo apt upgrade\` regularly to patch known vulnerabilities. Consider enabling unattended-upgrades for critical security patches.

## 2. Configure the Firewall
UFW (Uncomplicated Firewall) is your first line of defense:
- \`sudo ufw default deny incoming\`
- \`sudo ufw default allow outgoing\`
- \`sudo ufw allow ssh\`
- \`sudo ufw enable\`

## 3. Harden SSH
- Disable root login: \`PermitRootLogin no\`
- Use key-based authentication only: \`PasswordAuthentication no\`
- Change the default port from 22
- Install Fail2Ban to block brute-force attempts

## 4. User Management
Create a non-root user with sudo privileges and disable direct root access. Audit \`/etc/passwd\` for unexpected accounts.

## 5. Monitoring
Set up log monitoring with tools like Logwatch or the ELK stack. Watch \`/var/log/auth.log\` for suspicious activity.

Security is iterative — review your configuration monthly and stay informed about new CVEs.`
  },
  {
    slug: "hackers-abuse-misconfigurations",
    title: "How Hackers Abuse Misconfigurations",
    excerpt: "Discuss common AWS S3 bucket exposures and prevention strategies. Learn how misconfigurations lead to data breaches and how to prevent them.",
    date: "Nov 20, 2025",
    readTime: "6 min",
    tags: ["Cloud Security", "AWS", "Best Practices"],
    category: "Cloud Security",
    content: `Misconfigurations are the #1 cause of cloud data breaches. Here's how attackers find and exploit them.

## Public S3 Buckets
Tools like \`s3scanner\` and Grayhat Warfare index publicly exposed buckets. A single misconfigured bucket can leak millions of records.

## Prevention Checklist
- Enable S3 Block Public Access at the account level
- Use bucket policies with explicit deny rules
- Enable CloudTrail logging for all bucket access
- Rotate access keys regularly
- Use IAM roles instead of long-lived credentials

## Beyond S3
Similar misconfigurations plague Azure Blob Storage, GCP Cloud Storage, and even self-hosted MinIO. The principle is the same: default to private, grant access explicitly.`
  },
  {
    slug: "python-scripts-automating-recon",
    title: "Python Scripts for Automating Recon",
    excerpt: "Code walkthrough for subdomain enumeration. Build your own reconnaissance tools using Python and automate your security workflows.",
    date: "Nov 15, 2025",
    readTime: "10 min",
    tags: ["Python", "Automation", "Recon"],
    category: "Development",
    content: `Reconnaissance is the foundation of any pentest. Let's build a subdomain enumeration tool in Python.

## Basic Structure
Using \`dns.resolver\` and \`concurrent.futures\`, you can check thousands of subdomains per minute:

\`\`\`python
import dns.resolver
from concurrent.futures import ThreadPoolExecutor

def check_subdomain(sub, domain):
    try:
        dns.resolver.resolve(f"{sub}.{domain}", "A")
        return f"{sub}.{domain}"
    except:
        return None
\`\`\`

## Adding Sources
Combine passive sources (crt.sh, VirusTotal API) with active brute-forcing for maximum coverage.

## Rate Limiting
Always respect rate limits and get authorization before scanning targets you don't own.`
  },
  {
    slug: "analyze-malware-safely",
    title: "How to Analyze Malware Safely",
    excerpt: "Using virtual machines and tools like IDA Pro for safe malware analysis. Learn the fundamentals of reverse engineering and threat analysis.",
    date: "Nov 10, 2025",
    readTime: "12 min",
    tags: ["Malware Analysis", "Reverse Engineering"],
    category: "Malware Analysis",
    content: `Analyzing malware requires an isolated environment. Here's how to build one.

## Setting Up Your Lab
- Use VirtualBox or VMware with host-only networking
- Take a clean snapshot before every analysis
- Never analyze on your host machine

## Static Analysis
Start with strings, PE headers, and imports. Tools: \`strings\`, PEStudio, Detect It Easy.

## Dynamic Analysis
Run the sample and observe behavior with Process Monitor, Wireshark, and Regshot.

## Reverse Engineering
IDA Pro and Ghidra let you disassemble and understand the binary at a deep level.`
  },
  {
    slug: "threat-hunting-basics",
    title: "Threat Hunting Basics",
    excerpt: "Log analysis with Splunk and ELK stack. Master the art of proactive threat hunting and learn to identify indicators of compromise.",
    date: "Nov 5, 2025",
    readTime: "9 min",
    tags: ["Threat Hunting", "SIEM", "Logs"],
    category: "Threat Hunting",
    content: `Threat hunting is proactive — you assume the attacker is already inside and go looking.

## The Hunting Loop
1. Hypothesis: "An attacker used PowerShell for lateral movement"
2. Query: Search logs for suspicious PowerShell activity
3. Investigate: Analyze results for true positives
4. Respond: Contain and remediate findings

## Key Data Sources
- Windows Event Logs (4624, 4688, 4104)
- Sysmon
- Network flow logs
- EDR telemetry

## Tools
Splunk, Elastic Security, and open-source options like HELK make hunting accessible.`
  },
  {
    slug: "how-to-use-osint-tools",
    title: "How to Use OSINT Tools",
    excerpt: "Comprehensive guide to Maltego and Shodan for intelligence gathering. Discover how to leverage open-source intelligence for security research.",
    date: "Oct 30, 2025",
    readTime: "7 min",
    tags: ["OSINT", "Tools", "Intelligence"],
    category: "OSINT",
    content: `OSINT (Open Source Intelligence) is the art of gathering information from public sources.

## Shodan
The search engine for internet-connected devices. Find exposed services:
- \`org:"Target Corp"\` — devices belonging to an organization
- \`port:3389 country:US\` — exposed RDP in the US

## Maltego
Visual link analysis for pivoting between entities: domains, emails, people, social profiles.

## Other Essentials
- theHarvester for email/subdomain gathering
- SpiderFoot for automated OSINT
- Google Dorking for creative searches

## Ethics
Just because information is public doesn't make every use ethical. Always operate within legal and moral boundaries.`
  }
];

export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);
