import { getCourse } from "@/actions/courses";
import { LessonDetails } from "@/components/pages/courses/course-page/lesson-details";
import { ModulesList } from "@/components/pages/courses/course-page/modules-list";
import { TopDetails } from "@/components/pages/courses/course-page/top-details";
import { notFound } from "next/navigation";

type CoursePageProps = {
  params: Promise<{ slug: string; moduleId: string; lessonId: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug, moduleId, lessonId } = await params;

  const { course } = await getCourse(slug);

  if (!course) return notFound();

  // TODO: verificar se o usuário possui o curso

  const currentModule = course.modules.find((mod) => mod.id === moduleId);
  if (!currentModule) return notFound();

  const allLessons = course.modules.flatMap((mod) => mod.lessons);

  const currentLessonIndex = allLessons.findIndex(
    (lesson) => lesson.id === lessonId
  );

  const currentLesson = allLessons[currentLessonIndex];
  const nextLesson = allLessons[currentLessonIndex + 1];

  if (!currentLesson) return notFound();

  return (
    <div className="w-full h-screen overflow-hidden grid grid-cols-[1fr_auto]">
      <div className="w-full h-full overflow-y-auto">
        <TopDetails course={course} />

        <LessonDetails lesson={currentLesson} nextLesson={nextLesson} />
      </div>

      <ModulesList modules={course.modules} />
    </div>
  );
}
