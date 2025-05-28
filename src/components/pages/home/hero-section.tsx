import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import LampadaGif from "@/assets/lampada.gif";
import { BlurFade } from "@/components/magicui/blur-fade";

const HeroSection: FC = () => {
  return (
    <main className="w-full bg-foreground max-h-screen">
      <div className="w-full max-w-7xl mx-auto flex center">
        <section className="w-full text-black flex flex-col items-center justify-center pt-10">
          <TextAnimate
            className="text-4xl sm:text-5xl font-bold max-w-[600px] text-center mb-6 p-4 md:p-0"
            animation="blurInUp"
            once
            as="h1"
          >
            A revolução digital começa com o seu conhecimento
          </TextAnimate>

          <TextAnimate
            className="text-gray-500 max-w-[600px] text-center mb-6"
            animation="fadeIn"
            once
            as="p"
            delay={1}
          >
            Na nossa plataforma, você encontra os cursos de tecnologia mais
            completos do mercado. Aprenda com quem entende, desenvolva novas
            habilidades e conquiste seu espaço no futuro digital
          </TextAnimate>

          <div className="m-6">
            <BlurFade>
              <Link href="/platform">
                <Button className="relative rounded-full text-white" size="lg">
                  Escolha seu curso e comece agora
                  <ChevronRight />
                </Button>
              </Link>
            </BlurFade>
          </div>
          <div className="w-full max-w-[800px] md:mt-[-100px]">
            <Image src={LampadaGif} alt="lightbump" unoptimized />
          </div>
        </section>
      </div>
    </main>
  );
};

export default HeroSection;
