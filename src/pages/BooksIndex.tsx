import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { GradeCard } from "@/components/GradeCard";
import { BookCard } from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/RevealOnScroll";
import { books } from "@/data/books";
import { Grade } from "@/lib/types";
import { Search } from "lucide-react";

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];
const SKILLS = ["grammar", "vocabulary", "reading", "writing", "listening"] as const;
const SKILL_LABELS: Record<string, string> = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  reading: "Reading",
  writing: "Writing",
  listening: "Listening",
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
        title="English Textbooks — English With Hinda"
        description="Explore all English textbooks for Tunisian students from 4th to 9th year. Aligned with the official program."
      />

      <section className="container py-10 md:py-16">
        <RevealOnScroll>
          <h1 className="font-serif text-4xl font-bold mb-2">Our books</h1>
          <p className="text-muted-foreground mb-8">A book for every level, from 4th to 9th year.</p>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-3 gap-4 sm:grid-cols-6 mb-10">
          {GRADES.map((g) => (
            <StaggerItem key={g}>
              <GradeCard grade={g} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Search and filters */}
        <RevealOnScroll>
          <div className="space-y-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search a book…" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setGradeFilter(null)} className={chipClass(!gradeFilter)}>All levels</button>
              {GRADES.map((g) => (
                <button key={g} onClick={() => setGradeFilter(g)} className={chipClass(gradeFilter === g)}>{g === 7 ? "7th Form" : `${g}th Year`}</button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setSkillFilter(null)} className={chipClass(!skillFilter)}>All skills</button>
              {SKILLS.map((s) => (
                <button key={s} onClick={() => setSkillFilter(s)} className={chipClass(skillFilter === s)}>{SKILL_LABELS[s]}</button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {filtered.map((book) => (
            <StaggerItem key={book.id}>
              <BookCard book={book} showActions />
            </StaggerItem>
          ))}
        </StaggerContainer>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No books match your search.</p>
        )}
      </section>
    </Layout>
  );
}
