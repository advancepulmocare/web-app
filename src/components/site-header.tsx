import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Menu, X } from "lucide-react";
import logoTransparent from "@/assets/logo_transparent.png";

export type NavItem = {
  label: string;
  /** In-page hash (homepage) or absolute path */
  href: string;
  /** DOM id to watch for scroll-spy (homepage sections only) */
  sectionId?: string;
};

type SiteHeaderProps = {
  nav: NavItem[];
  /** Force a nav label as active (e.g. "About" on /about) */
  activeLabel?: string;
  /** Book CTA target */
  bookHref?: string;
};

export function SiteHeader({ nav, activeLabel, bookHref = "/#book" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(activeLabel ?? nav[0]?.label ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (activeLabel) {
      setActive(activeLabel);
      return;
    }
    const sectionNav = nav.filter((n) => n.sectionId);
    if (sectionNav.length === 0) return;

    const compute = () => {
      const line = window.innerHeight * 0.28;
      let current = sectionNav[0]?.label ?? "";
      for (const item of sectionNav) {
        const el = document.getElementById(item.sectionId!);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = item.label;
      }
      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [nav, activeLabel]);

  const linkClass = (label: string) =>
    `font-semibold transition-all ${
      active === label
        ? "text-[15px] text-primary"
        : "text-[14px] text-muted-foreground hover:text-primary"
    }`;

  const renderLink = (n: NavItem, onNavigate?: () => void) => {
    const isRoute = n.href.startsWith("/") && !n.href.startsWith("/#");
    if (isRoute) {
      return (
        <Link
          key={n.href}
          to={n.href as "/" | "/about"}
          onClick={onNavigate}
          className={linkClass(n.label)}
        >
          {n.label}
        </Link>
      );
    }
    return (
      <a key={n.href} href={n.href} onClick={onNavigate} className={linkClass(n.label)}>
        {n.label}
      </a>
    );
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/88 py-3.5 backdrop-blur-xl"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-4 sm:gap-5">
          <img
            src={logoTransparent}
            alt=""
            width={88}
            height={88}
            className="h-16 w-16 shrink-0 object-contain sm:h-[5.5rem] sm:w-[5.5rem]"
          />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-[1.55rem] font-semibold tracking-tight text-foreground sm:text-[1.95rem]">
              Advance Pulmo Care
            </div>
            <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-[15px]">
              Dr. Rakesh Godara
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {nav.map((n) => renderLink(n))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={bookHref}
            className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elevated hover:-translate-y-0.5"
          >
            <Calendar className="h-4 w-4" /> Book Appointment
          </a>
        </div>

        <button
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {nav.map((n) => (
              <div key={n.href} className="rounded-xl px-3 py-2.5">
                {renderLink(n, () => setOpen(false))}
              </div>
            ))}
            <a
              href={bookHref}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Calendar className="h-4 w-4" /> Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
