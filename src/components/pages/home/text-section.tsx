import { TextReveal } from "@/components/magicui/text-reveal";
import { FC } from "react";

const TextSection: FC = () => {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        <TextReveal>
          Combinamos os métodos de ensino mais modernos com a experiência de
          profissionais de TI bem-sucedidos. Nossos cursos são baseados em uma
          abordagem prática, que permite aos alunos aplicar imediatamente seus
          conhecimentos em projetos reais.
        </TextReveal>
      </div>
    </section>
  );
};

export default TextSection;
