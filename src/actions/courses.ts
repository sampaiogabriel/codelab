"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "./user";
import { checkRole } from "@/lib/clerk";
import {
  CreateCourseFormData,
  createCourseSchema,
} from "@/server/schemas/course";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { uploadFile } from "./upload";

type GetCoursesPayload = {
  query?: string;
  tags?: string[] | string;
};

export const getCourses = async ({
  query,
  tags: rawTags,
}: GetCoursesPayload) => {
  const tags = !rawTags ? [] : Array.isArray(rawTags) ? rawTags : [rawTags];

  const hasTags = !!tags.length;
  const hasQuery = !!query?.trim();

  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
      tags: hasTags
        ? {
            some: {
              id: {
                in: tags,
              },
            },
          }
        : undefined,
      OR: hasQuery
        ? [{ title: { search: query } }, { description: { search: query } }]
        : undefined,
    },
    include: {
      tags: true,
      modules: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return courses;
};

export const getCourse = async (
  query: string,
  queryType: "slug" | "id" = "slug"
) => {
  const course = await prisma.course.findUnique({
    where: {
      slug: queryType === "slug" ? query : undefined,
      id: queryType === "id" ? query : undefined,
    },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
      tags: true,
    },
  });

  return { course };
};

export const getPurchasedCourses = async (detailed = false) => {
  const { userId } = await getUser(false);

  if (!userId) return [];

  const purchasedCourses = await prisma.coursePurchase.findMany({
    where: {
      userId,
    },
    include: {
      course: detailed
        ? {
            include: {
              tags: true,
              modules: true,
            },
          }
        : true,
    },
  });

  return purchasedCourses.map((purchase) => purchase.course);
};

export const getPurchasedCoursesWithDetails = async () => {
  const purchasedCourses = await getPurchasedCourses(true);

  return purchasedCourses as CourseWithTagsAndModules[];
};

export const getAdminCourses = async () => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) throw new Error("Unauthorized");

  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      modules: true,
    },
  });

  return courses;
};

export const getCourseTags = async () => {
  const tags = await prisma.courseTag.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return tags;
};

export const createCourseTag = async (name: string) => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) throw new Error("Unauthorized");

  const tag = await prisma.courseTag.create({
    data: { name },
  });

  return tag;
};

export const createCourse = async (rawData: CreateCourseFormData) => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) throw new Error("Unauthorized");

  const data = createCourseSchema.parse(rawData);

  const rawSlug = slugify(data.title, {
    lower: true,
    strict: true,
  });

  const slugCount = await prisma.course.count({
    where: {
      slug: {
        startsWith: rawSlug,
      },
    },
  });

  const slug = slugCount > 0 ? `${rawSlug}-${slugCount + 1}` : rawSlug;

  const { url: thumbnailUrl } = await uploadFile({
    file: data.thumbnail,
    path: "courses-thumbnails",
  });

  const course = await prisma.course.create({
    data: {
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      price: data.price,
      discountPrice: data.discountPrice,
      difficulty: data.difficulty,
      slug,
      status: "DRAFT",
      thumbnail: thumbnailUrl,
      tags: {
        connect: data.tagIds.map((id) => ({ id })),
      },
      modules: {
        create: data.modules.map((mod) => ({
          title: mod.title,
          description: mod.description,
          order: mod.order,
          lessons: {
            create: mod.lessons.map((lesson) => ({
              title: lesson.title,
              description: lesson.description,
              videoId: lesson.videoId,
              durationInMs: lesson.durationInMs,
              order: lesson.order,
            })),
          },
        })),
      },
    },
  });

  revalidatePath("/admin/courses");

  return course;
};
