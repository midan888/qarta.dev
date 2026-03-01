import Link from "next/link";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "MenuForYou";

const features = [
  {
    title: "AI Menu Extraction",
    description:
      "Snap a photo of your paper menu — our AI reads it and creates your digital menu automatically.",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "4 Beautiful Themes",
    description:
      "Classic, Modern, Dark, or Bistro — pick a vibe that matches your restaurant. No design skills needed.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  },
  {
    title: "Instant QR Codes",
    description:
      "Download print-ready QR codes in PNG or SVG. Place them on tables and your guests are one scan away.",
    icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
  },
  {
    title: "Multi-Language",
    description:
      "AI-powered translation into 16 languages. Your international guests read the menu in their own language.",
    icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
  },
  {
    title: "Real-Time Updates",
    description:
      "86 an item or change prices instantly. Your digital menu updates in real time — no reprinting.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Custom Domains",
    description:
      "Use your own domain like menu.yourrestaurant.com with automatic HTTPS. Looks professional, loads fast.",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying it out",
    features: [
      "1 menu",
      "20 item images",
      "1 AI upload",
      "All 4 themes",
      "QR code download",
    ],
    cta: "Get Started Free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For growing restaurants",
    features: [
      "5 menus",
      "200 item images",
      "Unlimited AI uploads",
      "Custom domain",
      "No watermark",
    ],
    cta: "Start with Pro",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$19",
    period: "/month",
    description: "For multi-menu establishments",
    features: [
      "Unlimited menus",
      "Unlimited images",
      "Unlimited AI uploads",
      "Custom domain",
      "Priority support",
    ],
    cta: "Go Business",
    href: "/register",
    highlighted: false,
  },
];

const steps = [
  {
    step: "1",
    title: "Upload your menu",
    description: "Take a photo of your paper menu or enter items manually.",
  },
  {
    step: "2",
    title: "Pick a theme",
    description: "Choose from 4 beautiful designs that match your restaurant.",
  },
  {
    step: "3",
    title: "Share your QR code",
    description: "Download, print, and place on tables. You're live!",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">{APP_NAME}</h1>
          <nav className="hidden items-center gap-6 sm:flex">
            <a
              href="#features"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Pricing
            </a>
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Get Started
            </Link>
          </nav>
          <div className="flex items-center gap-3 sm:hidden">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 text-center sm:pt-28">
        <div className="mx-auto inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-600">
          No credit card required
        </div>
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Your restaurant menu,
          <br />
          <span className="text-gray-400">online in 5 minutes</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
          Upload a photo of your paper menu — AI extracts items automatically.
          Choose a beautiful theme, get a QR code, and you&apos;re live. No
          technical skills required.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="w-full rounded-lg bg-gray-900 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-gray-900/20 hover:bg-gray-800 sm:w-auto"
          >
            Create Your Menu — Free
          </Link>
          <a
            href="#how-it-works"
            className="w-full rounded-lg border border-gray-200 px-8 py-3.5 text-base font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            See How It Works
          </a>
        </div>

        {/* Theme preview mockup */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-xl">
            <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-100 px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <div className="ml-4 h-4 w-48 rounded bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 gap-0 sm:grid-cols-4">
              {/* Classic theme preview */}
              <div className="border-r border-b border-gray-200 p-4 sm:border-b-0">
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#FDFBF7" }}
                >
                  <div className="text-center">
                    <div className="text-[10px] font-bold" style={{ fontFamily: "serif", color: "#2C2420" }}>Classic</div>
                    <div className="mx-auto mt-2 h-1 w-6 rounded" style={{ backgroundColor: "#8B4513" }} />
                    <div className="mt-2 space-y-1.5">
                      <div className="h-1 rounded bg-gray-200" />
                      <div className="mx-auto h-1 w-3/4 rounded bg-gray-200" />
                      <div className="h-1 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Modern theme preview */}
              <div className="border-b border-gray-200 p-4 sm:border-r sm:border-b-0">
                <div className="rounded-lg bg-white p-3">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-gray-900">Modern</div>
                    <div className="mx-auto mt-2 h-1 w-6 rounded bg-gray-900" />
                    <div className="mt-2 space-y-1.5">
                      <div className="h-1 rounded bg-gray-100" />
                      <div className="mx-auto h-1 w-3/4 rounded bg-gray-100" />
                      <div className="h-1 rounded bg-gray-100" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Dark theme preview */}
              <div className="border-r border-gray-200 p-4">
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#0A0A0A" }}
                >
                  <div className="text-center">
                    <div className="text-[10px] font-bold" style={{ color: "#F5F5F5" }}>Dark</div>
                    <div className="mx-auto mt-2 h-1 w-6 rounded" style={{ backgroundColor: "#C8A064" }} />
                    <div className="mt-2 space-y-1.5">
                      <div className="h-1 rounded" style={{ backgroundColor: "#1a1a1a" }} />
                      <div className="mx-auto h-1 w-3/4 rounded" style={{ backgroundColor: "#1a1a1a" }} />
                      <div className="h-1 rounded" style={{ backgroundColor: "#1a1a1a" }} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bistro theme preview */}
              <div className="p-4">
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#F5EDE3" }}
                >
                  <div className="text-center">
                    <div className="text-[10px] font-bold italic" style={{ fontFamily: "serif", color: "#3D2E1E" }}>Bistro</div>
                    <div className="mx-auto mt-2 h-1 w-6 rounded" style={{ backgroundColor: "#B8860B" }} />
                    <div className="mt-2 space-y-1.5">
                      <div className="h-1 rounded" style={{ backgroundColor: "#e8ddd0" }} />
                      <div className="mx-auto h-1 w-3/4 rounded" style={{ backgroundColor: "#e8ddd0" }} />
                      <div className="h-1 rounded" style={{ backgroundColor: "#e8ddd0" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Three steps to go digital
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From paper menu to QR code in minutes, not weeks.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-lg font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-gray-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to go paperless
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features, simple interface. Built for restaurant owners.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start free. Upgrade when you need more.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 bg-white p-8 ${
                  plan.highlighted
                    ? "border-gray-900 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-gray-600"
                    >
                      <svg
                        className="h-4 w-4 shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-medium ${
                    plan.highlighted
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            All plans include all 4 themes, QR code generation, multi-language
            support, and real-time updates.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-100 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to ditch the paper menu?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Join restaurants worldwide that use {APP_NAME} to create beautiful
            digital menus their guests love.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-lg bg-gray-900 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-gray-900/20 hover:bg-gray-800"
          >
            Create Your Menu — Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm font-medium text-gray-900">{APP_NAME}</p>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
