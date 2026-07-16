"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const courseSchema = z.object({
  title: z.string().min(5, "Title is required"),
  category: z.string().min(2, "Category is required"),
  level: z.string().min(2, "Level is required"),
  instructor: z.string().min(3, "Instructor name is required"),
  duration: z.string().min(2, "Duration is required"),
  price: z.number().min(0),
  thumbnail: z.string().url("Enter a valid image URL"),
  shortDescription: z.string().min(20, "Minimum 20 characters"),
  description: z.string().min(50, "Minimum 50 characters"),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  thumbnail: string;
  instructorName: string;
  instructorEmail: string;
  rating: number;
  totalStudents: number;
  createdAt: string;
}

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const imageUrl = watch("thumbnail");

  useEffect(() => {
    setPreview(imageUrl || "");
  }, [imageUrl]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        );

        const result = await res.json();

        if (result.success) {
          const course: Course = result.data;

          reset({
            title: course.title,
            instructor: course.instructorName,
            category: course.category,
            level: course.level,
            duration: course.duration,
            price: course.price,
            thumbnail: course.thumbnail,
            shortDescription: course.shortDescription,
            description: course.description,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, reset]);

  const onSubmit = async (data: CourseFormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            category: data.category,
            level: data.level,
            duration: data.duration,
            price: data.price,
            thumbnail: data.thumbnail,
            shortDescription: data.shortDescription,
            description: data.description,
            instructorName: data.instructor,
          }),
        },
      );

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Course updated successfully.");

      router.push("/dashboard/admin/courses");

      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Failed to update course.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="skeleton h-10 w-52"></div>
            <div className="skeleton h-96 w-full mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Edit Course</h1>

          <p className="text-base-content/70 mb-6">
            Update course information.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Course Title</legend>

                <input
                  className="input input-bordered w-full"
                  {...register("title")}
                />

                <p className="text-error text-sm">{errors.title?.message}</p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Instructor</legend>

                <input
                  className="input input-bordered w-full"
                  {...register("instructor")}
                />

                <p className="text-error text-sm">
                  {errors.instructor?.message}
                </p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Category</legend>

                <select
                  className="select select-bordered w-full"
                  {...register("category")}
                >
                  <option value="">Select Category</option>

                  <option>Web Development</option>
                  <option>Programming</option>
                  <option>UI/UX</option>
                  <option>Data Science</option>
                  <option>AI</option>
                  <option>Cyber Security</option>
                </select>

                <p className="text-error text-sm">{errors.category?.message}</p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Level</legend>

                <select
                  className="select select-bordered w-full"
                  {...register("level")}
                >
                  <option value="">Select Level</option>

                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>

                <p className="text-error text-sm">{errors.level?.message}</p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Duration</legend>

                <input
                  className="input input-bordered w-full"
                  {...register("duration")}
                />

                <p className="text-error text-sm">{errors.duration?.message}</p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Price</legend>

                <input
                  type="number"
                  className="input input-bordered w-full"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />

                <p className="text-error text-sm">{errors.price?.message}</p>
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Thumbnail URL</legend>

              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://..."
                {...register("thumbnail")}
              />

              <p className="text-error text-sm">{errors.thumbnail?.message}</p>
            </fieldset>

            {preview && (
              <div className="mt-4">
                <Image
                  src={preview}
                  alt="Preview"
                  width={450}
                  height={250}
                  className="rounded-xl border object-cover"
                />
              </div>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Short Description</legend>

              <textarea
                rows={3}
                className="textarea textarea-bordered"
                {...register("shortDescription")}
              />

              <p className="text-error text-sm">
                {errors.shortDescription?.message}
              </p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Full Description</legend>

              <textarea
                rows={7}
                className="textarea textarea-bordered"
                {...register("description")}
              />

              <p className="text-error text-sm">
                {errors.description?.message}
              </p>
            </fieldset>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex-1"
              >
                {isSubmitting ? "Updating Course..." : "Update Course"}
              </button>

              <button
                type="button"
                className="btn btn-outline flex-1"
                onClick={() => router.push("/dashboard/admin/courses")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
