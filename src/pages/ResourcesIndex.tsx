import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";
import { QrCode, ScanLine, BookMarked, PlayCircle, MessageCircle } from "lucide-react";

const NAVY = "#1b2233"; // --foreground, for crisp QR modules on a light card

const STEPS = [
  { key: "one", Icon: BookMarked },
  { key: "two", Icon: ScanLine },
  { key: "three", Icon: PlayCircle },
] as const;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export default function ResourcesIndex() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <Layout>
      <SEOHead
        title={t("resourcesPage.title") + " — English With Henda"}
        description={t("resourcesPage.locked.body")}
      />

      <section className="container max-w-4xl py-16 sm:py-24">
        {/* Hero */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm"
          >
            <QrCode className="h-3.5 w-3.5" /> {t("resourcesPage.locked.badge")}
          </motion.span>

          {/* Animated QR "scan frame" — the page's visual metaphor */}
          <motion.div variants={fadeUp} className="relative mt-8" aria-hidden="true">
            <div className="relative rounded-3xl bg-card p-6 shadow-[0_20px_50px_-20px_rgba(27,34,51,0.35)] ring-1 ring-border/70">
              <div className="relative overflow-hidden rounded-lg">
                <QRCodeSVG value={whatsappUrl()} size={150} level="M" fgColor={NAVY} bgColor="transparent" />
                {!reduce && (
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-primary/0 via-primary/70 to-primary/0"
                    animate={{ y: [0, 110, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
              {/* Viewfinder corner brackets (SVG overlay) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
                className="pointer-events-none absolute inset-2 text-foreground/30"
              >
                <path d="M2 16 V2 H16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path d="M84 2 H98 V16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path d="M98 84 V98 H84" stroke="currentColor" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path d="M16 98 H2 V84" stroke="currentColor" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-balance"
          >
            {t("resourcesPage.locked.headline")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed text-pretty"
          >
            {t("resourcesPage.locked.body")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-[#25D366] text-white shadow-sm hover:bg-[#1eb959]">
              <a href={whatsappUrl(t("whatsapp.message"))} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="me-2 h-5 w-5" /> {t("resourcesPage.locked.whatsappCta")}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">{t("resourcesPage.locked.contactCta")}</Link>
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-3 text-xs text-muted-foreground">
            {t("resourcesPage.locked.ctaHelp")}
          </motion.p>
        </motion.div>

        {/* How it works */}
        <ScrollReveal className="mt-20 sm:mt-28">
          <h2 className="text-center font-serif text-2xl font-bold">
            {t("resourcesPage.locked.steps.title")}
          </h2>
          <ol className="relative mt-10 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {/* Connecting line (desktop) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[18%] top-8 hidden border-t-2 border-dashed border-border sm:block"
            />
            {STEPS.map(({ key, Icon }, i) => (
              <li key={key} className="relative z-10 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm ring-4 ring-background">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-wide text-primary-foreground/60">
                  {i + 1}
                </span>
                <p className="mt-1 max-w-[16rem] text-sm text-muted-foreground leading-relaxed">
                  {t(`resourcesPage.locked.steps.${key}`)}
                </p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </section>
    </Layout>
  );
}
