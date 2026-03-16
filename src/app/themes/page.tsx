import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { t } from "@/lib/translations";
import { THEMES } from "@/lib/constants";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "menudan.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const i18n = t();

const pg = i18n.themesPage;

export const metadata: Metadata = {
  title: `${pg.metaTitle} | ${APP_NAME}`,
  description: pg.metaDescription,
  alternates: { canonical: `${APP_URL}/themes` },
  openGraph: {
    title: pg.metaTitle,
    description: pg.metaDescription,
    url: `${APP_URL}/themes`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pg.metaTitle,
  description: pg.metaDescription,
  url: `${APP_URL}/themes`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: pg.breadcrumbHome, item: APP_URL },
      { "@type": "ListItem", position: 2, name: pg.breadcrumbThemes, item: `${APP_URL}/themes` },
    ],
  },
};

// Visual styling for each theme card
const themeStyles: {
  bg: string;
  border: string;
  hoverShadow: string;
  hoverBorder: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  barBg: string;
  fontFamily: string;
  nameExtra?: string;
  dotShape?: string;
  decorator?: React.ReactNode;
}[] = [
  // Classic
  {
    bg: "#FDFBF7", border: "border-gray-200", hoverShadow: "hover:shadow-indigo-500/10",
    hoverBorder: "hover:border-indigo-200", accent: "#8B4513", textPrimary: "#2C2420",
    textSecondary: "#6B5E52", barBg: "#e8d9c8", fontFamily: "Georgia, serif",
    decorator: <div className="mt-3 h-0.5 w-full rounded-full" style={{ background: "linear-gradient(to right, transparent, #8B4513, transparent)" }} />,
  },
  // Modern
  {
    bg: "#FFFFFF", border: "border-gray-100", hoverShadow: "hover:shadow-indigo-500/10",
    hoverBorder: "hover:border-indigo-200", accent: "#111827", textPrimary: "#111827",
    textSecondary: "#6B7280", barBg: "#F3F4F6", fontFamily: "system-ui, sans-serif",
    decorator: <div className="mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: "rgba(17,24,39,0.07)" }}><div className="h-1 w-1 rounded-full bg-gray-900" /><div className="h-1 w-6 rounded-full bg-gray-300" /></div>,
  },
  // Dark
  {
    bg: "#0A0A0A", border: "border-gray-800", hoverShadow: "hover:shadow-amber-500/10",
    hoverBorder: "hover:border-amber-700/40", accent: "#C8A064", textPrimary: "#F5F5F5",
    textSecondary: "#9CA3AF", barBg: "#1a1a1a", fontFamily: "Georgia, serif",
    decorator: <div className="mt-3 h-1 w-1 rounded-full" style={{ backgroundColor: "#C8A064", boxShadow: "0 0 6px #C8A064" }} />,
  },
  // Bistro
  {
    bg: "#F5EDE3", border: "border-amber-200/60", hoverShadow: "hover:shadow-amber-500/10",
    hoverBorder: "hover:border-amber-300", accent: "#B8860B", textPrimary: "#3D2E1E",
    textSecondary: "#7A6B5A", barBg: "#ddd0be", fontFamily: "Georgia, serif", nameExtra: "italic",
    decorator: <div className="mt-3 flex items-center gap-1"><div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #B8860B60)" }} /><div className="text-[8px]" style={{ color: "#B8860B" }}>◆</div><div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #B8860B60)" }} /></div>,
  },
  // Nordic
  {
    bg: "#F7F5F2", border: "border-gray-200", hoverShadow: "hover:shadow-emerald-500/10",
    hoverBorder: "hover:border-emerald-200", accent: "#2D6A4F", textPrimary: "#1F2937",
    textSecondary: "#6B7280", barBg: "#E8E5E0", fontFamily: "system-ui, sans-serif",
    dotShape: "rounded-sm",
    decorator: <div className="mt-3 h-0.5 w-8 rounded-full" style={{ backgroundColor: "#2D6A4F" }} />,
  },
  // Neon
  {
    bg: "#07071A", border: "border-[#00FF9430]", hoverShadow: "hover:shadow-green-500/10",
    hoverBorder: "hover:border-[#00FF9460]", accent: "#00FF94", textPrimary: "#00FF94",
    textSecondary: "#4B5563", barBg: "#0d0d25", fontFamily: "system-ui, sans-serif",
    decorator: <div className="mt-3 h-px w-full" style={{ background: "linear-gradient(to right, transparent, #00FF9440, transparent)" }} />,
  },
  // Rustic
  {
    bg: "#2E1F12", border: "border-[#8B3A2A40]", hoverShadow: "hover:shadow-orange-900/20",
    hoverBorder: "hover:border-[#8B3A2A60]", accent: "#8B3A2A", textPrimary: "#F2E8D9",
    textSecondary: "#A09080", barBg: "#3d2a1a", fontFamily: "Georgia, serif",
    decorator: <div className="mt-3 text-[10px]" style={{ color: "#8B3A2A40" }}>01  02  03</div>,
  },
  // Zen
  {
    bg: "#FAF7F2", border: "border-red-100/60", hoverShadow: "hover:shadow-red-500/10",
    hoverBorder: "hover:border-red-200", accent: "#C0392B", textPrimary: "#1F2937",
    textSecondary: "#6B7280", barBg: "#EBE5DC", fontFamily: "Georgia, serif",
    decorator: <div className="mt-3 flex gap-1">{[0,1,2,3,4].map(i => <div key={i} className="h-1 w-1 rounded-full" style={{ backgroundColor: "#C0392B", opacity: i % 2 === 0 ? 0.4 : 0.2, marginTop: i % 2 !== 0 ? 2 : 0 }} />)}</div>,
  },
  // Luxe
  {
    bg: "#0C0C0C", border: "border-[#C9A84C30]", hoverShadow: "hover:shadow-yellow-500/10",
    hoverBorder: "hover:border-[#C9A84C60]", accent: "#C9A84C", textPrimary: "#C9A84C",
    textSecondary: "#6B7280", barBg: "#141414", fontFamily: "Georgia, serif",
    decorator: <div className="mt-3 h-px w-full" style={{ background: "linear-gradient(to right, transparent, #C9A84C50, transparent)" }} />,
  },
  // Vibra
  {
    bg: "#FFFAF5", border: "border-orange-200", hoverShadow: "hover:shadow-orange-500/15",
    hoverBorder: "hover:border-orange-300", accent: "#FF4D2E", textPrimary: "#1F2937",
    textSecondary: "#6B7280", barBg: "#F0EBE3", fontFamily: "system-ui, sans-serif",
    decorator: <div className="mt-3 h-5 w-full rounded-md" style={{ background: "linear-gradient(135deg, #FF4D2E, #FF8C00)" }} />,
  },
];

export default function ThemesPage() {
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

        {/* Theme Grid */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 sm:grid-cols-2">
              {THEMES.map((theme, idx) => {
                const s = themeStyles[idx];
                const extra = pg.themes[idx];
                return (
                  <div
                    key={theme.id}
                    className={`group overflow-hidden rounded-2xl border ${s.border} ${s.hoverShadow} ${s.hoverBorder} transition-all hover:shadow-lg`}
                    style={{ backgroundColor: s.bg }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Theme mini-preview */}
                      <div className="p-6 sm:w-40 sm:shrink-0">
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`h-2.5 w-2.5 ${s.dotShape || "rounded-full"}`}
                            style={{ backgroundColor: s.accent, boxShadow: theme.id === "neon" ? `0 0 6px ${s.accent}` : undefined }}
                          />
                          <span
                            className={`text-sm font-semibold ${s.nameExtra || ""}`}
                            style={{ color: s.textPrimary, fontFamily: s.fontFamily }}
                          >
                            {theme.name}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: s.barBg }} />
                          <div className="h-1.5 rounded-full w-4/5" style={{ backgroundColor: s.barBg }} />
                          <div className="h-1.5 rounded-full w-3/5" style={{ backgroundColor: s.barBg }} />
                        </div>
                        {s.decorator}
                      </div>

                      {/* Theme info */}
                      <div className="flex flex-1 flex-col justify-center border-t px-6 py-5 sm:border-l sm:border-t-0" style={{ borderColor: s.barBg }}>
                        <p className="text-sm" style={{ color: s.textSecondary }}>
                          {theme.description}
                        </p>
                        <p className="mt-2 text-xs" style={{ color: s.textSecondary }}>
                          <span className="font-medium" style={{ color: s.textPrimary }}>{pg.bestFor}</span>{" "}
                          {extra.bestFor}
                        </p>
                        <Link
                          href={`/demo/${theme.id}`}
                          className="mt-4 inline-flex w-fit items-center gap-1 rounded-lg px-4 py-2 text-xs font-medium transition-all hover:brightness-110"
                          style={{
                            backgroundColor: s.accent,
                            color: ["dark", "neon", "rustic", "luxe"].includes(theme.id) ? s.bg : "#FFFFFF",
                            boxShadow: theme.id === "neon" ? `0 0 12px ${s.accent}40` : undefined,
                          }}
                        >
                          {pg.previewButton}
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
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
