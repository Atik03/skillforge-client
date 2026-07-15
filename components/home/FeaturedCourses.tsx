"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, User } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  rating: number;
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
          `${process.env.NEXT_PUBLIC_API_URL}/courses?limit=4`
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

        <div className="flex items-center justify-between mb-10">

          <div>
            <h2 className="text-4xl font-bold">
              Featured Courses
            </h2>

            <p className="text-base-content/70 mt-2">
              Learn from our most popular courses.
            </p>
          </div>

          <Link
            href="/courses"
            className="btn btn-outline btn-primary"
          >
            View All
          </Link>

        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="card bg-base-100 shadow"
              >
                <figure>
                  <div className="skeleton h-52 w-full" />
                </figure>

                <div className="card-body">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-2/3" />
                  <div className="skeleton h-10 w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {courses.map((course) => (
              <div
                key={course._id}
                className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl duration-300"
              >
                <figure className="relative h-52">

                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />

                </figure>

                <div className="card-body">

                  <div className="badge badge-primary">
                    {course.category}
                  </div>

                  <h2 className="card-title line-clamp-2">
                    {course.title}
                  </h2>

                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {course.shortDescription}
                  </p>

                  <div className="mt-3 space-y-2">

                    <div className="flex items-center gap-2 text-sm">
                      <User size={16} />
                      {course.instructor}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} />
                      {course.duration}
                    </div>

                    <div className="flex items-center justify-between">

                      <span className="font-bold text-primary text-lg">
                        ${course.price}
                      </span>

                      <div className="flex items-center gap-1">

                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        {course.rating}

                      </div>

                    </div>

                  </div>

                  <div className="card-actions mt-4">

                    <Link
                      href={`/courses/${course._id}`}
                      className="btn btn-primary w-full"
                    >
                      View Details
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}