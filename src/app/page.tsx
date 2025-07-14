import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import WhoWeAre from "@/components/WhoWeAre";
import FeaturedProjects from "@/components/FeaturedProjects";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white w-full ">
      <Hero />
      <Introduction />
      <WhoWeAre />
      <FeaturedProjects />
      <Stats />
      <Timeline />
      <Testimonials />
      <FAQ />
      <Sponsors />
    </main>
  );
}
