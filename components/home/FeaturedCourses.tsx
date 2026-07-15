"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import CourseCard from "@/components/courses/CourseCard";
import CourseSkeleton from "@/components/courses/CourseSkeleton";

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

interface ApiResponse {
  success: boolean;
  data: Course[];
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses?limit=4`,
        );

        const result: ApiResponse = await res.json();

        if (result.success) {
          setCourses(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-bold">Featured Courses</h2>

            <p className="text-base-content/70 mt-2">
              Learn from our most popular premium courses.
            </p>
          </div>

          <Link href="/courses" className="btn btn-outline btn-primary">
            View All Courses
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <CourseSkeleton key={item} />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">No Featured Courses Found</h2>

            <p className="mt-3 text-base-content/70">
              Courses will appear here once they are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
