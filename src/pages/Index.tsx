import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { GradeCard } from "@/components/GradeCard";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/RevealOnScroll";
import { books } from "@/data/books";
import { Grade } from "@/lib/types";
import { ArrowRight, BookOpen, MessageCircle, CheckCircle, Layers, Brain, GraduationCap, Mail } from "lucide-react";

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

const TRUST_ITEMS = [
  "Official-program aligned",
  "Step-by-step progression",
  "Student-friendly practice",
  "Teacher-created",
];

const VALUE_CARDS = [
  { icon: Layers, title: "Structured lessons", text: "A clear learning path that builds confidence step-by-step." },
  { icon: Brain, title: "Grammar made easy", text: "Simple explanations followed by targeted practice." },
  { icon: GraduationCap, title: "Exam readiness", text: "Exam-style tasks and reviews to prepare efficiently." },
];

const ORDER_STEPS = [
  "Message us on WhatsApp with the student's level (4th–9th).",
  "We confirm availability and price.",
  "We coordinate delivery or pickup privately.",
];

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "English With Hinda",
  description: "English textbook publisher for Tunisian students from 4th to 9th year.",
  url: "https://englishwithhinda.com",
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: ["French", "English"] },
};

export default function HomePage() {
  return (
    <Layout>
      <SEOHead
        title="English With Hinda — English Textbooks for Tunisian Students"
        description="A complete English book collection from 4th to 9th year — aligned with the official Tunisian program. Lessons, grammar, comprehension, writing, and exams."
        jsonLd={ORGANIZATION_SCHEMA}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="container py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <RevealOnScroll>
                <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-[3.2rem]">
                  English made simple for every Tunisian student
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="mt-4 text-lg opacity-90 md:text-xl leading-relaxed">
                  A complete book collection from 4th to 9th year — aligned with the official program. Clear lessons, grammar rules, comprehension practice, writing tasks, and exam preparation.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" variant="secondary" className="font-semibold">
                    <Link to="/books">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Explore the books
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                    <a href="https://wa.me/21600000000?text=Hello%2C%20I%20would%20like%20to%20order%20a%20book.%20Thank%20you!" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Order via WhatsApp
                    </a>
                  </Button>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <div className="mt-6 flex flex-wrap gap-3">
                  {TRUST_ITEMS.map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-sm opacity-80">
                      <CheckCircle className="h-3.5 w-3.5" /> {item}
                    </span>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
            {/* Book covers fan */}
            <RevealOnScroll delay={0.2} className="hidden md:flex justify-center items-center relative h-[400px]">
              {books.slice(0, 6).map((book, i) => (
                <img
                  key={book.id}
                  src={book.coverImage}
                  alt={`${book.gradeLabel} cover`}
                  className="absolute h-64 w-auto object-contain drop-shadow-xl"
                  style={{
                    transform: `rotate(${(i - 2.5) * 8}deg) translateX(${(i - 2.5) * 40}px)`,
                    zIndex: i === 3 ? 10 : 6 - Math.abs(i - 3),
                  }}
                  loading={i < 3 ? "eager" : "lazy"}
                />
              ))}
            </RevealOnScroll>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary-foreground/5" />
      </section>

      {/* Choose a level */}
      <section className="container py-16 md:py-20">
        <RevealOnScroll>
          <h2 className="font-serif text-3xl font-bold text-center mb-2">Choose a level</h2>
          <p className="text-center text-muted-foreground mb-10">Pick the school year to see the matching book.</p>
        </RevealOnScroll>
        <StaggerContainer className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {GRADES.map((g) => (
            <StaggerItem key={g}>
              <GradeCard grade={g} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Collection grid */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold">Our book collection</h2>
                <p className="text-muted-foreground mt-1">Each book includes: lessons, grammar rules, comprehension activities, writing practice, and exams.</p>
              </div>
              <Button asChild variant="ghost">
                <Link to="/books" className="flex items-center gap-1">
                  View all books <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
          <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
            {books.slice(0, 6).map((book) => (
              <StaggerItem key={book.id}>
                <BookCard book={book} showActions />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Value proposition */}
      <section className="container py-16 md:py-20">
        <RevealOnScroll>
          <h2 className="font-serif text-3xl font-bold text-center mb-10">Why students progress with English With Hinda</h2>
        </RevealOnScroll>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {VALUE_CARDS.map((card) => (
            <StaggerItem key={card.title}>
              <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <card.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* How to order */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="font-serif text-3xl font-bold mb-2">How to order</h2>
                <p className="text-muted-foreground mb-6">Order in minutes and get help choosing the right level.</p>
                <ol className="space-y-4">
                  {ORDER_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-4">Ready to order?</h3>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg">
                    <a href="https://wa.me/21600000000?text=Hello%2C%20I%20would%20like%20to%20order%20a%20book.%20Thank%20you!" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" /> Order via WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Contact us</Link>
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16 md:py-20">
        <RevealOnScroll>
          <div className="max-w-xl mx-auto text-center">
            <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold mb-3">Get free resources updates</h2>
            <p className="text-muted-foreground mb-6">
              Receive new revision sheets and practice materials by email.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Your email address" className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </RevealOnScroll>
      </section>
    </Layout>
  );
}
