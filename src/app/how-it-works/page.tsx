import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { t } from "@/lib/translations";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "menudan.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const i18n = t();

const pg = i18n.howItWorksPage;

export const metadata: Metadata = {
  title: `${pg.metaTitle} | ${APP_NAME}`,
  description: pg.metaDescription,
  alternates: { canonical: `${APP_URL}/how-it-works` },
  openGraph: {
    title: pg.metaTitle,
    description: pg.metaDescription,
    url: `${APP_URL}/how-it-works`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: pg.title,
  description: pg.metaDescription,
  url: `${APP_URL}/how-it-works`,
  step: pg.steps.map((step, idx) => ({
    "@type": "HowToStep",
    position: idx + 1,
    name: step.title,
    text: step.description,
  })),
};

const stepIcons = [
  "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z",
  "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-linear-to-br from-indigo-100 to-violet-100 opacity-50 blur-3xl" />
            <div className="absolute -bottom-20 -left-40 h-100 w-100 rounded-full bg-linear-to-br from-teal-100 to-cyan-100 opacity-40 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700">
              {pg.badge}
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {pg.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {pg.subtitle}
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-16">
              {pg.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Connector */}
                  {idx < pg.steps.length - 1 && (
                    <div className="absolute left-6 top-16 hidden h-[calc(100%+16px)] w-0.5 bg-linear-to-b from-indigo-300 to-violet-300 sm:block" />
                  )}
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-md shadow-indigo-500/25">
                      {idx + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {step.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-gray-600">
                        {step.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-3 text-sm text-gray-600">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
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
                <h2 className="text-3xl font-bold text-white sm:text-4xl">{pg.cta.title}</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">{pg.cta.subtitle}</p>
                <Link href="/register" className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 text-base font-medium text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl">{pg.cta.button}</Link>
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
