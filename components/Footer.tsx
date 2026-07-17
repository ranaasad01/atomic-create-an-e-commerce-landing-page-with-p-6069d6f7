"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Camera as Instagram, MessageCircle as Twitter } from 'lucide-react';
import { useTranslations } from "next-intl";
import { APP_NAME } from "@/lib/data";

const shopLinks = [
  { label: "footer.shop.new_arrivals", href: "#products" },
  { label: "footer.shop.best_sellers", href: "#products" },
  { label: "footer.shop.sale", href: "#products" },
  { label: "footer.shop.gifts", href: "#products" },
];

const helpLinks = [
  { label: "footer.help.track", href: "#" },
  { label: "footer.help.returns", href: "#" },
  { label: "footer.help.shipping", href: "#" },
  { label: "footer.help.contact", href: "#" },
];

const companyLinks = [
  { label: "footer.company.about", href: "#" },
  { label: "footer.company.careers", href: "#" },
  { label: "footer.company.press", href: "#" },
  { label: "footer.company.affiliate", href: "#" },
];

const legalLinks = [
  { label: "footer.legal.privacy", href: "#" },
  { label: "footer.legal.terms", href: "#" },
  { label: "footer.legal.cookies", href: "#" },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-[0_0_12px_rgba(233,69,96,0.4)]">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "Rubik, sans-serif" }}>
                {APP_NAME}
              </span>
            </Link>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/novatechstore"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.social.instagram")}
                className="w-9 h-9 rounded-lg bg-[var(--surface-alt)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--primary)] transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/novatechstore"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.social.twitter")}
                className="w-9 h-9 rounded-lg bg-[var(--surface-alt)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--primary)] transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider" style={{ fontFamily: "Rubik, sans-serif" }}>
              {t("footer.shop.heading")}
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider" style={{ fontFamily: "Rubik, sans-serif" }}>
              {t("footer.help.heading")}
            </h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider" style={{ fontFamily: "Rubik, sans-serif" }}>
              {t("footer.company.heading")}
            </h4>
            <ul className="space-y-3 mb-6">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider" style={{ fontFamily: "Rubik, sans-serif" }}>
              {t("footer.legal.heading")}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">{t("footer.copyright")}</p>
          <p className="text-xs text-[var(--muted)]">{t("footer.made_with")}</p>
        </div>
      </div>
    </footer>
  );
}