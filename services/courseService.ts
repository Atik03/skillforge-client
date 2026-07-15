import type { CoursesResponse } from "@/types/course";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface GetCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
  sort?: string;
}

export async function getCourses({
  page = 1,
  limit = 4,
  search = "",
  category = "",
  level = "",
  sort = "",
}: GetCoursesParams = {}): Promise<CoursesResponse> {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("limit", limit.toString());

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (level) params.set("level", level);
  if (sort) params.set("sort", sort);

  const res = await fetch(`${API_URL}/courses?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}