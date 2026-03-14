import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-background overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.23 0.19 264 / 0.8) 0%, oklch(0.11 0.14 264) 100%)",
        }}
      />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.74 0.13 84 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.13 84 / 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Institution name — top center */}
      <motion.div
        className="absolute top-10 left-0 right-0 flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="font-display text-primary tracking-[0.3em] text-xs uppercase">
          Rao Pahlad Singh
        </p>
        <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
          International School &nbsp;·&nbsp; Sector 50, Gurugram
        </p>
      </motion.div>

      {/* Central CTA */}
      <motion.div
        className="flex flex-col items-center gap-6 z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <motion.button
          onClick={() => navigate({ to: "/home" })}
          className="relative group px-12 py-5 font-display text-lg tracking-widest uppercase text-primary-foreground cursor-pointer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          data-ocid="landing.primary_button"
          style={{
            background: "oklch(0.74 0.13 84)",
            boxShadow:
              "0 0 40px oklch(0.74 0.13 84 / 0.35), 0 0 80px oklch(0.74 0.13 84 / 0.15)",
            letterSpacing: "0.25em",
          }}
        >
          <span className="relative z-10 font-semibold">TAKE ME NOW</span>
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.80 0.12 84) 0%, oklch(0.74 0.13 84) 100%)",
            }}
          />
        </motion.button>

        <motion.p
          className="text-muted-foreground text-xs tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Rao Pahlad Singh International School
        </motion.p>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground text-xs hover:text-primary transition-colors"
        >
          © {new Date().getFullYear()} · Built with love using caffeine.ai
        </a>
      </div>
    </div>
  );
}
