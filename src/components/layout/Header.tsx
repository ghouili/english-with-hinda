import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const NAV_ITEMS = [
  { label: "Accueil", to: "/" },
  { label: "Livres", to: "/livres" },
  { label: "Ressources", to: "/ressources" },
  { label: "Blog", to: "/blog" },
  { label: "Où acheter", to: "/ou-acheter" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
          <BookOpen className="h-6 w-6" />
          <span>English With Hinda</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-accent"
              activeClassName="text-foreground bg-accent"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-background px-4 pb-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="block px-3 py-3 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-accent"
              activeClassName="text-foreground bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
