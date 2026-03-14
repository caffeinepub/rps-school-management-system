import { motion } from "motion/react";
import PublicLayout from "../../components/layout/PublicLayout";

const STEPS = [
  {
    step: "01",
    label: "Inquiry",
    desc: "Contact our admissions office or visit the school to learn about our programs, fee structure, and available seats.",
  },
  {
    step: "02",
    label: "Application",
    desc: "Complete the official application form and submit supporting documents including birth certificate and previous academic records.",
  },
  {
    step: "03",
    label: "Assessment",
    desc: "Students undergo an age-appropriate interaction or entrance assessment conducted by our academic team.",
  },
  {
    step: "04",
    label: "Enrollment",
    desc: "Upon selection, complete the enrollment formalities, fee payment, and receive your welcome kit.",
  },
];

const ELIGIBILITY = [
  "Students from Nursery to Class XII are eligible to apply.",
  "Age-appropriate criteria apply for each grade as per CBSE norms.",
  "Mid-term admissions are subject to seat availability and assessed on a case-by-case basis.",
  "All academic records from the previous institution must be submitted at the time of application.",
];

export default function PublicAdmission() {
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
          Joining RPS
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Admissions
        </motion.h1>
        <motion.p
          className="mt-4 text-sm max-w-xl mx-auto"
          style={{ color: "oklch(0.80 0.03 264)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          We welcome motivated students who are eager to learn and grow within
          our vibrant school community.
        </motion.p>
      </section>

      {/* Admission Process */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2
          className="font-display text-2xl font-bold mb-12 text-center"
          style={{ color: "oklch(0.23 0.19 264)" }}
        >
          The Admission Process
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "oklch(0.85 0.06 84)" }}
          />
          <div className="flex flex-col gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`admission.step.${i + 1}` as never}
              >
                <div
                  className="w-16 h-16 shrink-0 flex items-center justify-center font-display text-xl font-bold z-10"
                  style={{
                    background: "oklch(0.23 0.19 264)",
                    color: "oklch(0.74 0.13 84)",
                  }}
                >
                  {s.step}
                </div>
                <div className="pt-3">
                  <h3
                    className="font-display text-lg font-bold mb-2"
                    style={{ color: "oklch(0.23 0.19 264)" }}
                  >
                    {s.label}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.40 0.08 264)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section
        className="px-6 py-14"
        style={{ background: "oklch(0.97 0.005 264)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-display text-2xl font-bold mb-6"
            style={{ color: "oklch(0.23 0.19 264)" }}
          >
            Eligibility
          </h2>
          <ul
            className="space-y-3 text-sm"
            style={{ color: "oklch(0.40 0.08 264)" }}
          >
            {ELIGIBILITY.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span
                  className="w-1.5 h-1.5 mt-2 shrink-0 block"
                  style={{ background: "oklch(0.74 0.13 84)" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2
          className="font-display text-2xl font-bold mb-4"
          style={{ color: "oklch(0.23 0.19 264)" }}
        >
          Contact the Admissions Office
        </h2>
        <p className="text-sm mb-2" style={{ color: "oklch(0.40 0.08 264)" }}>
          RPS International School, Sector 50, Gurugram, Haryana — 122018
        </p>
        <p className="text-sm mb-8" style={{ color: "oklch(0.40 0.08 264)" }}>
          For inquiries, please visit us during school hours or reach out
          through the school administration.
        </p>
        <a
          href="mailto:admissions@rpsinternational.edu.in"
          className="inline-flex items-center px-8 py-3 font-semibold text-sm tracking-widest uppercase transition-opacity hover:opacity-85"
          style={{
            background: "oklch(0.23 0.19 264)",
            color: "oklch(0.74 0.13 84)",
            border: "1px solid oklch(0.74 0.13 84)",
          }}
          data-ocid="admission.contact.button"
        >
          Contact Admissions Office
        </a>
      </section>
    </PublicLayout>
  );
}
