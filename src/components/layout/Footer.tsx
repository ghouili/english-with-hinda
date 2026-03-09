import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone } from "lucide-react";

const FOOTER_LINKS = {
  navigation: [
    { label: "Home", to: "/" },
    { label: "Books", to: "/books" },
    { label: "Resources", to: "/resources" },
  ],
  legal: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Cookies", to: "/cookies" },
  ],
  about: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Add Resource", to: "/add-resource" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className=" col-span-2">
            <div className=" flex flex-row items-top gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 font-serif text-lg font-bold"
              >
                {/* <BookOpen className="h-5 w-5" />
              English With Hinda */}
                <img
                  src="/icon.png"
                  alt="English With Hinda"
                  className="h-48 w-auto"
                  srcSet=""
                />
              </Link>
              <div className="mt-4 flex flex-col gap-2 text-sm opacity-80">
                <p className="mt-3 text-[16px] opacity-80">
                  English workbooks designed for Tunisian students from 4th to
                  9th year.
                </p>
                <a
                  href="mailto:contact@learnenglish.com"
                  className="flex items-center gap-2 hover:opacity-100"
                >
                  <Mail className="h-4 w-4" /> contact@learnenglish.com
                </a>
                <a
                  href="tel:+21692053416"
                  className="flex items-center gap-2 hover:opacity-100"
                >
                  <Phone className="h-4 w-4" /> +216 92 053 416
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="">
            <h3 className="font-serif text-base font-bold uppercase tracking-wider opacity-70">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.navigation.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[16px] opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="">
            <h3 className="font-serif text-base font-bold uppercase tracking-wider opacity-70">
              About
            </h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.about.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[16px] opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="">
            <h3 className="font-serif text-base font-bold uppercase tracking-wider opacity-70">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[16px] opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-[16px] opacity-60">
          © {new Date().getFullYear()} English With Hinda. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
