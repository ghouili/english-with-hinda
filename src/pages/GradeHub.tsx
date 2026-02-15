import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookCard } from "@/components/BookCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { books, getBooksByGrade } from "@/data/books";
import { getResourcesByGrade } from "@/data/resources";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { ArrowLeft, ArrowRight, MessageCircle, MapPin } from "lucide-react";

const GRADE_BG: Record<Grade, string> = {
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

const SLUG_TO_GRADE: Record<string, Grade> = {
  "5eme": 5, "6eme": 6, "7eme": 7, "8eme": 8, "9eme": 9,
};

const CURRICULUM: Record<Grade, string[]> = {
  5: ["Alphabet et phonétique", "Salutations et présentations", "Vocabulaire de base", "Présent simple"],
  6: ["Présent continu", "Descriptions", "Routine quotidienne", "Passé simple — intro"],
  7: ["Comparatifs et superlatifs", "Raconter une histoire", "Futur simple", "Compréhension écrite"],
  8: ["Temps composés", "Voix passive", "Rédaction structurée", "Discours rapporté"],
  9: ["Structures complexes", "Essai argumentatif", "Exercices type brevet", "Méthodologie d'examen"],
};

const GRADE_FAQ: Record<Grade, { q: string; a: string }[]> = {
  5: [
    { q: "Mon enfant n'a jamais fait d'anglais, ce livre est-il adapté ?", a: "Oui ! Ce livre est conçu pour les vrais débutants et commence par les bases absolues." },
    { q: "Combien de temps faut-il pour finir le livre ?", a: "Le livre est conçu pour être utilisé tout au long de l'année scolaire, à raison de 2-3 leçons par semaine." },
  ],
  6: [
    { q: "Ce livre suit-il le programme officiel ?", a: "Oui, tous nos livres sont alignés sur le programme du ministère de l'éducation tunisien." },
    { q: "Y a-t-il des exercices corrigés ?", a: "Chaque chapitre contient des exercices avec corrigés détaillés en fin de livre." },
  ],
  7: [
    { q: "Ce livre convient-il pour une révision d'été ?", a: "Absolument, il peut servir de support de révision pendant les vacances." },
    { q: "Les textes sont-ils authentiques ?", a: "Nous utilisons des textes adaptés qui reflètent des situations réelles et le quotidien des élèves." },
  ],
  8: [
    { q: "Ce livre prépare-t-il au brevet ?", a: "Oui, il pose les bases essentielles pour la préparation au brevet de 9ème." },
    { q: "Quelles compétences sont travaillées ?", a: "Grammaire avancée, rédaction structurée, compréhension et expression orale et écrite." },
  ],
  9: [
    { q: "Y a-t-il des sujets de brevet corrigés ?", a: "Oui, le livre contient plusieurs examens blancs avec corrigés détaillés." },
    { q: "Ce livre suffit-il pour le brevet ?", a: "Combiné à un travail régulier, ce livre couvre tout le programme nécessaire pour réussir le brevet." },
  ],
};

export default function GradeHub() {
  const { gradeSlug } = useParams<{ gradeSlug: string }>();
  const grade = SLUG_TO_GRADE[gradeSlug || ""] as Grade | undefined;

  if (!grade) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">Niveau non trouvé</h1>
          <Button asChild className="mt-4"><Link to="/livres">Retour aux livres</Link></Button>
        </div>
      </Layout>
    );
  }

  const config = GRADE_CONFIG[grade];
  const gradeBooks = getBooksByGrade(grade);
  const gradeResources = getResourcesByGrade(grade);
  const faqs = GRADE_FAQ[grade];
  const prevGrade = grade > 5 ? (grade - 1) as Grade : null;
  const nextGrade = grade < 9 ? (grade + 1) as Grade : null;

  return (
    <Layout>
      <SEOHead
        title={`Anglais ${config.label} — English With Hinda`}
        description={`Livres et ressources d'anglais pour la ${config.label} année en Tunisie. Programme complet et exercices.`}
      />

      {/* Hero */}
      <section className={`${GRADE_BG[grade]} py-16`}>
        <div className="container">
          <p className="text-sm font-medium uppercase tracking-wider opacity-80">Année</p>
          <h1 className="font-serif text-4xl font-bold md:text-5xl">{config.label}</h1>
          <p className="mt-3 text-lg opacity-90 max-w-xl">
            Tout ce qu'il faut pour maîtriser l'anglais en {config.label} année.
          </p>
        </div>
      </section>

      {/* Books */}
      <section className="container py-12">
        <h2 className="font-serif text-2xl font-bold mb-6">Livres pour la {config.label}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {gradeBooks.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-muted/50 py-12">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold mb-6">Ce que vous apprendrez</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {CURRICULUM[grade].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${GRADE_BG[grade]}`}>{i + 1}</span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-12">
        <h2 className="font-serif text-2xl font-bold mb-6">Questions fréquentes</h2>
        <div className="space-y-4 max-w-2xl">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border bg-card p-5">
              <h3 className="font-semibold text-sm">{faq.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-secondary py-12">
        <div className="container flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild><Link to="/ou-acheter"><MapPin className="mr-2 h-4 w-4" /> Où acheter</Link></Button>
          <Button asChild variant="outline">
            <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Contacter via WhatsApp
            </a>
          </Button>
        </div>
      </section>

      {/* Navigation between grades */}
      <section className="container py-8 flex justify-between">
        {prevGrade ? (
          <Button asChild variant="ghost"><Link to={`/livres/${GRADE_CONFIG[prevGrade].slug}`}><ArrowLeft className="mr-1 h-4 w-4" /> {GRADE_CONFIG[prevGrade].label}</Link></Button>
        ) : <div />}
        {nextGrade ? (
          <Button asChild variant="ghost"><Link to={`/livres/${GRADE_CONFIG[nextGrade].slug}`}>{GRADE_CONFIG[nextGrade].label} <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        ) : <div />}
      </section>
    </Layout>
  );
}
