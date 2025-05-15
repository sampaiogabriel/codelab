"use client";

import { usePreferencesStore } from "@/stores/preferences";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./video-player"), { ssr: false });

type LessonPlayerProps = {
  lesson: CourseLesson;
};

export const LessonPlayer = ({ lesson }: LessonPlayerProps) => {
  const autoplay = usePreferencesStore((state) => state.autoplay);

  const videoId = lesson.videoId;

  return (
    <div key={videoId} className="overflow-hidden w-full aspect-video bg-black">
      <VideoPlayer videoId={videoId} autoplay={autoplay} />
    </div>
  );
};
