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
    slug: "picoctf-undo-writeup", 
    title: "picoCTF Undo Writeup: Reversing a Chain of Linux Text Transformations",
    platform: "picoCTF", 
    difficulty: "Easy", 
    category: "General Skills", 
    date: "2026-07-11", 
    tags: ["CTF", "picoCTF", "Linux", "Cybersecurity", "Writeup"], 
    summary: "A step-by-step walkthrough of the picoCTF 2026 'Undo' challenge, covering Base64, reversal, tr substitutions, and ROT13.", 
    content: "# picoCTF Writeup: Undo — Reversing a Chain of Linux Text Transformations\n\n**Category:** General Skills | **Difficulty:** Easy | **Event:** picoCTF 2026 | **Author:** Yahaya Meddy\n\n(../assets/images/writeups/undo-writeup.jpg)\n\n## Challenge Description\n\n> Can you reverse a series of Linux text transformations to recover the original flag?\n\nThis challenge gives you a flag that has been passed through five different Linux text transformations, one after another. Your job is to walk backward through each step, applying the correct reversing command until you land on the original flag.\n\n## Connecting to the Challenge\n\nStart by connecting to the remote instance with netcat:\n\n```bash\nnc foggy-cliff.picoctf.net 54751\n```\n\nOnce connected, you're greeted with the challenge prompt:\n\n```\n=== Welcome to the Text Transformations Challenge! ===\nYour goal: step by step, recover the original flag.\nAt each step, you'll see the transformed flag and a hint.\nEnter the correct Linux command to reverse the last transformation.\n```\n\nThe challenge walks you through five steps, each showing the current (transformed) state of the flag along with a hint about what transformation was applied. Your task at each step is to supply the Linux command that undoes it.\n\n## Step 1 — Base64 Decode\n\n**Current flag:**\n```\nKW9zOHIwMG5uLWZhMDFnQHplMHNmYTRlRy1nazNnLXRhMWZlcmlyRShTR1BicHZj\n```\n\n**Hint:** Base64 encoded the string.\n\nThe string is clearly Base64 — it's made up of the standard Base64 alphabet and ends in a way consistent with padding-free encoding. Decoding it is straightforward with the `base64` utility:\n\n```bash\necho 'KW9zOHIwMG5uLWZhMDFnQHplMHNmYTRlRy1nazNnLXRhMWZlcmlyRShTR1BicHZj' | base64 -d\n```\n\n**Command for this step:** `base64 -d`\n\n## Step 2 — Reverse the String\n\n**Current flag:**\n```\n)os8r00nn-fa01g@ze0sfa4eG-gk3g-ta1ferirE(SGPbpvc\n```\n\n**Hint:** Reversed the text.\n\nThe string now looks like scrambled text with parentheses in odd positions — a strong signal it's simply been flipped end-to-end. The `rev` command reverses the character order of a line:\n\n```bash\necho \")os8r00nn-fa01g@ze0sfa4eG-gk3g-ta1ferirE(SGPbpvc\" | rev\n```\n\n**Command for this step:** `rev`\n\n## Step 3 — Undo Underscore/Dash Substitution\n\n**Current flag:**\n```\ncvpbPGS(Eriref1at-g3kg-Ge4afs0ez@g10af-nn00r8so)\n```\n\n**Hint:** Replaced underscores with dashes.\n\nIf dashes replaced underscores going forward, reversing it means swapping dashes back to underscores. The `tr` command handles character-for-character substitution cleanly:\n\n```bash\necho \"cvpbPGS(Eriref1at-g3kg-Ge4afs0ez@g10af-nn00r8so)\" | tr '-' '_'\n```\n\n**Command for this step:** `tr '-' '_'`\n\n## Step 4 — Undo Curly Brace/Parenthesis Substitution\n\n**Current flag:**\n```\ncvpbPGS(Eriref1at_g3kg_Ge4afs0ez@g10af_nn00r8so)\n```\n\n**Hint:** Replaced curly braces with parentheses.\n\nSince the original flag format is `picoCTF{...}`, and this version uses parentheses instead, the forward transformation swapped `{}` for `()`. Reversing it means mapping the parentheses back to curly braces, again with `tr`:\n\n```bash\necho \"cvpbPGS(Eriref1at_g3kg_Ge4afs0ez@g10af_nn00r8so)\" | tr '()' '{}'\n```\n\n**Command for this step:** `tr '()' '{}'`\n\n## Step 5 — Undo ROT13\n\n**Current flag:**\n```\ncvpbPGS{Eriref1at_g3kg_Ge4afs0ez@g10af_nn00r8so}\n```\n\n**Hint:** Applied ROT13 to letters.\n\nROT13 is a simple substitution cipher that shifts each letter 13 places through the alphabet. It's its own inverse — applying it twice returns the original text — so reversing it means applying ROT13 again. This can be done with `tr` by mapping each letter to the one 13 positions ahead:\n\n```bash\necho \"cvpbPGS{Eriref1at_g3kg_Ge4afs0ez@g10af_nn00r8so}\" | tr 'a-zA-Z' 'n-za-mN-ZA-M'\n```\n\n**Command for this step:** `tr 'a-zA-Z' 'n-za-mN-ZA-M'` (equivalent to the `rot13` utility, if available on your system)\n\n## The Flag\n\nAfter reversing all five transformations in order, the original flag is recovered:\n\n```\npicoCTF{Revers1ng_t3xt_Tr4nsf0rm@t10ns_aa00e8fb}\n```\n\n## Key Takeaways\n\nThis challenge is a good introduction to a pattern that shows up constantly in CTFs and real-world forensics alike: **layered encoding**. A few points worth remembering:\n\n- **Identify before you decode.** Base64 has a recognizable character set; ROT13 preserves word structure and punctuation while scrambling letters; a straight reversal often leaves symbols like `{` and `}` in mirrored, unexpected positions. Learning to eyeball these patterns saves time.\n- **`tr` is extremely versatile.** Beyond simple character swaps, `tr` handles ranges (`a-z`, `A-Z`) and can implement ciphers like ROT13 in a single line, without needing a dedicated tool.\n- **Order matters.** Each transformation must be undone in the reverse order it was applied — last transformation first, first transformation last. Undoing them out of order won't recover the original string.\n\nThis challenge is a solid warm-up for anything involving obfuscated strings, encoded payloads, or basic cipher analysis."},
  {
      slug: "TryHackMe",
      title: "nmap Basic Port Scans — Writeup",
      platform: "tryhackme",
      difficulty: "Easy",
      category: "Basics",
      date: "2026-11-08",
      tags: ["Nmap", "Wireshark", "Linux", "Cybersecurity", "Writeup"],
      summary: "A step-by-step walkthrough of the nmap basic port scans room",
      content: `|## Summary\nThis room covers how Nmap discovers open ports: the TCP connect scan, the SYN scan, the UDP scan, and options for controlling scan scope and speed. I ran each scan against the target machine and used Wireshark to confirm what actually happens on the wire.\n---\n## 1. TCP and UDP Basics\n| Question | Answer | Notes |\n|---|---|---|\n| Service on UDP port 53 | **DNS** | DNS uses UDP 53 for normal queries and TCP 53 for large responses and zone transfers |\n| Service on TCP port 22 | **SSH** | Encrypted remote login |\n| Number of port states Nmap considers | **6** | See below |\n| Most interesting state for a pentester | **open** | An open port means a service is listening and can be probed |\n**Nmap's six port states**\n| State | Meaning |\n|---|---|\n| open | A service is accepting connections |\n| closed | The port is reachable, but no service is listening |\n| filtered | Nmap can't tell if it's open; a firewall is dropping or blocking probes |\n| unfiltered | Reachable, but Nmap can't tell if it's open or closed (seen with ACK scans) |\n| open\|filtered | Nmap can't decide between open and filtered (common with UDP) |\n| closed\|filtered | Nmap can't decide between closed and filtered (seen with idle scans) |\n---\n## 2. TCP Flags\n\n| Question | Answer | Notes |\n|---|---|---|\n| Flag that resets a connection | **RST** | Sent to tear down a connection, or in reply to traffic aimed at a port with no listening service |\n| Flag set on the first packet of the handshake | **SYN** | Starts the 3-way handshake and synchronizes sequence numbers |\n\nThe handshake is SYN, then SYN-ACK, then ACK.\n\n---\n## 3. TCP Connect Scan (`-sT`)\n\n```bash nmap -sT -sV -F <target>\n```\n\n| Option | What it does |\n|---|---|\n| `-sT` | Full TCP connect scan. Completes the whole 3-way handshake. Needs no root, but is noisier and gets logged by the target |\n| `-sV` | Detects service names and versions |\n| `-F` | Fast mode. Scans the top 100 ports instead of the default 1000 |\n\n**Results**- FTP on port 21: **open**\n- Nmap's guess for the service on port 53: **domain** (DNS)\n---\n\n## 4. TCP SYN Scan (`-sS`)\n\n```bash sudo nmap -sS <target>\n```\n\nA SYN scan sends a SYN and waits for a reply. An open port answers with SYN-ACK, and Nmap then sends RST instead of ACK, so the handshake is never completed (this is why it's called "half-open"). That makes it faster than `-sT` and less likely to show up in application logs. It needs root because it crafts raw packets.\n\n**Verification in Wireshark:** I captured the scan and counted **4 SYN-ACK** packets, matching the **4 open ports** Nmap reported. Every open port produces one SYN-ACK, so the capture and the scan output agree.\n\nUseful Wireshark filter for this: `tcp.flags.syn == 1 && tcp.flags.ack == 1`\n\n---\n\n## 5. UDP Scan (`-sU`)\n\n```bash sudo nmap -sU --top-ports 20 <target>\n```\n\nUDP has no handshake, which makes scanning it harder:\n- **Closed port:** the target replies with an ICMP "port unreachable" message.\n- **Open port:** often sends no reply at all, so Nmap reports `open|filtered`.\n\nBecause Nmap has to wait and retransmit when there's no answer, UDP scans are much slower than TCP scans.\n\n**Result:** UDP port 161 (SNMP) was **closed** on the target.\n\n---\n\n## 6. Scope and Performance Tuning\n\n| Goal | Option | Notes |\n|---|---|---|\n| Scan TCP ports 5000-5500 | `-p5000-5500` | Limits the scan to a range |\n| Run at least 64 probes in parallel | `--min-parallelism=64` | Speeds up large scans |\n| Very slow, paranoid scan | `-T0` | Timing template 0. Used to evade IDS, but extremely slow |\n\nTiming templates run from `-T0` (paranoid) to `-T5` (insane). The default is `-T3`.\n\n---\n## Key Takeaways\n- `-sT` and `-sS` find the same open ports but behave differently on the network. `-sS` is stealthier, while `-sT` works without root.\n- Wireshark confirmed the theory: the SYN-ACK count matched the open-port count.\n- UDP scanning is slow and ambiguous because silence can mean open or filtered.\n\n- Scan options trade speed against stealth and accuracy. Choosing them deliberately matters more than memorizing flags.\n## Next Steps\nNmap does much more than a basic port scanner: service and version detection, OS detection and scripts. My own Python port checker only does TCP connect checks. To approach Nmap's features I plan to add banner grabbing, a SYN-style scan with Scapy, and UDP support./n---\n\n*By @hasan8babiker | Happy Hunting*\n`},
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
  },
  {
    slug : "htb-codify-writeup",
    title : "HackTheBox Codify Writeup: Code Review to RCE",
    platform : "HackTheBox",
    difficulty : "Medium",
    category : "CTF Writeup",
    date : "2026-07-09",
    tags : ["CTF", "HackTheBox", "RCE", "Writeup"],
    summary : "Detailed walkthrough of the Codify machine on HackTheBox. Learn how to exploit a vulnerable code review feature leading to remote code execution.",
    content : "Codify is a medium-difficulty HackTheBox machine that teaches code review vulnerabilities and privilege escalation.\n\n## Enumeration\nFirst, scan for open ports:\n```bash\nnmap -sV -sC 10.10.11.222\n```\nWe find SSH (port 22) and HTTP (port 3000) running a Node.js application.\n\n## Initial Access\nVisiting the web app reveals a code sandbox that executes JavaScript. Testing basic RCE payloads, we notice the app uses `vm2` library which is known to have escape vulnerabilities.\n\n## Exploitation\nThe `vm2` library has a sandbox escape. We can use:\n```javascript\nconst {VM} = require('vm2');\nconst vm = new VM();\nvm.run('this.constructor.constructor(\"return this.process.mainModule.require(\\'child_process\\').execSync(\\'id\\')\")();\n```\n\n## Foothold\nAfter RCE, we find database credentials in `.env` file. Using these, we enumerate further and find a user account.\n\n## Privilege Escalation\nThe user has sudo rights for a specific script. By analyzing the script, we can exploit a race condition to elevate to root.\n\n## Lessons Learned\n- Always update dependencies (vm2 is deprecated)\n- Input validation is critical even in sandboxes\n- Check for race conditions in privileged scripts\n- Credential management matters"

  },

];

export const getWriteupBySlug = (slug: string) => writeups.find(w => w.slug === slug);
