import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode; center?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}
