export interface Course {
  _id: string;

  title: string;
  shortDescription: string;
  description: string;

  thumbnail: string;

  category: string;
  level: string;
  duration: string;

  price: number;

  instructorName: string;
  instructorEmail: string;

  rating: number;
  totalStudents: number;

  createdAt: string;
}

export interface CoursesResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: Course[];
}