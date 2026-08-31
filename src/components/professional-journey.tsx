import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  Activity,
  ArrowRight,
  Award,
  Building2,
  Check,
  GraduationCap,
  HeartPulse,
  Globe2,
  Microscope,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { SectionEyebrow } from "@/components/section-eyebrow";

type MilestoneState = "current" | "passed" | "upcoming";

type Phase = {
  label: string;
  range: string;
  summary: string;
};

const PHASES: Phase[] = [
  {
    label: "Medical Foundation",
    range: "1998 – 2009",
    summary: "Undergraduate medicine and postgraduate specialisation in pulmonary medicine.",
  },
  {
    label: "Pulmonary & Critical-Care Training",
    range: "2009 – 2013",
    summary: "Senior residency and formal critical-care qualifications in New Delhi.",
  },
  {
    label: "Advanced & International Exposure",
    range: "2013 – 2016",
    summary: "Interventional pulmonology training, a European diploma and a US observership.",
  },
  {
    label: "Leadership",
    range: "2016 – 2026",
    summary: "A decade of building and leading pulmonary services at CK Birla Hospitals – RBH.",
  },
];

type Milestone = {
  phase: number;
  years: string;
  title: string;
  org: string;
  detail: string;
  icon: LucideIcon;
  featured?: boolean;
  progression?: { period: string; role: string }[];
};

const MILESTONES: Milestone[] = [
  {
    phase: 0,
    years: "1998 – 2004",
    title: "MBBS",
    org: "S.P. Medical College, Bikaner · University of Rajasthan",
    detail:
      "Bachelor of Medicine and Bachelor of Surgery. Registered with the Rajasthan Medical Council (Reg. No. 23258) on 15 March 2005.",
    icon: GraduationCap,
  },
  {
    phase: 0,
    years: "Jun 2006 – Jun 2009",
    title: "MD — Pulmonary Medicine",
    org: "S.P. Medical College / PBM Group of Hospitals, Bikaner, Rajasthan",
    detail: "Postgraduate specialisation in pulmonary medicine.",
    icon: Stethoscope,
  },
  {
    phase: 1,
    years: "Jun 2009 – Jan 2010",
    title: "Senior Resident — Pulmonary & Critical Care",
    org: "BLK Superspeciality Hospital, New Delhi",
    detail: "First exposure to tertiary-level respiratory and intensive care.",
    icon: Building2,
  },
  {
    phase: 1,
    years: "Jan 2010 – Mar 2011",
    title: "IDCCM — Critical Care Medicine",
    org: "Sir Ganga Ram Hospital, New Delhi",
    detail: "Senior Resident in Critical Care and Emergency Medicine.",
    icon: HeartPulse,
  },
  {
    phase: 1,
    years: "Mar 2011 – Jul 2013",
    title: "FNB — Critical Care Medicine",
    org: "Fortis Escorts Heart Institute, Okhla, New Delhi",
    detail: "Fellowship training in critical care medicine.",
    icon: Activity,
  },
  {
    phase: 1,
    years: "Jul 2013 – Nov 2013",
    title: "Consultant — Pulmonology",
    org: "Fortis Escorts Hospitals, Amritsar, Punjab",
    detail: "In charge of the Cardiac and Neuro Critical Care Unit.",
    icon: ShieldCheck,
  },
  {
    phase: 2,
    years: "Nov 2013 – Mar 2016",
    title:
      "Associate Consultant — Pulmonary, Critical Care, Sleep Medicine & Interventional Pulmonology",
    org: "Apollo Hospitals, Bengaluru",
    detail:
      "Two years of dedicated advanced interventional pulmonology and critical-care training, including EBUS, medical thoracoscopy and sleep studies.",
    icon: Microscope,
  },
  {
    phase: 2,
    years: "Sep 2015",
    title: "EDARM — European Diploma of Adult Respiratory Medicine",
    org: "European Respiratory Society (ERS), Netherlands",
    detail: "European qualification in adult respiratory medicine.",
    icon: Award,
  },
  {
    phase: 2,
    years: "Apr 2016",
    title: "Observership in Interventional Pulmonology",
    org: "Cleveland Clinic, Cleveland, Ohio, USA",
    detail: "Department of Pulmonary Medicine, 4 – 29 April 2016.",
    icon: Globe2,
  },
  {
    phase: 3,
    years: "Jun 2016 – Present",
    title: "CK Birla Hospitals – RBH, Jaipur",
    org: "Pulmonary, Critical Care & Sleep Medicine · Interventional Pulmonology",
    detail:
      "Heads the Department of Pulmonary Medicine with a dedicated interventional pulmonology suite and pulmonary function lab. Pioneered rigid bronchoscopy, endobronchial tumour removal and airway stenting in Rajasthan.",
    icon: Building2,
    featured: true,
    progression: [
      { period: "2016 – 2020", role: "Consultant" },
      { period: "2020 – 2024", role: "Senior Consultant" },
      { period: "2024 – Present", role: "Additional Director" },
    ],
  },
];

const TIMELINE = MILESTONES.filter((m) => !m.featured);
const LEADERSHIP = MILESTONES.find((m) => m.featured);

const ARC = [
  "Pulmonary Medicine",
  "Critical Care",
  "Interventional Pulmonology",
  "Integrated Respiratory Leadership",
];

export function ProfessionalJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const leadRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 65%"],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  const registerNode = useCallback((index: number, el: HTMLSpanElement | null) => {
    nodeRefs.current[index] = el;
  }, []);

  // The active milestone is the last one the animated spine has scrolled past,
  // matching the spine's own ["start 70%", "end 65%"] scroll offset.
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = window.innerHeight * 0.66;
      let max = -1;
      nodeRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) max = i;
      });
      if (leadRef.current && leadRef.current.getBoundingClientRect().top <= line) {
        max = TIMELINE.length;
      }
      setActiveIndex((prev) => (prev === max ? prev : max));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const leadershipActive = activeIndex === TIMELINE.length;

  return (
    <section id="professional-journey" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 gradient-soft opacity-60" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow center>Professional Journey</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            From foundation to <span className="gradient-text">respiratory leadership.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Over two decades of training and practice across Bikaner, New Delhi, Amritsar, Bengaluru
            and the United States — now anchored in Jaipur.
          </p>
        </div>

        {/* Phase overview rail */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p, i) => (
            <div
              key={p.label}
              className="relative overflow-hidden rounded-2xl border border-primary/40 bg-card p-4 shadow-elevated"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  <Check className="h-3 w-3" />
                  Phase 0{i + 1}
                </span>
                <span className="text-[11px] font-semibold text-primary">{p.range}</span>
              </div>
              <div className="mt-2 font-display text-[0.95rem] font-semibold leading-snug text-foreground">
                {p.label}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.summary}</p>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-primary/25"
              />
            </div>
          ))}
        </div>

        {/* Specialisation arc */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          {ARC.map((a, i) => (
            <div key={a} className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-soft sm:text-xs">
                {a}
              </span>
              {i < ARC.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-primary/40" />}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={trackRef} className="relative mt-14 pb-16 sm:mt-16 lg:pb-12">
          {/* spine track — padded so it runs all the way into the leadership card */}
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top gradient-primary lg:left-1/2 lg:-translate-x-1/2"
            style={{ scaleY: reduce ? 1 : spine }}
          />
          <span
            aria-hidden
            className={`absolute bottom-0 left-[19px] z-10 grid h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border-2 transition-colors duration-500 lg:left-1/2 ${
              leadershipActive ? "border-primary bg-primary" : "border-border bg-background"
            }`}
          />

          <ol className="relative space-y-6 lg:space-y-0">
            {TIMELINE.map((m, i) => (
              <MilestoneRow
                key={m.title}
                milestone={m}
                index={i}
                reduce={!!reduce}
                state={i === activeIndex ? "current" : i < activeIndex ? "passed" : "upcoming"}
                registerNode={registerNode}
              />
            ))}
          </ol>
        </div>

        {/* Leadership — the current chapter */}
        {LEADERSHIP && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 28 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            ref={leadRef}
            className="relative"
          >
            <FeaturedCard milestone={LEADERSHIP} reduce={!!reduce} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function MilestoneRow({
  milestone: m,
  index,
  reduce,
  state,
  registerNode,
}: {
  milestone: Milestone;
  index: number;
  reduce: boolean;
  state: MilestoneState;
  registerNode: (index: number, el: HTMLSpanElement | null) => void;
}) {
  const current = state === "current";
  const reached = current || state === "passed";
  const right = index % 2 === 1;
  const Icon = m.icon;

  return (
    <li className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-14 lg:py-5 lg:pl-0">
      {/* node */}
      <span
        ref={(el) => registerNode(index, el)}
        className="absolute left-[19px] top-5 z-10 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
      >
        <motion.span
          className={`grid h-7 w-7 place-items-center rounded-full border-2 transition-colors duration-500 ${
            reached
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground"
          }`}
          initial={false}
          animate={{ scale: current && !reduce ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Icon className="h-3.5 w-3.5" />
        </motion.span>
      </span>

      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 26 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
        className={right ? "lg:col-start-2" : "lg:col-start-1 lg:text-right"}
      >
        <div
          className={`relative rounded-2xl border bg-card p-5 transition-all duration-500 ${
            reached
              ? "border-primary/40 shadow-elevated ring-2 ring-primary/15"
              : "border-border shadow-soft hover:shadow-elevated"
          }`}
        >
          <div
            className={`text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-500 ${
              reached ? "text-primary" : "text-primary/70"
            }`}
          >
            {m.years}
          </div>
          <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
            {m.title}
          </h3>
          <div className="mt-1 text-sm font-medium text-foreground/75">{m.org}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.detail}</p>
        </div>
      </motion.div>
    </li>
  );
}

function FeaturedCard({ milestone: m, reduce }: { milestone: Milestone; reduce: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[#0a1e36] p-6 text-white shadow-elevated sm:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-60 gradient-primary" />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
            {m.years}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a1e36]">
            A decade at RBH
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">
          {m.title}
        </h3>
        <div className="mt-1.5 text-sm font-medium text-white/80">{m.org}</div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">{m.detail}</p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {m.progression?.map((step, i) => (
            <motion.div
              key={step.role}
              initial={reduce ? undefined : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.12 * i }}
              className="relative rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                {step.period}
              </div>
              <div className="mt-1 font-display text-base font-semibold">{step.role}</div>
              {i < (m.progression?.length ?? 0) - 1 && (
                <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-white/35 sm:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
