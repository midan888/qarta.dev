import Link from "next/link";
import { t } from "@/lib/translations";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "menudan.com";
const i18n = t();

export function BlogFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm font-bold">
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </p>
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
  );
}
