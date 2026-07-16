"use client";

import { useEffect, useState } from "react";

import CourseCard from "@/components/courses/CourseCard";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseSkeleton from "@/components/courses/CourseSkeleton";

export interface Course {
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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [level, setLevel] = useState("");

  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (search) params.append("search", search);

        if (category) params.append("category", category);

        if (level) params.append("level", level);

        if (sort) params.append("sort", sort);

        params.append("page", page.toString());

        params.append("limit", "8");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses?${params}`,
        );

        const result = await res.json();

        if (result.success) {
          setCourses(result.data);

          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [search, category, level, sort, page]);

  return (
    <main className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Explore Courses</h1>

          <p className="mt-3 text-base-content/70">
            Find the perfect course and upgrade your skills.
          </p>
        </div>

        <CourseFilters
          search={search}
          setSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}

          category={category}
          setCategory={(value) => {
            setPage(1);
            setCategory(value);
          }}

          level={level}
          setLevel={(value) => {
            setPage(1);
            setLevel(value);
          }}

          sort={sort}
          setSort={(value) => {
            setPage(1);
            setSort(value);
          }}
        />

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <CourseSkeleton key={item} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <h2 className="text-2xl font-bold">No courses found</h2>
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <button
                key={index}

                onClick={() => setPage(index + 1)}

                className={
                  page === index + 1 ? "btn btn-primary" : "btn btn-outline"
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
