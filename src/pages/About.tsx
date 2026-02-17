import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Heart, GraduationCap, Users, CheckCircle } from "lucide-react";
import { Grade, GRADE_CONFIG } from "@/lib/types";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "English With Hinda",
  description: "Éditeur de livres d'anglais pour les élèves tunisiens.",
  url: "https://englishwithhinda.com",
};

const GRADES: Grade[] = [5, 6, 7, 8, 9];

const TIMELINE = [
  { year: "2008", label: "Début de l'enseignement de l'anglais en Tunisie" },
  { year: "2015", label: "Spécialisation dans la préparation au brevet" },
  { year: "2020", label: "Création des premiers supports pédagogiques" },
  { year: "2024", label: "Lancement de la collection English With Hinda" },
];

const CREDENTIALS = [
  "Plus de 15 ans d'expérience en enseignement",
  "Spécialiste du programme officiel tunisien",
  "Méthode testée avec des centaines d'élèves",
  "Alignement avec les objectifs du brevet",
  "Exercices progressifs et corrigés détaillés",
];

const INSIDE_BOOKS = [
  { icon: BookOpen, title: "Leçons structurées", desc: "Progression logique du plus simple au plus complexe" },
  { icon: CheckCircle, title: "Exercices corrigés", desc: "Chaque chapitre contient des exercices avec corrigés détaillés" },
  { icon: GraduationCap, title: "Préparation brevet", desc: "Sujets types et méthodologie pour les classes de 8ème et 9ème" },
  { icon: Users, title: "Pour toute la famille", desc: "Guide clair pour que les parents puissent accompagner leurs enfants" },
];

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="À propos — English With Hinda"
        description="Découvrez l'histoire de Hinda et sa mission : rendre l'anglais accessible à tous les élèves tunisiens."
        jsonLd={ORG_SCHEMA}
      />

      <section className="container py-12 max-w-4xl">
        <h1 className="font-serif text-4xl font-bold mb-8">À propos</h1>

        {/* Bio - above the fold */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-4xl font-bold">H</div>
          <div>
            <h2 className="font-serif text-2xl font-bold">Hinda</h2>
            <p className="text-muted-foreground mt-1">Enseignante d'anglais & auteure</p>
            <div className="mt-3 space-y-1">
              {CREDENTIALS.map((c, i) => (
                <p key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-grade-6 shrink-0" /> {c}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-4 text-muted-foreground leading-relaxed mb-12">
          <p>
            Passionnée par l'enseignement de l'anglais depuis plus de 15 ans, Hinda a consacré sa carrière à aider les élèves tunisiens à maîtriser cette langue essentielle. Forte de son expérience en classe, elle a constaté le besoin criant de supports pédagogiques adaptés au contexte tunisien.
          </p>
          <p>
            C'est ainsi qu'est née English With Hinda : une collection de livres pensés par et pour les élèves tunisiens, du premier contact avec l'anglais en 5ème année jusqu'à la réussite du brevet en 9ème.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Notre parcours</h2>
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

        {/* Teaching approach */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Notre méthode</h2>
          <p className="text-muted-foreground mb-6">Une approche progressive, contextualisée pour les élèves tunisiens.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Heart, title: "Notre mission", desc: "Rendre l'anglais accessible et agréable pour chaque élève tunisien, quel que soit son niveau de départ." },
              { icon: BookOpen, title: "Nos livres", desc: "Conçus avec soin, alignés sur le programme officiel, et enrichis d'exercices pratiques et de corrigés détaillés." },
              { icon: Award, title: "Notre engagement", desc: "Qualité pédagogique, clarté des explications et accompagnement continu des élèves vers la réussite." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-card p-5">
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-serif font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inside the books */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Ce que contiennent nos livres</h2>
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

        {/* CTA to grade hubs */}
        <div className="rounded-xl bg-secondary p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">Choisir un niveau</h2>
          <p className="text-muted-foreground mb-6">Découvrez le livre adapté à chaque année scolaire.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {GRADES.map((g) => (
              <Button key={g} asChild variant="outline">
                <Link to={`/livres/${GRADE_CONFIG[g].slug}`}>{GRADE_CONFIG[g].label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}