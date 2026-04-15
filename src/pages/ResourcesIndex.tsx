import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/ScrollReveal";
import { resources as staticResources } from "@/data/resources";
import { getLocalResources } from "@/lib/resource-storage";
import { Grade } from "@/lib/types";
import { localizeResource } from "@/lib/useLocalized";
import { Search, Headphones, ArrowRight } from "lucide-react";

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];
const FORMAT_ICON = Headphones;
const SKILLS = ["grammar", "vocabulary", "reading", "writing", "listening"] as const;

const GRADE_BADGE: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

export default function ResourcesIndex() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const [localResources, setLocalResources] = useState<ReturnType<typeof getLocalResources>>([]);

  useEffect(() => { setLocalResources(getLocalResources()); }, []);

  const allResources = useMemo(() => {
    const fromLocal = localResources.map((lr) => ({
      id: lr.id,
      slug: lr.id,
      title: lr.title,
      grade: (Number(lr.level.replace(/\D/g, "")) || 5) as Grade,
      skill: lr.skill,
      format: "audio" as const,
      summary: lr.description,
      fileUrl: lr.url,
      relatedBookIds: [],
      seoTitle: lr.title,
      seoDescription: lr.description,
    }));
    return [...staticResources, ...fromLocal];
  }, [localResources]);

  const filtered = useMemo(() => {
    return allResources.filter((r) => {
      if (gradeFilter && r.grade !== gradeFilter) return false;
      if (skillFilter && r.skill !== skillFilter) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }).map((r) => localizeResource(r, i18n.language));
  }, [search, gradeFilter, skillFilter, i18n.language]);

  const chipClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`;

  return (
    <Layout>
      <SEOHead
        title={t("resourcesPage.title") + " — English With Henda"}
        description={t("resourcesPage.subtitle")}
      />

      <section className="container py-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">{t("resourcesPage.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("resourcesPage.subtitle")}</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={t("resourcesPage.search")} className="ps-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground w-14 shrink-0">{t("resourcesPage.levelLabel")}</span>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
              <button onClick={() => setGradeFilter(null)} className={chipClass(!gradeFilter)}>{t("resourcesPage.allLevels")}</button>
              {GRADES.map((g) => (
                <button key={g} onClick={() => setGradeFilter(g)} className={chipClass(gradeFilter === g) + " whitespace-nowrap"}>{t(`grades.${g}`)}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground w-14 shrink-0">{t("resourcesPage.skillLabel")}</span>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
              <button onClick={() => setSkillFilter(null)} className={chipClass(!skillFilter)}>{t("resourcesPage.allSkills")}</button>
              {SKILLS.map((s) => (
                <button key={s} onClick={() => setSkillFilter(s)} className={chipClass(skillFilter === s) + " whitespace-nowrap"}>{t(`skills.${s}`)}</button>
              ))}
            </div>
          </div>
        </div>

        <ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => {
              const Icon = FORMAT_ICON;
              return (
                <Link
                  key={r.id}
                  to={`/resources/${r.slug}`}
                  className="group rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge className={GRADE_BADGE[r.grade]}>{t(`grades.${r.grade}`)}</Badge>
                    <Badge variant="secondary">{t(`skills.${r.skill}`)}</Badge>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{r.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.summary}</p>
                    </div>
                  </div>
                  <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                    {t("resourcesPage.viewResource")} <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">{t("resourcesPage.noResults")}</p>
        )}
      </section>
    </Layout>
  );
}
