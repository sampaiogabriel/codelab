import { NavbarDemo } from "@/components/pages/home/navbar";
import { Metadata } from "next";

import HeroSection from "@/components/pages/home/hero-section";
import TextSection from "@/components/pages/home/text-section";
import TestimonialsSection from "@/components/pages/home/testimonials";

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
      {/* <TextSection /> */}
      <TestimonialsSection />
    </>
  );
}
