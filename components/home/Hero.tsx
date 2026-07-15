"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, PlayCircle, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex h-[65vh] items-center overflow-hidden bg-base-100">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row lg:justify-between">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="max-w-2xl text-center lg:text-left"
        >
          <div className="badge badge-primary badge-outline mb-6 gap-2 px-4 py-4 text-sm">
            <Star size={14} fill="currentColor" />
            Trusted by Thousands of Learners
          </div>

          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Build Skills That
            <span className="block text-primary">
              Shape Your Future
            </span>
          </h1>

          <p className="mt-6 text-base leading-8 text-base-content/70 md:text-lg">
            Learn from experienced instructors through practical,
            project-based courses. Upgrade your skills, earn certificates,
            and accelerate your career with SkillForge.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link href="/courses" className="btn btn-primary btn-lg">
              Explore Courses
              <ArrowRight size={18} />
            </Link>

            <Link href="/about" className="btn btn-outline btn-lg">
              <PlayCircle size={18} />
              Learn More
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
            <div>
              <h3 className="text-3xl font-bold text-primary">10K+</h3>
              <p className="text-sm text-base-content/60">
                Active Students
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-primary">200+</h3>
              <p className="text-sm text-base-content/60">
                Premium Courses
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-primary">50+</h3>
              <p className="text-sm text-base-content/60">
                Expert Mentors
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="hidden lg:block"
        >
          <div className="w-[420px] rounded-3xl border border-base-300 bg-base-100 p-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                Learning Progress
              </h3>

              <div className="badge badge-success">
                Live
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Next.js 16 Masterclass",
                  progress: "92%",
                },
                {
                  title: "TypeScript Essentials",
                  progress: "78%",
                },
                {
                  title: "MongoDB for Developers",
                  progress: "64%",
                },
              ].map((course) => (
                <div key={course.title}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen
                        size={18}
                        className="text-primary"
                      />
                      <span className="font-medium">
                        {course.title}
                      </span>
                    </div>

                    <span className="text-primary font-semibold">
                      {course.progress}
                    </span>
                  </div>

                  <progress
                    className="progress progress-primary w-full"
                    value={Number(course.progress.replace("%", ""))}
                    max={100}
                  />
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="stats stats-vertical w-full shadow-sm lg:stats-horizontal">
              <div className="stat px-2">
                <div className="stat-title">Certificates</div>
                <div className="stat-value text-primary">18</div>
              </div>

              <div className="stat px-2">
                <div className="stat-title">Completion</div>
                <div className="stat-value text-success">96%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}