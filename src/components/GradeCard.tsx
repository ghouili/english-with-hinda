import { Link } from "react-router-dom";
import { Grade, GRADE_CONFIG } from "@/lib/types";

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

const GRADE_DESCRIPTIONS: Record<Grade, string> = {
  4: "A solid start to learning English",
  5: "Build confidence and skills",
  6: "Expand your language abilities",
  7: "Explore the language in depth",
  8: "Prepare for exams with method",
  9: "Excel and succeed in final exams",
};

export function GradeCard({ grade }: GradeCardProps) {
  const config = GRADE_CONFIG[grade];

  return (
    <Link
      to={`/books/${config.slug}`}
      className="group relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className={`${GRADE_BG_CLASSES[grade]} p-5 sm:p-6 min-h-[140px] sm:min-h-[160px] flex flex-col justify-end`}>
        <span className="text-xs sm:text-sm font-medium uppercase tracking-wider opacity-80">Year</span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold">{config.label}</h3>
        <p className="mt-1 text-xs sm:text-sm opacity-90">{GRADE_DESCRIPTIONS[grade]}</p>
      </div>
    </Link>
  );
}
