import { CircularProgress } from "@/components/ui/circular-progress";
import { cn, formatDuration } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { LessonItem } from "./lesson-item";
import { useMemo } from "react";

type ModuleItemProps = {
  data: CourseModuleWithLessons;
  completedLessons: CompletedLesson[];
};

export const ModuleItem = ({ data, completedLessons }: ModuleItemProps) => {
  const totalLessons = data.lessons.length;
  const totalDuration = data.lessons.reduce(
    (acc, lesson) => acc + lesson.durationInMs,
    0
  );

  const formattedDuration = formatDuration(totalDuration);

  const lessons = useMemo(() => {
    return data.lessons.map((lesson) => {
      const completed = completedLessons.some(
        (completedLesson) => completedLesson.lessonId === lesson.id
      );

      return {
        ...lesson,
        completed: completed,
      };
    });
  }, [completedLessons, data.lessons]);

  const moduleProgress = useMemo(() => {
    const completedModuleLessons = lessons.filter(
      (lesson) => lesson.completed
    ).length;

    return (completedModuleLessons / totalLessons) * 100;
  }, [lessons, totalLessons]);

  return (
    <Accordion.Item
      value={data.id}
      className="border border-border rounded-lg group"
    >
      <Accordion.Trigger className="flex items-center gap-4 p-4 w-full hover:bg-muted/50 transition-all outline-none">
        <div
          className={cn(
            "w-10 h-10 min-w-10 rounded-full flex items-center justify-center font-semibold bg-black/70 relative transition-all",
            moduleProgress >= 100 && "text-primary bg-primary/10"
          )}
        >
          {data.order}
          <CircularProgress
            progress={moduleProgress}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        <div className="flex-1 flex flex-col gap-0.5 text-left text-muted-foreground">
          <p className="text-white/80 font-medium">{data.title}</p>
          <div className="flex items-center gap-2 text-xs">
            <span>
              {totalLessons} aula{totalLessons > 1 ? "s" : ""}
            </span>
            <span>{formattedDuration}</span>
          </div>
        </div>

        <ChevronDown className="ml-auto text-muted-foreground w-4 h-4 group-data-[state=open]:rotate-180 transition-all" />
      </Accordion.Trigger>
      <Accordion.Content className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden">
        <div className="p-2 flex flex-col">
          {lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};
