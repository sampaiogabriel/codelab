"use client";

import { getCourseProgress } from "@/actions/course-progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { queryKeys } from "@/constants/query-keys";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Play, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { CheckoutDialog } from "./checkout-dialog";
import { useState } from "react";

type CourseProgressProps = {
  course: Course;
};

export const CourseProgress = ({ course }: CourseProgressProps) => {
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

  const hasCourse = false;

  const { data: courseProgress } = useQuery({
    queryKey: queryKeys.courseProgress(course.slug),
    queryFn: () => getCourseProgress(course.slug),
    enabled: !!course.slug && hasCourse,
  });

  const progress = courseProgress?.progress ?? 0;

  return (
    <aside className="bg-muted rounded-2xl p-6 max-h-max sticky top-0">
      {hasCourse ? (
        <>
          <h3 className="text-sm font-bold text-muted-foreground">
            Progresso geral
          </h3>

          <div className="flex items-center gap-2 mt-3">
            <Progress value={progress} />
            <p className="text-xs">{progress}%</p>
          </div>

          <Link passHref href={`/courses/${course.slug}`}>
            <Button className="w-full mt-4 text-xl font-bold h-auto text-white py-3">
              {progress > 0 ? "Continuar assistindo" : "Começar agora"}
              <Play />
            </Button>
          </Link>
        </>
      ) : (
        <div className="flex flex-col items-center text-center gap-2">
          <p className="text-2xl font-bold">Comece agora por apenas</p>
          {!!course.discountPrice && (
            <p className="line-through font-medium text-muted-foreground -mb-2">
              {formatPrice(course.price)}
            </p>
          )}

          <p className="text-4xl font-extrabold text-primary">
            {formatPrice(course.discountPrice ?? course.price)}
          </p>

          <Button
            className="w-full mt-2 text-xl font-bold h-auto text-white py-3"
            onClick={() => setShowCheckoutDialog(true)}
          >
            Comprar
            <ShoppingCart />
          </Button>
        </div>
      )}

      <CheckoutDialog
        open={showCheckoutDialog}
        setOpen={setShowCheckoutDialog}
        course={course}
      />
    </aside>
  );
};
