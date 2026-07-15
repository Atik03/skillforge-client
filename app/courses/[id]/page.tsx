"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Star, BarChart3 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

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

export default function CourseDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const handleEnroll = async () => {
    if (!session) {
      toast.error("Please login first.");
      return;
    }

    try {
      setEnrolling(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollments`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            courseId: course._id,

            courseTitle: course.title,

            courseThumbnail: course.thumbnail,

            instructorName: course.instructorName,

            studentName: session.user.name,

            studentEmail: session.user.email,

            price: course.price,
          }),
        },
      );

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Enrollment Successful");
    } catch (error) {
      console.log(error);

      toast.error("Enrollment Failed");
    } finally {
      setEnrolling(false);
    }
  };

  const { data: session } = authClient.useSession();

  const [enrolling, setEnrolling] = useState(false);

  const [course, setCourse] = useState<Course | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        );

        const result = await res.json();

        if (result.success) {
          setCourse(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="skeleton h-96 w-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Course Not Found</h1>

        <Link href="/courses" className="btn btn-primary mt-5">
          Back To Courses
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-base-200 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 bg-base-100 rounded-3xl p-8 shadow">
          {/* Image */}

          <div className="relative h-[400px]">
            <Image
              src={course.thumbnail}

              alt={course.title}

              fill

              className="object-cover rounded-2xl"

              sizes="50vw"
            />
          </div>

          {/* Info */}

          <div>
            <span className="badge badge-primary">{course.category}</span>

            <h1 className="text-4xl font-bold mt-5">{course.title}</h1>

            <p className="mt-5 text-base-content/70">
              {course.shortDescription}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="flex gap-3 items-center">
                <User />

                <span>{course.instructorName}</span>
              </div>

              <div className="flex gap-3 items-center">
                <BarChart3 />

                <span>{course.level}</span>
              </div>

              <div className="flex gap-3 items-center">
                <Clock />

                <span>{course.duration}</span>
              </div>

              <div className="flex gap-3 items-center">
                <Star className="fill-yellow-400 text-yellow-400" />

                <span>{course.rating}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">
                ${course.price}
              </h2>

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="btn btn-primary"
              >
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Description */}

        <section className="mt-10 bg-base-100 rounded-3xl p-8 shadow">
          <h2 className="text-3xl font-bold mb-5">Course Overview</h2>

          <p className="leading-8 text-base-content/80">{course.description}</p>
        </section>

        {/* Reviews */}

        <section className="mt-10 bg-base-100 rounded-3xl p-8 shadow">
          <h2 className="text-3xl font-bold mb-5">Reviews & Ratings</h2>

          <div className="flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" />

            <span className="font-bold">{course.rating || 0}/5</span>
          </div>
        </section>
      </div>
    </main>
  );
}
