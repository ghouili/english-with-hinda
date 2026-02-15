import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { GradeCard } from "@/components/GradeCard";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books } from "@/data/books";
import { stockists } from "@/data/stockists";
import { Grade } from "@/lib/types";
import { ArrowRight, BookOpen, Download, Star, MapPin, MessageCircle } from "lucide-react";

const GRADES: Grade[] = [5, 6, 7, 8, 9];

const TESTIMONIALS = [
  { name: "Sana M.", role: "Mère d'élève, Tunis", text: "Mon fils a beaucoup progressé grâce aux livres de Hinda. Les exercices sont clairs et adaptés au programme tunisien." },
  { name: "Ahmed B.", role: "Enseignant, Sfax", text: "J'utilise ces livres en classe. Mes élèves sont plus motivés et leurs résultats se sont nettement améliorés." },
  { name: "Fatma K.", role: "Élève de 9ème, Sousse", text: "Les sujets type brevet m'ont vraiment aidée à me préparer. J'ai eu 18/20 au brevet d'anglais !" },
];

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "English With Hinda",
  description: "Éditeur de livres d'anglais pour les élèves tunisiens de la 5ème à la 9ème année.",
  url: "https://englishwithhinda.com",
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: ["French", "English"] },
};

export default function HomePage() {
  const featuredBooks = books.slice(0, 4);
  const topCities = [...new Set(stockists.map((s) => s.city))].slice(0, 5);

  return (
    <Layout>
      <SEOHead
        title="English With Hinda — Livres d'anglais pour élèves tunisiens"
        description="Des livres d'anglais conçus pour les élèves tunisiens de la 5ème à la 9ème année. Grammaire, vocabulaire et préparation au brevet."
        jsonLd={ORGANIZATION_SCHEMA}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              L'anglais, simplifié pour chaque élève tunisien
            </h1>
            <p className="mt-4 text-lg opacity-90 md:text-xl">
              Des livres conçus par des enseignants, adaptés au programme officiel, de la 5ème à la 9ème année.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to="/livres">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Découvrir les livres
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                <Link to="/ressources">
                  <Download className="mr-2 h-5 w-5" />
                  Ressources gratuites
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Subtle decorative element */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary-foreground/5" />
      </section>

      {/* Grade cards */}
      <section className="container py-16">
        <h2 className="font-serif text-3xl font-bold text-center mb-2">Choisissez votre niveau</h2>
        <p className="text-center text-muted-foreground mb-10">Un livre adapté pour chaque année scolaire</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {GRADES.map((g) => (
            <GradeCard key={g} grade={g} />
          ))}
        </div>
      </section>

      {/* Featured books */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold">Nos livres</h2>
            <Button asChild variant="ghost">
              <Link to="/livres" className="flex items-center gap-1">
                Voir tout <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16">
        <h2 className="font-serif text-3xl font-bold text-center mb-10">Ce qu'ils en disent</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-grade-7 text-grade-7" />
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

      {/* Newsletter */}
      <section className="bg-secondary py-16">
        <div className="container max-w-xl text-center">
          <h2 className="font-serif text-3xl font-bold mb-3">Restez informé</h2>
          <p className="text-muted-foreground mb-6">
            Recevez nos ressources gratuites et nos nouveautés directement dans votre boîte mail.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Votre adresse e-mail" className="flex-1" />
            <Button type="submit">S'inscrire</Button>
          </form>
        </div>
      </section>

      {/* Where to buy preview */}
      <section className="container py-16">
        <h2 className="font-serif text-3xl font-bold text-center mb-2">Où acheter nos livres</h2>
        <p className="text-center text-muted-foreground mb-8">Disponibles dans les librairies à travers la Tunisie</p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {topCities.map((city) => (
            <span key={city} className="flex items-center gap-1 rounded-full bg-muted px-4 py-2 text-sm font-medium">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              {city}
            </span>
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline">
            <Link to="/ou-acheter">
              Voir tous les points de vente <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
