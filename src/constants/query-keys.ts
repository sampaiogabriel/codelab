export const queryKeys = {
  courseProgress: (courseSlug: string) => ["course-progress", courseSlug],
  lessonComments: (lessonId: string) => ["lesson-comments", lessonId],
  purchasedCourses: ["purchased-courses"],
} as const;
