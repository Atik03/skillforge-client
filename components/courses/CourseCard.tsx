import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Star,
  User,
  BarChart3,
} from "lucide-react";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  instructor?: string;
  level?: string;
  duration?: string;
  price?: number;
  rating?: number;
}

interface Props {
  course: Course;
}

export default function CourseCard({
  course,
}: Props) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition duration-300 h-full">

      <figure className="relative h-52">

        <Image
          src={
            course.imageUrl ||
            "/placeholder-course.jpg"
          }
          alt={course.title}
          fill
          sizes="(max-width:768px) 100vw, 25vw"
          className="object-cover"
        />

      </figure>


      <div className="card-body flex flex-col">

        <div className="badge badge-primary">
          Course
        </div>


        <h2 className="card-title text-xl line-clamp-2">
          {course.title}
        </h2>


        <p className="text-sm text-base-content/70 line-clamp-3">
          {course.shortDescription}
        </p>


        <div className="mt-3 space-y-2 text-sm">


          {course.instructor && (
            <div className="flex items-center gap-2">
              <User size={16}/>
              <span>
                {course.instructor}
              </span>
            </div>
          )}


          {course.level && (
            <div className="flex items-center gap-2">
              <BarChart3 size={16}/>
              <span>
                {course.level}
              </span>
            </div>
          )}


          {course.duration && (
            <div className="flex items-center gap-2">
              <Clock size={16}/>
              <span>
                {course.duration}
              </span>
            </div>
          )}


        </div>


        <div className="flex justify-between items-center mt-4">

          <span className="text-xl font-bold text-primary">
            ${course.price ?? 0}
          </span>


          <div className="flex items-center gap-1">

            <Star
              size={17}
              className="text-yellow-400 fill-yellow-400"
            />

            <span>
              {course.rating ?? 0}
            </span>

          </div>

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