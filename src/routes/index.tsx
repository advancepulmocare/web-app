import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Mail,
  Clock,
  ChevronDown,
  Stethoscope,
  Activity,
  HeartPulse,
  ShieldCheck,
  Award,
  GraduationCap,
  Globe2,
  Users,
  Sparkles,
  Wind,
  Microscope,
  Syringe,
  Star,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import doctorPortrait from "@/assets/doctor-portrait.jpg";
import clinicInterior from "@/assets/clinic-interior.jpg";
import consultation from "@/assets/consultation.jpg";
import equipment from "@/assets/equipment.jpg";
import reception from "@/assets/reception.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const PHONE = "08062136530";
const WHATSAPP = "https://api.whatsapp.com/send/?phone=916293993455&text=Hi&type=phone_number";
const BOOKING = "https://ckbirlahospitals.com/rbh/book-an-appointment";
const PRACTO = "https://www.practo.com/jaipur/doctor/dr-rakesh-godara-pulmonologist";

function Index() {
  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <TrustStats />
      <About />
      <Services />
      <WhyChoose />
      <Journey />
      <Testimonials />
      <Gallery />
      <Appointment />
      <FAQ />
      <Contact />
      <FinalCTA />
      <Footer />
      <FloatingActions />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/70 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft">
            <Wind className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[1.05rem] font-semibold text-foreground">
              Dr. Rakesh Godara
            </div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Pulmonology · Critical Care
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={BOOKING}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elevated hover:-translate-y-0.5"
          >
            <Calendar className="h-4 w-4" /> Book Appointment
          </a>
        </div>

        <button
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {n.label}
              </a>
            ))}
            <a
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.85_0.09_215/0.5),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.9_0.07_170/0.35),_transparent_60%)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-32">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-4 py-1.5 text-xs font-medium text-primary shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Senior Consultant · CK Birla Hospitals | RBH, Jaipur
          </div>

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem]">
            Compassionate care.<br />
            <span className="gradient-text">Accurate diagnosis.</span><br />
            Better breathing.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Meet <strong className="text-foreground">Dr. Rakesh Godara</strong> — MD (Respiratory Medicine),
            FNB Critical Care, EDRM (Europe). With over 17 years of experience in
            interventional pulmonology and critical care, he combines evidence-based
            medicine with a calm, patient-first approach.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft transition hover:-translate-y-0.5 hover:border-primary/30"
            >
              <MessageCircle className="h-4 w-4 text-support" />
              WhatsApp Now
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Award, label: "17+ Years Experience" },
              { icon: ShieldCheck, label: "Evidence-Based Care" },
              { icon: HeartPulse, label: "Trusted by Patients" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm text-foreground shadow-soft backdrop-blur"
              >
                <b.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] gradient-accent opacity-40 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
            <img
              src={doctorPortrait}
              alt="Dr. Rakesh Godara, Senior Pulmonologist"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-background/80 p-4 backdrop-blur-xl shadow-soft">
              <div className="font-display text-lg font-semibold text-foreground">
                Dr. Rakesh Godara
              </div>
              <div className="text-xs text-muted-foreground">
                MD · FNB (Critical Care) · EDRM (Europe)
              </div>
            </div>
          </div>

          <div className="animate-float absolute -left-4 top-10 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-elevated sm:flex sm:items-center sm:gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-support/20 text-support-foreground">
              <Star className="h-4 w-4 fill-current text-support" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">94% Recommended</div>
              <div className="text-[11px] text-muted-foreground">104 patient stories · Practo</div>
            </div>
          </div>

          <div className="animate-float absolute -right-3 bottom-24 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-elevated sm:flex sm:items-center sm:gap-2.5" style={{ animationDelay: "1.5s" }}>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <Stethoscope className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Interventional Pulmonology</div>
              <div className="text-[11px] text-muted-foreground">Bronchoscopy · EBUS · Thoracoscopy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
function useCountUp(target: number, active: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

const STATS = [
  { value: 17, suffix: "+", label: "Years of Experience" },
  { value: 104, suffix: "+", label: "Verified Patient Stories" },
  { value: 94, suffix: "%", label: "Patient Recommendation" },
  { value: 4, suffix: "+", label: "Global Qualifications" },
];

function TrustStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:grid-cols-4 lg:gap-6">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="text-center lg:text-left">
      <div className="font-display text-4xl font-semibold text-primary sm:text-5xl">
        {n}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] gradient-accent opacity-30 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-elevated">
            <img
              src={consultation}
              alt="Dr. Rakesh Godara in consultation"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden max-w-[240px] rounded-2xl border border-border bg-card p-4 shadow-elevated sm:block">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Currently at
            </div>
            <div className="mt-1 font-display text-base font-semibold text-foreground">
              CK Birla Hospitals | RBH
            </div>
            <div className="text-xs text-muted-foreground">Gopalpura, Jaipur</div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionEyebrow>About the Doctor</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Two decades of caring for <span className="gradient-text">every breath.</span>
          </h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted-foreground">
            Dr. Rakesh Godara is a Senior Consultant and Additional Director in Pulmonology
            at CK Birla Hospitals | RBH, Jaipur. He specialises in interventional pulmonology,
            critical care and complex airway disorders — with international training and a
            reputation built on clarity, honesty and patient-first care.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: GraduationCap, title: "MD — Respiratory Medicine", sub: "SPMC & PBM Hospitals, Bikaner · 2009" },
              { icon: Award, title: "FNB — Critical Care", sub: "FEHI, Delhi · 2013" },
              { icon: ShieldCheck, title: "IDCCM — Critical Care", sub: "Sir Ganga Ram Hospital, Delhi · 2011" },
              { icon: Globe2, title: "EDRM — European Diploma", sub: "ERS, Netherlands · 2015" },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft hover-lift"
              >
                <div className="mb-2 grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-4.5 w-4.5" />
                </div>
                <div className="text-sm font-semibold text-foreground">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/15 bg-primary-soft/50 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Areas of Special Interest
            </div>
            <div className="mt-2 text-sm leading-relaxed text-foreground">
              ARDS · Bronchoscopic Management of Hemoptysis · Central Airway Obstruction ·
              Endobronchial Ultrasound (EBUS) · Medical Thoracoscopy / Pleuroscopy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
const SERVICES = [
  { icon: Wind, title: "Asthma & COPD Care", desc: "Long-term management of chronic obstructive and allergic airway disease." },
  { icon: Microscope, title: "Diagnostic Bronchoscopy", desc: "Advanced airway visualisation and biopsy under expert guidance." },
  { icon: Activity, title: "EBUS", desc: "Endobronchial ultrasound for precise mediastinal and lung staging." },
  { icon: Syringe, title: "Medical Thoracoscopy", desc: "Minimally invasive diagnosis and treatment of pleural disease." },
  { icon: HeartPulse, title: "Critical & ICU Care", desc: "Ventilator management and complex respiratory emergencies." },
  { icon: Stethoscope, title: "Lung Infections & TB", desc: "Evidence-based treatment of pneumonia, TB and bronchiectasis." },
  { icon: ShieldCheck, title: "Post-COVID Recovery", desc: "Pulmonary rehabilitation for lasting respiratory well-being." },
  { icon: Sparkles, title: "Interstitial Lung Disease", desc: "Comprehensive workup for sarcoidosis, fibrosis and ILD." },
];

function Services() {
  return (
    <section id="services" className="relative gradient-soft py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Services & Treatments</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Advanced pulmonology, delivered with <span className="gradient-text">calm precision.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From routine consultations to complex airway interventions — modern equipment,
            trusted protocols, and a team that listens.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover-lift"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft transition group-hover:scale-105">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Choose ---------------- */
const WHY = [
  { icon: Award, title: "Internationally Trained", desc: "Qualifications from India and Europe (ERS)." },
  { icon: HeartPulse, title: "Personalised Care", desc: "Every plan is tailored to your body and life." },
  { icon: Microscope, title: "Modern Equipment", desc: "State-of-the-art bronchoscopy and imaging." },
  { icon: ShieldCheck, title: "Evidence-Based Treatment", desc: "Protocols aligned with global guidelines." },
  { icon: Users, title: "Compassionate Consultation", desc: "You'll be heard, without hurry." },
  { icon: CheckCircle2, title: "Transparent Communication", desc: "Clear explanations at every step." },
];

function WhyChoose() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionEyebrow>Why Patients Choose Dr. Godara</SectionEyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              A calm, clear path to <span className="gradient-text">better breathing.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Patients often describe consultations as unhurried and reassuring —
              with a doctor who explains, listens, and never over-treats.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WHY.map((w) => (
              <div
                key={w.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover-lift"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/25 text-primary">
                  <w.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{w.title}</div>
                  <div className="text-xs leading-relaxed text-muted-foreground">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Journey ---------------- */
const STEPS = [
  { n: "01", title: "Book Appointment", desc: "Online, WhatsApp or phone." },
  { n: "02", title: "Visit the Clinic", desc: "Minimal wait, warm reception." },
  { n: "03", title: "Consultation", desc: "Detailed history and examination." },
  { n: "04", title: "Diagnosis", desc: "Precise, evidence-based workup." },
  { n: "05", title: "Treatment Plan", desc: "Tailored, transparent and clear." },
  { n: "06", title: "Follow-up Care", desc: "Ongoing support until you're well." },
];

function Journey() {
  return (
    <section className="relative gradient-soft py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Your Patient Journey</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Simple, human, and reassuring <span className="gradient-text">from the first call.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-soft hover-lift"
            >
              <div className="font-display text-3xl font-semibold text-primary/25">{s.n}</div>
              <div className="mt-3 font-display text-lg font-semibold text-foreground">{s.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
              {i < STEPS.length - 1 && (
                <div className="pointer-events-none absolute right-4 top-6 hidden text-primary/20 lg:block">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials (verified from Practo) ---------------- */
const REVIEWS = [
  {
    name: "Pratibha Bansal",
    tag: "Verified Patient · Practo",
    text: "Dr Godara is a very knowledgeable and excellent pulmonologist. The way he compiles every aspect of patient reports and medication is truly commendable.",
  },
  {
    name: "Tanmoy Das",
    tag: "Verified Patient · Practo",
    text: "He treated my wife with utmost sincerity and friendliness. His years of international experience were a huge plus. I am forever in debt for his help.",
  },
  {
    name: "Ankit Agrawal",
    tag: "Verified Patient · Practo",
    text: "Very skilled and competent, with a sharp memory for minute details. He is friendly, makes the patient comfortable and explains everything clearly.",
  },
  {
    name: "Abhinav Nathany",
    tag: "Verified Patient · Practo",
    text: "Sir is very clear in diagnosis and medication. Very polite, understanding and fully dedicated. His advice really matters to avoid future complications.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <SectionEyebrow>Patient Stories</SectionEyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Trusted by families across <span className="gradient-text">Rajasthan.</span>
            </h2>
          </div>
          <a
            href={PRACTO}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View all 104 stories on Practo <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="rounded-3xl border border-border bg-card p-7 shadow-soft hover-lift"
            >
              <div className="flex items-center gap-1 text-support">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-[0.98rem] leading-relaxed text-foreground">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full gradient-primary text-primary-foreground font-semibold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.tag}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const items = [
    { src: clinicInterior, alt: "Hospital corridor", cls: "sm:col-span-2 sm:row-span-2 aspect-[16/10] sm:aspect-auto" },
    { src: reception, alt: "Reception & waiting area", cls: "aspect-square" },
    { src: equipment, alt: "Advanced pulmonology equipment", cls: "aspect-square" },
    { src: consultation, alt: "Consultation in progress", cls: "sm:col-span-2 aspect-[16/9]" },
  ];
  return (
    <section className="relative gradient-soft py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Inside the Clinic</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            A calm environment, <span className="gradient-text">designed for healing.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-border shadow-soft ${it.cls}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/70 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <div className="text-xs font-medium text-primary-foreground">{it.alt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Appointment ---------------- */
const CHANNELS = [
  { icon: Calendar, title: "Hospital Website", sub: "CK Birla Hospitals | RBH", href: BOOKING, cta: "Book now" },
  { icon: MessageCircle, title: "WhatsApp", sub: "Chat with the clinic team", href: WHATSAPP, cta: "Message us" },
  { icon: Phone, title: "Call Directly", sub: PHONE, href: `tel:${PHONE}`, cta: "Call now" },
  { icon: Stethoscope, title: "Practo", sub: "Verified patient reviews", href: PRACTO, cta: "Open Practo" },
];

function Appointment() {
  return (
    <section id="appointment" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border gradient-primary p-8 shadow-elevated sm:p-14">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="text-primary-foreground">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Same-week appointments available
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Book your appointment today.
              </h2>
              <p className="mt-4 max-w-md text-primary-foreground/85">
                Choose the channel that suits you best — we'll take care of the rest.
                Consultation timings are Mon–Sat, 11:00 AM to 3:00 PM.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CHANNELS.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-lg transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-lg font-semibold text-primary-foreground">
                    {c.title}
                  </div>
                  <div className="mt-0.5 text-xs text-primary-foreground/80">{c.sub}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-foreground">
                    {c.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "How can I book an appointment?", a: "You can book via the CK Birla Hospitals | RBH website, on Practo, over WhatsApp, or by calling the clinic directly. Online booking is free." },
  { q: "What are the consultation timings?", a: "Dr. Godara consults Monday to Saturday, 11:00 AM to 3:00 PM at CK Birla Hospitals | RBH, Gopalpura, Jaipur." },
  { q: "Where is the clinic located?", a: "CK Birla Hospitals | RBH, Gopalpura Bypass Road, near Triveni Flyover (towards Platform No. 2, Durgapura Station), Jaipur." },
  { q: "Do you accept walk-ins?", a: "Walk-ins are accepted where possible, however we strongly recommend booking in advance to minimise waiting time." },
  { q: "What is the consultation fee?", a: "The indicative consultation fee is ₹500, payable at the clinic. There are no charges for booking an appointment." },
  { q: "Which insurance providers are accepted?", a: "CK Birla Hospitals | RBH accepts most major cashless insurance providers. Please contact the hospital reception for the current, verified list." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative gradient-soft py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center">
          <SectionEyebrow center>Frequently Asked</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Answers to help you feel <span className="gradient-text">informed and at ease.</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionEyebrow>Visit or Reach Out</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            We're here whenever <span className="gradient-text">you need us.</span>
          </h2>

          <div className="mt-8 space-y-4">
            {[
              {
                icon: MapPin,
                title: "Clinic Address",
                lines: [
                  "CK Birla Hospitals | RBH",
                  "Gopalpura Bypass Road, near Triveni Flyover",
                  "(Towards Platform No.2, Durgapura Station), Jaipur",
                ],
              },
              {
                icon: Phone,
                title: "Phone",
                lines: [`Appointments: ${PHONE}`, "Emergency: 07340054470"],
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["Verified email will be added"],
              },
              {
                icon: Clock,
                title: "Consultation Hours",
                lines: ["Mon – Sat · 11:00 AM to 3:00 PM", "Sunday · By appointment"],
              },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{c.title}</div>
                  {c.lines.map((l) => (
                    <div key={l} className="text-sm text-muted-foreground">
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
          <iframe
            title="CK Birla Hospitals RBH — Jaipur"
            src="https://www.google.com/maps?q=CK+Birla+Hospitals+RBH+Gopalpura+Jaipur&output=embed"
            className="h-[520px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center shadow-elevated sm:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 opacity-70 gradient-soft" />
          <div className="relative">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
              <HeartPulse className="h-3.5 w-3.5" /> Your health deserves expert care
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              Breathe easier. <span className="gradient-text">Live better.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Book a consultation with Dr. Rakesh Godara today and take the next step toward
              lasting respiratory wellness.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={BOOKING}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
              >
                <Calendar className="h-4 w-4" /> Book Appointment
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft transition hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4 text-support" /> WhatsApp
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft transition hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4 text-primary" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft">
              <Wind className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold">Dr. Rakesh Godara</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Pulmonology · Critical Care · Jaipur
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Senior Consultant & Additional Director, Department of Pulmonology,
            CK Birla Hospitals | RBH, Jaipur. 17+ years of dedicated respiratory care.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Quick Links
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-primary">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Contact
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Mon – Sat · 11 AM – 3 PM</li>
            <li>
              <a href={`tel:${PHONE}`} className="hover:text-primary">
                {PHONE}
              </a>
            </li>
            <li>Gopalpura, Jaipur</li>
            <li className="flex gap-3 pt-2">
              <a href="https://www.facebook.com/drgodarainterventionalpulmonology/" target="_blank" rel="noreferrer" className="hover:text-primary">Facebook</a>
              <a href="https://www.linkedin.com/in/rakesh-godara-06a14377/" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a>
              <a href="https://www.instagram.com/godararakesh2021/" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <div>© {new Date().getFullYear()} Dr. Rakesh Godara. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating Buttons ---------------- */
function FloatingActions() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-end px-4 sm:bottom-6 sm:px-6">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        <a
          href={`tel:${PHONE}`}
          aria-label="Call now"
          className="grid h-13 w-13 place-items-center rounded-full bg-primary p-3.5 text-primary-foreground shadow-elevated sm:hidden"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="animate-pulse-ring grid h-14 w-14 place-items-center rounded-full bg-support text-primary-foreground shadow-elevated transition hover:scale-105"
          style={{ backgroundColor: "oklch(0.65 0.16 155)" }}
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}

/* ---------------- Small helpers ---------------- */
function SectionEyebrow({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary ${
        center ? "" : ""
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}
