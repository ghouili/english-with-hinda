import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MessageCircle } from "lucide-react";

const FOOTER_LINKS = {
  navigation: [
    { label: "Home", to: "/" },
    { label: "Books", to: "/books" },
    { label: "Free Resources", to: "/resources" },
    { label: "How to Order", to: "/how-to-order" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Use", to: "/terms" },
    { label: "Cookies", to: "/cookies" },
  ],
  about: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold">
              <BookOpen className="h-5 w-5" />
              English With Hinda
            </Link>
            <p className="mt-3 text-sm opacity-80">
              English textbooks designed for Tunisian students from 4th to 9th year.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm opacity-80">
              <a href="mailto:contact@englishwithhinda.com" className="flex items-center gap-2 hover:opacity-100">
                <Mail className="h-4 w-4" /> contact@englishwithhinda.com
              </a>
              <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-100">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider opacity-70">Navigation</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.navigation.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider opacity-70">About</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.about.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider opacity-70">Legal</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} English With Hinda. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
