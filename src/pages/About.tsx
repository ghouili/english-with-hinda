import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Heart, GraduationCap, Users, CheckCircle } from "lucide-react";
import { Grade, GRADE_CONFIG } from "@/lib/types";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "English With Henda",
  description: "Publisher of English workbooks for Tunisian students.",
  url: "https://englishwithhenda.com",
};

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

const TIMELINE = [
  { year: "2008", label: "Started teaching English in Tunisia" },
  { year: "2015", label: "Specialized in exam preparation" },
  { year: "2020", label: "Created first teaching materials" },
  { year: "2024", label: "Launched the English With Henda collection" },
];

const CREDENTIALS = [
  "Over 15 years of teaching experience",
  "Specialist in the official Tunisian program",
  "Method tested with hundreds of students",
  "Aligned with exam objectives",
  "Progressive exercises with detailed corrections",
];

const INSIDE_BOOKS = [
  { icon: BookOpen, title: "Structured lessons", desc: "Logical progression from simplest to most complex" },
  { icon: CheckCircle, title: "Corrected exercises", desc: "Each chapter includes exercises with detailed answer keys" },
  { icon: GraduationCap, title: "Exam preparation", desc: "Practice papers and methodology for 8th and 9th year students" },
  { icon: Users, title: "For the whole family", desc: "Clear guide so parents can support their children's learning" },
];

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="About — English With Henda"
        description="Discover Henda's story and her mission: making English accessible to every Tunisian student."
        jsonLd={ORG_SCHEMA}
      />

      <section className="container py-12 max-w-4xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8">About</h1>

        {/* Bio */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-4xl font-bold">H</div>
            <div>
              <h2 className="font-serif text-2xl font-bold">Henda Charbi</h2>
              <p className="text-muted-foreground mt-1">English Teacher & Author</p>
              <div className="mt-3 space-y-1">
                {CREDENTIALS.map((c, i) => (
                  <p key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {c}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Story */}
        <ScrollReveal>
          <div className="space-y-4 text-muted-foreground leading-relaxed mb-12">
            <p>
              Passionate about teaching English for over 15 years, Henda has dedicated her career to helping Tunisian students master this essential language. Through her classroom experience, she identified the critical need for teaching materials adapted to the Tunisian context.
            </p>
            <p>
              This is how English With Henda was born: a collection of books designed by and for Tunisian students, from their first contact with English in 4th year through to exam success in 9th year.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Our journey</h2>
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-6">
              {TIMELINE.map((t) => (
                <div key={t.year} className="relative">
                  <div className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-primary" />
                  <p className="font-serif font-bold text-primary">{t.year}</p>
                  <p className="text-sm text-muted-foreground">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Teaching approach */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-2">Our method</h2>
            <p className="text-muted-foreground mb-6">A progressive approach, contextualized for Tunisian students.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Heart, title: "Our mission", desc: "Making English accessible and enjoyable for every Tunisian student, regardless of their starting level." },
                { icon: BookOpen, title: "Our books", desc: "Carefully crafted, aligned with the official program, and enriched with practical exercises and detailed corrections." },
                { icon: Award, title: "Our commitment", desc: "Pedagogical quality, clear explanations and continuous support for students towards success." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-5">
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-serif font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Inside the books */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">What's inside our books</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {INSIDE_BOOKS.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl border bg-card p-5">
                  <item.icon className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA to grade hubs */}
        <ScrollReveal>
          <div className="rounded-xl bg-secondary p-6 sm:p-8 text-center">
            <h2 className="font-serif text-2xl font-bold mb-3">Choose a level</h2>
            <p className="text-muted-foreground mb-6">Discover the book adapted for each school year.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {GRADES.map((g) => (
                <Button key={g} asChild variant="outline">
                  <Link to={`/books/${GRADE_CONFIG[g].slug}`}>{GRADE_CONFIG[g].label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}
