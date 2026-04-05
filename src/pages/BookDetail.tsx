import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookCard } from "@/components/BookCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getBookBySlug, books } from "@/data/books";
import { Grade } from "@/lib/types";
import { useLocalizedBook } from "@/lib/useLocalized";
import { MessageCircle, BookOpen, Users, GraduationCap } from "lucide-react";
import WahtsAppIcon from '../assets/icons/whatsappiconwhite.png';
import { useTranslation } from "react-i18next";

const GRADE_BADGE: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const rawBook = getBookBySlug(slug || "");
  const { t } = useTranslation();
  const book = useLocalizedBook(rawBook!);

  if (!rawBook) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">{t("bookDetail.notFound")}</h1>
          <Button asChild className="mt-4"><Link to="/books">{t("common.backToBooks")}</Link></Button>
        </div>
      </Layout>
    );
  }

  const gradeLabel = t(`grades.${book.grade}`);
  const relatedBooks = books.filter((b) => b.id !== book.id && Math.abs(b.grade - book.grade) <= 1).slice(0, 3);

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.descriptionShort,
    author: { "@type": "Person", name: "Henda" },
    publisher: { "@type": "Organization", name: "English With Henda" },
    inLanguage: "en",
    bookEdition: book.edition,
    numberOfPages: book.numberOfPages,
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.priceTnd && book.priceTnd > 0 ? {
      offers: {
        "@type": "Offer",
        price: book.priceTnd,
        priceCurrency: "TND",
        availability: "https://schema.org/InStock",
      },
    } : {}),
  };

  return (
    <Layout>
      <SEOHead title={book.seoTitle} description={book.seoDescription} jsonLd={bookSchema} />

      {/* Hero */}
      <section className="container py-12">
        <div className="grid gap-8 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr]">
          <div className="aspect-[3/4] rounded-xl bg-muted overflow-hidden shadow-lg mx-auto w-full max-w-[280px] md:max-w-none">
            <img src={book.coverImage} alt={`Cover — ${book.title} ${gradeLabel}`} className="h-full w-full object-cover" />
          </div>
          <div>
            <Badge className={`mb-3 ${GRADE_BADGE[book.grade]}`}>{gradeLabel}</Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold md:text-4xl">{book.title}</h1>
            <p className="mt-1 text-base sm:text-lg text-muted-foreground">{book.subtitle}</p>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">{book.descriptionLong}</p>

            {/* Quick facts */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: t("bookDetail.pages"), value: String(book.numberOfPages) },
                { label: t("bookDetail.edition"), value: book.edition },
                { label: t("bookDetail.year"), value: String(book.publicationYear) },
                { label: t("bookDetail.language"), value: t("bookDetail.english") },
              ].map((f) => (
                <div key={f.label} className="rounded-lg border bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground">{f.label}</p>
                  <p className="font-semibold text-sm">{f.value}</p>
                </div>
              ))}
            </div>

            {book.priceTnd !== undefined && book.priceTnd > 0 && (
              <p className="mt-6 text-2xl font-bold">{book.priceTnd} TND</p>
            )}

            <div className="mt-6 flex gap-3 flex-wrap">
              <Button asChild className="w-full sm:w-auto">
                <a href={`https://wa.me/21692053416?text=${encodeURIComponent(book.whatsappInquiryTemplate)}`} target="_blank" rel="noopener noreferrer">
                  <img src={WahtsAppIcon} alt="WhatsApp" className="me-2 h-5 w-5" />
                  {t("bookDetail.orderWhatsApp")}
                </a>
              </Button>
              <Button asChild variant="outline" 
              // className="w-full sm:w-auto"
              className="border-primary text-primary hover:text-primary bg-transparent hover:bg-primary/10 font-semibold w-full sm:w-auto"
              >
                <Link to="/contact">{t("bookDetail.contactUs")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <ScrollReveal>
        <section className="bg-muted/50 py-12">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold mb-6">{t("bookDetail.tableOfContents")}</h2>
            <ol className="grid gap-2 sm:grid-cols-2 max-w-2xl">
              {book.tableOfContents.map((item, i) => (
                <li key={i} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">{i + 1}</span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </ScrollReveal>

      {/* Who it's for */}
      <ScrollReveal>
        <section className="container py-12">
          <h2 className="font-serif text-2xl font-bold mb-6">{t("bookDetail.whoIsItFor.title")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Users, title: t("bookDetail.whoIsItFor.parents.title"), desc: t("bookDetail.whoIsItFor.parents.desc") },
              { icon: GraduationCap, title: t("bookDetail.whoIsItFor.students.title"), desc: t("bookDetail.whoIsItFor.students.desc") },
              { icon: BookOpen, title: t("bookDetail.whoIsItFor.teachers.title"), desc: t("bookDetail.whoIsItFor.teachers.desc") },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border bg-card p-5 sm:p-6">
                <p.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-serif text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-base text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Related books */}
      {relatedBooks.length > 0 && (
        <ScrollReveal>
          <section className="container py-12">
            <h2 className="font-serif text-2xl font-bold mb-6">{t("bookDetail.relatedBooks")}</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {relatedBooks.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          </section>
        </ScrollReveal>
      )}
    </Layout>
  );
}
