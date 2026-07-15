import Image from "next/image";
import Link from "next/link";
import { Clock, Star, User, BarChart3 } from "lucide-react";

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

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition duration-300 h-full">
      <figure className="relative h-52">
        <Image
          src={course.thumbnail || "/placeholder-course.jpg"}
          alt={course.title}
          fill
          sizes="(max-width:768px) 100vw, 25vw"
          className="object-cover"
        />
      </figure>

      <div className="card-body flex flex-col">
        <div className="badge badge-primary">{course.category}</div>

        <h2 className="card-title text-xl line-clamp-2">{course.title}</h2>

        <p className="text-sm text-base-content/70 line-clamp-3">
          {course.shortDescription}
        </p>

        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{course.instructorName}</span>
          </div>

          <div className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>{course.level}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-primary">
            ${course.price}
          </span>

          <div className="flex items-center gap-1">
            <Star size={17} className="text-yellow-400 fill-yellow-400" />

            <span>{course.rating}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-base-content/60">
            {course.totalStudents} Students
          </p>
        </div>

        <div className="mt-auto pt-5">
          <Link
            href={`/courses/${course._id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
