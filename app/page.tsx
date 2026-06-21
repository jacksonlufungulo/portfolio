import { Navbar } from "@/components/global/navbar";
import { Footer } from "@/components/global/footer";
import { LoadingScreen } from "@/components/global/loading-screen";
import { ParticlesBackground } from "@/components/global/particles-background";
import { ScrollProgress } from "@/components/global/scroll-progress";
import { BackToTop } from "@/components/global/back-to-top";

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Portfolio } from "@/components/sections/portfolio";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

import { ContentProvider } from "@/components/providers/content-provider";
import { getContent } from "@/lib/content-store";

// Read content at request time so admin edits show up without a rebuild.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  const { siteConfig } = content;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location },
  };

  return (
    <ContentProvider initial={content}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LoadingScreen />
      <ParticlesBackground />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Portfolio />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </ContentProvider>
  );
}
