import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookCard } from "@/components/BookCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBookBySlug, books } from "@/data/books";
import { stockists } from "@/data/stockists";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { MapPin, MessageCircle, BookOpen, Users, GraduationCap } from "lucide-react";

const GRADE_BADGE: Record<Grade, string> = {
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug || "");

  if (!book) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">Livre non trouvé</h1>
          <Button asChild className="mt-4"><Link to="/livres">Retour aux livres</Link></Button>
        </div>
      </Layout>
    );
  }

  const config = GRADE_CONFIG[book.grade];
  const relatedBooks = books.filter((b) => b.id !== book.id && Math.abs(b.grade - book.grade) <= 1).slice(0, 3);
  const bookStockists = stockists.filter((s) => book.stockistIds.includes(s.id));

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.descriptionShort,
    author: { "@type": "Person", name: "Hinda" },
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
      <section className="container py-12">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          <div className="aspect-[3/4] rounded-xl bg-muted overflow-hidden shadow-lg">
            <img src={book.coverImage} alt={`Couverture ${book.title}`} className="h-full w-full object-cover" />
          </div>
          <div>
            <Badge className={`mb-3 ${GRADE_BADGE[book.grade]}`}>{config.label}</Badge>
            <h1 className="font-serif text-3xl font-bold md:text-4xl">{book.title}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{book.subtitle}</p>
            <p className="mt-4 text-muted-foreground">{book.descriptionLong}</p>

            {/* Quick facts */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Pages", value: String(book.numberOfPages) },
                { label: "Édition", value: book.edition },
                { label: "Année", value: String(book.publicationYear) },
                { label: "Langue", value: "Anglais" },
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
              <Button asChild><Link to="/ou-acheter"><MapPin className="mr-2 h-4 w-4" /> Où acheter</Link></Button>
              <Button asChild variant="outline">
                <a href={`https://wa.me/21600000000?text=${encodeURIComponent(book.whatsappInquiryTemplate)}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Commander via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="bg-muted/50 py-12">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold mb-6">Dans ce livre</h2>
          <ol className="grid gap-2 sm:grid-cols-2 max-w-2xl">
            {book.tableOfContents.map((item, i) => (
              <li key={i} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for */}
      <section className="container py-12">
        <h2 className="font-serif text-2xl font-bold mb-6">Pour qui est ce livre ?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, title: "Parents", desc: "Accompagnez votre enfant avec un outil structuré et progressif." },
            { icon: GraduationCap, title: "Élèves", desc: "Progressez à votre rythme avec des exercices clairs et corrigés." },
            { icon: BookOpen, title: "Enseignants", desc: "Un support pédagogique fiable, aligné sur le programme officiel." },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border bg-card p-6">
              <p.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-serif font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stockists */}
      {bookStockists.length > 0 && (
        <section className="bg-secondary py-12">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold mb-6">Points de vente</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {bookStockists.map((s) => (
                <div key={s.id} className="rounded-lg border bg-card p-4">
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.city} — {s.address}</p>
                  <p className="text-xs text-muted-foreground">{s.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related books */}
      {relatedBooks.length > 0 && (
        <section className="container py-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Livres similaires</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {relatedBooks.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}
