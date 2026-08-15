import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ComunaExplorer } from "@/components/home/ComunaExplorer";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection />
      <FeaturedProperties />
      <ProcessSection />
      <ComunaExplorer />
      <HowItWorksSection />
    </>
  );
}
