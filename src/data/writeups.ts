export interface Writeup {
  slug: string;
  title: string;
  platform: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Insane";
  category: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
}

export const writeups: Writeup[] = [
  {
    slug: "tryhackme-basic-pentesting",
    title: "Basic Pentesting",
    platform: "TryHackMe",
    difficulty: "Easy",
    category: "Web Exploitation",
    date: "Nov 28, 2025",
    tags: ["Enumeration", "SMB", "SSH", "Hash Cracking"],
    summary: "A beginner-friendly box covering enumeration, SMB shares, brute-forcing SSH keys, and privilege escalation.",
    content: `## Reconnaissance
Started with an Nmap scan to enumerate open ports:

\`\`\`bash
nmap -sC -sV -oN nmap.txt <TARGET_IP>
\`\`\`

Discovered ports 22 (SSH), 80 (HTTP), 139/445 (SMB), and 8080 (Tomcat).

## Enumeration
Ran \`gobuster\` on port 80 and found a hidden \`/development\` directory containing notes that hinted at weak credentials.

## SMB Shares
\`enum4linux\` revealed two users: \`jan\` and \`kay\`.

## Exploitation
Brute-forced \`jan\`'s SSH password with Hydra using rockyou.txt:

\`\`\`bash
hydra -l jan -P /usr/share/wordlists/rockyou.txt ssh://<TARGET_IP>
\`\`\`

## Privilege Escalation
Found kay's SSH private key, cracked its passphrase with \`ssh2john\` + \`john\`, and read the root flag from kay's home directory.

## Takeaways
- Always enumerate every service — even the "boring" ones
- Weak SSH passwords remain a huge attack vector
- Protect private keys with strong passphrases`
  },
  {
    slug: "hackthebox-lame",
    title: "Lame",
    platform: "HackTheBox",
    difficulty: "Easy",
    category: "Linux",
    date: "Nov 20, 2025",
    tags: ["Samba", "CVE", "Metasploit"],
    summary: "Classic retired box exploiting a Samba usermap_script vulnerability for instant root access.",
    content: `## Scan
Nmap revealed FTP (vsftpd 2.3.4), SSH, and Samba 3.0.20.

## Vulnerability Research
Samba 3.0.20 is vulnerable to CVE-2007-2447 (username map script command injection).

## Exploitation
Used Metasploit's \`exploit/multi/samba/usermap_script\` module — instant root shell.

## Manual Exploitation
For learning, replicated the exploit manually by injecting a payload into the username field during SMB authentication.

## Takeaways
- Legacy services are dangerous — patch or isolate them
- Understand exploits manually, not just via Metasploit`
  },
  {
    slug: "picoctf-web-gauntlet",
    title: "Web Gauntlet",
    platform: "PicoCTF",
    difficulty: "Medium",
    category: "Web Exploitation",
    date: "Nov 12, 2025",
    tags: ["SQL Injection", "WAF Bypass"],
    summary: "A SQL injection challenge with progressively stricter filters requiring creative bypass techniques.",
    content: `## Challenge
Login form vulnerable to SQLi, but each round adds new blacklisted keywords (\`or\`, \`and\`, \`like\`, \`=\`, etc).

## Round 1-3
Basic payloads like \`admin' --\` worked.

## Round 4+
With \`=\` blocked, used \`LIKE\` — then that was blocked too. Switched to:

\`\`\`sql
admin'/**/--
\`\`\`

## Final Round
With most operators blocked, used \`GLOB\` and comment-based obfuscation to bypass every filter.

## Takeaways
- Blacklists are inherently weak — use parameterized queries instead
- Know your SQL dialect quirks (SQLite \`GLOB\`, MySQL comments, etc.)`
  }
];

export const getWriteupBySlug = (slug: string) => writeups.find(w => w.slug === slug);
