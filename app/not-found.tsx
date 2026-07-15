"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-lg w-full card bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body items-center text-center">
          <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center">
            <TriangleAlert size={60} className="text-error" />
          </div>

          <h1 className="text-7xl font-extrabold mt-6">404</h1>

          <h2 className="text-3xl font-bold mt-2">Page Not Found</h2>

          <p className="text-base-content/70 mt-3">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex gap-4 mt-8">
            <Link href="/" className="btn btn-primary">
              Go Home
            </Link>

            <Link href="/courses" className="btn btn-outline">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
