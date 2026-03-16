import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { t } from "@/lib/translations";

const i18n = t();

export function PublicHeader() {
  return (
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
  );
}
