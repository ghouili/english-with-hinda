import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { resources } from "@/data/resources";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { Search, FileText, Headphones, BookOpen } from "lucide-react";

const GRADES: Grade[] = [5, 6, 7, 8, 9];
const FORMAT_ICONS = { pdf: FileText, audio: Headphones, article: BookOpen };
const GRADE_BADGE: Record<Grade, string> = {
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

export default function ResourcesIndex() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (gradeFilter && r.grade !== gradeFilter) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, gradeFilter]);

  return (
    <Layout>
      <SEOHead
        title="Ressources gratuites — English With Hinda"
        description="Fiches, exercices et audio gratuits pour réviser l'anglais. De la 5ème à la 9ème année."
      />

      <section className="container py-12">
        <h1 className="font-serif text-4xl font-bold mb-2">Ressources gratuites</h1>
        <p className="text-muted-foreground mb-8">Fiches de révision, exercices et audio pour compléter nos livres.</p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher…" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setGradeFilter(null)} className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${!gradeFilter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>Tous</button>
            {GRADES.map((g) => (
              <button key={g} onClick={() => setGradeFilter(g)} className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${gradeFilter === g ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>{g}ème</button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const Icon = FORMAT_ICONS[r.format];
            return (
              <div key={r.id} className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${GRADE_BADGE[r.grade]}`}>{GRADE_CONFIG[r.grade].label}</Badge>
                  <Badge variant="outline" className="capitalize">{r.format}</Badge>
                </div>
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{r.summary}</p>
                  </div>
                </div>
                {r.relatedBookIds.length > 0 && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Lié au livre : <Link to={`/livres/${GRADE_CONFIG[r.grade].slug}`} className="text-primary hover:underline">{GRADE_CONFIG[r.grade].label}</Link>
                  </p>
                )}
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Aucune ressource trouvée.</p>
        )}
      </section>
    </Layout>
  );
}
