import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import PublicLayout from "../../components/layout/PublicLayout";

const HIGHLIGHTS = [
  {
    title: "Academic Excellence",
    desc: "A rigorous, future-focused curriculum that equips students with critical thinking, analytical depth, and a love for lifelong learning.",
    icon: "🎓",
  },
  {
    title: "Holistic Development",
    desc: "Sports, arts, music, and co-curricular programs cultivate well-rounded individuals ready to lead in every arena of life.",
    icon: "🌱",
  },
  {
    title: "Community Values",
    desc: "A culture of respect, empathy, and responsibility — where every student, teacher, and family is a valued member of the RPS family.",
    icon: "🤝",
  },
];

export default function PublicHome() {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-40"
        style={{
          background: "oklch(0.23 0.19 264)",
          color: "oklch(0.98 0 0)",
        }}
        data-ocid="home.section"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.74 0.13 84 / 0.2) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.13 84 / 0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "oklch(0.74 0.13 84)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Rao Pahlad Singh · Sector 50, Gurugram
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Excellence in{" "}
          <span style={{ color: "oklch(0.74 0.13 84)" }}>Education</span>
        </motion.h1>
        <motion.p
          className="mt-6 text-base md:text-lg max-w-xl leading-relaxed"
          style={{ color: "oklch(0.80 0.03 264)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Shaping minds, building character, and inspiring futures — at RPS
          International School we hold education to the highest standard.
        </motion.p>
        <motion.button
          type="button"
          onClick={() => navigate({ to: "/admission" })}
          className="mt-10 px-8 py-3 font-semibold text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
          style={{
            background: "oklch(0.74 0.13 84)",
            color: "oklch(0.14 0.17 264)",
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          data-ocid="home.admission.button"
        >
          Admissions Open
        </motion.button>
      </section>

      {/* Highlight cards */}
      <section
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8"
        data-ocid="home.highlights.section"
      >
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={h.title}
            className="p-8 border"
            style={{
              background: "oklch(0.97 0.005 264)",
              borderColor: "oklch(0.85 0.06 84)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            data-ocid={`home.highlight.card.${i + 1}` as never}
          >
            <div className="text-3xl mb-4">{h.icon}</div>
            <h3
              className="font-display text-xl font-bold mb-3"
              style={{ color: "oklch(0.23 0.19 264)" }}
            >
              {h.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.40 0.08 264)" }}
            >
              {h.desc}
            </p>
          </motion.div>
        ))}
      </section>
    </PublicLayout>
  );
}
