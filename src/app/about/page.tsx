import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { t } from "@/lib/translations";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "menudan.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const i18n = t();

const pg = i18n.aboutPage;

export const metadata: Metadata = {
  title: `${pg.metaTitle} | ${APP_NAME}`,
  description: pg.metaDescription,
  alternates: { canonical: `${APP_URL}/about` },
  openGraph: {
    title: pg.metaTitle,
    description: pg.metaDescription,
    url: `${APP_URL}/about`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: pg.metaTitle,
  description: pg.metaDescription,
  url: `${APP_URL}/about`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: pg.breadcrumbHome, item: APP_URL },
      { "@type": "ListItem", position: 2, name: pg.title, item: `${APP_URL}/about` },
    ],
  },
};

const valueIcons = [
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
];

const valueColors = [
  "from-amber-500 to-amber-600",
  "from-violet-500 to-violet-600",
  "from-teal-500 to-teal-600",
];

export default function AboutPage() {
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
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-linear-to-br from-indigo-100 to-violet-100 opacity-50 blur-3xl" />
            <div className="absolute -bottom-20 -left-40 h-100 w-100 rounded-full bg-linear-to-br from-teal-100 to-cyan-100 opacity-40 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {pg.heading}
            </h1>
            <div className="mt-8 space-y-5">
              {pg.paragraphs.map((p, idx) => (
                <p key={idx} className="text-base leading-relaxed text-gray-600">
                  {p.replace(/\{appName\}/g, APP_NAME)}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-gray-100 py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {pg.valuesTitle}
            </h2>
            <div className="mt-10 space-y-8">
              {pg.values.map((value, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${valueColors[idx]} shadow-sm`}>
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={valueIcons[idx]} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{value.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-100 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 px-8 py-16 shadow-2xl shadow-indigo-500/25 sm:px-16">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
              </div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">{i18n.landing.cta.title}</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">{i18n.landing.cta.subtitle.replace('{appName}', APP_NAME)}</p>
                <Link href="/register" className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 text-base font-medium text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl">{i18n.landing.cta.button}</Link>
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
