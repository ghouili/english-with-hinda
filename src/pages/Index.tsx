import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { GradeCard } from "@/components/GradeCard";
import { BookCard } from "@/components/BookCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books } from "@/data/books";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BookOpen,
  Download,
  Star,
  CheckCircle,
  StarHalf,
} from "lucide-react";
import cover4th from "@/assets/covers/4th_year.png";
import cover5th from "@/assets/covers/5th_year.png";
import cover6th from "@/assets/covers/6th_year.png";
import cover7th from "@/assets/covers/7th_year.png";
import cover8th from "@/assets/covers/8th_year.png";
import cover9th from "@/assets/covers/9th_year.png";
import Heropic from "@/assets/covers/hero_pic.png";

const HERO_COVERS = [
  { id: "cover-4th", src: cover4th, alt: "4th Year Primary Education" },
  { id: "cover-5th", src: cover5th, alt: "5th Year Primary Education" },
  { id: "cover-6th", src: cover6th, alt: "6th Year Primary Education" },
  { id: "cover-7th", src: cover7th, alt: "7th Year Basic Education" },
  { id: "cover-8th", src: cover8th, alt: "8th Year Basic Education" },
  { id: "cover-9th", src: cover9th, alt: "9th Year Basic Education" },
];

const CARD_STYLES: Record<number, string> = {
  0: "z-30 translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
  1: "z-20 translate-x-16 -translate-y-4 scale-[0.92] rotate-3 opacity-90 shadow-[0_12px_40px_rgba(0,0,0,0.3)]",
  2: "z-10 -translate-x-14 translate-y-3 scale-[0.85] -rotate-3 opacity-75 shadow-[0_8px_24px_rgba(0,0,0,0.2)]",
  3: "z-[5] translate-x-24 translate-y-6 scale-[0.78] rotate-6 opacity-50 shadow-lg",
};

const CARD_STYLES_MOBILE: Record<number, string> = {
  0: "z-30 translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100 shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
  1: "z-20 translate-x-10 -translate-y-2 scale-[0.90] rotate-2 opacity-85 shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
  2: "z-10 -translate-x-8 translate-y-2 scale-[0.82] -rotate-2 opacity-65 shadow-md",
  3: "z-[5] translate-x-14 translate-y-4 scale-[0.75] rotate-4 opacity-40 shadow",
};

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

const GRADE_CHIP_COLORS: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

type HeroVisualMode = "picture" | "cards";
const HERO_VISUAL_MODE: HeroVisualMode = "cards";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "English With Henda",
  description:
    "Publisher of English workbooks for Tunisian students from 4th to 9th year.",
  url: "https://englishwithhenda.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

function HeroBookShowcase() {
  const [order, setOrder] = useState(HERO_COVERS);

  const rotate = useCallback(() => {
    setOrder((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  useEffect(() => {
    const id = setInterval(rotate, 2500);
    return () => clearInterval(id);
  }, [rotate]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center ">
        <div className="relative w-[340px] h-fit lg:w-[420px] lg:h-fit">
          {order.map((cover, i) => {
            const style =
              i <= 3
                ? CARD_STYLES[i]
                : "z-0 scale-[0.7] opacity-0 pointer-events-none";
            return (
              <div
                key={cover.id}
                className={`absolute inset-0 m-auto w-[210px] h-fit lg:w-[250px] lg:h-fit overflow-hidden transition-all duration-700 ease-in-out ${style} `}
              >
                <img
                  src={cover.src}
                  alt={cover.alt}
                  className="h-full w-full object-contain drop-shadow-lg"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile */}
      <div className="hidden items-center justify-center mt-8">
        <div className="relative w-[220px] h-[220px]">
          {order.map((cover, i) => {
            const style =
              i <= 3
                ? CARD_STYLES_MOBILE[i]
                : "z-0 scale-[0.7] opacity-0 pointer-events-none";
            return (
              <div
                key={cover.id}
                className={`absolute inset-0 m-auto w-[120px] h-[170px] rounded-xl overflow-hidden transition-all duration-700 ease-in-out ${style}`}
              >
                <img
                  src={cover.src}
                  alt={cover.alt}
                  className="h-full w-full object-contain drop-shadow-md"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  const featuredBooks = books.slice(0, 6);
  const { t } = useTranslation();

  const trustItems = t("home.trust.items", { returnObjects: true }) as string[];
  const testimonials = t("home.testimonials.items", { returnObjects: true }) as {
    name: string;
    role: string;
    text: string;
  }[];

  return (
    <Layout>
      <SEOHead
        title="English With Henda — English Books for Tunisian Students"
        description="English workbooks designed for Tunisian students from 4th to 9th year. Grammar, vocabulary and exam preparation."
        jsonLd={ORGANIZATION_SCHEMA}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground min-h-[calc(100vh-4rem)] flex items-center">
        {/* Subtle decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-foreground/5" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary-foreground/5" />
          <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-primary-foreground/3" />
        </div>

        <div className="flex flex-col md:flex-row container relative py-12 md:py-16 gap-0 md:gap-8 items-center">
          <div className="w-full md:w-1/2 max-w-2xl">
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {t("home.hero.title")}
            </h1>
            <p className="mt-4 text-base opacity-90 sm:text-lg leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="font-semibold w-full sm:w-auto shadow-lg"
              >
                <Link to="/books">
                  <BookOpen className="me-2 h-5 w-5" />
                  {t("home.hero.cta_primary")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold w-full sm:w-auto"
              >
                <Link to="/resources">
                  <Download className="me-2 h-5 w-5" />
                  {t("home.hero.cta_secondary")}
                </Link>
              </Button>
            </div>

            {/* Year chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {GRADES.map((g) => (
                <Link
                  key={g}
                  to={`/books/${GRADE_CONFIG[g].slug}`}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105 shadow-sm ${GRADE_CHIP_COLORS[g]}`}
                >
                  {t(`grades.${g}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: side by side */}
          <div className="hidden md:flex w-1/2 items-center justify-center ">
            {HERO_VISUAL_MODE === "cards" ? (
              <HeroBookShowcase />
            ) : (
              <img
                src={Heropic}
                alt="Learn English with Henda"
                className="h-[360px] lg:h-[460px] w-auto max-w-full object-contain drop-shadow-2xl rounded-2xl"
              />
            )}
          </div>
          {/* Mobile: stacked */}
          <div className="flex md:hidden items-center justify-center mt-6">
            {HERO_VISUAL_MODE === "cards" ? (
              <HeroBookShowcase />
            ) : (
              <img
                src={Heropic}
                alt="Learn English with Henda"
                className="h-[180px] w-auto object-contain drop-shadow-xl rounded-xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b bg-card">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
            {trustItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground"
              >
                <CheckCircle className="h-4 w-4 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured books */}
      <ScrollReveal>
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                {t("home.books.title")}
              </h2>
              <Button asChild variant="ghost">
                <Link to="/books" className="flex items-center gap-1">
                  {t("home.books.viewAll")} <ArrowRight className="h-4 w-4 ms-1" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 px-2 sm:px-0">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} showActions />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal>
        <section className="container py-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-10">
            {t("home.testimonials.title")}
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border bg-card p-5 sm:p-6 shadow-sm"
              >
                <div className="">
                  <div className="flex gap-1 mb-3">
                    {[...Array(4)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-[#FDD663] text-[#FDD663]"
                      />
                    ))}
                    <Star className="h-4 w-4 fill-[#FDD663] text-[#FDD663]" />
                  </div>
                  <p className="text-base text-muted-foreground italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-base">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Newsletter */}
      <ScrollReveal>
        <section className="bg-secondary py-16">
          <div className="container max-w-xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
              {t("home.newsletter.title")}
            </h2>
            <p className="text-base text-muted-foreground mb-6">
              {t("home.newsletter.subtitle")}
            </p>
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder={t("home.newsletter.placeholder")}
                className="flex-1 text-base placeholder:text-base"
              />
              <Button type="submit" className="w-full text-base sm:w-auto">
                {t("home.newsletter.cta")}
              </Button>
            </form>
          </div>
        </section>
      </ScrollReveal>
    </Layout>
  );
}
