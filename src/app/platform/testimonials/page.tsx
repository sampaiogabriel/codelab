import TestimonialForm from "@/components/pages/plataform/testimonials/testimonial-form";
import { Metadata } from "next";

export const revalidate = 3600; // Revalidate at most every hour

export const metadata: Metadata = {
  title: "Testimonials",
};

export default async function TestimonialsPage() {
  return (
    <>
      <div className="w-full flex flex-col gap-3">
        <TestimonialForm />
      </div>
    </>
  );
}
