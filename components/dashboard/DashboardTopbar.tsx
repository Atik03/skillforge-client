"use client";

import Image from "next/image";
import { Menu } from "lucide-react";

import { authClient } from "@/lib/auth-client";

interface SessionUser {
  name: string;
  email: string;
  image?: string | null;
}

export default function DashboardTopbar() {
  const session = authClient.useSession();

  const user =
    session.data?.user as SessionUser | undefined;

  return (
    <header className="navbar border-b border-base-300 bg-base-100 px-6">

      <div className="flex-1">

        <label
          htmlFor="dashboard-drawer"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          <Menu size={22} />
        </label>

        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

      </div>

      {user && (
        <div className="flex items-center gap-3">

          <div className="text-right hidden sm:block">

            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-xs opacity-70">
              {user.email}
            </p>

          </div>

          <div className="avatar">

            <div className="w-11 rounded-full">

              <Image
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=random`
                }
                alt={user.name}
                width={44}
                height={44}
              />

            </div>

          </div>

        </div>
      )}

    </header>
  );
}