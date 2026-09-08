import type { CSSProperties } from "react";
import lungs from "@/assets/hero-icons/lungs.png";
import stethoscope from "@/assets/hero-icons/stethoscope.png";
import pill from "@/assets/hero-icons/pill.png";
import syringe from "@/assets/hero-icons/syringe.png";
import microscope from "@/assets/hero-icons/microscope.png";
import virus from "@/assets/hero-icons/virus.png";
import pulse from "@/assets/hero-icons/pulse.png";
import medicalBag from "@/assets/hero-icons/medical-bag.png";
import ambulance from "@/assets/hero-icons/ambulance.png";
import sleep from "@/assets/hero-icons/sleep.png";

type Drift = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  x3: string;
  y3: string;
  r0: string;
  r1: string;
  r2: string;
  r3: string;
};

type FloatingIcon = {
  src: string;
  top: string;
  left: string;
  size: number;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  drift: Drift;
  /** Hide on small screens to keep hero readable */
  hideOnMobile?: boolean;
};

/** Soft depth blur in the 0.3–0.4rem range */
const b = (n: number) => n * 1;
const o = (n: number) => n * 0.8;

/**
 * Diagonal drifts — each path mixes X + Y so motion is not axis-locked.
 * Sizes kept smaller; denser scatter around the hero edges + mid gaps.
 */
const ICONS: FloatingIcon[] = [
  {
    src: syringe,
    top: "7%",
    left: "2%",
    size: 30,
    opacity: o(0.78),
    blur: b(0.34),
    duration: 19,
    delay: 0,
    drift: {
      x1: "22px",
      y1: "-28px",
      x2: "-16px",
      y2: "-14px",
      x3: "12px",
      y3: "18px",
      r0: "-16deg",
      r1: "-4deg",
      r2: "-22deg",
      r3: "-10deg",
    },
  },

  {
    src: stethoscope,
    top: "12%",
    left: "86%",
    size: 48,
    opacity: o(0.72),
    blur: b(0.38),
    duration: 22,
    delay: 1.2,
    drift: {
      x1: "-26px",
      y1: "18px",
      x2: "14px",
      y2: "30px",
      x3: "-10px",
      y3: "-22px",
      r0: "18deg",
      r1: "28deg",
      r2: "8deg",
      r3: "22deg",
    },
  },

  {
    src: lungs,
    top: "70%",
    left: "84%",
    size: 40,
    opacity: o(0.68),
    blur: b(0.36),
    duration: 21,
    delay: 2.4,
    drift: {
      x1: "-20px",
      y1: "-24px",
      x2: "16px",
      y2: "-16px",
      x3: "-22px",
      y3: "14px",
      r0: "-28deg",
      r1: "-14deg",
      r2: "-38deg",
      r3: "-20deg",
    },
    hideOnMobile: true,
  },

  {
    src: microscope,
    top: "40%",
    left: "92%",
    size: 42,
    opacity: o(0.62),
    blur: b(0.4),
    duration: 24,
    delay: 0.9,
    drift: {
      x1: "-14px",
      y1: "26px",
      x2: "-30px",
      y2: "6px",
      x3: "12px",
      y3: "-18px",
      r0: "8deg",
      r1: "-6deg",
      r2: "16deg",
      r3: "2deg",
    },
    hideOnMobile: true,
  },

  {
    src: virus,
    top: "78%",
    left: "36%",
    size: 38,
    opacity: o(0.7),
    blur: b(0.33),
    duration: 17,
    delay: 1.8,
    drift: {
      x1: "28px",
      y1: "-18px",
      x2: "-12px",
      y2: "-28px",
      x3: "18px",
      y3: "16px",
      r0: "0deg",
      r1: "18deg",
      r2: "-12deg",
      r3: "8deg",
    },
  },

  {
    src: pulse,
    top: "48%",
    left: "5%", // moved from 22% to keep it away from text
    size: 26,
    opacity: o(0.48),
    blur: b(0.35),
    duration: 14,
    delay: 3.4,
    drift: {
      x1: "16px",
      y1: "-18px",
      x2: "-12px",
      y2: "-8px",
      x3: "20px",
      y3: "12px",
      r0: "-12deg",
      r1: "4deg",
      r2: "-20deg",
      r3: "-2deg",
    },
    hideOnMobile: true,
  },

  {
    src: ambulance,
    top: "88%",
    left: "14%",
    size: 42,
    opacity: o(0.58),
    blur: b(0.39),
    duration: 26,
    delay: 0.4,
    drift: {
      x1: "16px",
      y1: "-22px",
      x2: "-22px",
      y2: "-10px",
      x3: "26px",
      y3: "8px",
      r0: "-6deg",
      r1: "10deg",
      r2: "-14deg",
      r3: "4deg",
    },
    hideOnMobile: true,
  },

  {
    src: microscope,
    top: "90%",
    left: "42%",
    size: 28,
    opacity: o(0.45),
    blur: b(0.34),
    duration: 19,
    delay: 2.9,
    drift: {
      x1: "-14px",
      y1: "-12px",
      x2: "18px",
      y2: "10px",
      x3: "-8px",
      y3: "16px",
      r0: "-18deg",
      r1: "-4deg",
      r2: "-26deg",
      r3: "-10deg",
    },
    hideOnMobile: true,
  },
];

export function HeroFloatingIcons() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {ICONS.map((icon, i) => (
        <span
          key={`${icon.src}-${i}`}
          className={`hero-float-icon absolute will-change-transform ${
            icon.hideOnMobile ? "hidden md:block" : "block"
          }`}
          style={
            {
              top: icon.top,
              left: icon.left,
              width: icon.size,
              height: icon.size,
              opacity: icon.opacity,
              filter: icon.blur > 0 ? `blur(${icon.blur}px)` : undefined,
              animationDuration: `${icon.duration}s`,
              animationDelay: `${icon.delay}s`,
              "--fx1": icon.drift.x1,
              "--fy1": icon.drift.y1,
              "--fx2": icon.drift.x2,
              "--fy2": icon.drift.y2,
              "--fx3": icon.drift.x3,
              "--fy3": icon.drift.y3,
              "--fr0": icon.drift.r0,
              "--fr1": icon.drift.r1,
              "--fr2": icon.drift.r2,
              "--fr3": icon.drift.r3,
            } as CSSProperties
          }
        >
          <img
            src={icon.src}
            alt=""
            width={icon.size}
            height={icon.size}
            draggable={false}
            className="h-full w-full select-none object-contain drop-shadow-[0_8px_18px_rgba(10,30,54,0.18)]"
          />
        </span>
      ))}
    </div>
  );
}
