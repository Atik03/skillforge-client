"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, Clock, UserCircle, CheckCircle } from "lucide-react";

import { authClient } from "@/lib/auth-client";

interface Course {
  _id: string;
  title: string;
  thumbnail: string;
  shortDescription?: string;
  level?: string;
}

interface Enrollment {
  courseId: string;
  progress: number;
  status: string;
}

interface StudentDashboardData {
  user: {
    name: string;

    email: string;

    image?: string;

    role: string;
  };

  courses: Course[];

  enrollments: Enrollment[];
}

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  const [dashboardData, setDashboardData] =
    useState<StudentDashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/student/${session.user.email}`,
        );

        const result = await res.json();

        if (result.success) {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="skeleton h-32 w-full" />

        <div className="grid md:grid-cols-3 gap-5">
          <div className="skeleton h-40" />

          <div className="skeleton h-40" />

          <div className="skeleton h-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile */}

      <div className="card bg-base-100 border border-base-300 shadow">
        <div className="card-body flex flex-col md:flex-row items-center gap-5">
          {dashboardData?.user.image ? (
            <Image
              src={dashboardData.user.image}
              alt={dashboardData.user.name}
              width={90}
              height={90}
              className="rounded-full object-cover"
            />
          ) : (
            <UserCircle size={90} className="text-primary" />
          )}

          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {dashboardData?.user.name}
            </h1>

            <p className="opacity-70">{dashboardData?.user.email}</p>

            <div className="badge badge-primary mt-3">Student</div>
          </div>
        </div>
      </div>

      {/* Student Stats */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <BookOpen className="text-primary" />

            <h2 className="text-3xl font-bold">
              {dashboardData?.courses.length || 0}
            </h2>

            <p>Enrolled Courses</p>
          </div>
        </div>

        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <Clock className="text-primary" />

            <h2 className="text-3xl font-bold">
              {dashboardData?.enrollments.length || 0}
            </h2>

            <p>Active Learning</p>
          </div>
        </div>

        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <CheckCircle className="text-primary" />

            <h2 className="text-3xl font-bold">
              {dashboardData?.enrollments.filter(
                (item) => item.progress === 100,
              ).length || 0}
            </h2>

            <p>Completed Courses</p>
          </div>
        </div>
      </div>

      {/* My Courses */}

      <section>
        <h2 className="text-3xl font-bold mb-5">My Courses</h2>

        {dashboardData?.courses.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.courses.map((course) => (
              <div
                key={course._id}

                className="card bg-base-100 border shadow"
              >
                <figure className="h-48 relative">
                  <Image
                    src={course.thumbnail || "/placeholder-course.jpg"}
                    alt={course.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h3 className="card-title">{course.title}</h3>

                  <p className="text-sm opacity-70">
                    {course.shortDescription}
                  </p>

                  <div className="badge badge-outline">{course.level}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold">No enrolled courses yet</h3>
          </div>
        )}
      </section>
    </div>
  );
}
