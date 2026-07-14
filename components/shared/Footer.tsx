import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const quickLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Instructors",
    href: "/instructors",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const supportLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
];

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: <FaFacebookF size={18} />,
  },
  {
    href: "https://x.com",
    label: "X",
    icon: <FaXTwitter size={18} />,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <FaLinkedinIn size={18} />,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: <FaGithub size={18} />,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: <FaInstagram size={18} />,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-3xl font-extrabold text-primary"
            >
              SkillForge
            </Link>

            <p className="mt-4 text-sm leading-7 text-base-content/70">
              SkillForge is a modern online learning platform that helps
              students and professionals master in-demand skills through
              high-quality courses taught by experienced instructors.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="btn btn-circle btn-outline btn-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Support</h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>

            <div className="space-y-4 text-sm text-base-content/80">
              <p>
                <span className="font-semibold">Email:</span>
                <br />
                support@skillforge.dev
              </p>

              <p>
                <span className="font-semibold">Phone:</span>
                <br />
                +880 1700-000000
              </p>

              <p>
                <span className="font-semibold">Office Hours:</span>
                <br />
                Saturday – Thursday
                <br />
                9:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-base-300 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-base-content/70 md:flex-row">
            <p>
              © {year} SkillForge. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/privacy-policy"
                className="hover:text-primary"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                className="hover:text-primary"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/contact"
                className="hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}