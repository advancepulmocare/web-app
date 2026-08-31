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
  Users,
  Sparkles,
  Wind,
  Microscope,
  Syringe,
  Star,
  ArrowRight,
  CheckCircle2,
  Scale,
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
import awarenessPoster from "@/assets/awareness.jpeg";
import svcAsthmaCopd from "@/assets/services/service-asthma-copd.jpg";
import svcBronchoscopy from "@/assets/services/service-bronchoscopy.jpg";
import svcEbus from "@/assets/services/service-ebus.jpg";
import svcThoracoscopy from "@/assets/services/service-thoracoscopy.jpg";
import svcCriticalCare from "@/assets/services/service-critical-care.jpg";
import svcLungInfection from "@/assets/services/service-lung-infection.png";
import svcTuberculosis from "@/assets/services/service-tuberculosis.png";
import svcRehabilitation from "@/assets/services/service-rehabilitation.jpg";
import svcIld from "@/assets/services/service-ild.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { BookingForm } from "@/components/booking-form";
import { AboutDoctorTeaser } from "@/components/about-doctor-teaser";
import { SiteHeader, type NavItem } from "@/components/site-header";
import { SectionEyebrow } from "@/components/section-eyebrow";
import {
  ADULT_VACCINATIONS,
  CLINIC_FACILITIES,
  PATIENT_PREP,
  SYMPTOMS,
  SYMPTOMS_EMERGENCY_NOTICE,
  WHY_ADULT_VACCINATION,
} from "@/lib/doctor-profile";
import {
  APC_PHONE_DISPLAY,
  APC_PHONE_TEL,
  APC_REGISTRATION,
  APC_REGISTRATION_LABEL,
  APC_REGISTRATION_VALIDITY,
  APC_WHATSAPP_NUMBER,
  DOCTOR_DESIGNATION,
  DOCTOR_EXPERIENCE,
  DOCTOR_NAME,
  GOOGLE_LISTING,
  QUALIFICATIONS_SHORT,
  RBH_MAPS,
  RBH_PROFILE,
} from "@/lib/site-content";

export const Route = createFileRoute("/")({
  component: Index,
});

const HOME_NAV: NavItem[] = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Services", href: "#services", sectionId: "services" },
  // { label: "Symptoms", href: "#symptoms", sectionId: "symptoms" },
  { label: "Clinic", href: "#clinic", sectionId: "clinic" },
  { label: "Vaccination", href: "#vaccination", sectionId: "vaccination" },
  { label: "Reviews", href: "#testimonials", sectionId: "testimonials" },
];

const WHATSAPP = `https://api.whatsapp.com/send/?phone=${APC_WHATSAPP_NUMBER}&text=${encodeURIComponent(
  "Hi, I'd like to book a consultation at Advance Pulmo Care with Dr. Rakesh Godara.",
)}&type=phone_number`;

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
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: DOCTOR_NAME,
    medicalSpecialty: ["Pulmonology", "Critical Care Medicine", "Sleep Medicine"],
    description: `${DOCTOR_DESIGNATION}. ${DOCTOR_EXPERIENCE}`,
    telephone: APC_PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C3-C4, Ashadeep Kingscourt, near Jeerota Petrol Pump, Jagatpura",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302022",
      addressCountry: "IN",
    },
    alumniOf: ["PBM Group of Hospitals, Bikaner", "Sir Ganga Ram Hospital, New Delhi"],
  };

  return (
    <BookingProvider>
      <div id="home" className="min-h-screen bg-background pb-24 text-foreground sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
        <SiteHeader nav={HOME_NAV} bookHref="#book" />
        <Hero />
        <TrustStats />
        <AboutDoctorTeaser />
        <Services />
        <SymptomsSection />
        <ClinicSection />
        <VaccinationSection />
        <WhyChoose />
        <Journey />
        <Testimonials />
        <Gallery />
        <FAQ />
        <PatientPrepSection />
        <BookingSection />
        <LegalSection />
        <Footer />
        <FloatingActions />
        <Toaster richColors position="top-center" />
      </div>
    </BookingProvider>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-48">
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

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-16 sm:px-8 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-32">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-4 py-1.5 text-xs font-medium text-primary shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span className="text-left leading-snug">
              {DOCTOR_DESIGNATION.split(" | ").map((part, i, parts) => (
                <span key={part}>
                  {part}
                  {i < parts.length - 1 && <br />}
                </span>
              ))}
            </span>
          </div>

          <h1 className="mt-5 max-w-[11ch] font-display text-[2.15rem] font-semibold leading-[1.03] tracking-tight text-foreground sm:max-w-none sm:text-5xl lg:text-[4.2rem]">
            Compassionate care.
            <br />
            <span className="gradient-text">Expert diagnosis.</span>
            <br />
            Better breathing.
          </h1>

          <p className="mt-5 max-w-xl text-[0.96rem] leading-relaxed text-muted-foreground sm:text-lg">
            Meet <strong className="text-foreground">{DOCTOR_NAME}</strong> — {QUALIFICATIONS_SHORT}
            . Founder of <strong className="text-foreground">Advance Pulmo Care</strong>, Jagatpura,
            and {DOCTOR_DESIGNATION}. {DOCTOR_EXPERIENCE}
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

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Award, label: "20+ Years of Pulmonary, Critical Care & Sleep Medicine" },
              { icon: Star, label: "4.9 ★ · 323+ Google Reviews" },
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
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] gradient-accent opacity-40 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
            <img
              src={doctorPortrait}
              alt="Dr. Rakesh Godara, pulmonologist"
              width={1024}
              height={1280}
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-background/80 p-4 backdrop-blur-xl shadow-soft">
              <div className="font-display text-lg font-semibold text-foreground">
                {DOCTOR_NAME}
              </div>
              <div className="text-xs text-muted-foreground">{QUALIFICATIONS_SHORT}</div>
            </div>
          </div>

          <div className="animate-float absolute -left-4 top-10 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-elevated sm:flex sm:items-center sm:gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-support/20 text-support-foreground">
              <Star className="h-4 w-4 fill-current text-support" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">4.9 ★ Rating</div>
              <div className="text-[11px] text-muted-foreground">323+ Google reviews</div>
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
              <div className="text-sm font-semibold">
                Chest Specialist, Sleep Specialist, Interventional Pulmonologist
              </div>
              <div className="text-[11px] text-muted-foreground">
                Bronchoscopy · EBUS · Airway Procedures
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
  { value: 20, suffix: "+", label: "Years of Experience" },
  { value: 8000, suffix: "+", label: "Diagnostic Bronchoscopies" },
  { value: 500, suffix: "+", label: "EBUS-TBNA Procedures" },
  { value: 300, suffix: "+", label: "Rigid Bronchoscopies" },
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
    <section ref={ref} className="relative py-12 sm:py-16">
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

/* ---------------- Services ---------------- */
const SERVICES = [
  {
    icon: Wind,
    title: "Asthma & COPD Care",
    desc: "Long-term management of chronic obstructive and allergic airway disease.",
    img: svcAsthmaCopd,
    alt: "Nebuliser mask used in inhaled therapy for asthma and COPD",
  },
  {
    icon: Microscope,
    title: "Diagnostic Bronchoscopy",
    desc: "Advanced airway visualisation and biopsy under expert guidance.",
    img: svcBronchoscopy,
    alt: "Endoscopy suite with a procedure video monitor",
  },
  {
    icon: Activity,
    title: "EBUS",
    desc: "Minimally invasive sampling of mediastinal and hilar lymph nodes for diagnosis and lung-cancer staging.",
    img: svcEbus,
    alt: "Ultrasound system used for endobronchial ultrasound guidance",
  },
  {
    icon: Syringe,
    title: "Medical Thoracoscopy",
    desc: "Minimally invasive evaluation of pleural effusion and pleural disease, including pleural biopsy and selected therapeutic procedures.",
    img: svcThoracoscopy,
    alt: "Procedure room with monitoring equipment during a minimally invasive procedure",
  },
  {
    icon: HeartPulse,
    title: "Critical & ICU Care",
    desc: "Respiratory Critical Care - available through CK Birla Hospitals-RBH.",
    img: svcCriticalCare,
    alt: "Clinician reviewing a patient monitor in an intensive care unit",
  },
  {
    icon: Stethoscope,
    title: "Lung Infections & Bronchiectasis",
    desc: "Evidence-based management of pneumonia, bronchiectasis and related chronic lung infections.",
    img: svcLungInfection,
    alt: "Doctor reviewing chest radiographs on a light box",
  },
  {
    icon: Award,
    title: "Tuberculosis (TB)",
    desc: "Diagnosis and guided treatment of pulmonary and extrapulmonary tuberculosis, including drug-resistant disease when indicated.",
    img: svcTuberculosis,
    alt: "Laboratory microscope used in infectious disease diagnosis",
  },
  {
    icon: HeartPulse,
    title: "Hemoptysis",
    desc: "Urgent evaluation and bronchoscopic management of coughing up blood, including massive haemoptysis when required.",
    img: svcBronchoscopy,
    alt: "Airway procedure suite used in hemoptysis management",
  },
  {
    icon: Microscope,
    title: "Lung Cancer Diagnosis",
    desc: "Structured work-up for suspected lung cancer with imaging correlation, EBUS staging and tissue diagnosis.",
    img: svcEbus,
    alt: "Ultrasound-guided sampling for lung cancer diagnosis",
  },
  {
    icon: ShieldCheck,
    title: "Pulmonary Rehabilitation & Post-ICU Recovery",
    desc: "Structured recovery support for breathlessness, deconditioning and respiratory rehabilitation after serious illness.",
    img: svcRehabilitation,
    alt: "Therapist guiding a patient through a supervised rehabilitation exercise",
  },
  {
    icon: Sparkles,
    title: "Interstitial Lung Disease",
    desc: "Evaluation and multidisciplinary management of interstitial lung disease, pulmonary fibrosis, hypersensitivity pneumonitis and sarcoidosis.",
    img: svcIld,
    alt: "Anatomical cross-section model of human lungs",
  },
];

function Services() {
  return (
    <section id="services" className="relative gradient-soft py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Services &amp; Treatments</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Advanced pulmonology, delivered with{" "}
            <span className="gradient-text">calm precision.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From outpatient respiratory care to advanced interventional procedures, the focus
            remains on clear diagnosis, appropriate treatment and careful follow-up.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.alt}
                  width={900}
                  height={563}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1e36]/75 via-[#0a1e36]/15 to-transparent" />
                <div className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl bg-card/95 text-primary shadow-soft backdrop-blur transition group-hover:scale-105">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Clinic Consultations & Diagnostics
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sleep apnoea and sleep medicine, severe asthma and biologic therapy review, allergy
              evaluation, SPT and SLIT, and bronchiectasis care are assessed in clinic with further
              testing and treatment planned according to clinical indication.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Hospital-Based Diagnostics & Procedures
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pulmonary function testing including DLCO, FOT and FeNO, Level I and Level III sleep
              studies, rigid bronchoscopy, central airway intervention and higher-acuity respiratory
              critical care are hospital-based services and should be coordinated through CK Birla
              Hospitals - RBH.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Symptoms ---------------- */
function SymptomsSection() {
  return (
    <section id="symptoms" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow center>When to Consult Dr. Godara</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Don&apos;t Ignore These <span className="gradient-text">Respiratory Symptoms</span>
          </h2>
          <p className="mt-4 text-muted-foreground lg:whitespace-nowrap">
            If you answer &ldquo;Yes&rdquo; to any of the following, it may be time to consult a
            respiratory specialist.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SYMPTOMS.map((symptom) => (
            <li
              key={symptom}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm font-medium leading-snug text-foreground">{symptom}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-destructive/25 bg-destructive/5 px-5 py-4 sm:px-6 sm:py-5">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-destructive">
            Important
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {SYMPTOMS_EMERGENCY_NOTICE}
          </p>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => (window.location.href = "#book")}
            className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
          >
            <Calendar className="h-4 w-4" />
            Book a Consultation
            <ArrowRight className="h-4 w-4" />
          </button>
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
  ["Sunday", "Closed"],
];

function ClinicSection() {
  return (
    <section id="clinic" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow center>Personal Clinic</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            <span className="gradient-text">Advance Pulmo Care</span> —{" "}
            <span className="font-[Georgia,serif]">J</span>agatpura,{" "}
            <span className="font-[Georgia,serif]">J</span>aipur.
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
                  <span className="text-muted-foreground font-medium">323+ Google reviews</span>
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
                      C3–C4, Ashadeep Kingscourt, near Jeerota Petrol Pump, Jagatpura,
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
                    <div className="mt-2 text-xs text-muted-foreground">
                      For emergencies, please contact the nearest emergency department or hospital
                      emergency desk immediately.
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

              <div className="mt-8 border-t border-border pt-7">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
                  Clinic Facilities
                </div>
                <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {CLINIC_FACILITIES.map((f, i) => {
                    const isFirst = i === 0;
                    return (
                      <li
                        key={f.title}
                        className={`rounded-2xl border border-border bg-background/70 px-4 py-3 shadow-soft ${
                          isFirst ? "sm:col-span-2" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-display text-lg font-semibold text-primary/35">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-foreground">{f.title}</div>
                            {f.items.length > 0 && (
                              <ul className={`mt-1.5 gap-x-6 gap-y-1`}>
                                {f.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                                  >
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
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
                  CK Birla Hospitals – RBH
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
              href={RBH_PROFILE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <ExternalLink className="h-4 w-4" /> View RBH Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Adult Vaccination ---------------- */
function VaccinationSection() {
  return (
    <section id="vaccination" className="relative gradient-soft py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Adult Vaccination</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Protect your lungs with <span className="gradient-text">timely vaccination.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Recommended adult vaccines offered or guided at Advance Pulmo Care.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="hidden grid-cols-[1.1fr_1.6fr] gap-4 border-b border-border bg-muted/40 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:grid">
            <div>Vaccine</div>
            <div>Dosage / Route</div>
          </div>
          <ul className="divide-y divide-border">
            {ADULT_VACCINATIONS.map((v) => (
              <li
                key={v.name}
                className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-[1.1fr_1.6fr] sm:items-start sm:gap-4"
              >
                <div className="font-display text-lg font-semibold text-foreground">{v.name}</div>
                <div className="text-sm leading-relaxed text-muted-foreground">{v.dosage}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
            Why Adult Vaccination Matters
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WHY_ADULT_VACCINATION.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{w.title}</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{w.desc}</p>
                  </div>
                </div>
              </div>
            ))}
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
    title: "Advanced Respiratory Training",
    desc: "Training across pulmonology, critical care and airway intervention.",
  },
  {
    icon: Scale,
    title: "Trusted Second Opinions",
    desc: "Independent review of lung diagnoses, imaging and treatment plans — clarity before major decisions.",
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
    <section className="relative gradient-soft py-12 sm:py-16">
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
  { n: "01", title: "Book Appointment", desc: "Form, WhatsApp or phone request." },
  { n: "02", title: "Visit the Clinic", desc: "Minimal wait, warm reception." },
  { n: "03", title: "Consultation", desc: "Detailed history and examination." },
  { n: "04", title: "Diagnosis", desc: "Precise, evidence-based workup." },
  { n: "05", title: "Treatment Plan", desc: "Tailored, transparent and clear." },
  {
    n: "06",
    title: "Confirmation & Follow-up",
    desc: "Requests are confirmed separately by the clinic team.",
  },
];

function Journey() {
  return (
    <section className="relative py-12 sm:py-16">
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
    <section id="testimonials" className="relative py-12 sm:py-16">
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
            View all 323+ reviews <ExternalLink className="h-3.5 w-3.5" />
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
    {
      src: awarenessPoster,
      alt: "Obstructive Sleep Apnoea (OSA) awareness — Advance Pulmo Care",
      cls: "lg:col-span-2",
    },
  ];

  return (
    <section className="relative gradient-soft py-12 sm:py-16">
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

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="relative aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/fccYrHKlhyo"
              title="Advance Pulmo Care — patient awareness video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  {
    q: "How can I book an appointment?",
    a: "Use the appointment request form on this website (top-right or the Book section). You can also request an appointment on WhatsApp or by calling the clinic directly.",
  },
  {
    q: "What are the clinic timings at Advance Pulmo Care?",
    a: "Monday to Saturday, 6:00 PM to 8:00 PM (30-minute slots). Sunday is closed for routine OPD appointments.",
  },
  {
    q: "Where is Advance Pulmo Care located?",
    a: "C3–C4, Ashadeep Kingscourt, near Jeerota Petrol Pump, Jagatpura, Jaipur, Rajasthan 302022.",
  },
  {
    q: "Does Dr. Godara also consult at RBH?",
    a: `Yes — ${DOCTOR_NAME} also consults at CK Birla Hospitals – RBH, Jaipur, Monday to Saturday from 10:00 AM to 4:00 PM.`,
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes, walk-ins may be accommodated subject to availability. Prior appointments are recommended, and booked patients may be given priority.",
  },
  {
    q: "How can I reach the clinic in an emergency?",
    a: "Please contact the nearest emergency department or hospital emergency desk immediately. Do not use the routine appointment form or WhatsApp appointment help for emergencies.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-12 sm:py-16">
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

/* ---------------- Patient Prep ---------------- */
function PatientPrepSection() {
  return (
    <section id="prepare" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Before Your Visit</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            How to Prepare for Your <span className="gradient-text">Consultation</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A short checklist so your appointment is efficient and clinically useful.
          </p>
        </div>

        <ol className="mx-auto mt-12 max-w-3xl space-y-3">
          {PATIENT_PREP.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft"
            >
              <span className="font-display text-xl font-semibold text-primary/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pt-1 text-sm leading-relaxed text-foreground">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Booking Section ---------------- */
function BookingSection() {
  return (
    <section id="book" className="relative gradient-soft py-12 sm:py-16">
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
              Request an appointment at{" "}
              <strong className="text-foreground">Advance Pulmo Care</strong>, Jagatpura. This form
              is for clinic appointment coordination only. CK Birla Hospitals – RBH remains a
              separate hospital consultation channel.
            </p>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-card p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Second Opinion Clinic</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Already diagnosed elsewhere? Dr. Godara reviews your reports, imaging and
                    treatment plan to confirm the diagnosis, discuss safer alternatives, and give
                    you clarity before bronchoscopy, surgery or long-term therapy.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-foreground/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      Confirm chest / lung diagnosis and imaging findings
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      Weigh procedure vs medical management options
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      Reassurance before high-risk airway or lung decisions
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="mt-8 rounded-3xl bg-[#0a1e36] p-6 text-white shadow-elevated sm:p-7">
                <div className="text-sm font-bold">Need Direct Support?</div>
                <p className="mt-2 text-sm text-slate-200">
                  For clinic appointment coordination, follow-up questions or status updates,
                  contact the Advance Pulmo Care team directly:
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
            <div className="font-display text-xl font-bold text-[#0a1e36]">{DOCTOR_NAME}</div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {DOCTOR_DESIGNATION}. {DOCTOR_EXPERIENCE}
          </p>
          <div className="mt-6 flex gap-3">
            {[
              {
                href: "https://www.linkedin.com/in/rakesh-godara-06a14377/",
                label: "LinkedIn",
                icon: Linkedin,
              },
              {
                href: "https://www.instagram.com/advance_pulmocare",
                label: "Instagram",
                icon: Instagram,
              },
              {
                href: "https://www.facebook.com/share/19CYVCEckf",
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
              <a href="/about" className="hover:text-primary">
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
              <a href="#privacy-policy" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#medical-disclaimer" className="hover:text-primary">
                Medical Disclaimer
              </a>
            </li>
            <li>
              <a href="#terms-of-use" className="hover:text-primary">
                Terms of Use
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
              <span className="font-bold text-[#0a1e36]">Closed</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-blue-50/50 p-5 border border-blue-100/30">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
              EMERGENCY CARE
            </div>
            <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
              For urgent breathing emergencies, contact the nearest emergency department or hospital
              emergency desk immediately. Routine clinic calls and WhatsApp appointment help should
              not be used as emergency services.
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <div>
            © {new Date().getFullYear()} {DOCTOR_NAME}. All rights reserved.
          </div>
          <div>
            Registration: {APC_REGISTRATION} — {APC_REGISTRATION_LABEL}
            <span className="mx-1.5 text-border">·</span>
            {APC_REGISTRATION_VALIDITY}
          </div>
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
    <>
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden sm:block">
        <div className="pointer-events-auto flex items-center gap-3">
          <div
            className={`relative rounded-full border border-slate-100 bg-white px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-[#0a1e36] shadow-elevated transition-all duration-500 ${
              showTip ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
          >
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-[#09d261] align-middle animate-pulse" />
            WhatsApp Appointment Desk
            <span
              aria-hidden
              className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-slate-100 bg-white"
            />
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp appointment help"
            className="animate-pulse-ring grid h-14 w-14 place-items-center rounded-full text-white shadow-elevated transition hover:scale-105"
            style={{ backgroundColor: "#09d261" }}
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-background/96 p-2 shadow-elevated backdrop-blur-xl">
          <a
            href={`tel:${APC_PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-card px-3 py-3 text-sm font-semibold text-foreground"
          >
            <Phone className="h-4 w-4 text-primary" />
            Call
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#09d261] px-3 py-3 text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-3 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Calendar className="h-4 w-4" />
            Book
          </a>
        </div>
      </div>
    </>
  );
}

function LegalSection() {
  return (
    <section className="border-t border-border bg-card/70 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <article
            id="privacy-policy"
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Privacy Policy
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Information shared through this website is used only for appointment coordination and
              related communication. Please avoid submitting emergency details or highly sensitive
              medical information through the routine booking form. For corrections or follow-up,
              contact the clinic at {APC_PHONE_DISPLAY}.
            </p>
          </article>

          <article
            id="medical-disclaimer"
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Medical Disclaimer
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Website content is informational and does not replace an in-person medical
              consultation, emergency evaluation or formal treatment plan. Appointment requests are
              not emergency triage and are confirmed separately by the clinic or hospital team.
            </p>
          </article>

          <article
            id="terms-of-use"
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Terms of Use
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Submitting this form sends an appointment request for Advance Pulmo Care only and does
              not guarantee a confirmed slot. CK Birla Hospitals – RBH remains a separate
              consultation channel. Use the clinic phone or official RBH profile for the relevant
              booking path.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
