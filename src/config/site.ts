// Central site configuration — used by every SEO component, sitemap, and RSS feed.
// Change the domain here once and everything updates.

export const SITE = {
  name: "Hasan Babiker",
  title: "Hasan Babiker | Cybersecurity Engineer & Python Developer",
  description:
    "Portfolio of Hasan Babiker — Cybersecurity Engineer specializing in threat detection, Python automation, and security tools. Real-world writeups, articles, and open-source projects.",
  // Production URL (no trailing slash). Update if you move off GitHub Pages.
  url: "https://hasan8babiker.github.io/hasan-portfolio",
  locale: "en_US",
  author: {
    name: "Hasan Babiker",
    url: "https://hasan8babiker.github.io/hasan-portfolio",
    email: "hasan.babiker@example.com",
    twitter: "@hasan8babiker",
    github: "https://github.com/hasan8babiker",
    linkedin: "https://www.linkedin.com/in/hasanbabiker",
    jobTitle: "Cybersecurity Engineer & Python Developer",
  },
  defaultImage: "/hasan-portfolio/og-default.jpg",
  keywords: [
    "cybersecurity",
    "python developer",
    "penetration testing",
    "CTF writeups",
    "HackTheBox",
    "TryHackMe",
    "threat detection",
    "security automation",
    "Hasan Babiker",
  ],
};

export const getCanonical = (path = "/") => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean === "/" ? "" : clean}`;
};
