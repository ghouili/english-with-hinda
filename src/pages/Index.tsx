import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { GradeCard } from "@/components/GradeCard";
import { BookCard } from "@/components/BookCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books } from "@/data/books";
import { Grade } from "@/lib/types";
import { ArrowRight, BookOpen, Download, Star, MessageCircle, CheckCircle } from "lucide-react";
import cover4th from "@/assets/covers/4th_year.png";
import cover7th from "@/assets/covers/7th_year.png";
import cover9th from "@/assets/covers/9th_year.png";

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

const TESTIMONIALS = [
  { name: "Sana M.", role: "Parent, Tunis", text: "My son has improved so much thanks to Henda's books. The exercises are clear and perfectly aligned with the Tunisian curriculum." },
  { name: "Ahmed B.", role: "Teacher, Sfax", text: "I use these books in class. My students are more motivated and their results have noticeably improved." },
  { name: "Fatma K.", role: "9th Year Student, Sousse", text: "The exam practice sections really helped me prepare. I scored 18/20 on my English exam!" },
];

const TRUST_ITEMS = [
  "Official program aligned",
  "Corrected exercises",
  "Progressive method",
  "Free resources",
];

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "English With Henda",
  description: "Publisher of English workbooks for Tunisian students from 4th to 9th year.",
  url: "https://englishwithhenda.com",
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: ["French", "English"] },
};

export default function HomePage() {
  const featuredBooks = books.slice(0, 6);

  return (
    <Layout>
      <SEOHead
        title="English With Henda — English Books for Tunisian Students"
        description="English workbooks designed for Tunisian students from 4th to 9th year. Grammar, vocabulary and exam preparation."
        jsonLd={ORGANIZATION_SCHEMA}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="container py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] items-center">
            <div className="max-w-2xl">
              <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                English, simplified for every Tunisian student
              </h1>
              <p className="mt-4 text-base opacity-90 sm:text-lg md:text-xl">
                A complete book series from 4th Year Primary to 9th Year Basic Education — aligned with the official program, with clear practice and progress.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="font-semibold w-full sm:w-auto">
                  <Link to="/books">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore the books
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold w-full sm:w-auto">
                  <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact us on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            {/* Book covers preview */}
            <div className="hidden md:flex items-end gap-3 pr-4">
              <img src={cover4th} alt="4th Year book" className="h-48 rounded-lg shadow-xl -rotate-6 translate-y-2" />
              <img src={cover7th} alt="7th Year book" className="h-56 rounded-lg shadow-xl z-10" />
              <img src={cover9th} alt="9th Year book" className="h-48 rounded-lg shadow-xl rotate-6 translate-y-2" />
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary-foreground/5" />
      </section>

      {/* Trust strip */}
      <section className="border-b bg-card">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grade cards */}
      <ScrollReveal>
        <section className="container py-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-2">Choose your level</h2>
          <p className="text-center text-muted-foreground mb-10">One book adapted for each school year</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
            {GRADES.map((g) => (
              <GradeCard key={g} grade={g} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Featured books */}
      <ScrollReveal>
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">Our books</h2>
              <Button asChild variant="ghost">
                <Link to="/books" className="flex items-center gap-1">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
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
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-10">What they say</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 sm:p-6 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-grade-4 text-grade-4" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
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
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3">Stay informed</h2>
            <p className="text-muted-foreground mb-6">
              Receive our free resources and latest news directly in your inbox.
            </p>
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Your email address" className="flex-1" />
              <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
            </form>
          </div>
        </section>
      </ScrollReveal>
    </Layout>
  );
}
