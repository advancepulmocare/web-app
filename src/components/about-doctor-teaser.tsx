import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import consultation from "@/assets/consultation.png";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { EDUCATION, REGISTRATIONS } from "@/lib/doctor-profile";
import {
  DOCTOR_DESIGNATION,
  DOCTOR_EXPERIENCE,
  DOCTOR_NAME,
  QUALIFICATIONS_SHORT,
} from "@/lib/site-content";

/** Compact homepage About — education, registration and CTA to /about. */
export function AboutDoctorTeaser() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] gradient-accent opacity-30 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-elevated">
            <img
              src={consultation}
              alt="Dr. Rakesh Godara in consultation"
              width={1280}
              height={960}
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
            Meet <span className="gradient-text">{DOCTOR_NAME}</span>
          </h2>
          <p className="mt-3 text-sm font-medium text-foreground/80">{QUALIFICATIONS_SHORT}</p>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
            Founder of <strong className="text-foreground">Advance Pulmo Care</strong>, Jagatpura,
            and {DOCTOR_DESIGNATION}. {DOCTOR_EXPERIENCE}
          </p>

          <div className="mt-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              EDUCATION &amp; TRAINING
            </div>
            <ol className="relative mt-6 space-y-5 border-l border-slate-200 pl-6">
              {EDUCATION.map((e) => (
                <li key={e.title} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-300 bg-white" />
                  <div className="text-base font-bold text-[#0a2540]">{e.title}</div>
                  <div className="mt-1 text-sm text-[#4a5568]">{e.sub}</div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              MEDICAL REGISTRATION
            </div>
            <ul className="mt-5 space-y-3">
              {REGISTRATIONS.map((r) => (
                <li
                  key={r.title}
                  className="rounded-2xl border border-border bg-card px-4 py-3 shadow-soft"
                >
                  <div className="text-sm font-semibold text-[#0a2540]">{r.title}</div>
                  <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {r.sub}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
          >
            Know more about Dr. Godara
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
