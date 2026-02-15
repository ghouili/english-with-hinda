import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { GradeCard } from "@/components/GradeCard";
import { BookCard } from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { books } from "@/data/books";
import { Grade } from "@/lib/types";
import { Search } from "lucide-react";

const GRADES: Grade[] = [5, 6, 7, 8, 9];
const SKILLS = ["grammar", "vocabulary", "reading", "writing", "listening"] as const;
const SKILL_LABELS: Record<string, string> = {
  grammar: "Grammaire",
  vocabulary: "Vocabulaire",
  reading: "Lecture",
  writing: "Rédaction",
  listening: "Écoute",
};

export default function BooksIndex() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);
  const [skillFilter, setSkillFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      if (gradeFilter && b.grade !== gradeFilter) return false;
      if (skillFilter && !b.skills.includes(skillFilter)) return false;
      if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.descriptionShort.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, gradeFilter, skillFilter]);

  const chipClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`;

  return (
    <Layout>
      <SEOHead
        title="Livres d'anglais — English With Hinda"
        description="Découvrez tous nos livres d'anglais pour les élèves tunisiens de la 5ème à la 9ème année."
      />

      <section className="container py-12">
        <h1 className="font-serif text-4xl font-bold mb-2">Nos livres</h1>
        <p className="text-muted-foreground mb-8">Un livre adapté pour chaque niveau, de la 5ème à la 9ème année.</p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-10">
          {GRADES.map((g) => (
            <GradeCard key={g} grade={g} />
          ))}
        </div>

        {/* Search and filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un livre…" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setGradeFilter(null)} className={chipClass(!gradeFilter)}>Tous niveaux</button>
            {GRADES.map((g) => (
              <button key={g} onClick={() => setGradeFilter(g)} className={chipClass(gradeFilter === g)}>{g}ème</button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setSkillFilter(null)} className={chipClass(!skillFilter)}>Toutes compétences</button>
            {SKILLS.map((s) => (
              <button key={s} onClick={() => setSkillFilter(s)} className={chipClass(skillFilter === s)}>{SKILL_LABELS[s]}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} showActions />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Aucun livre ne correspond à votre recherche.</p>
        )}
      </section>
    </Layout>
  );
}