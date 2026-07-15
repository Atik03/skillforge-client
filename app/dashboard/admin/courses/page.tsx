"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Search, Plus, Eye, Pencil, Trash2, BookOpen } from "lucide-react";

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

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 8;

  const loadCourses = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);

      const result = await res.json();

      if (result.success) {
        setCourses(result.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(courses.map((c) => c.category))];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let data = [...courses];

    if (search) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      data = data.filter((item) => item.category === category);
    }

    if (sort === "Newest") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    if (sort === "Oldest") {
      data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    if (sort === "Price Low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price High") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [courses, search, category, sort]);

  const totalPages = Math.ceil(filteredCourses.length / perPage);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", "Course deleted successfully.", "success");

        loadCourses();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to delete course.", "error");
    }
  };
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="text-primary" />
            Manage Courses
          </h1>

          <p className="text-base-content/70 mt-2">
            Create, update and manage all SkillForge courses.
          </p>
        </div>

        <Link href="/dashboard/admin/courses/add" className="btn btn-primary">
          <Plus size={18} />
          Add Course
        </Link>
      </div>

      {/* Filters */}

      <div className="card bg-base-100 border border-base-300 shadow">
        <div className="card-body">
          <div className="grid md:grid-cols-3 gap-4">
            <label className="input input-bordered flex items-center gap-2">
              <Search size={18} />

              <input
                type="text"
                className="grow"
                placeholder="Search course..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            <select
              className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Newest</option>

              <option>Oldest</option>

              <option>Price Low</option>

              <option>Price High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>

              <th>Title</th>

              <th>Category</th>

              <th>Level</th>

              <th>Price</th>

              <th>Students</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? [...Array(8)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <div className="skeleton h-16 w-20 rounded-lg"></div>
                    </td>

                    <td>
                      <div className="skeleton h-5 w-40"></div>
                    </td>

                    <td>
                      <div className="skeleton h-5 w-20"></div>
                    </td>

                    <td>
                      <div className="skeleton h-5 w-16"></div>
                    </td>

                    <td>
                      <div className="skeleton h-5 w-12"></div>
                    </td>

                    <td>
                      <div className="skeleton h-5 w-12"></div>
                    </td>

                    <td>
                      <div className="skeleton h-8 w-28"></div>
                    </td>
                  </tr>
                ))
              : paginatedCourses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={90}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    </td>

                    <td>
                      <h2 className="font-semibold">{course.title}</h2>

                      <p className="text-xs opacity-70">
                        {course.instructorName}
                      </p>
                    </td>

                    <td>
                      <span className="badge badge-outline">
                        {course.category}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-primary">
                        {course.level}
                      </span>
                    </td>

                    <td>${course.price}</td>

                    <td>{course.totalStudents}</td>

                    <td>
                      <div className="flex gap-2">
                        <Link
                          href={`/courses/${course._id}`}
                          className="btn btn-sm btn-info"
                        >
                          <Eye size={16} />
                        </Link>

                        <Link
                          href={`/dashboard/admin/courses/edit/${course._id}`}
                          className="btn btn-sm btn-warning"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          onClick={() => handleDelete(course._id)}
                          className="btn btn-sm btn-error"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            {!loading && paginatedCourses.length === 0 && (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <BookOpen
                    size={60}
                    className="mx-auto text-base-content/30"
                  />

                  <h2 className="mt-4 text-2xl font-bold">No Courses Found</h2>

                  <p className="mt-2 text-base-content/60">
                    Try another search or add a new course.
                  </p>

                  <Link
                    href="/dashboard/admin/courses/add"
                    className="btn btn-primary mt-5"
                  >
                    <Plus size={18} />
                    Add Course
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`join-item btn ${
                  currentPage === i + 1 ? "btn-primary" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
