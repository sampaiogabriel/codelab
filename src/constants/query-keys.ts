export const queryKeys = {
  courseProgress: (courseSlug: string) => ["course-progress", courseSlug],
  lessonComments: (lessonId: string) => ["lesson-comments", lessonId],
  purchasedCourses: ["purchased-courses"],
  courseTags: ["course-tags"],
  notifications: ["notifications"],
} as const;
