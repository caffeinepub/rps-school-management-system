import { motion } from "motion/react";
import PublicLayout from "../../components/layout/PublicLayout";

const VALUES = [
  {
    label: "Integrity",
    desc: "We hold ourselves to the highest ethical standards in all we do.",
  },
  {
    label: "Excellence",
    desc: "We pursue mastery in academics, character, and co-curricular achievement.",
  },
  {
    label: "Innovation",
    desc: "We embrace curiosity and prepare students for a rapidly changing world.",
  },
  {
    label: "Community",
    desc: "We grow together — students, families, and educators as one family.",
  },
];

export default function PublicAbout() {
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
          Who We Are
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          About RPS International School
        </motion.h1>
      </section>

      {/* Overview */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="font-display text-2xl font-bold mb-5"
            style={{ color: "oklch(0.23 0.19 264)" }}
          >
            Our School
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "oklch(0.35 0.08 264)" }}
          >
            Rao Pahlad Singh (RPS) International School is located in Sector 50,
            Gurugram, Haryana. Committed to nurturing well-rounded, globally
            aware individuals, the school blends rigorous academics with a
            vibrant co-curricular culture. Our dedicated faculty, modern
            infrastructure, and student-first philosophy create an environment
            where every child can thrive.
          </p>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section
        className="px-6 py-16"
        style={{ background: "oklch(0.97 0.005 264)" }}
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          {[
            {
              heading: "Our Vision",
              body: "To be a centre of transformational learning that empowers students to become compassionate leaders, creative thinkers, and responsible global citizens.",
            },
            {
              heading: "Our Mission",
              body: "To provide a world-class education that balances intellectual rigour with personal growth, fostering an inclusive community where every student is known, valued, and challenged to achieve their full potential.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.heading}
              className="p-8 border-l-4"
              style={{
                borderColor: "oklch(0.74 0.13 84)",
                background: "oklch(0.98 0 0)",
              }}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3
                className="font-display text-xl font-bold mb-3"
                style={{ color: "oklch(0.23 0.19 264)" }}
              >
                {item.heading}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.40 0.08 264)" }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2
          className="font-display text-2xl font-bold mb-10 text-center"
          style={{ color: "oklch(0.23 0.19 264)" }}
        >
          Core Values
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.label}
              className="flex gap-4 items-start p-6 border"
              style={{
                borderColor: "oklch(0.85 0.06 84)",
                background: "oklch(0.97 0.005 264)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                className="w-2 h-2 mt-2 shrink-0"
                style={{ background: "oklch(0.74 0.13 84)" }}
              />
              <div>
                <p
                  className="font-display font-bold text-base mb-1"
                  style={{ color: "oklch(0.23 0.19 264)" }}
                >
                  {v.label}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.40 0.08 264)" }}
                >
                  {v.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
