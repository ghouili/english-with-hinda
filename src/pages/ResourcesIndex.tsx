import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/RevealOnScroll";
import { resources } from "@/data/resources";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { Search, FileText, Headphones, BookOpen, ArrowRight } from "lucide-react";

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];
const FORMAT_ICONS = { pdf: FileText, audio: Headphones, article: BookOpen };
const FORMATS = ["pdf", "audio", "article"] as const;
const SKILLS = ["grammar", "vocabulary", "reading", "writing", "listening"] as const;

const GRADE_BADGE: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

const SKILL_LABELS: Record<string, string> = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  reading: "Reading",
  writing: "Writing",
  listening: "Listening",
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
    `rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`;

  return (
    <Layout>
      <SEOHead
        title="Free Resources — English With Hinda"
        description="Free revision sheets, exercises, and audio for English practice. From 4th to 9th year."
      />

      <section className="container py-10 md:py-16">
        <RevealOnScroll>
          <h1 className="font-serif text-4xl font-bold mb-2">Free Resources</h1>
          <p className="text-muted-foreground mb-8">Revision sheets, exercises, and audio to complement our books.</p>
        </RevealOnScroll>

        {/* Search */}
        <RevealOnScroll>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search a resource…" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {/* Filters */}
          <div className="space-y-3 mb-8">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-xs font-medium text-muted-foreground w-14">Level</span>
              <button onClick={() => setGradeFilter(null)} className={chipClass(!gradeFilter)}>All</button>
              {GRADES.map((g) => (
                <button key={g} onClick={() => setGradeFilter(g)} className={chipClass(gradeFilter === g)}>{g === 7 ? "7th" : `${g}th`}</button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-xs font-medium text-muted-foreground w-14">Format</span>
              <button onClick={() => setFormatFilter(null)} className={chipClass(!formatFilter)}>All</button>
              {FORMATS.map((f) => (
                <button key={f} onClick={() => setFormatFilter(f)} className={chipClass(formatFilter === f)}>{f.toUpperCase()}</button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-xs font-medium text-muted-foreground w-14">Skill</span>
              <button onClick={() => setSkillFilter(null)} className={chipClass(!skillFilter)}>All</button>
              {SKILLS.map((s) => (
                <button key={s} onClick={() => setSkillFilter(s)} className={chipClass(skillFilter === s)}>{SKILL_LABELS[s]}</button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const Icon = FORMAT_ICONS[r.format];
            return (
              <StaggerItem key={r.id}>
                <Link
                  to={`/resources/${r.slug}`}
                  className="group rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={GRADE_BADGE[r.grade]}>{GRADE_CONFIG[r.grade].shortLabel}</Badge>
                    <Badge variant="outline" className="capitalize">{r.format.toUpperCase()}</Badge>
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
                    View resource <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-2">No resources found.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
