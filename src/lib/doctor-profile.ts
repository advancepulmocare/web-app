import {
  APC_REGISTRATION,
  APC_REGISTRATION_VALIDITY,
  EUROPEAN_DIPLOMA_NOTE,
} from "@/lib/site-content";

export const EDUCATION = [
  {
    title: "MBBS",
    sub: "S.P. Medical College, Bikaner · University of Rajasthan · 2003",
  },
  {
    title: "MD — Pulmonary Medicine",
    sub: "S.P. Medical College / PBM Group of Hospitals, Bikaner · June 2006 – May 2009",
  },
  {
    title: "IDCCM — Critical Care Medicine",
    sub: "Sir Ganga Ram Hospital, New Delhi · January 2010 – March 2011",
  },
  {
    title: "DNB — Critical Care Medicine",
    sub: "Escorts Heart Institute and Research Centre, New Delhi · National Board of Examinations · March 2011 – July 2013",
  },
  {
    title: "EDARM — European Diploma of Adult Respiratory Medicine",
    sub: `${EUROPEAN_DIPLOMA_NOTE} · European Respiratory Society (ERS), Netherlands · September 2015`,
  },
  {
    title: "Advanced Interventional Pulmonology & Critical Care Training",
    sub: "December 2013 – March 2016",
  },
  {
    title: "Observership in Interventional Pulmonology",
    sub: "Cleveland Clinic, Cleveland, Ohio, USA · April 2016",
  },
];

export const REGISTRATIONS = [
  {
    title: "MBBS Registration",
    sub: `Rajasthan Medical Council · Reg. No. ${APC_REGISTRATION} · 15-03-2005 · ${APC_REGISTRATION_VALIDITY}`,
  },
  {
    title: "MD (Pulmonary Medicine)",
    sub: "Additional Qualification Reg. No. 14786 · 27-06-2016",
  },
  {
    title: "DNB (Critical Care Medicine)",
    sub: "Additional Qualification Reg. No. 15791 · 16-03-2017",
  },
];

export const CERTIFICATIONS = [
  { title: "Advanced Trauma Life Support (ATLS)", year: "2012" },
  { title: "International Trauma Life Support (ITLS)", year: "2012" },
  { title: "Advanced Cardiac Life Support (ACLS)", year: "2011" },
  { title: "Winfocus Emergency Ultrasound Course", year: "2011" },
];

export const AWARDS = [
  {
    title: "Dr. Kalicharan Mathur Best Paper Award",
    sub: "Gold medal · 8th NCCP RajPulmocon · 2008",
  },
  {
    title: "Sepsis Quiz — 2nd Position",
    sub: "Sepsis Conference, New Delhi · 2011",
  },
  {
    title: "Interesting Cases in EBUS — First Prize",
    sub: "EUS/EBUS Conference, Noida · 2016",
  },
];

export const PREVIOUS = [
  "Apollo Hospitals, Bengaluru",
  "Fortis Escorts Hospitals, Amritsar, Punjab",
  "Fortis Escorts Heart Institute, Okhla, New Delhi",
  "Sir Ganga Ram Hospitals, New Delhi",
  "BLK Superspeciality Hospital, New Delhi",
  "PBM Group of Hospitals, Bikaner, Rajasthan",
];

export const PUBLICATIONS = [
  {
    title:
      "An innovative solution for prolonged air leaks: The customized endobronchial silicone blocker",
    authors:
      "Abhinav Singla, Rakesh Godara, Chakravarthi Lokanath, Suvarna Salankay, Ravindra Mehta",
    journal: "European Respiratory Journal, 2017; 50: PA3786",
    doi: "10.1183/1393003.congress-2017.PA3786",
    href: "https://doi.org/10.1183/1393003.congress-2017.PA3786",
  },
  {
    title:
      "An innovative strategy for the emergent management of massive hemoptysis: The customized Endobronchial Silicone Blocker (CESB)",
    authors: "Rakesh Godara, Rajani S Bhat, Abhinav Singla, Suvarna B G, Ravindra M Mehta",
    journal: "American Journal of Respiratory and Critical Care Medicine, 2017; 195: A1648",
  },
];

export const ACADEMIC_STATS = [
  { value: "90+", label: "Conference & CME engagements", sub: "2016 – 2026" },
  { value: "40+", label: "Invited faculty roles", sub: "National & international" },
  { value: "60", label: "Lectures & talks delivered", sub: "Including panel discussions" },
];

export const CLINIC_FACILITIES = [
  {
    title: "Pulmonary Function Test (PFT)",
    items: [
      "Total Lung Volumes (TLC) & Diffusion capacity (DLCO)",
      "Impulse oscillometry (IOT / FOT)",
      "Spirometry",
    ],
  },
  { title: "FeNO Test", items: [] },
  { title: "Allergy test (SPT) and Immunotherapy (SLIT)", items: [] },
  { title: "Six-minute walk distance test (6MWDT)", items: [] },
  { title: "Pulmonary rehabilitation", items: [] },
  { title: "Adult vaccinations", items: [] },
  { title: "Polysomnography (Sleep study)", items: [] },
  { title: "Cardio-Pulmonary Exercise Test (CPET)", items: [] },
  { title: "Air travel fitness", items: [] },
  { title: "High altitude fitness", items: [] },
  { title: "Outpatient nebulisation", items: [] },
];

export const ADULT_VACCINATIONS = [
  {
    name: "Influenza",
    dosage: "1 Dose (IM), every year",
  },
  {
    name: "Shingles (Herpes Zoster)",
    dosage: "2 Doses (IM), 2–6 months apart (for adults 50 years or older)",
  },
  {
    name: "Tdap",
    dosage: "1 Dose (IM), every 10 years",
  },
  {
    name: "Pneumococcal",
    dosage: "1 Dose PCV13 (IM) followed by 1 Dose PPSV23 (IM) 1 year later — or 1 Dose PCV20 (IM)",
  },
];

/** Placeholder symptoms pending final wording from Dr. Godara — clinically aligned with clinic services. */
export const SYMPTOMS = [
  "Persistent or worsening cough",
  "Shortness of breath or breathlessness on exertion",
  "Wheezing or noisy breathing",
  "Chest tightness or chest pain related to breathing",
  "Coughing up blood (hemoptysis)",
  "Recurrent chest infections or pneumonia",
  "Loud snoring with daytime sleepiness",
  "Unexplained weight loss with respiratory symptoms",
];

export const PATIENT_PREP = [
  "Bring all previous medical reports, discharge summaries and imaging CDs (X-ray, CT, PET).",
  "Carry current and past prescriptions, inhalers and any medication lists.",
  "Bring recent blood tests, sputum reports and pulmonary function results, if available.",
  "Note your main symptoms, when they started, and what makes them better or worse.",
  "If you have sleep concerns, note snoring, witnessed apnoeas and daytime sleepiness.",
  "Arrive 10–15 minutes early for registration and basic vitals.",
];
