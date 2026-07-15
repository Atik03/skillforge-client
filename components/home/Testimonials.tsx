"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=1",
    review:
      "SkillForge completely changed my learning experience. The courses are practical and beginner-friendly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=2",
    review:
      "The instructors explain concepts very clearly. I landed my first job after completing the web development track.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Brown",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=3",
    review:
      "Beautiful platform with excellent content. Highly recommended for anyone wanting to upskill.",
    rating: 5,
  },
];
export default function Testimonials() {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            What Our Students Say
          </h2>
          <p className="mt-3 text-base-content/70">
            Trusted by thousands of learners worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-lg border border-base-300"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />

                  <div>
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="text-sm opacity-70">
                      {item.role}
                    </p>
                  </div>
                </div>

                <p className="mt-4">
                  "{item.review}"
                </p>

                <div className="flex gap-1 mt-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}