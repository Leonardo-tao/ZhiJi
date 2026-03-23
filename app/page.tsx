import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { DemoSection } from "@/components/landing/demo-section";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import "@/styles/home.css";
import { auth } from "@/app/(auth)/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div
      className="homepage-wrapper dark min-h-screen"
      style={{ colorScheme: "dark" }}
    >
      <Header user={session?.user} />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <TechStackSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
