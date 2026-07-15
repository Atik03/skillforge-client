"use client";

import CountUp from "react-countup";
import {
  BookOpen,
  GraduationCap,
  Users,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Courses",
    value: 120,
    icon: BookOpen,
  },
  {
    title: "Students",
    value: 15000,
    icon: Users,
  },
  {
    title: "Instructors",
    value: 45,
    icon: GraduationCap,
  },
  {
    title: "Reviews",
    value: 5000,
    icon: Star,
  },
];

export default function Statistics() {
  return (
    <section className="py-20 bg-primary text-primary-content">

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="text-center"
              >
                <div className="flex justify-center mb-4">

                  <Icon size={40} />

                </div>

                <h2 className="text-4xl font-bold">

                  <CountUp
                    end={item.value}
                    duration={3}
                  />

                  +

                </h2>

                <p className="mt-2">
                  {item.title}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}