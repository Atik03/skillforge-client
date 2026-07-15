import Image from "next/image";
import Link from "next/link";
import { Clock3, Star, Users, ArrowRight } from "lucide-react";
import type { Course } from "@/types/course";

type CourseCardProps = Course;

export default function CourseCard({
  _id,
  title,
  shortDescription,
  thumbnail,
  category,
  level,
  duration,
  price,
  rating,
  totalStudents,
  instructorName,
}: CourseCardProps) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group h-full">
      {/* Thumbnail */}
      <figure className="relative h-56 overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
        />

        <div className="absolute left-4 top-4 badge badge-primary">
          {category}
        </div>
      </figure>

      <div className="card-body">
        {/* Level */}
        <div className="badge badge-outline">{level}</div>

        {/* Title */}
        <h2 className="card-title line-clamp-2 min-h-[56px]">{title}</h2>

        {/* Description */}
        <p className="text-sm text-base-content/70 line-clamp-3 min-h-[72px]">
          {shortDescription}
        </p>

        {/* Meta */}
        <div className="mt-3 space-y-2 text-sm text-base-content/70">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock3 size={16} />
              {duration}
            </span>

            <span className="font-semibold text-primary text-lg">
              ${price}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
              {rating.toFixed(1)}
            </span>

            <span className="flex items-center gap-2">
              <Users size={16} />
              {totalStudents}
            </span>
          </div>
        </div>

        {/* Instructor */}
        <div className="divider my-3" />

        <p className="text-sm">
          <span className="font-semibold">Instructor:</span>{" "}
          {instructorName}
        </p>

        {/* Button */}
        <div className="card-actions mt-5">
          <Link
            href={`/courses/${_id}`}
            className="btn btn-primary w-full rounded-xl"
          >
            View Details
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}