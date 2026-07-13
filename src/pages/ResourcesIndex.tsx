import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Grade } from "@/lib/types";
import { fetchResources } from "@/lib/api";
import { Search, Headphones, ArrowRight, BookOpen } from "lucide-react";

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

const GRADE_BADGE: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

interface ApiResource {
  id: string;
  slug: string;
  title: string;
  grade: Grade;
  format: string;
  summary: string;
  pageNumber?: number | null;
}

export default function ResourcesIndex() {
  const { t } = useTranslation();
  const [resources, setResources] = useState<ApiResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);

  useEffect(() => {
    fetchResources()
      .then(setResources)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (gradeFilter && r.grade !== gradeFilter) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [resources, search, gradeFilter]);

  const chipClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-medium transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground hover:bg-accent"
    }`;

  return (
    <Layout>
      <SEOHead
        title={t("resourcesPage.title") + " — English With Henda"}
        description={t("resourcesPage.subtitle")}
      />

      <section className="container py-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">
          {t("resourcesPage.title")}
        </h1>
        <p className="text-muted-foreground mb-8">{t("resourcesPage.subtitle")}</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("resourcesPage.search")}
            className="ps-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground w-14 shrink-0">
              {t("resourcesPage.levelLabel")}
            </span>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
              <button onClick={() => setGradeFilter(null)} className={chipClass(!gradeFilter)}>
                {t("resourcesPage.allLevels")}
              </button>
              {GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={chipClass(gradeFilter === g) + " whitespace-nowrap"}
                >
                  {t(`grades.${g}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="flex gap-2 mb-3">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="mt-1 h-3 w-2/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && loadError && (
          <p className="text-center text-muted-foreground py-12">
            Could not load resources. Please try again later.
          </p>
        )}

        {!loading && !loadError && (
          <ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <Link
                  key={r.id}
                  to={`/resources/${r.slug}`}
                  className="group rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge className={GRADE_BADGE[r.grade]}>{t(`grades.${r.grade}`)}</Badge>
                    {r.pageNumber != null && (
                      <Badge variant="secondary" className="gap-1">
                        <BookOpen className="h-3 w-3" /> Page {r.pageNumber}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-start gap-3">
                    <Headphones className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.summary}</p>
                    </div>
                  </div>
                  <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                    {t("resourcesPage.viewResource")} <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        )}

        {!loading && !loadError && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">{t("resourcesPage.noResults")}</p>
        )}
      </section>
    </Layout>
  );
}
