import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Grade, GRADE_CONFIG } from "@/lib/types";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Books", to: "/books" },
  { label: "Free Resources", to: "/resources" },
  { label: "How to Order", to: "/how-to-order" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

const GRADE_CHIP_CLASSES: Record<Grade, string> = {
  4: "bg-grade-4/15 text-grade-4 hover:bg-grade-4/25",
  5: "bg-grade-5/15 text-grade-5 hover:bg-grade-5/25",
  6: "bg-grade-6/15 text-grade-6 hover:bg-grade-6/25",
  7: "bg-grade-7/15 text-grade-7 hover:bg-grade-7/25",
  8: "bg-grade-8/15 text-grade-8 hover:bg-grade-8/25",
  9: "bg-grade-9/15 text-grade-9 hover:bg-grade-9/25",
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
            <BookOpen className="h-6 w-6" />
            <span className="hidden sm:inline">English With Hinda</span>
            <span className="sm:hidden">EWH</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
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

          <div className="hidden lg:flex items-center">
            <Button asChild size="sm">
              <a href="https://wa.me/21600000000?text=Hello%2C%20I%20would%20like%20to%20order%20a%20book.%20Thank%20you!" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4" /> Order via WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Sticky mini-bar on scroll */}
      {scrolled && (
        <div className="hidden lg:block border-b bg-muted/50">
          <div className="container flex h-10 items-center justify-between">
            <div className="flex items-center gap-2">
              {GRADES.map((g) => (
                <Link
                  key={g}
                  to={`/books/${GRADE_CONFIG[g].slug}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${GRADE_CHIP_CLASSES[g]}`}
                >
                  {GRADE_CONFIG[g].shortLabel}
                </Link>
              ))}
            </div>
            <Button asChild size="sm" variant="default" className="h-7 text-xs">
              <a href="https://wa.me/21600000000?text=Hello%2C%20I%20would%20like%20to%20order%20a%20book.%20Thank%20you!" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1 h-3 w-3" /> Order via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t bg-background px-4 pb-4">
          {/* Grade quick-links */}
          <div className="flex gap-2 flex-wrap py-3 border-b mb-2">
            {GRADES.map((g) => (
              <Link
                key={g}
                to={`/books/${GRADE_CONFIG[g].slug}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${GRADE_CHIP_CLASSES[g]}`}
              >
                {GRADE_CONFIG[g].shortLabel}
              </Link>
            ))}
          </div>
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
          <div className="pt-3 border-t mt-2">
            <Button asChild className="w-full" size="sm">
              <a href="https://wa.me/21600000000?text=Hello%2C%20I%20would%20like%20to%20order%20a%20book.%20Thank%20you!" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4" /> Order via WhatsApp
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
