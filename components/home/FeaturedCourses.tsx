import Link from "next/link";

import SectionTitle from "../ui/SectionTitle";
import CourseCard from "../ui/CourseCard";
import { getCourses } from "@/services/courseService";

export default async function FeaturedCourses() {
  const result = await getCourses(4);

  const courses = result.data;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        <SectionTitle
          badge="Popular Courses"
          title="Featured Courses"
          description="Explore our most popular and highly rated courses designed to help you master modern technology."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              {...course}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="btn btn-primary btn-wide rounded-xl"
          >
            View All Courses
          </Link>
        </div>

      </div>
    </section>
  );
}