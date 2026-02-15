import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { resources } from "@/data/resources";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { Search, FileText, Headphones, BookOpen, ArrowRight } from "lucide-react";

const GRADES: Grade[] = [5, 6, 7, 8, 9];
const FORMAT_ICONS = { pdf: FileText, audio: Headphones, article: BookOpen };
const FORMATS = ["pdf", "audio", "article"] as const;
const SKILLS = ["grammar", "vocabulary", "reading", "writing", "listening"] as const;

const GRADE_BADGE: Record<Grade, string> = {
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

const SKILL_LABELS: Record<string, string> = {
  grammar: "Grammaire",
  vocabulary: "Vocabulaire",
  reading: "Lecture",
  writing: "Rédaction",
  listening: "Écoute",
};

const FORMAT_LABELS: Record<string, string> = {
  pdf: "PDF",
  audio: "Audio",
  article: "Article",
};

export default function ResourcesIndex() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);
  const [formatFilter, setFormatFilter] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (gradeFilter && r.grade !== gradeFilter) return false;
      if (formatFilter && r.format !== formatFilter) return false;
      if (skillFilter && r.skill !== skillFilter) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, gradeFilter, formatFilter, skillFilter]);

  const chipClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`;

  return (
    <Layout>
      <SEOHead
        title="Ressources gratuites — English With Hinda"
        description="Fiches, exercices et audio gratuits pour réviser l'anglais. De la 5ème à la 9ème année."
      />

      <section className="container py-12">
        <h1 className="font-serif text-4xl font-bold mb-2">Ressources gratuites</h1>
        <p className="text-muted-foreground mb-8">Fiches de révision, exercices et audio pour compléter nos livres.</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher une ressource…" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          {/* Grade */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs font-medium text-muted-foreground w-16">Niveau</span>
            <button onClick={() => setGradeFilter(null)} className={chipClass(!gradeFilter)}>Tous</button>
            {GRADES.map((g) => (
              <button key={g} onClick={() => setGradeFilter(g)} className={chipClass(gradeFilter === g)}>{g}ème</button>
            ))}
          </div>
          {/* Format */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs font-medium text-muted-foreground w-16">Format</span>
            <button onClick={() => setFormatFilter(null)} className={chipClass(!formatFilter)}>Tous</button>
            {FORMATS.map((f) => (
              <button key={f} onClick={() => setFormatFilter(f)} className={chipClass(formatFilter === f)}>{FORMAT_LABELS[f]}</button>
            ))}
          </div>
          {/* Skill */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs font-medium text-muted-foreground w-16">Comp.</span>
            <button onClick={() => setSkillFilter(null)} className={chipClass(!skillFilter)}>Toutes</button>
            {SKILLS.map((s) => (
              <button key={s} onClick={() => setSkillFilter(s)} className={chipClass(skillFilter === s)}>{SKILL_LABELS[s]}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const Icon = FORMAT_ICONS[r.format];
            return (
              <Link
                key={r.id}
                to={`/ressources/${r.slug}`}
                className="group rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={GRADE_BADGE[r.grade]}>{GRADE_CONFIG[r.grade].label}</Badge>
                  <Badge variant="outline" className="capitalize">{FORMAT_LABELS[r.format]}</Badge>
                  <Badge variant="secondary">{SKILL_LABELS[r.skill]}</Badge>
                </div>
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.summary}</p>
                  </div>
                </div>
                <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                  Voir la ressource <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
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