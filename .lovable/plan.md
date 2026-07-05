## Goals

Refine the existing single-page site with 6 targeted upgrades. All work stays in `src/routes/index.tsx` + a few new components — no backend changes.

## 1. Highlight the personal clinic — "Advance Pulmo Care"

Verified from the shared Google listing:

- Name: **ADVANCE PULMO CARE — Dr. Rakesh Godara, Chest Physician & Interventional Pulmonologist**
- Address: Ashadeep Kingscourt, S2–S3, near Jeerota, Jagatpura, Jaipur, Rajasthan 302022
- Phone: +91 99286 83032
- Hours: Mon–Sat 5–8 PM · Sun 6–8 PM
- Rating: **4.9 ★ (323 Google reviews)**

Changes:

- Add a dedicated "Advance Pulmo Care" section (after Services, before Patient Stories) with clinic name, tagline, address, hours grid, phone CTA, 4.9★/323 review badge, and an embedded Google Map for the Jagatpura address.
- Add a second "Clinic Locations" treatment where both **Advance Pulmo Care (own clinic)** and **CK Birla Hospitals | RBH** are shown side-by-side as cards, with Advance Pulmo Care marked as the primary/personal clinic.
- Update hero sub-line and header to mention "Founder — Advance Pulmo Care · Sr. Consultant, CK Birla Hospitals (RBH)".

## 2. Redesign the Education block (About section)

Rebuild to match the reference: a left-aligned vertical timeline with dot + connecting line, each item showing degree in bold, then institution · year in muted text. Include the exact 5 entries from the reference (MD, IDCCM, FNB, EDRM, MBBS). Below, add a "Previously Associated With" row of pill-style chips (Apollo Bangalore, Fortis Escorts Amritsar, Sir Ganga Ram Delhi, SP Medical College & PBM Bikaner).

## 3. In-app Booking section + modal

- New full-width `#book` section placed **directly before the footer**, matching image 2:
  - Left column: eyebrow chip "APC OPD SCHEDULERS", H2 "Secure Your Premium Priority Consultation Slot", supporting copy referencing Advance Pulmo Care + RBH, and a dark "Need Direct Support?" card with "Call Clinic: +91 99286 83032".
  - Right column: booking form card with steps — (1) Select Medical Concern (chip grid: Asthma/Wheezing, Chronic Cough & Allergy, Interventional Biopsy/EBUS, Sleep Apnea & Snoring, COPD & Breathlessness, General Chest/Lung), (2) Preferred Date (next 7 days pills), (3) Time Slot (5:00–8:00 PM chips reflecting real clinic hours), (4) Full Name + Mobile, (5) Brief Symptoms textarea. Primary CTA "Register Consultation Booking". Small "Interactive / WhatsApp" toggle in the card header.
- Every existing "Book Appointment" trigger (header CTA, hero CTA, floating call/whatsapp, patient-journey CTA) opens a **shadcn `Dialog` modal** containing the same form component. The section and the modal share one `BookingForm` component.
- Client-side validation with `zod` + `react-hook-form` (name 2–80 chars, Indian mobile regex, optional symptoms ≤500 chars). On submit: show a success toast ("We'll confirm your slot on WhatsApp shortly"), reset the form, and fall back to opening a pre-filled WhatsApp message to +91 99286 83032 with the booking details (URL-encoded). No backend/DB required.

## 4. Real Google review data

Replace the current Practo-sourced testimonials with:

- A trust strip: **4.9 ★ · 323 Google Reviews · Advance Pulmo Care** (linked to the Google listing).
- 5–6 real, verbatim patient reviews pulled from the Google listing and Practo profile, each with reviewer name, source badge ("Google" / "Practo"), star rating, and short quote. Include an "All reviews verified from Google & Practo" disclaimer.
- Update the hero stat counter from the old figure to **323+ verified reviews · 4.9★**.

## 5. Footer redesign (matches image 3)

Rebuild footer as a 3-column grid on desktop, stacked on mobile:

- Col 1: Stethoscope monogram + "Dr. Rakesh Godara" wordmark, short bio ("Sr. Consultant Pulmonologist & Additional Director at CK Birla Hospitals — RBH, Jaipur. Founder, Advance Pulmo Care. Providing advanced interventional respiratory care with compassion."), and three circular social icons (LinkedIn, Instagram, Facebook — Facebook links to the verified `drgodarainterventionalpulmonology` page).
- Col 2: "Quick Links" — About the Doctor, Services, Patient Stories, Clinic & Contact, RBH Profile ↗ (external).
- Col 3: "Clinic Hours" — Mon–Sat 5–8 PM, Sun 6–8 PM, plus a soft-blue "Emergency 24×7" card with the number **07340054470**.
- Divider, then bottom row: "© 2026 Dr. Rakesh Godara. All rights reserved." left, "Registration: 23258 — Rajasthan Medical Council, 2005" right.

## 6. WhatsApp support caption

Replace the current standalone floating WhatsApp button with the image-4 treatment: a small white "● Online Support Desk" pill anchored above the green WhatsApp FAB in the bottom-right, with a subtle fade-in on load and a pulsing green status dot. Clicking either opens WhatsApp with a pre-filled message.

## Technical notes

- Files: edit `src/routes/index.tsx`; add `src/components/booking-form.tsx`, `src/components/booking-dialog.tsx`, `src/components/site-footer.tsx`, `src/components/clinic-section.tsx`, `src/components/education-timeline.tsx`, `src/components/reviews-section.tsx`, `src/components/whatsapp-fab.tsx`. Keep the design tokens already in `src/styles.css`; add small utilities only if needed.
- Add deps: `react-hook-form`, `zod`, `@hookform/resolvers` (zod already recommended in guidelines). Use existing shadcn `dialog`, `form`, `input`, `textarea`, `button`, `badge`, `sonner`.
- All inputs validated with zod; WhatsApp URL built with `encodeURIComponent`. No secrets, no DB writes.
- Update `<head>` description + og:description to include "Founder, Advance Pulmo Care · Jagatpura, Jaipur".
- Re-verify mobile layout for the new booking section and footer at ≤640px.
