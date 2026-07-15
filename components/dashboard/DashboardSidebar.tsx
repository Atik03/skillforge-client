"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  PlusCircle,
  User,
  FolderKanban,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

interface SessionUser {
  role?: "admin" | "student";
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  const session = authClient.useSession();

  const role =
    (session.data?.user as SessionUser | undefined)?.role ||
    "student";

  const studentLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Courses",
      href: "/dashboard/my-courses",
      icon: BookOpen,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Course",
      href: "/dashboard/add-course",
      icon: PlusCircle,
    },
    {
      name: "Manage Courses",
      href: "/dashboard/manage-courses",
      icon: FolderKanban,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  const links =
    role === "admin" ? adminLinks : studentLinks;

  return (
    <div className="drawer-side z-40">

      <label
        htmlFor="dashboard-drawer"
        className="drawer-overlay"
      />

      <aside className="min-h-full w-72 bg-base-100 border-r border-base-300">

        <div className="p-6">

          <Link
            href="/"
            className="text-3xl font-bold text-primary"
          >
            SkillForge
          </Link>

        </div>

        <ul className="menu px-4">

          {links.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>

                <Link
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "active font-semibold"
                      : ""
                  }
                >
                  <Icon size={18} />

                  {item.name}
                </Link>

              </li>
            );
          })}

        </ul>

      </aside>
    </div>
  );
}