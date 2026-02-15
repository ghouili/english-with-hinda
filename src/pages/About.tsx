import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookOpen, Award, Heart } from "lucide-react";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "English With Hinda",
  description: "Éditeur de livres d'anglais pour les élèves tunisiens.",
  url: "https://englishwithhinda.com",
};

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="À propos — English With Hinda"
        description="Découvrez l'histoire de Hinda et sa mission : rendre l'anglais accessible à tous les élèves tunisiens."
        jsonLd={ORG_SCHEMA}
      />

      <section className="container py-12 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold mb-6">À propos</h1>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-3xl font-bold">H</div>
          <div>
            <h2 className="font-serif text-xl font-bold">Hinda</h2>
            <p className="text-muted-foreground">Enseignante d'anglais & auteure</p>
          </div>
        </div>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Passionnée par l'enseignement de l'anglais depuis plus de 15 ans, Hinda a consacré sa carrière à aider les élèves tunisiens à maîtriser cette langue essentielle. Forte de son expérience en classe, elle a constaté le besoin criant de supports pédagogiques adaptés au contexte tunisien.
          </p>
          <p>
            C'est ainsi qu'est née English With Hinda : une collection de livres pensés par et pour les élèves tunisiens, du premier contact avec l'anglais en 5ème année jusqu'à la réussite du brevet en 9ème.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
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
      </section>
    </Layout>
  );
}
