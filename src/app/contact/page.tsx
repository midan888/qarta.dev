import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { t } from "@/lib/translations";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "menudan.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || `support@${APP_NAME}`;
const i18n = t();

const pg = i18n.contactPage;

export const metadata: Metadata = {
  title: `${pg.metaTitle} | ${APP_NAME}`,
  description: pg.metaDescription,
  alternates: { canonical: `${APP_URL}/contact` },
  openGraph: {
    title: pg.metaTitle,
    description: pg.metaDescription,
    url: `${APP_URL}/contact`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: pg.metaTitle,
  description: pg.metaDescription,
  url: `${APP_URL}/contact`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: pg.breadcrumbHome, item: APP_URL },
      { "@type": "ListItem", position: 2, name: pg.title, item: `${APP_URL}/contact` },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        <section className="relative overflow-hidden pb-20 pt-16 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-linear-to-br from-indigo-100 to-violet-100 opacity-50 blur-3xl" />
            <div className="absolute -bottom-20 -left-40 h-100 w-100 rounded-full bg-linear-to-br from-teal-100 to-cyan-100 opacity-40 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {pg.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {pg.subtitle}
            </p>

            <div className="mt-12 space-y-10">
              {/* Email */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-indigo-600 shadow-sm">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{pg.emailTitle}</h2>
                </div>
                <p className="mt-3 text-sm text-gray-600">{pg.emailDescription}</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:brightness-110"
                >
                  {SUPPORT_EMAIL}
                </a>
                <p className="mt-3 text-xs text-gray-400">{pg.responseTime}</p>
              </div>

              {/* FAQ pointer */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-teal-500 to-teal-600 shadow-sm">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{pg.faqTitle}</h2>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {pg.faqDescription}{" "}
                  <Link href="/pricing" className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-700">
                    {pg.faqLink}
                  </Link>
                  {pg.faqSuffix}
                </p>
              </div>
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
