import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export const OTHER_CONCERN = "Other (please specify)";

const CONCERNS = [
  "General chest / lung consultation",
  "Asthma, COPD or breathlessness review",
  "Sleep apnoea and sleep medicine consultation",
  "Chronic cough, allergy or bronchiectasis review",
  "Severe asthma / biologic therapy review",
  "Interventional pulmonology / EBUS opinion",
  "Pulmonary rehabilitation or post-ICU follow-up",
  OTHER_CONCERN,
];

// Clinic hours: Mon–Sat 6:00 PM – 8:00 PM (30-min slots)
const WEEKDAY_SLOTS = [
  "6:00 PM - 6:30 PM",
  "6:30 PM - 7:00 PM",
  "7:00 PM - 7:30 PM",
  "7:30 PM - 8:00 PM",
];
const SUNDAY_SLOTS: string[] = [];

const WA_NUMBER = "919928683032";

const schema = z
  .object({
    concern: z.string().min(1, "Please select a medical concern"),
    concernOther: z.string().trim().max(120, "Please keep under 120 characters").optional(),
    date: z.string().min(1, "Please choose a date"),
    slot: z.string().min(1, "Please pick a time slot"),
    name: z.string().trim().min(2, "Full name is required").max(80, "Name is too long"),
    age: z.coerce
      .number({ invalid_type_error: "Age is required" })
      .int("Enter a whole number")
      .min(0, "Enter a valid age")
      .max(120, "Enter a valid age"),
    mobile: z
      .string()
      .trim()
      .regex(/^(?:\+?91[-\s]?)?[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
    symptoms: z.string().trim().max(500, "Please keep under 500 characters").optional(),
  })
  .superRefine((values, ctx) => {
    if (values.concern === OTHER_CONCERN && (values.concernOther ?? "").length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["concernOther"],
        message: "Please describe your medical condition",
      });
    }
  });

export type BookingValues = z.infer<typeof schema>;

function nextDays(count = 7) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function fmtDay(d: Date) {
  return {
    key: d.toISOString().slice(0, 10),
    dow: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    day: d.getDate(),
    mon: d.toLocaleDateString("en-US", { month: "short" }),
    isSun: d.getDay() === 0,
    long: d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
}

export function BookingForm({ onDone }: { onDone?: () => void }) {
  const [mode, setMode] = useState<"interactive" | "whatsapp">("interactive");
  const days = useMemo(() => nextDays(7), []);

  const defaultDate = useMemo(() => {
    const firstAvailable = days.find((d) => d.getDay() !== 0);
    return firstAvailable
      ? firstAvailable.toISOString().slice(0, 10)
      : days[0].toISOString().slice(0, 10);
  }, [days]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      concern: "",
      concernOther: "",
      date: defaultDate,
      slot: "",
      name: "",
      age: undefined,
      mobile: "",
      symptoms: "",
    },
  });

  const concern = watch("concern");
  const isOtherConcern = concern === OTHER_CONCERN;
  const dateVal = watch("date");
  const slot = watch("slot");

  const currentDay = days.find((d) => d.toISOString().slice(0, 10) === dateVal) ?? days[1];
  const slots = currentDay.getDay() === 0 ? SUNDAY_SLOTS : WEEKDAY_SLOTS;

  const onSubmit = (v: BookingValues) => {
    const day = fmtDay(currentDay);
    const concernText =
      v.concern === OTHER_CONCERN ? `Other - ${v.concernOther?.trim()}` : v.concern;
    const msg =
      `Hello Dr. Godara's team,%0A%0AI'd like to book an OPD consultation at *Advance Pulmo Care*.%0A%0A` +
      `*Name:* ${encodeURIComponent(v.name)}%0A` +
      `*Age:* ${encodeURIComponent(String(v.age))}%0A` +
      `*Mobile:* ${encodeURIComponent(v.mobile)}%0A` +
      `*Concern:* ${encodeURIComponent(concernText)}%0A` +
      `*Preferred Date:* ${encodeURIComponent(day.long)}%0A` +
      `*Preferred Slot:* ${encodeURIComponent(v.slot)}%0A` +
      (v.symptoms ? `*Notes:* ${encodeURIComponent(v.symptoms)}%0A` : "") +
      `%0AThank you.`;
    const url = `https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${msg}&type=phone_number`;

    toast.success("Booking request captured", {
      description: "We'll confirm your slot on WhatsApp shortly.",
    });
    window.open(url, "_blank", "noopener");
    reset({
      ...v,
      name: "",
      age: undefined,
      mobile: "",
      symptoms: "",
      slot: "",
      concernOther: "",
    });
    onDone?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          OPD Booking Channel
        </div>
        <div className="flex rounded-full bg-muted p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode("interactive")}
            className={`rounded-full px-3 py-1.5 transition ${
              mode === "interactive"
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground"
            }`}
          >
            Interactive
          </button>
          <button
            type="button"
            onClick={() => setMode("whatsapp")}
            className={`rounded-full px-3 py-1.5 transition ${
              mode === "whatsapp"
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground"
            }`}
          >
            WhatsApp
          </button>
        </div>
      </div>

      {mode === "whatsapp" ? (
        <div className="rounded-2xl border border-border bg-muted/50 p-6 text-center">
          <MessageCircle className="mx-auto h-8 w-8 text-support" />
          <p className="mt-3 text-sm text-muted-foreground">
            Chat directly with our coordinator on WhatsApp — we usually respond within 15 minutes
            during clinic hours.
          </p>
          <a
            href={`https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Advance%20Pulmo%20Care.&type=phone_number`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-support px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            style={{ backgroundColor: "oklch(0.65 0.16 155)" }}
          >
            <MessageCircle className="h-4 w-4" /> Open WhatsApp
          </a>
        </div>
      ) : (
        <>
          {/* 1. Select Medical Concern */}
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
              1. Select Medical Concern <span className="text-destructive">*</span>
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CONCERNS.map((c) => {
                const active = concern === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setValue("concern", c, { shouldValidate: true });
                      if (c !== OTHER_CONCERN) {
                        setValue("concernOther", "", { shouldValidate: false });
                      }
                    }}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                      active
                        ? "border-[#0066cc] bg-blue-50/40 text-[#004b93] font-semibold shadow-sm"
                        : "border-border bg-card text-foreground hover:border-[#0066cc]/40"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            {errors.concern && (
              <p className="mt-1.5 text-xs text-destructive">{errors.concern.message}</p>
            )}

            {isOtherConcern && (
              <div className="mt-3 rounded-xl border border-[#0066cc]/30 bg-blue-50/30 p-3">
                <label
                  htmlFor="concernOther"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground"
                >
                  Please specify your medical condition <span className="text-destructive">*</span>
                </label>
                <input
                  id="concernOther"
                  {...register("concernOther")}
                  autoFocus
                  placeholder="e.g. Recurrent chest infection after tuberculosis treatment"
                  className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
                {errors.concernOther && (
                  <p className="mt-1 text-xs text-destructive">{errors.concernOther.message}</p>
                )}
              </div>
            )}
          </fieldset>

          {/* 2. Choose Preferred Date */}
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
              2. Choose Preferred Date <span className="text-destructive">*</span>
            </legend>
            <div className="grid grid-cols-7 gap-1.5">
              {days.map((d) => {
                const f = fmtDay(d);
                const active = dateVal === f.key;
                if (f.isSun) {
                  return (
                    <div
                      key={f.key}
                      className="flex flex-col items-center gap-0.5 rounded-xl border border-dashed border-border bg-muted/40 py-2 text-center text-muted-foreground/50 opacity-60 select-none cursor-not-allowed"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider">
                        {f.dow}
                      </span>
                      <span className="font-display text-lg font-semibold leading-none text-muted-foreground/75">
                        {f.day}
                      </span>
                      <span className="text-[9px] uppercase text-destructive/80 font-semibold tracking-wide">
                        Closed
                      </span>
                    </div>
                  );
                }
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => {
                      setValue("date", f.key, { shouldValidate: true });
                      setValue("slot", "");
                    }}
                    className={`flex flex-col items-center gap-0.5 rounded-xl border py-2 text-center transition ${
                      active
                        ? "border-[#0a1e36] bg-[#0a1e36] text-white shadow-soft"
                        : "border-border bg-card text-foreground hover:border-primary/45"
                    }`}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
                      {f.dow}
                    </span>
                    <span className="font-display text-lg font-semibold leading-none">{f.day}</span>
                    <span className="text-[10px] uppercase opacity-70">{f.mon}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 3. Pick Time Slot */}
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
              3. Pick Time Slot <span className="text-destructive">*</span>
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-muted-foreground">
                <Clock className="h-3 w-3" />
                Mon–Sat 6:00 PM – 8:00 PM
              </span>
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {slots.map((s) => {
                const active = slot === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setValue("slot", s, { shouldValidate: true })}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-sm transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-border bg-card text-foreground hover:border-[#0066cc]/40"
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" /> {s}
                  </button>
                );
              })}
            </div>
            {errors.slot && (
              <p className="mt-1.5 text-xs text-destructive">{errors.slot.message}</p>
            )}
          </fieldset>

          {/* 4. Full Name + Age + Mobile Number */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register("name")}
                  placeholder="e.g. Siddharth Sharma"
                  className="w-full rounded-xl border border-border bg-card px-9 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                Age <span className="text-destructive">*</span>
              </label>
              <input
                {...register("age")}
                type="number"
                inputMode="numeric"
                min={0}
                max={120}
                placeholder="e.g. 42"
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
              {errors.age && <p className="mt-1 text-xs text-destructive">{errors.age.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                Mobile Number <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register("mobile")}
                  inputMode="tel"
                  placeholder="e.g. +91 98765 43210"
                  className="w-full rounded-xl border border-border bg-card px-9 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              {errors.mobile && (
                <p className="mt-1 text-xs text-destructive">{errors.mobile.message}</p>
              )}
            </div>
          </div>

          {/* 5. Symptoms */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
              Brief Symptoms / Previous History (optional)
            </label>
            <textarea
              {...register("symptoms")}
              rows={3}
              placeholder="e.g. Chronic cough for 3 weeks, breathlessness while climbing stairs"
              className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
            {errors.symptoms && (
              <p className="mt-1 text-xs text-destructive">{errors.symptoms.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0a1e36] px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-[#051120] hover:-translate-y-0.5 disabled:opacity-60"
          >
            <CalendarIcon className="h-4 w-4" />
            Register Consultation Booking
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-center text-[11px] text-muted-foreground">
            🔒 Your information is encrypted and will be used only for appointment coordination.{" "}
            <br />
            Please avoid submitting emergency or highly sensitive medical information through this
            form.
          </p>
        </>
      )}
    </form>
  );
}
