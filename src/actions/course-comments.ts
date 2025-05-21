"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "./user";
import { checkRole } from "@/lib/clerk";

export const getLessonComments = async (lessonId: string) => {
  await getUser();

  const comments = await prisma.lessonComment.findMany({
    where: { lessonId, parentId: null },
    include: {
      user: true,
      parent: true,
      replies: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return comments;
};

type CreateLessonCommentPayload = {
  courseSlug: string;
  lessonId: string;
  content: string;
  parentId?: string;
};

export const createLessonComment = async ({
  content,
  courseSlug,
  lessonId,
  parentId,
}: CreateLessonCommentPayload) => {
  const { userId } = await getUser();

  if (content.length > 500) {
    throw new Error("Comentário deve ter no máximo 500 caracteres");
  }

  const course = await prisma.course.findUnique({
    where: {
      slug: courseSlug,
    },
  });

  if (!course) {
    throw new Error("Curso não encontrado");
  }

  const userHasCourse = await prisma.coursePurchase.findFirst({
    where: {
      courseId: course.id,
      userId,
    },
  });

  if (!userHasCourse) {
    throw new Error("Você não possui acesso a este curso");
  }

  const lesson = await prisma.courseLesson.findUnique({
    where: {
      id: lessonId,
    },
  });

  if (!lesson) {
    throw new Error("Aula não encontrada");
  }

  const comment = await prisma.lessonComment.create({
    data: {
      content,
      lessonId,
      userId,
      parentId,
    },
  });

  // TODO: notificar usuarios

  return comment;
};

export const deleteComment = async (commentId: string) => {
  const { userId } = await getUser();

  const isAdmin = await checkRole("admin");

  const comment = await prisma.lessonComment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error("Comentário não encontrado");
  }

  if (!isAdmin && comment.userId !== userId) {
    throw new Error("Você não tem permissão para deletar este comentário");
  }

  await prisma.lessonComment.delete({
    where: { id: commentId },
  });
};

export const getAdminComments = async (): Promise<AdminComment[]> => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) throw new Error("Unauthorized");

  const comments = await prisma.lessonComment.findMany({
    where: {
      parentId: null,
    },
    include: {
      user: true,
      lesson: {
        include: {
          module: {
            include: {
              course: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments.map(({ _count, ...comment }) => ({
    ...comment,
    repliesCount: _count.replies,
  }));
};
