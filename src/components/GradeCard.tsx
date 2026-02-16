import { Link } from "react-router-dom";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { books } from "@/data/books";

interface GradeCardProps {
  grade: Grade;
}

const GRADE_BG_CLASSES: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

export function GradeCard({ grade }: GradeCardProps) {
  const config = GRADE_CONFIG[grade];
  const book = books.find((b) => b.grade === grade);

  return (
    <Link
      to={`/books/${config.slug}`}
      className="group relative flex flex-col items-center rounded-xl bg-card border shadow-sm p-4 transition-all hover:shadow-lg hover:-translate-y-1"
    >
      {book && (
        <img
          src={book.coverImage}
          alt={`${config.shortLabel} book cover`}
          className="h-32 w-auto object-contain mb-3 transition-transform group-hover:scale-105"
          loading="lazy"
        />
      )}
      <span className={`rounded-full px-3 py-1 text-xs font-bold ${GRADE_BG_CLASSES[grade]}`}>
        {config.shortLabel}
      </span>
    </Link>
  );
}
