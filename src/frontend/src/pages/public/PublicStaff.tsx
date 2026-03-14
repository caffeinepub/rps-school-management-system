import { motion } from "motion/react";
import PublicLayout from "../../components/layout/PublicLayout";

export default function PublicStaff() {
  return (
    <PublicLayout>
      {/* Page header */}
      <section
        className="px-6 py-20 text-center"
        style={{ background: "oklch(0.23 0.19 264)", color: "oklch(0.98 0 0)" }}
      >
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: "oklch(0.74 0.13 84)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Our People
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Staff Directory
        </motion.h1>
      </section>

      {/* Coming Soon placeholder */}
      <section className="flex flex-col items-center justify-center py-32 px-6">
        <motion.div
          className="flex flex-col items-center gap-6 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          data-ocid="staff.empty_state"
        >
          <div
            className="w-20 h-20 flex items-center justify-center"
            style={{
              border: "2px solid oklch(0.74 0.13 84)",
              color: "oklch(0.74 0.13 84)",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              role="img"
              aria-label="Staff directory icon"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h2
              className="font-display text-2xl font-bold mb-3"
              style={{ color: "oklch(0.23 0.19 264)" }}
            >
              Staff Directory — Updating Soon
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.50 0.07 264)" }}
            >
              Our staff directory is currently being prepared. The complete list
              of our dedicated faculty and administrative team will be available
              here shortly. Please check back soon.
            </p>
          </div>
          <div
            className="mt-2 px-5 py-2 text-xs font-semibold tracking-widest uppercase"
            style={{
              border: "1px solid oklch(0.85 0.06 84)",
              color: "oklch(0.60 0.10 84)",
              background: "oklch(0.97 0.005 264)",
            }}
          >
            Coming Soon
          </div>
        </motion.div>
      </section>
    </PublicLayout>
  );
}
