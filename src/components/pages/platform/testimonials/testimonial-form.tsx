"use client";

import { BackButton } from "@/components/ui/back-button";
import { Separator } from "@radix-ui/react-separator";

export const TestimonialForm = () => {
  return (
    <>
      <BackButton />

      <div>
        <h1 className="text-2xl font-bold">Criar seu depoimento</h1>
        <p className="text-muted-foreground mt-2">
          Preencha o formulário abaixo para avaliar a plataforma.
        </p>
      </div>

      <Separator className="my-2" />
    </>
  );
};

export default TestimonialForm;
