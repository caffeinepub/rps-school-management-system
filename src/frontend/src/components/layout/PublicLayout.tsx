import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/home", ocid: "nav.home.link" },
  { label: "About", to: "/about", ocid: "nav.about.link" },
  { label: "Admission", to: "/admission", ocid: "nav.admission.link" },
  { label: "Staff", to: "/staff", ocid: "nav.staff.link" },
  { label: "Gallery", to: "/gallery", ocid: "nav.gallery.link" },
];

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.98 0 0)", color: "oklch(0.14 0.17 264)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 shadow-md"
        style={{ background: "oklch(0.23 0.19 264)" }}
      >
        {/* School name */}
        <Link
          to="/home"
          className="font-display text-lg font-bold tracking-wide"
          style={{ color: "oklch(0.74 0.13 84)" }}
          data-ocid="nav.home.link"
        >
          RPS International School
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium tracking-wide transition-colors hover:opacity-80"
              style={{ color: "oklch(0.98 0 0)" }}
              data-ocid={link.ocid}
              activeProps={{ style: { color: "oklch(0.74 0.13 84)" } }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Portal Login */}
        <button
          type="button"
          onClick={() => navigate({ to: "/login" })}
          className="hidden md:inline-flex items-center px-4 py-1.5 text-sm font-semibold tracking-widest uppercase transition-colors hover:bg-primary/10"
          style={{
            color: "oklch(0.74 0.13 84)",
            border: "1px solid oklch(0.74 0.13 84)",
          }}
          data-ocid="nav.portal_login.button"
        >
          Portal Login
        </button>

        {/* Mobile: portal login only */}
        <button
          type="button"
          onClick={() => navigate({ to: "/login" })}
          className="md:hidden text-xs font-semibold tracking-widest uppercase px-3 py-1.5"
          style={{
            color: "oklch(0.74 0.13 84)",
            border: "1px solid oklch(0.74 0.13 84)",
          }}
          data-ocid="nav.portal_login_mobile.button"
        >
          Login
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="px-6 md:px-12 py-10"
        style={{ background: "oklch(0.23 0.19 264)", color: "oklch(0.98 0 0)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div>
            <p
              className="font-display text-lg font-bold"
              style={{ color: "oklch(0.74 0.13 84)" }}
            >
              RPS International School
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.75 0.04 264)" }}
            >
              Sector 50, Gurugram, Haryana
            </p>
          </div>
          <div
            className="flex gap-8 text-sm"
            style={{ color: "oklch(0.75 0.04 264)" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:opacity-80 transition-opacity"
                style={{ color: "inherit" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div
          className="max-w-6xl mx-auto mt-8 pt-6 flex justify-between items-center text-xs"
          style={{
            borderTop: "1px solid oklch(0.35 0.10 264)",
            color: "oklch(0.55 0.04 264)",
          }}
        >
          <span>
            © {new Date().getFullYear()} RPS International School, Sector 50,
            Gurugram. All rights reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "inherit" }}
          >
            Built with caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
