import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Blog } from "@/components/Blog";
import { Writeups } from "@/components/Writeups";
import { ProgressJournal } from "@/components/ProgressJournal";
import { Contact } from "@/components/Contact";
import {
  SEO,
  StructuredData,
  websiteSchema,
  organizationSchema,
  personSchema,
} from "@/components/seo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO path="/" />
      <StructuredData data={[websiteSchema(), organizationSchema(), personSchema()]} />
      <Hero />
      <About />
      <Projects />
      <Writeups />
      <Blog />
      <ProgressJournal />
      <Contact />
    </div>
  );
};

export default Index;
