import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blog-posts";
import { GRADE_CONFIG, Grade } from "@/lib/types";
import { Search, Clock } from "lucide-react";

const CATEGORIES = ["Tous", "Élèves", "Parents", "Enseignants"];
const GRADES: Grade[] = [5, 6, 7, 8, 9];

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

export default function BlogIndex() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      if (categoryFilter !== "Tous" && p.category !== categoryFilter) return false;
      if (gradeFilter && p.gradeOptional !== gradeFilter) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, categoryFilter, gradeFilter]);

  const chipClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`;

  return (
    <Layout>
      <SEOHead
        title="Blog — English With Hinda"
        description="Conseils, astuces et guides pour réussir en anglais. Articles pour élèves, parents et enseignants."
      />

      <section className="container py-12">
        <h1 className="font-serif text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground mb-8">Conseils et guides pratiques pour réussir en anglais.</p>

        {/* Author box */}
        <div className="mb-8 flex items-center gap-4 rounded-xl border bg-card p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-xl font-bold shrink-0">H</div>
          <div>
            <p className="font-serif font-semibold">Hinda</p>
            <p className="text-sm text-muted-foreground">Enseignante d'anglais depuis plus de 15 ans et auteure de livres pour les élèves tunisiens.</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher un article…" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategoryFilter(c)} className={chipClass(categoryFilter === c)}>{c}</button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setGradeFilter(null)} className={chipClass(!gradeFilter)}>Tous niveaux</button>
            {GRADES.map((g) => (
              <button key={g} onClick={() => setGradeFilter(g)} className={chipClass(gradeFilter === g)}>{g}ème</button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((post) => (
            <article key={post.id} className="group rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex gap-2 mb-3 flex-wrap">
                <Badge variant="outline">{post.category}</Badge>
                {post.gradeOptional && (
                  <Badge variant="secondary">{GRADE_CONFIG[post.gradeOptional].label}</Badge>
                )}
              </div>
              <h2 className="font-serif text-lg font-semibold">
                <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {post.content.replace(/## /g, "").substring(0, 200)}…
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Par {post.authorName}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readingTime(post.content)} min</span>
                  <span>{new Date(post.publishDate).toLocaleDateString("fr-TN")}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Aucun article trouvé.</p>
        )}
      </section>
    </Layout>
  );
}