import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader, type NavItem } from "@/components/site-header";
import {
  APC_ADDRESS,
  APC_PHONE_DISPLAY,
  APC_PHONE_TEL,
  APC_REGISTRATION,
  APC_REGISTRATION_LABEL,
  APC_REGISTRATION_VALIDITY,
  DOCTOR_NAME,
} from "@/lib/site-content";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      {
        title: `Privacy Policy — ${DOCTOR_NAME}`,
      },
      {
        name: "description",
        content: `How ${DOCTOR_NAME} and Advance Pulmo Care collect, use and protect your personal information.`,
      },
    ],
  }),
});

const PRIVACY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Clinic", href: "/#clinic" },
  { label: "Reviews", href: "/#testimonials" },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground">
      <SiteHeader nav={PRIVACY_NAV} bookHref="/#book" />

      <main className="mx-auto max-w-3xl px-5 pt-32 sm:px-8 sm:pt-40">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: October 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-3">
              {DOCTOR_NAME} and Advance Pulmo Care, Jagatpura, Jaipur (“we”, “us”, “our”) respect
              your privacy. This policy explains how we handle information when you visit this
              website, request an appointment, or contact us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              2. Information We Collect and Use
            </h2>
            <p className="mt-3">
              Our booking form asks for your name, age, mobile number, medical concern, and preferred
              appointment date and time. Sharing symptoms or previous medical history is optional.
            </p>
            <p className="mt-3">
              We use this information to manage appointment requests, contact you about scheduling,
              coordinate care, maintain necessary clinic records, and operate our website. We do not
              sell personal information or use health details for advertising.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              3. WhatsApp Booking and Third Parties
            </h2>
            <p className="mt-3">
              When you use our booking form, your browser opens WhatsApp with a pre-filled message.{" "}
              <span className="font-medium text-foreground">
                You must send the message for the clinic to receive your request.
              </span>{" "}
              Submitting a request does not confirm an appointment; the clinic will confirm your
              slot separately.
            </p>
            <p className="mt-3">
              We use Vercel for website hosting and may load Google Maps and Google Fonts on
              relevant pages. These providers may process technical information, such as IP
              addresses or device details. WhatsApp / Meta processes information when you use its
              messaging service. Their practices are governed by their own privacy policies.
            </p>
            <p className="mt-3">
              We do not automatically share Advance Pulmo Care booking requests with CK Birla
              Hospitals – RBH. Information may be shared with relevant care or referral partners
              when needed for a consultation you have requested, or with authorities when legally
              required.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              4. Security and Data Retention
            </h2>
            <p className="mt-3">
              Our website uses HTTPS to encrypt data in transit. We take reasonable care of
              information received through clinic devices and accounts.
            </p>
            <p className="mt-3">
              If you fill in the booking form but do not send the WhatsApp message, the clinic does
              not receive your request through this channel. Clinic booking chats are reviewed
              within 90 days after the request is confirmed, completed, cancelled, or left
              unconfirmed, and unnecessary copies are deleted where practicable. Medical and
              clinical records may be retained for patient care and applicable record-keeping
              requirements. Third-party providers may retain information under their own policies.
            </p>
            <p className="mt-3">
              Please do not send emergency details or highly sensitive medical documents through
              routine booking messages.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              5. Your Privacy Rights
            </h2>
            <p className="mt-3">
              You may ask to access or correct your information, request deletion where permitted,
              withdraw optional consent where applicable, or raise a privacy complaint.
            </p>
            <p className="mt-3">
              Call{" "}
              <a
                href={`tel:${APC_PHONE_TEL}`}
                className="font-semibold text-primary hover:underline"
              >
                {APC_PHONE_DISPLAY}
              </a>{" "}
              during clinic hours and ask for a privacy or records request. We may verify your
              identity before responding and aim to acknowledge requests within seven working days,
              subject to applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">
              6. Medical Disclaimer and Policy Updates
            </h2>
            <p className="mt-3">
              This website is for appointment coordination only and does not replace medical
              consultation or emergency care. For urgent breathing problems or medical emergencies,
              visit the nearest emergency department.
            </p>
            <p className="mt-3">
              We may update this policy by publishing a revised version on this page. Where
              required, we will provide notice or obtain consent for changes in data processing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">7. Contact Us</h2>
            <div className="mt-3 rounded-2xl border border-border bg-card p-5 text-foreground">
              <div className="font-semibold">{DOCTOR_NAME}</div>
              <div className="mt-1 text-muted-foreground">Advance Pulmo Care</div>
              <div className="mt-3 text-muted-foreground">{APC_ADDRESS}</div>
              <div className="mt-3">
                Phone:{" "}
                <a
                  href={`tel:${APC_PHONE_TEL}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {APC_PHONE_DISPLAY}
                </a>
              </div>
            </div>
            {/* <p className="mt-4 text-xs">
              This policy describes our intended privacy practices and is not a formal legal
              opinion. For advice on applicable Indian privacy requirements, consult a qualified
              lawyer.
            </p> */}
          </section>
        </div>
      </main>

      <footer className="mt-20 border-t border-border bg-card">
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
