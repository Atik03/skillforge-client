"use client";

import Link from "next/link";
import {
  Code2,
  Palette,
  Database,
  Briefcase,
  Smartphone,
  Brain,
} from "lucide-react";

const categories = [
  {
    title: "Web Development",
    slug: "Web Development",
    icon: Code2,
    color: "bg-blue-100 text-blue-600",
    courses: "50+ Courses",
  },
  {
    title: "UI/UX Design",
    slug: "UI/UX Design",
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
    courses: "30+ Courses",
  },
  {
    title: "Data Science",
    slug: "Data Science",
    icon: Database,
    color: "bg-green-100 text-green-600",
    courses: "25+ Courses",
  },
  {
    title: "Business",
    slug: "Business",
    icon: Briefcase,
    color: "bg-yellow-100 text-yellow-600",
    courses: "40+ Courses",
  },
  {
    title: "Mobile Development",
    slug: "Mobile Development",
    icon: Smartphone,
    color: "bg-purple-100 text-purple-600",
    courses: "20+ Courses",
  },
  {
    title: "AI & Machine Learning",
    slug: "AI & Machine Learning",
    icon: Brain,
    color: "bg-red-100 text-red-600",
    courses: "18+ Courses",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Explore Categories
          </h2>

          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Discover industry-focused learning paths designed
            to help you master in-demand skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={`/courses?category=${encodeURIComponent(
                  category.slug
                )}`}
                className="group rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${category.color}`}
                >
                  <Icon size={34} />
                </div>

                <h3 className="mt-6 text-2xl font-bold group-hover:text-primary transition">
                  {category.title}
                </h3>

                <p className="mt-2 text-base-content/70">
                  {category.courses}
                </p>

                <button className="btn btn-primary btn-sm mt-6">
                  Explore
                </button>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}