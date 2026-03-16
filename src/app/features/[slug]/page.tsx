import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { t } from "@/lib/translations";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "menudan.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const i18n = t();

const pg = i18n.featuresPage;

function getFeature(slug: string) {
  return pg.items.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return pg.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};

  return {
    title: `${feature.metaTitle} | ${APP_NAME}`,
    description: feature.metaDescription,
    alternates: { canonical: `${APP_URL}/features/${slug}` },
    openGraph: {
      title: feature.metaTitle,
      description: feature.metaDescription,
      url: `${APP_URL}/features/${slug}`,
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: feature.metaTitle,
    description: feature.metaDescription,
    url: `${APP_URL}/features/${slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: pg.breadcrumbHome, item: APP_URL },
        { "@type": "ListItem", position: 2, name: pg.breadcrumbFeatures, item: `${APP_URL}/features` },
        { "@type": "ListItem", position: 3, name: feature.name, item: `${APP_URL}/features/${slug}` },
      ],
    },
  };

  // Find other features for the "more features" section
  const otherFeatures = pg.items.filter((item) => item.slug !== slug);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-indigo-100/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-gray-900">
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            <Link
              href="/features"
              className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
            >
              {i18n.landing.nav.features}
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
            >
              {i18n.landing.nav.pricing}
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
            >
              {i18n.landing.nav.blog}
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
            >
              {i18n.landing.nav.login}
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:brightness-110"
            >
              {i18n.landing.nav.getStarted}
            </Link>
          </nav>
          <div className="flex items-center gap-3 sm:hidden">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-indigo-600"
            >
              {i18n.landing.nav.login}
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-3 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/25"
            >
              {i18n.landing.nav.getStarted}
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-4xl px-6 pt-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-600">
              {pg.breadcrumbHome}
            </Link>
            <span>/</span>
            <Link href="/features" className="hover:text-gray-600">
              {pg.breadcrumbFeatures}
            </Link>
            <span>/</span>
            <span className="text-gray-600">{feature.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-12 sm:pt-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-linear-to-br from-indigo-100 to-violet-100 opacity-50 blur-3xl" />
            <div className="absolute -bottom-20 -left-40 h-100 w-100 rounded-full bg-linear-to-br from-teal-100 to-cyan-100 opacity-40 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {feature.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              {feature.heroSubtitle}
            </p>
            <div className="mt-8">
              <Link
                href="/register"
                className="inline-block rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110"
              >
                {pg.cta.button}
              </Link>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {feature.sections.map((section, idx) => (
          <section
            key={idx}
            className={`py-16 ${idx % 2 === 0 ? "bg-gray-50/50" : ""}`}
          >
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {section.title}
              </h2>
              <ul className="mt-8 space-y-4">
                {section.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-3 text-base leading-relaxed text-gray-600"
                  >
                    <svg
                      className="mt-1 h-5 w-5 shrink-0 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* Other Features */}
        <section className="border-t border-gray-100 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              {pg.breadcrumbFeatures}
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherFeatures.map((other) => (
                <Link
                  key={other.slug}
                  href={`/features/${other.slug}`}
                  className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-500/5"
                >
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {other.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                    {other.shortDescription}
                  </p>
                </Link>
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
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  {pg.cta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
                  {pg.cta.subtitle}
                </p>
                <Link
                  href="/register"
                  className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 text-base font-medium text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
                >
                  {pg.cta.button}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link href="/" className="text-sm font-bold">
              <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link href="/features" className="hover:text-gray-700">
                {i18n.landing.nav.features}
              </Link>
              <Link href="/pricing" className="hover:text-gray-700">
                {i18n.landing.nav.pricing}
              </Link>
              <Link href="/blog" className="hover:text-gray-700">
                {i18n.landing.footer.blog}
              </Link>
              <Link href="/privacy" className="hover:text-gray-700">
                {i18n.landing.footer.privacy}
              </Link>
              <span>&copy; {new Date().getFullYear()} {APP_NAME}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
