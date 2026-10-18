"use client";

import Link from "next/link";
import { Component, useState, useEffect, type ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/logo";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/teams", label: "Teams" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/contact", label: "Contact" },
];

// Error boundary so auth failures don't crash the entire navbar
class AuthErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function DefaultAuthButtons() {
  return (
    <Link
      href="/apply"
      className="btn-glow-sm inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13px] text-black font-semibold"
    >
      Apply Now
    </Link>
  );
}

function AuthButtons() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";
  const dashboardHref = isAdmin ? "/admin/dashboard" : "/dashboard";

  if (isLoggedIn) {
    return (
      <>
        <Link
          href={dashboardHref}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/10"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          Dashboard
        </Link>
        <span className="text-xs text-white/40 truncate max-w-[100px]">
          {session.user?.name || session.user?.email}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-white/70 hover:text-white hover:bg-white/10 border-0"
          onClick={() => { posthog.capture("user_signed_out"); signOut({ callbackUrl: "/" }); }}
        >
          <LogOut className="mr-1.5 h-3.5 w-3.5" />
          Sign Out
        </Button>
      </>
    );
  }

  return <DefaultAuthButtons />;
}

function MobileAuthButtons({ onClose }: { onClose: () => void }) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";
  const dashboardHref = isAdmin ? "/admin/dashboard" : "/dashboard";

  if (isLoggedIn) {
    return (
      <>
        <Link
          href={dashboardHref}
          onClick={onClose}
          className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/10"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          Dashboard
        </Link>
        <div className="my-2 border-t border-white/10" />
        <p className="px-3 text-xs text-white/40 truncate">
          {session.user?.name || session.user?.email}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-white/70 hover:text-white hover:bg-white/10 border-0"
          onClick={() => {
            posthog.capture("user_signed_out");
            onClose();
            signOut({ callbackUrl: "/" });
          }}
        >
          <LogOut className="mr-1.5 h-3.5 w-3.5" />
          Sign Out
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="my-2 border-t border-white/10" />
      <Link
        href="/apply"
        onClick={onClose}
        className="btn-glow-sm inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13px] text-black font-semibold"
      >
        Apply Now
      </Link>
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto mt-4 mx-4 flex items-center justify-between gap-1 rounded-full border px-2 pl-4 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-black border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
        } h-14 w-full max-w-screen-xl`}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Logo variant="sm" />
        </Link>

        {/* Desktop nav — centered links */}
        <nav className="max-md:hidden items-center gap-0.5 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right — CTA */}
        <div className="max-md:hidden items-center gap-2 md:flex shrink-0">
          <AuthErrorBoundary fallback={<DefaultAuthButtons />}>
            <AuthButtons />
          </AuthErrorBoundary>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-[#111111] border-l-white/10"
          >
            <SheetHeader>
              <SheetTitle className="text-white">
                <Logo variant="sm" />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-white hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <AuthErrorBoundary
                fallback={
                  <>
                    <div className="my-2 border-t border-white/10" />
                    <DefaultAuthButtons />
                  </>
                }
              >
                <MobileAuthButtons onClose={() => setOpen(false)} />
              </AuthErrorBoundary>
            </nav>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
