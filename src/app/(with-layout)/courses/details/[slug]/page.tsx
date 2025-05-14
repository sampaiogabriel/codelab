import { getCourse } from "@/actions/courses";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDifficulty, formatDuration } from "@/lib/utils";
import {
  Calendar,
  Camera,
  ChartColumnIncreasing,
  CirclePlay,
  Clock,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";

type CourseDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { slug } = await params;

  const { course } = await getCourse(slug);

  if (!course) return notFound();

  const totalLessons = course.modules.reduce((acc, mod) => {
    return acc + mod.lessons.length;
  }, 0);

  const totalDuration = course.modules.reduce((acc, mod) => {
    return (
      acc + mod.lessons.reduce((acc, lesson) => acc + lesson.durationInMs, 0)
    );
  }, 0);

  const details = [
    {
      icon: Clock,
      label: "Duração",
      value: formatDuration(totalDuration),
    },
    {
      icon: Camera,
      label: "Aulas",
      value: `${totalLessons} aulas`,
    },
    {
      icon: ChartColumnIncreasing,
      label: "Dificuldade",
      value: formatDifficulty(course.difficulty),
    },
    {
      icon: Calendar,
      label: "Data de publicação",
      value: format(course.createdAt, "dd/MM/yyyy"),
    },
  ];

  return (
    <section className="flex flex-col">
      <div className="flex justify-between gap-6 flex-col md:flex-row">
        <div>
          BACK BUTTON
          <h1 className="text-3xl sm:text-4xl font-bold mt-6">
            {course.title}
          </h1>
          {course?.shortDescription && (
            <p className="text-muted-foreground mt-1">
              {course.shortDescription}
            </p>
          )}
          <div className="flex items-center flex-wrap gap-2.5 mt-5">
            {course.tags.map((tag) => (
              <Badge key={tag.id}>{tag.name}</Badge>
            ))}
          </div>
        </div>

        <Image
          src={course.thumbnail}
          alt={course.title}
          width={300}
          height={400}
          className="aspect-video rounded-2xl border border-primary object-cover w-full md:w-auto"
        />
      </div>

      <Separator className="my-6" />

      <div className="w-full grid md:grid-cols-[1fr_400px] gap-10">
        <Tabs defaultValue="overview">
          <TabsList className="w-full md:max-w-[300px]">
            <TabsTrigger value="overview">
              <LayoutDashboard />
              Visão geral
            </TabsTrigger>

            <TabsTrigger value="content">
              <CirclePlay />
              Conteúdo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <p className="opacity-90 mt-4">{course.description}</p>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 gap-6">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <detail.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {detail.label}
                    </p>
                    <p>{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content">content</TabsContent>
        </Tabs>

        <div className="w-full h-full bg-blue-500">
          <p>right</p>
        </div>
      </div>
    </section>
  );
}
