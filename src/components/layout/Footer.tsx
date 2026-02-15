import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MessageCircle } from "lucide-react";

const FOOTER_LINKS = {
  navigation: [
    { label: "Accueil", to: "/" },
    { label: "Livres", to: "/livres" },
    { label: "Ressources", to: "/ressources" },
    { label: "Blog", to: "/blog" },
    { label: "Où acheter", to: "/ou-acheter" },
  ],
  legal: [
    { label: "Confidentialité", to: "/confidentialite" },
    { label: "Conditions", to: "/conditions" },
    { label: "Cookies", to: "/cookies" },
  ],
  about: [
    { label: "À propos", to: "/a-propos" },
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
              Des livres d'anglais conçus pour les élèves tunisiens de la 5ème à la 9ème année.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm opacity-80">
              <a href="mailto:contact@englishwithhinda.com" className="flex items-center gap-2 hover:opacity-100">
                <Mail className="h-4 w-4" /> contact@englishwithhinda.com
              </a>
              <a href="tel:+21600000000" className="flex items-center gap-2 hover:opacity-100">
                <Phone className="h-4 w-4" /> +216 00 000 000
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

          {/* À propos */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider opacity-70">À propos</h3>
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
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider opacity-70">Légal</h3>
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
          © {new Date().getFullYear()} English With Hinda. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
