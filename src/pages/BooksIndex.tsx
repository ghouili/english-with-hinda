import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { GradeCard } from "@/components/GradeCard";
import { BookCard } from "@/components/BookCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { books } from "@/data/books";
import { Grade } from "@/lib/types";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

export default function BooksIndex() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);
  const { t } = useTranslation();

  const filtered = useMemo(() => {
    return books.filter((b) => {
      if (gradeFilter && b.grade !== gradeFilter) return false;
      if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.descriptionShort.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, gradeFilter]);

  const chipClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`;

  return (
    <Layout>
      <SEOHead
        title="Books — English With Henda"
        description="Discover all our English books for Tunisian students from 4th to 9th year."
      />

      <section className="container py-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">{t("booksPage.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("booksPage.subtitle")}</p>

        <ScrollReveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4 mb-10">
            {GRADES.map((g) => (
              <GradeCard key={g} grade={g} />
            ))}
          </div>
        </ScrollReveal>

        {/* Search and filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={t("booksPage.search")} className="ps-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setGradeFilter(null)} className={chipClass(!gradeFilter)}>{t("booksPage.allLevels")}</button>
            {GRADES.map((g) => (
              <button key={g} onClick={() => setGradeFilter(g)} className={chipClass(gradeFilter === g)}>{t(`grades.${g}`)}</button>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} showActions />
            ))}
          </div>
        </ScrollReveal>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">{t("booksPage.noResults")}</p>
        )}
      </section>
    </Layout>
  );
}
