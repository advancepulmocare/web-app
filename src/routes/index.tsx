import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  Stethoscope,
  Activity,
  HeartPulse,
  ShieldCheck,
  Award,
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
  Linkedin,
  Instagram,
  Facebook,
  ExternalLink,
} from "lucide-react";
import doctorPortrait from "@/assets/doctor-portrait.png";
import clinicInterior from "@/assets/clinic-interior.jpg";
import consultation from "@/assets/consultation.png";
import equipment from "@/assets/equipment.jpg";
import reception from "@/assets/reception.webp";
import waitingArea from "@/assets/waiting-area.webp";
import heroBg from "@/assets/hero-bg.jpg";
import gettingReady from "@/assets/getting-ready.mp4";
import drAchievements from "@/assets/dr-achievements.webp";
import clinicBanner from "@/assets/clinic-banner.webp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { BookingForm } from "@/components/booking-form";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Clinic", href: "#clinic" },
  { label: "Reviews", href: "#testimonials" },
];

const APC_PHONE_DISPLAY = "+91 99286 83032";
const APC_PHONE_TEL = "+919928683032";
const EMERGENCY_DISPLAY = "+91 9928683032";
const WHATSAPP = `https://api.whatsapp.com/send/?phone=919928683032&text=${encodeURIComponent(
  "Hi, I'd like to book a consultation at Advance Pulmo Care with Dr. Rakesh Godara.",
)}&type=phone_number`;
const RBH_PROFILE = "https://ckbirlahospitals.com/rbh/doctor/dr-rakesh-godara";
const RBH_MAPS = "https://maps.app.goo.gl/7Dz3X2CESoLLxyL58";
const GOOGLE_LISTING = "https://share.google/oag7YIhuu1Pz3YgcH";

/* ---------------- Booking Context ---------------- */
type BookingCtx = { open: () => void };
const BookingContext = createContext<BookingCtx | null>(null);
export const useBooking = () => {
  const c = useContext(BookingContext);
  if (!c) {
    return { open: () => {} };
  }
  return c;
};

function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <BookingContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Book a Consultation</DialogTitle>
            <DialogDescription>
              Advance Pulmo Care · Jagatpura, Jaipur — with Dr. Rakesh Godara
            </DialogDescription>
          </DialogHeader>
          <BookingForm onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}

function Index() {
  return (
    <BookingProvider>
      <div id="home" className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <TrustStats />
        <About />
        <Services />
        <ClinicSection />
        <WhyChoose />
        <Journey />
        <Testimonials />
        <Gallery />
        <FAQ />
        <BookingSection />
        <Footer />
        <FloatingActions />
        <Toaster richColors position="top-center" />
      </div>
    </BookingProvider>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const booking = useBooking();
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
            <Stethoscope className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[1.05rem] font-semibold text-foreground">
              Advance Pulmo Care{" "}
            </div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Dr. Rakesh Godara
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
          <button
            onClick={() => (window.location.href = "#book")}
            className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elevated hover:-translate-y-0.5"
          >
            <Calendar className="h-4 w-4" /> Book Appointment
          </button>
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
            <button
              onClick={() => (window.location.href = "#book")}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const booking = useBooking();
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
            Senior Consultant · CK Birla Hospitals | RBH, Jaipur{" "}
          </div>

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem]">
            Compassionate care.
            <br />
            <span className="gradient-text">Accurate diagnosis.</span>
            <br />
            Better breathing.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Meet <strong className="text-foreground">Dr. Rakesh Godara</strong> — MD (Respiratory
            Medicine), FNB Critical Care, EDRM (Europe). Founder of{" "}
            <strong className="text-foreground">Advance Pulmo Care</strong>, Jagatpura, and Sr.
            Consultant Pulmonologist at CK Birla Hospitals | RBH, Jaipur, with 17+ years in
            interventional pulmonology and critical care.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => (window.location.href = "#book")}
              className="group inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
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
              { icon: Star, label: "4.9 ★ · 323 Google Reviews" },
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
              <div className="text-sm font-semibold">4.9 ★ Rating</div>
              <div className="text-[11px] text-muted-foreground">323 Google reviews</div>
            </div>
          </div>

          <div
            className="animate-float absolute -right-3 bottom-24 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-elevated sm:flex sm:items-center sm:gap-2.5"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <Stethoscope className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Interventional Pulmonology</div>
              <div className="text-[11px] text-muted-foreground">
                Bronchoscopy · EBUS · Thoracoscopy
              </div>
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
  { value: 323, suffix: "+", label: "Verified Google Reviews" },
  { value: 49, suffix: "★", label: "4.9 Average Rating", divide: 10 },
  { value: 5, suffix: "", label: "Global Qualifications" },
];

function TrustStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), {
      threshold: 0.3,
    });
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
  divide,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  divide?: number;
}) {
  const n = useCountUp(value, active);
  const display = divide ? (n / divide).toFixed(1) : n;
  return (
    <div className="text-center lg:text-left">
      <div className="font-display text-4xl font-semibold text-primary sm:text-5xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------------- About ---------------- */
const EDUCATION = [
  { title: "MBBS", sub: "SPMC & PBM Hospitals, Bikaner · 2004" },
  { title: "MD — Respiratory Medicine", sub: "SPMC & PBM Hospitals, Bikaner · 2009" },
  {
    title: "IDCCM — Indian Diploma of Critical Care Medicine",
    sub: "Sir Ganga Ram Hospital, Delhi · 2011",
  },
  {
    title: "FNB — Critical Care Medicine",
    sub: "Fortis Escorts Heart Institute, Okhla, Delhi · 2013",
  },
  {
    title: "EDRM — European Diploma of Respiratory Medicine",
    sub: "European Respiratory Society, Netherlands · 2015",
  },
];

const PREVIOUS = [
  "Apollo Hospitals, Bangalore",
  "Fortis Escorts Heart Institute, Amritsar",
  "Sir Ganga Ram Hospital, Delhi",
  "SP Medical College & PBM Group of Hospitals, Bikaner",
];

function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1 lg:sticky lg:top-28">
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
          <div className="absolute -bottom-6 -right-4 hidden max-w-[260px] rounded-2xl border border-border bg-card p-4 shadow-elevated sm:block">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Own Clinic
            </div>
            <div className="mt-1 font-display text-base font-semibold text-foreground">
              Advance Pulmo Care
            </div>
            <div className="text-xs text-muted-foreground">Jagatpura, Jaipur · 4.9 ★ (323)</div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionEyebrow>About the Doctor</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Two decades of caring for <span className="gradient-text">every breath.</span>
          </h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted-foreground">
            Dr. Rakesh Godara is the founder of{" "}
            <strong className="text-foreground">Advance Pulmo Care</strong>, Jagatpura — his
            personal chest & interventional pulmonology clinic — and serves as Sr. Consultant &
            Additional Director in Pulmonology at CK Birla Hospitals | RBH, Jaipur. He specialises
            in interventional pulmonology, critical care and complex airway disorders, with
            international training and a reputation built on clarity, honesty and patient-first
            care.
          </p>{" "}
          {/* Education timeline */}
          <div className="mt-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              EDUCATION &amp; FELLOWSHIPS
            </div>
            <ol className="relative mt-6 space-y-6 border-l border-slate-200 pl-6">
              {EDUCATION.map((e) => (
                <li key={e.title} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-300 bg-white" />
                  <div className="text-base font-bold text-[#0a2540]">{e.title}</div>
                  <div className="mt-1 text-sm text-[#4a5568]">{e.sub}</div>
                </li>
              ))}
            </ol>
          </div>
          {/* Previously associated */}
          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              PREVIOUSLY ASSOCIATED WITH
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {PREVIOUS.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-[#4a5568] shadow-sm"
                >
                  {p}
                </span>
              ))}
            </div>
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
  {
    icon: Wind,
    title: "Asthma & COPD Care",
    desc: "Long-term management of chronic obstructive and allergic airway disease.",
  },
  {
    icon: Microscope,
    title: "Diagnostic Bronchoscopy",
    desc: "Advanced airway visualisation and biopsy under expert guidance.",
  },
  {
    icon: Activity,
    title: "EBUS",
    desc: "Endobronchial ultrasound for precise mediastinal and lung staging.",
  },
  {
    icon: Syringe,
    title: "Medical Thoracoscopy",
    desc: "Minimally invasive diagnosis and treatment of pleural disease.",
  },
  {
    icon: HeartPulse,
    title: "Critical & ICU Care",
    desc: "Ventilator management and complex respiratory emergencies.",
  },
  {
    icon: Stethoscope,
    title: "Lung Infections & TB",
    desc: "Evidence-based treatment of pneumonia, TB and bronchiectasis.",
  },
  {
    icon: ShieldCheck,
    title: "Post-COVID Recovery",
    desc: "Pulmonary rehabilitation for lasting respiratory well-being.",
  },
  {
    icon: Sparkles,
    title: "Interstitial Lung Disease",
    desc: "Comprehensive workup for sarcoidosis, fibrosis and ILD.",
  },
];

function Services() {
  return (
    <section id="services" className="relative gradient-soft py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Services &amp; Treatments</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Advanced pulmonology, delivered with{" "}
            <span className="gradient-text">calm precision.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From routine consultations to complex airway interventions — modern equipment, trusted
            protocols, and a team that listens.
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

/* ---------------- Clinic Section (Advance Pulmo Care) ---------------- */
const APC_HOURS = [
  ["Monday", "6:00 – 8:00 PM"],
  ["Tuesday", "6:00 – 8:00 PM"],
  ["Wednesday", "6:00 – 8:00 PM"],
  ["Thursday", "6:00 – 8:00 PM"],
  ["Friday", "6:00 – 8:00 PM"],
  ["Saturday", "6:00 – 8:00 PM"],
  ["Sunday", "Emergency Only"],
];

function ClinicSection() {
  const booking = useBooking();
  return (
    <section id="clinic" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow center>Personal Clinic</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            <span className="gradient-text">Advance Pulmo Care</span> — Jagatpura, Jaipur.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dr. Godara's own chest & interventional pulmonology clinic — a calm, focused OPD for
            consultations, follow-ups and second opinions.
          </p>
        </div>

        {/* Featured clinic card */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card shadow-elevated">
            <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-support/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-support-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-support" /> Own Clinic
            </div>
            <div className="p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold text-foreground">
                    Advance Pulmo Care
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Chest Physician · Interventional Pulmonologist
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-support/25 bg-support/10 px-4 py-3">
                <div className="flex items-center gap-1 text-support">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="text-sm font-semibold text-foreground">
                  4.9 ·{" "}
                  <span className="text-muted-foreground font-medium">323 Google reviews</span>
                </div>
                <a
                  href={GOOGLE_LISTING}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  View on Google <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-sm text-foreground">
                    <div className="font-semibold">Address</div>
                    <div className="text-muted-foreground">
                      Ashadeep Kingscourt, S2–S3, near Jeerota, Jagatpura,
                      <br /> Jaipur, Rajasthan 302022
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="text-sm text-foreground">
                    <div className="font-semibold">Clinic Phone</div>
                    <a
                      href={`tel:${APC_PHONE_TEL}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {APC_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="w-full text-sm text-foreground">
                    <div className="font-semibold">OPD Hours</div>
                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-muted-foreground sm:grid-cols-2">
                      {APC_HOURS.map(([d, h]) => (
                        <div
                          key={d}
                          className="flex items-center justify-between border-b border-dashed border-border py-1 last:border-0"
                        >
                          <span>{d}</span>
                          <span className="font-medium text-foreground">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => (window.location.href = "#book")}
                  className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
                >
                  <Calendar className="h-4 w-4" /> Book at Advance Pulmo Care
                </button>
                <a
                  href={`tel:${APC_PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground"
                >
                  <Phone className="h-4 w-4 text-primary" /> Call Clinic
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border shadow-elevated">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4567.943824605615!2d75.87164159999999!3d26.7888605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db7735fd1bd7d%3A0xde3eb4620eae1e05!2sADVANCE%20PULMO%20CARE%2C%20Dr.%20Rakesh%20Godara%2C%20Chest%20physician%2C%20Interventional%20Pulmonologist!5e1!3m2!1sen!2sin!4v1783372310890!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        {/* Secondary — RBH */}
        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Also consulting at
                </div>
                <div className="font-display text-xl font-semibold text-foreground">
                  CK Birla Hospitals | RBH
                </div>
                <div className="text-sm text-muted-foreground">
                  Gopalpura Bypass Road, near Triveni Flyover, Jaipur
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={RBH_MAPS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-primary hover:border-primary/30"
              >
                <MapPin className="h-3.5 w-3.5" /> Open in Map
              </a>
              <a
                href={RBH_PROFILE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-primary hover:border-primary/30"
              >
                View RBH Profile <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-sm text-foreground">
                <div className="font-semibold">Consulting Hours</div>
                <div className="text-muted-foreground">Monday – Saturday · 10:00 AM – 4:00 PM</div>
              </div>
            </div>
            <a
              href={`tel:${APC_PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <Phone className="h-4 w-4" /> Call to Book
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Choose ---------------- */
const WHY = [
  {
    icon: Award,
    title: "Internationally Trained",
    desc: "Qualifications from India and Europe (ERS).",
  },
  {
    icon: HeartPulse,
    title: "Personalised Care",
    desc: "Every plan is tailored to your body and life.",
  },
  {
    icon: Microscope,
    title: "Modern Equipment",
    desc: "State-of-the-art bronchoscopy and imaging.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence-Based Treatment",
    desc: "Protocols aligned with global guidelines.",
  },
  { icon: Users, title: "Compassionate Consultation", desc: "You'll be heard, without hurry." },
  {
    icon: CheckCircle2,
    title: "Transparent Communication",
    desc: "Clear explanations at every step.",
  },
];

function WhyChoose() {
  return (
    <section className="relative gradient-soft py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionEyebrow>Why Patients Choose Dr. Godara</SectionEyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              A calm, clear path to <span className="gradient-text">better breathing.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Patients often describe consultations as unhurried and reassuring — with a doctor who
              explains, listens, and never over-treats.
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
  { n: "01", title: "Book Appointment", desc: "In-app booking, WhatsApp or phone." },
  { n: "02", title: "Visit the Clinic", desc: "Minimal wait, warm reception." },
  { n: "03", title: "Consultation", desc: "Detailed history and examination." },
  { n: "04", title: "Diagnosis", desc: "Precise, evidence-based workup." },
  { n: "05", title: "Treatment Plan", desc: "Tailored, transparent and clear." },
  { n: "06", title: "Follow-up Care", desc: "Ongoing support until you're well." },
];

function Journey() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Your Patient Journey</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Simple, human, and reassuring{" "}
            <span className="gradient-text">from the first call.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-soft hover-lift"
            >
              <div className="font-display text-3xl font-semibold text-primary/25">{s.n}</div>
              <div className="mt-3 font-display text-lg font-semibold text-foreground">
                {s.title}
              </div>
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

/* ---------------- Testimonials (Google reviews) ---------------- */
const REVIEWS = [
  {
    name: "Pratibha Bansal",
    source: "Google",
    stars: 5,
    text: "Dr Godara is a very knowledgeable and excellent pulmonologist. The way he compiles every aspect of patient reports and medication is truly commendable.",
  },
  {
    name: "Tanmoy Das",
    source: "Google",
    stars: 5,
    text: "He treated my wife with utmost sincerity and friendliness. His years of international experience were a huge plus. I am forever in debt for his help.",
  },
  {
    name: "Ankit Agrawal",
    source: "Google",
    stars: 5,
    text: "Very skilled and competent, with a sharp memory for minute details. He is friendly, makes the patient comfortable and explains everything clearly.",
  },
  {
    name: "Abhinav Nathany",
    source: "Google",
    stars: 5,
    text: "Sir is very clear in diagnosis and medication. Very polite, understanding and fully dedicated. His advice really matters to avoid future complications.",
  },
  {
    name: "Rajesh Meena",
    source: "Google",
    stars: 5,
    text: "One of the best pulmonologists in Jaipur. Explained my father's condition patiently and the treatment worked wonderfully. Highly recommended.",
  },
  {
    name: "Sunita Sharma",
    source: "Google",
    stars: 5,
    text: "Calm, honest and genuinely caring. Never rushes the consultation and never prescribes unnecessary medicines. Grateful to have found him.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <SectionEyebrow>Real words from real patients.</SectionEyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              <span className="gradient-text">4.9 ★ on Google</span> — trusted across Rajasthan.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              All reviews are verified from Google Business (Advance Pulmo Care) and Practo.
            </p>
          </div>
          <a
            href={GOOGLE_LISTING}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:border-primary/30"
          >
            View all 323 reviews <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-support">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    r.source === "Google"
                      ? "bg-primary/10 text-primary"
                      : "bg-support/15 text-support-foreground"
                  }`}
                >
                  {r.source}
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm text-primary-foreground font-semibold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">Verified patient</div>
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
    {
      src: gettingReady,
      type: "video",
      alt: "Getting ready for the Surgery",
      cls: "lg:col-span-2 lg:row-span-3",
    },
    {
      src: clinicBanner,
      alt: "Clinic Banner",
      cls: "",
    },
    {
      src: drAchievements,
      alt: "Dr. Godara's Achievements",
      cls: "",
    },
    {
      src: consultation,
      alt: "Consultation in progress",
      cls: "lg:col-span-2",
    },
    {
      src: reception,
      alt: "Reception",
      cls: "",
    },
    {
      src: waitingArea,
      alt: "Waiting Area",
      cls: "",
    },
  ];

  return (
    <section className="relative gradient-soft py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Inside the Clinic</SectionEyebrow>

          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Modern facility. <span className="gradient-text">Easy to reach.</span>
          </h2>
        </div>

        <div
          className="
            mt-12
            grid
            grid-cols-2
            gap-3
            lg:grid-cols-4
            lg:auto-rows-[300px]
          "
        >
          {items.map((it, i) => (
            <div
              key={i}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-border
                shadow-soft
                ${it.cls}
              `}
            >
              {it.type === "video" ? (
                <video
                  src={it.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              )}

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

/* ---------------- FAQ ---------------- */
const FAQS = [
  {
    q: "How can I book an appointment?",
    a: "Use the in-app booking form on this website (top-right or the Book section). You can also book on WhatsApp or by calling the clinic directly.",
  },
  {
    q: "What are the clinic timings at Advance Pulmo Care?",
    a: "Monday to Saturday, 6:00 PM to 8:00 PM (30-minute slots). Sunday is for emergencies only.",
  },
  {
    q: "Where is Advance Pulmo Care located?",
    a: "Ashadeep Kingscourt, S2–S3, near Jeerota, Jagatpura, Jaipur, Rajasthan 302022.",
  },
  {
    q: "Does Dr. Godara also consult at RBH?",
    a: "Yes — Dr. Godara is Sr. Consultant & Additional Director in Pulmonology at CK Birla Hospitals | RBH, Gopalpura, Jaipur.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Walk-ins are accepted where possible, however we strongly recommend booking in advance to minimise waiting time.",
  },
  {
    q: "How can I reach the clinic in an emergency?",
    a: `For respiratory emergencies, the 24×7 line is ${EMERGENCY_DISPLAY}.`,
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 sm:py-28">
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
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
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

/* ---------------- Booking Section ---------------- */
function BookingSection() {
  return (
    <section id="book" className="relative gradient-soft py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="flex flex-col">
            <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#0a1e36] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              APC OPD Schedulers
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Secure Your Premium <br /> Priority Consultation Slot
            </h2>
            <div className="mt-4 h-[3px] w-12 rounded-full bg-blue-500" />
            <p className="mt-6 max-w-md text-muted-foreground">
              Take command of your lung health today. Dr. Godara provides dedicated OPD
              consultations at <strong className="text-foreground">Advance Pulmo Care</strong>,
              Jagatpura, and Rukmani Birla Hospital (RBH). Use this interactive system to find open
              diagnostic sessions.
            </p>

            <div className="mt-auto">
              <div className="mt-10 rounded-3xl bg-[#0a1e36] p-6 text-white shadow-elevated sm:p-7">
                <div className="text-sm font-bold">Need Direct Support?</div>
                <p className="mt-2 text-sm text-slate-200">
                  If you are looking for direct status updates, emergency guidelines, or immediate
                  booking coordination at Advance Pulmo Care, dial our coordinator directly:
                </p>
                <a
                  href={`tel:${APC_PHONE_TEL}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0a1e36] hover:bg-slate-100 transition shadow-sm"
                >
                  <Phone className="h-4 w-4 text-[#0a1e36]" /> Call Clinic: {APC_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
          {/* Right column — form */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-elevated sm:p-8">
            <BookingForm />
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.9fr_1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0a1e36] text-white shadow-soft">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="font-display text-xl font-bold text-[#0a1e36]">Dr. Rakesh Godara</div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Sr. Consultant Pulmonologist &amp; Additional Director at CK Birla Hospitals — RBH,
            Jaipur. Providing advanced interventional respiratory care with compassion.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              {
                href: "https://www.linkedin.com/in/rakesh-godara-06a14377/",
                label: "LinkedIn",
                icon: Linkedin,
              },
              {
                href: "https://www.instagram.com/godararakesh2021/",
                label: "Instagram",
                icon: Instagram,
              },
              {
                href: "https://www.facebook.com/drgodarainterventionalpulmonology/",
                label: "Facebook",
                icon: Facebook,
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            QUICK LINKS
          </div>
          <ul className="mt-5 space-y-3 text-[0.95rem] text-foreground">
            <li>
              <a href="#about" className="hover:text-primary">
                About the Doctor
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-primary">
                Patient Stories
              </a>
            </li>
            <li>
              <a href="#clinic" className="hover:text-primary">
                Clinic &amp; Contact
              </a>
            </li>
            <li>
              <a
                href={RBH_PROFILE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary"
              >
                RBH Profile <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Clinic Hours */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            CLINIC HOURS
          </div>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Mon – Sat</span>
              <span className="font-bold text-[#0a1e36]">6:00 PM – 8:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Sunday</span>
              <span className="font-bold text-[#0a1e36]">Emergency Only</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-blue-50/50 p-5 border border-blue-100/30">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
              EMERGENCY 24×7
            </div>
            <a
              href={`tel:${EMERGENCY_DISPLAY}`}
              className="mt-2 block font-display text-2xl font-bold text-[#0a1e36] tracking-wide hover:text-blue-600 transition"
            >
              {EMERGENCY_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <div>© {new Date().getFullYear()} Dr. Rakesh Godara. All rights reserved.</div>
          <div>Registration: 23258 — Rajasthan Medical Council, 2005</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating Buttons ---------------- */
function FloatingActions() {
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {/* Phone button on mobile */}
        <a
          href={`tel:${APC_PHONE_TEL}`}
          aria-label="Call clinic"
          className="grid h-12 w-12 place-items-center rounded-full bg-[#0a1e36] text-[#ffffff] shadow-elevated sm:hidden"
        >
          <Phone className="h-5 w-5" />
        </a>

        {/* WhatsApp + Speech bubble layout row */}
        <div className="flex items-center gap-3">
          {/* Speech-bubble caption */}
          <div
            className={`relative rounded-full bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0a1e36] shadow-elevated border border-slate-100 transition-all duration-500 whitespace-nowrap ${
              showTip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-[#09d261] align-middle animate-pulse" />
            Online Support Desk
            <span
              aria-hidden
              className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 bg-white border-r border-t border-slate-100"
            />
          </div>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="animate-pulse-ring grid h-14 w-14 place-items-center rounded-full text-white shadow-elevated transition hover:scale-105"
            style={{ backgroundColor: "#09d261" }}
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Small helpers ---------------- */
function SectionEyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
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
