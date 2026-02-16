import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookCard } from "@/components/BookCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/RevealOnScroll";
import { getBookBySlug, books } from "@/data/books";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { MessageCircle, BookOpen, Users, GraduationCap, CheckCircle } from "lucide-react";

const GRADE_BADGE: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

const INSIDE_BOOK_ITEMS = [
  "Covers all lessons",
  "Grammar rules",
  "Reading comprehension activities",
  "Writing activities",
  "Exams",
];

const INSIDE_BOOK_ADVANCED = [
  "Listening comprehension activities",
  "Module reviews",
];

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug || "");

  if (!book) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">Book not found</h1>
          <Button asChild className="mt-4"><Link to="/books">Back to books</Link></Button>
        </div>
      </Layout>
    );
  }

  const config = GRADE_CONFIG[book.grade];
  const relatedBooks = books.filter((b) => b.id !== book.id && Math.abs(b.grade - book.grade) <= 1).slice(0, 3);
  const showAdvanced = book.grade >= 5;

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.descriptionShort,
    author: { "@type": "Person", name: "Henda Charbi" },
    publisher: { "@type": "Organization", name: "English With Hinda" },
    inLanguage: "en",
    bookEdition: book.edition,
    numberOfPages: book.numberOfPages,
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.priceTnd ? {
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
      <section className="container py-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-[320px_1fr] items-start">
          <RevealOnScroll className="flex justify-center">
            <img src={book.coverImage} alt={`${book.title} cover`} className="h-auto w-full max-w-[280px] object-contain drop-shadow-lg rounded-lg" />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div>
              <Badge className={`mb-3 ${GRADE_BADGE[book.grade]}`}>{config.shortLabel}</Badge>
              <h1 className="font-serif text-3xl font-bold md:text-4xl">{book.title}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{book.subtitle}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">{book.descriptionLong}</p>

              {/* Quick facts */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Pages", value: String(book.numberOfPages) },
                  { label: "Edition", value: book.edition },
                  { label: "Year", value: String(book.publicationYear) },
                  { label: "Language", value: "English" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className="font-semibold text-sm">{f.value}</p>
                  </div>
                ))}
              </div>

              {book.priceTnd && (
                <p className="mt-6 text-2xl font-bold">{book.priceTnd} TND</p>
              )}

              <div className="mt-6 flex gap-3 flex-wrap">
                <Button asChild>
                  <a href={`https://wa.me/21600000000?text=${encodeURIComponent(book.whatsappInquiryTemplate)}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> Order via WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Inside this book */}
      <section className="bg-muted/50 py-12">
        <div className="container">
          <RevealOnScroll>
            <h2 className="font-serif text-2xl font-bold mb-6">Inside this book</h2>
          </RevealOnScroll>
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 max-w-2xl">
            {[...INSIDE_BOOK_ITEMS, ...(showAdvanced ? INSIDE_BOOK_ADVANCED : [])].map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Table of contents */}
      <section className="container py-12">
        <RevealOnScroll>
          <h2 className="font-serif text-2xl font-bold mb-6">Table of contents</h2>
        </RevealOnScroll>
        <StaggerContainer className="grid gap-2 sm:grid-cols-2 max-w-2xl">
          {book.tableOfContents.map((item, i) => (
            <StaggerItem key={i}>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                <span className="text-sm">{item}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Who it's for */}
      <section className="bg-secondary py-12">
        <div className="container">
          <RevealOnScroll>
            <h2 className="font-serif text-2xl font-bold mb-6">Who is it for?</h2>
          </RevealOnScroll>
          <StaggerContainer className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Users, title: "Parents", desc: "Support your child with a clear learning structure at home." },
              { icon: GraduationCap, title: "Students", desc: "Practice step-by-step and gain confidence for tests." },
              { icon: BookOpen, title: "Teachers", desc: "Use structured content aligned with the official program." },
            ].map((p) => (
              <StaggerItem key={p.title}>
                <div className="rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
                  <p.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-serif font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related books */}
      {relatedBooks.length > 0 && (
        <section className="container py-12">
          <RevealOnScroll>
            <h2 className="font-serif text-2xl font-bold mb-6">Related books</h2>
          </RevealOnScroll>
          <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {relatedBooks.map((b) => (
              <StaggerItem key={b.id}><BookCard book={b} /></StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}
    </Layout>
  );
}
