import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import WahtsAppIcon from "../../assets/icons/whatsappicon.png";
import WahtsAppIconwhite from "../../assets/icons/whatsappiconwhite.png";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Books", to: "/books" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

const GRADE_CHIP_CLASSES: Record<Grade, string> = {
  4: "bg-grade-4/65 text-grade-4-foreground hover:bg-grade-4/95",
  5: "bg-grade-5/65 text-grade-5-foreground hover:bg-grade-5/95",
  6: "bg-grade-6/65 text-grade-6-foreground hover:bg-grade-6/95",
  7: "bg-grade-7/65 text-grade-7-foreground hover:bg-grade-7/95",
  8: "bg-grade-8/65 text-grade-8-foreground hover:bg-grade-8/95",
  9: "bg-grade-9/65 text-grade-9-foreground hover:bg-grade-9/95",
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
          <Link
            to="/"
            className="flex items-center gap-2 font-serif text-lg font-bold text-primary sm:text-xl h-full"
          >
            {/* <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>English With Hinda</span> */}
            <img
              src="/logo.png"
              alt="English With Hinda"
              className="h-full w-auto"
              srcSet=""
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="px-3 py-2 text-base font-medium text-foreground/80 rounded-md transition-colors hover:text-foreground hover:bg-accent"
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
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Sticky mini-bar on scroll */}
      {scrolled && (
        <div className="hidden md:block border-b bg-muted/50">
          <div className="container flex h-10 items-center justify-between">
            <div className="flex items-center gap-2">
              {GRADES.map((g) => (
                <Link
                  key={g}
                  to={`/books/${GRADE_CONFIG[g].slug}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${GRADE_CHIP_CLASSES[g]}`}
                >
                  {GRADE_CONFIG[g].label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="h-7 text-sm group"
              >
                <a
                  href="https://wa.me/21692053416"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <MessageCircle className="mr-1 h-3 w-3" />  */}
                  <img src={WahtsAppIconwhite} alt="WhatsApp" className="h-4 w-4 group-hover:hidden block" />
                  <img src={WahtsAppIcon} alt="WhatsApp" className="h-4 w-4 group-hover:block hidden" />
                  <p className="text-primary-foreground group-hover:text-[#45BB76]">WhatsApp</p>
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-background px-4 pb-4">
          {/* Grade quick-links */}
          <div className="flex gap-2 flex-wrap py-3 border-b mb-2">
            {GRADES.map((g) => (
              <Link
                key={g}
                to={`/books/${GRADE_CONFIG[g].slug}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${GRADE_CHIP_CLASSES[g]}`}
              >
                {GRADE_CONFIG[g].label}
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
        </nav>
      )}
    </header>
  );
}
