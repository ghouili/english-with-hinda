import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { books, getBooksByGrade } from "@/data/books";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { whatsappUrl } from "@/lib/site";

const GRADE_BG: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

const SLUG_TO_GRADE: Record<string, Grade> = {
  "4th": 4, "5th": 5, "6th": 6, "7th": 7, "8th": 8, "9th": 9,
};

export default function GradeHub() {
  const { gradeSlug } = useParams<{ gradeSlug: string }>();
  const grade = SLUG_TO_GRADE[gradeSlug || ""] as Grade | undefined;
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  if (!grade) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">{t("gradeHub.notFound")}</h1>
          <Button asChild className="mt-4"><Link to="/books">{t("common.backToBooks")}</Link></Button>
        </div>
      </Layout>
    );
  }

  const config = GRADE_CONFIG[grade];
  const gradeBooks = getBooksByGrade(grade);
  const prevGrade = grade > 4 ? (grade - 1) as Grade : null;
  const nextGrade = grade < 9 ? (grade + 1) as Grade : null;
  const curriculumItems = t(`gradeHub.curriculum.${grade}`, { returnObjects: true }) as string[];
  const gradeLabel = t(`grades.${grade}`);

  return (
    <Layout>
      <SEOHead
        title={`${gradeLabel} English — English With Henda`}
        description={`English books and resources for ${gradeLabel} students in Tunisia. Complete program and exercises.`}
      />

      {/* Hero */}
      <section className={`${GRADE_BG[grade]} py-16`}>
        <div className="container">
          <p className="text-sm font-medium uppercase tracking-wider opacity-80">{t("gradeHub.yearLabel")}</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold md:text-5xl">{gradeLabel}</h1>
          <p className="mt-3 text-base sm:text-lg opacity-90 max-w-xl">
            {t("gradeHub.everythingYouNeed")} {gradeLabel}.
          </p>
        </div>
      </section>

      {/* Books */}
      <ScrollReveal>
        <section className="container py-12">
          <h2 className="font-serif text-2xl font-bold mb-6">{t("gradeHub.booksFor")} {gradeLabel}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {gradeBooks.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      </ScrollReveal>

      {/* Curriculum */}
      <ScrollReveal>
        <section className="bg-muted/50 py-12">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold mb-6">{t("gradeHub.whatYouLearn")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {curriculumItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shrink-0 ${GRADE_BG[grade]}`}>{i + 1}</span>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal>
        <section className="bg-secondary py-12">
          <div className="container flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="w-full sm:w-auto">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="me-2 h-4 w-4" /> {t("gradeHub.contactWhatsApp")}
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/contact">{t("gradeHub.getInTouch")}</Link>
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* Navigation between grades */}
      <section className="container py-8 flex justify-between">
        {prevGrade ? (
          <Button asChild variant="ghost">
            <Link to={`/books/${GRADE_CONFIG[prevGrade].slug}`}>
              {isRTL ? <ArrowRight className="me-1 h-4 w-4" /> : <ArrowLeft className="me-1 h-4 w-4" />}
              {t(`grades.${prevGrade}`)}
            </Link>
          </Button>
        ) : <div />}
        {nextGrade ? (
          <Button asChild variant="ghost">
            <Link to={`/books/${GRADE_CONFIG[nextGrade].slug}`}>
              {t(`grades.${nextGrade}`)}
              {isRTL ? <ArrowLeft className="ms-1 h-4 w-4" /> : <ArrowRight className="ms-1 h-4 w-4" />}
            </Link>
          </Button>
        ) : <div />}
      </section>
    </Layout>
  );
}

