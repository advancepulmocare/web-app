import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { AboutDoctorFull } from "@/components/about-doctor-full";
import { ProfessionalJourney } from "@/components/professional-journey";
import { SiteHeader, type NavItem } from "@/components/site-header";
import {
  APC_REGISTRATION,
  APC_REGISTRATION_LABEL,
  APC_REGISTRATION_VALIDITY,
  DOCTOR_NAME,
} from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: `About ${DOCTOR_NAME} — Education, Journey & Credentials`,
      },
      {
        name: "description",
        content: `Full professional profile of ${DOCTOR_NAME}: education, medical registration, awards, publications and career journey.`,
      },
    ],
  }),
});

const ABOUT_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Clinic", href: "/#clinic" },
  { label: "Reviews", href: "/#testimonials" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground">
      <SiteHeader nav={ABOUT_NAV} activeLabel="About" bookHref="/#book" />

      <div className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 sm:pt-40">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>

      <AboutDoctorFull />
      <ProfessionalJourney />

      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft sm:flex-row sm:items-center">
            <div>
              <div className="font-display text-2xl font-semibold text-foreground">
                Ready to book a consultation?
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Request an appointment at Advance Pulmo Care, Jagatpura.
              </p>
            </div>
            <a
              href="/#book"
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
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
      </footer>
    </div>
  );
}
