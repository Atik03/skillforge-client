"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

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

export default function AddCoursePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const imageUrl = watch("thumbnail");

  useEffect(() => {
    setPreview(imageUrl || "");
  }, [imageUrl]);

  const onSubmit = async (data: CourseFormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        method: "POST",
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

          instructorName: session?.user?.name,
          instructorEmail: session?.user?.email,

          rating: 0,
          totalStudents: 0,
          createdAt: new Date(),
        }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Course added successfully.");

      router.push("/dashboard/admin/courses");

      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add course.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Add New Course</h1>

          <p className="text-base-content/70 mb-6">
            Fill in the course information below.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Title */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Course Title</legend>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="React Masterclass"
                  {...register("title")}
                />

                <p className="text-error text-sm">{errors.title?.message}</p>
              </fieldset>

              {/* Instructor */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Instructor</legend>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                  {...register("instructor")}
                />

                <p className="text-error text-sm">
                  {errors.instructor?.message}
                </p>
              </fieldset>

              {/* Category */}

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

              {/* Level */}

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

              {/* Duration */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Duration</legend>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="8 Weeks"
                  {...register("duration")}
                />

                <p className="text-error text-sm">{errors.duration?.message}</p>
              </fieldset>

              {/* Price */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Price ($)</legend>

                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="49"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />

                <p className="text-error text-sm">{errors.price?.message}</p>
              </fieldset>
            </div>

            {/* Thumbnail */}

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
                  width={400}
                  height={220}
                  className="rounded-xl border object-cover"
                />
              </div>
            )}

            {/* Short Description */}

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

            {/* Description */}

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
                className="btn btn-primary flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Course..." : "Add Course"}
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
