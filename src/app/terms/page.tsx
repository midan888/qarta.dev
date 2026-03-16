import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { t } from "@/lib/translations";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "menudan.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const i18n = t();

const pg = i18n.termsPage;

export const metadata: Metadata = {
  title: `${pg.metaTitle} | ${APP_NAME}`,
  description: pg.metaDescription,
  alternates: { canonical: `${APP_URL}/terms` },
  openGraph: {
    title: pg.metaTitle,
    description: pg.metaDescription,
    url: `${APP_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-indigo-100/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo href="/" size="lg" />
          <nav className="hidden items-center gap-6 sm:flex">
            <Link href="/features" className="text-sm text-gray-600 transition-colors hover:text-indigo-600">{i18n.landing.nav.features}</Link>
            <Link href="/pricing" className="text-sm text-gray-600 transition-colors hover:text-indigo-600">{i18n.landing.nav.pricing}</Link>
            <Link href="/blog" className="text-sm text-gray-600 transition-colors hover:text-indigo-600">{i18n.landing.nav.blog}</Link>
            <Link href="/login" className="text-sm text-gray-600 transition-colors hover:text-indigo-600">{i18n.landing.nav.login}</Link>
            <Link href="/register" className="rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:brightness-110">{i18n.landing.nav.getStarted}</Link>
          </nav>
          <div className="flex items-center gap-3 sm:hidden">
            <Link href="/login" className="text-sm text-gray-600 hover:text-indigo-600">{i18n.landing.nav.login}</Link>
            <Link href="/register" className="rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-3 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/25">{i18n.landing.nav.getStarted}</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {pg.title}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {pg.lastUpdated} {pg.lastUpdatedDate}
            </p>

            <div className="mt-12 space-y-8">
              {pg.sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {section.content.replace(/\{appName\}/g, APP_NAME)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Logo href="/" size="sm" />
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <Link href="/features" className="hover:text-gray-700">{i18n.landing.nav.features}</Link>
              <Link href="/pricing" className="hover:text-gray-700">{i18n.landing.nav.pricing}</Link>
              <Link href="/themes" className="hover:text-gray-700">{i18n.landing.footer.themes}</Link>
              <Link href="/blog" className="hover:text-gray-700">{i18n.landing.footer.blog}</Link>
              <Link href="/about" className="hover:text-gray-700">{i18n.landing.footer.about}</Link>
              <Link href="/contact" className="hover:text-gray-700">{i18n.landing.footer.contact}</Link>
              <Link href="/privacy" className="hover:text-gray-700">{i18n.landing.footer.privacy}</Link>
              <Link href="/terms" className="hover:text-gray-700">{i18n.landing.footer.terms}</Link>
              <span>&copy; {new Date().getFullYear()} {APP_NAME}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
