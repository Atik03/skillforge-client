"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession();

        if (session?.data?.user) {
          setUser(session.data.user as SessionUser);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();

    window.location.href = "/";
  };

  const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/courses",
    label: "Courses",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/help",
    label: "Help & Support",
  },
];

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">

        {/* Mobile */}

        <div className="navbar-start lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Logo */}

        <div className="navbar-start hidden lg:flex">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="SkillForge"
              width={40}
              height={40}
              priority
            />

            <span className="text-2xl font-bold text-primary">
              SkillForge
            </span>
          </Link>
        </div>

        {/* Mobile Logo */}

        <div className="navbar-center lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="SkillForge"
              width={36}
              height={36}
            />

            <span className="font-bold text-xl">
              SkillForge
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "text-primary font-semibold"
                      : ""
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}

        <div className="navbar-end">

          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : user ? (
            <div className="dropdown dropdown-end">

              <button
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-10 rounded-full">
                  <Image
                    src={
                      user.image ||
                      "https://ui-avatars.com/api/?background=random&name=" +
                        encodeURIComponent(user.name)
                    }
                    alt={user.name}
                    width={40}
                    height={40}
                  />
                </div>
              </button>

              <ul className="menu dropdown-content mt-3 w-64 rounded-box bg-base-100 p-2 shadow">

                <li className="menu-title">
                  <span>{user.name}</span>
                  <span className="text-xs">
                    {user.email}
                  </span>
                </li>

                <li>
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link href="/profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error"
                  >
                    Logout
                  </button>
                </li>

              </ul>
            </div>
          ) : (
            <div className="hidden gap-2 lg:flex">

              <Link
                href="/login"
                className="btn btn-ghost"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="btn btn-primary"
              >
                Register
              </Link>

            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <ul className="menu w-full p-4">

            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    pathname === item.href
                      ? "text-primary font-semibold"
                      : ""
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {!loading && !user && (
              <>
                <li className="mt-3">
                  <Link href="/login">
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    className="btn btn-primary mt-2"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {!loading && user && (
              <>
                <li className="mt-3">
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link href="/profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}