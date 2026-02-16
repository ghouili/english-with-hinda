import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/RevealOnScroll";
import { getBooksByGrade } from "@/data/books";
import { getResourcesByGrade } from "@/data/resources";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

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

const CURRICULUM: Record<Grade, string[]> = {
  4: ["Alphabet & Phonetics", "Greetings & Introductions", "Basic Vocabulary", "Present Simple", "Reading Activities", "Writing Activities"],
  5: ["Present Continuous", "Descriptions", "Daily Routine", "Past Simple — Introduction", "Listening Comprehension", "Module Reviews"],
  6: ["Comparatives & Superlatives", "Storytelling", "Future Simple", "Reading Comprehension", "Writing Activities", "Module Reviews"],
  7: ["Compound Tenses", "Passive Voice", "Structured Writing", "Reported Speech", "Listening Comprehension", "Module Reviews"],
  8: ["Complex Structures", "Argumentation", "Advanced Comprehension", "Exam-Style Tasks", "Listening Comprehension", "Module Reviews"],
  9: ["Complete Tense Revision", "Argumentative Essay", "Exam Practice", "Writing Methodology", "Oral Preparation", "Practice Exams"],
};

export default function GradeHub() {
  const { gradeSlug } = useParams<{ gradeSlug: string }>();
  const grade = SLUG_TO_GRADE[gradeSlug || ""] as Grade | undefined;

  if (!grade) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">Level not found</h1>
          <Button asChild className="mt-4"><Link to="/books">Back to books</Link></Button>
        </div>
      </Layout>
    );
  }

  const config = GRADE_CONFIG[grade];
  const gradeBooks = getBooksByGrade(grade);
  const prevGrade = grade > 4 ? (grade - 1) as Grade : null;
  const nextGrade = grade < 9 ? (grade + 1) as Grade : null;

  return (
    <Layout>
      <SEOHead
        title={`${config.shortLabel} English — English With Hinda`}
        description={`English textbooks and resources for ${config.label} in Tunisia. Complete program with exercises.`}
      />

      {/* Hero */}
      <section className={`${GRADE_BG[grade]} py-16`}>
        <div className="container">
          <RevealOnScroll>
            <p className="text-sm font-medium uppercase tracking-wider opacity-80">Level</p>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">{config.label}</h1>
            <p className="mt-3 text-lg opacity-90 max-w-xl">
              Everything you need to master English at this level.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Books */}
      <section className="container py-12">
        <RevealOnScroll>
          <h2 className="font-serif text-2xl font-bold mb-6">Books for {config.shortLabel}</h2>
        </RevealOnScroll>
        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gradeBooks.map((b) => (
            <StaggerItem key={b.id}><BookCard book={b} showActions /></StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Curriculum */}
      <section className="bg-muted/50 py-12">
        <div className="container">
          <RevealOnScroll>
            <h2 className="font-serif text-2xl font-bold mb-6">What you'll learn</h2>
          </RevealOnScroll>
          <StaggerContainer className="grid gap-3 sm:grid-cols-2">
            {CURRICULUM[grade].map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${GRADE_BG[grade]}`}>{i + 1}</span>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-secondary py-12">
        <div className="container flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <a href="https://wa.me/21600000000?text=Hello%2C%20I%20would%20like%20to%20order%20a%20book.%20Thank%20you!" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Order via WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>

      {/* Navigation between grades */}
      <section className="container py-8 flex justify-between">
        {prevGrade ? (
          <Button asChild variant="ghost"><Link to={`/books/${GRADE_CONFIG[prevGrade].slug}`}><ArrowLeft className="mr-1 h-4 w-4" /> {GRADE_CONFIG[prevGrade].shortLabel}</Link></Button>
        ) : <div />}
        {nextGrade ? (
          <Button asChild variant="ghost"><Link to={`/books/${GRADE_CONFIG[nextGrade].slug}`}>{GRADE_CONFIG[nextGrade].shortLabel} <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        ) : <div />}
      </section>
    </Layout>
  );
}
