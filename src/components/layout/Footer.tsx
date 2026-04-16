import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    navigation: [
      { label: t("footer.links.home"), to: "/" },
      { label: t("footer.links.books"), to: "/books" },
      { label: t("footer.links.resources"), to: "/resources" },
    ],
    legal: [
      { label: t("footer.links.privacy"), to: "/privacy" },
      { label: t("footer.links.terms"), to: "/terms" },
      { label: t("footer.links.cookies"), to: "/cookies" },
    ],
    about: [
      { label: t("footer.links.about"), to: "/about" },
      { label: t("footer.links.contact"), to: "/contact" },
      { label: t("footer.links.addResource"), to: "/add-resource" },
    ],
  };

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
                <img
                  src="/new-icon.png"
                  alt="English With Henda"
                  className="h-48 w-auto"
                  srcSet=""
                />
              </Link>
              <div className="mt-4 flex flex-col gap-2 text-sm opacity-80">
                <p className="mt-3 text-[16px] opacity-80">
                  {t("footer.description")}
                </p>
                {/* <a
                  href="mailto:contact@learnenglish.com"
                  className="flex items-center gap-2 hover:opacity-100"
                >
                  <Mail className="h-4 w-4" /> contact@learnenglish.com
                </a> */}
                <a
                  href="tel:+21692053416"
                  className="flex items-center gap-2 hover:opacity-100  "
                  
                >
                  <Phone className="h-4 w-4 rtl:flex-row-reverse" /> <span dir="ltr" className="rtl:text-right">+216 92 053 416</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="">
            <h3 className="font-serif text-base font-bold uppercase tracking-wider opacity-70">
              {t("footer.navigation")}
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.navigation.map((l) => (
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
              {t("footer.about")}
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.about.map((l) => (
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
              {t("footer.legal")}
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((l) => (
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
          © {new Date().getFullYear()} English With Henda. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
