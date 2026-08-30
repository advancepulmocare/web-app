import { Activity, Award, ExternalLink, HeartPulse, Microscope, Syringe } from "lucide-react";
import doctorPortrait from "@/assets/doctor-portrait.png";
import { SectionEyebrow } from "@/components/section-eyebrow";
import {
  ACADEMIC_STATS,
  AWARDS,
  CERTIFICATIONS,
  EDUCATION,
  PREVIOUS,
  PUBLICATIONS,
  REGISTRATIONS,
} from "@/lib/doctor-profile";
import { DOCTOR_DESIGNATION, DOCTOR_EXPERIENCE, DOCTOR_NAME } from "@/lib/site-content";

const PROCEDURES = [
  {
    icon: Microscope,
    area: "Interventional Pulmonology",
    items: [
      { label: "Diagnostic bronchoscopy", volume: "8000+" },
      { label: "EBUS-guided TBNA", volume: "500+" },
      { label: "Rigid bronchoscopy", volume: "300+" },
      { label: "Conventional TBNA", volume: "100+" },
      { label: "Radial EBUS-GS TBBx", volume: "50+" },
      { label: "Cryobiopsy", volume: "10+" },
    ],
  },
  {
    icon: Syringe,
    area: "Pleural Procedures",
    items: [
      { label: "Medical thoracoscopy / pleuroscopy", volume: "" },
      { label: "Pleural biopsy & pleurodesis", volume: "" },
      { label: "Indwelling tunneled pleural catheter", volume: "" },
      { label: "Ultrasound-guided pleural procedures", volume: "" },
    ],
  },
  {
    icon: HeartPulse,
    area: "Critical Care",
    items: [
      { label: "Percutaneous dilatational tracheostomy", volume: "300+" },
      { label: "Central, arterial & HD lines", volume: "1000+" },
      { label: "Mechanical ventilation in ARDS", volume: "" },
      { label: "ICU bronchoscopy & lung ultrasound", volume: "" },
    ],
  },
  {
    icon: Activity,
    area: "Diagnostics & Sleep",
    items: [
      { label: "Full PFT with DLCO", volume: "" },
      { label: "Forced oscillation technique (FOT)", volume: "" },
      { label: "6-minute walk test & night oximetry", volume: "" },
      { label: "Level I and Level III sleep studies", volume: "" },
    ],
  },
];

export function AboutDoctorFull() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1 lg:sticky lg:top-28">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] gradient-accent opacity-30 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-elevated">
            <img
              src={doctorPortrait}
              alt={`${DOCTOR_NAME}, pulmonologist`}
              width={1024}
              height={1280}
              className="h-full w-full object-cover object-top"
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
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Pulmonary, critical care <span className="font-[Georgia,serif]">&amp;</span> sleep
            medicine <span className="gradient-text">with calm precision.</span>
          </h1>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted-foreground">
            {DOCTOR_NAME} is the founder of{" "}
            <strong className="text-foreground">Advance Pulmo Care</strong>, Jagatpura — his
            personal chest &amp; interventional pulmonology clinic — and serves as{" "}
            {DOCTOR_DESIGNATION}. {DOCTOR_EXPERIENCE} He specialises in interventional pulmonology,
            critical care and complex airway disorders, with international training and a reputation
            built on clarity, honesty and patient-first care.
          </p>

          <div className="mt-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              EDUCATION &amp; TRAINING
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

          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              AWARDS
            </div>
            <ul className="mt-5 space-y-4">
              {AWARDS.map((a) => (
                <li key={a.title} className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#0a2540]">{a.title}</div>
                    <div className="mt-0.5 text-sm text-[#4a5568]">{a.sub}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              CERTIFICATIONS
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {CERTIFICATIONS.map((c) => (
                <span
                  key={c.title}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-[#4a5568] shadow-sm"
                >
                  {c.title} · {c.year}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              PROCEDURAL SKILLS &amp; COMPETENCIES
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PROCEDURES.map((p) => (
                <div
                  key={p.area}
                  className="rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <p.icon className="h-4 w-4" />
                    </div>
                    <div className="font-display text-sm font-semibold text-foreground">
                      {p.area}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {p.items.map((it) => (
                      <li
                        key={it.label}
                        className="flex items-baseline justify-between gap-3 text-xs text-muted-foreground"
                      >
                        <span>{it.label}</span>
                        {it.volume && (
                          <span className="shrink-0 font-display text-sm font-semibold text-primary">
                            {it.volume}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              ACADEMIC &amp; FACULTY
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {ACADEMIC_STATS.map((a) => (
                <div
                  key={a.label}
                  className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft sm:text-left"
                >
                  <div className="font-display text-2xl font-semibold text-primary">{a.value}</div>
                  <div className="mt-1 text-xs font-semibold text-foreground">{a.label}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{a.sub}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Invited faculty, panellist and organising-committee member at NAPCON, TESCON,
              BRONCOCON, RAJPULMOCON, CAPI and ATICON, with invited faculty roles at international
              meetings in Muscat and Almaty.
            </p>
          </div>

          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8292a1]">
              PUBLICATIONS
            </div>
            <ol className="mt-5 space-y-4">
              {PUBLICATIONS.map((p, i) => (
                <li
                  key={p.title}
                  className="rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <div className="flex gap-3">
                    <span className="font-display text-lg font-semibold text-primary/30">
                      0{i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold leading-snug text-[#0a2540]">
                        {p.title}
                      </div>
                      <div className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {p.authors}
                      </div>
                      <div className="mt-1.5 text-xs font-semibold text-foreground/80">
                        {p.journal}
                      </div>
                      {p.doi && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          DOI: {p.doi} <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

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
              Lung Cancer · Interstitial Lung Diseases · Pleural Diseases · Sleep Disorders
              Associated with Cardiac and Respiratory Disease
            </div>
            <div className="mt-3 border-t border-primary/15 pt-3 text-xs leading-relaxed text-muted-foreground">
              Procedural focus: Endobronchial Ultrasound (EBUS) · Rigid Bronchoscopy &amp; Central
              Airway Obstruction · Medical Thoracoscopy / Pleuroscopy · Bronchoscopic Management of
              Massive Haemoptysis · ARDS and Mechanical Ventilation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
