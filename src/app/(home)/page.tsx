import { NavbarDemo } from "@/components/pages/home/navbar";
import { Metadata } from "next";

import { TextReveal } from "@/components/magicui/text-reveal";
import HeroSection from "@/components/pages/home/hero-section";
import TextSection from "@/components/pages/home/text-section";

export const metadata: Metadata = {
  title: "Cursos",
  description: "Comece hoje mesmo a aprender a programar com nossos cursos.",
};

export default async function HomePage() {
  return (
    <>
      <div className="h-[64px] w-full bg-background">
        <NavbarDemo />
      </div>

      <HeroSection />
      <TextSection />
    </>
  );
}
