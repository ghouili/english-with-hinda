import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

export function GradeCard({ grade }: GradeCardProps) {
  const { t } = useTranslation();
  const config = GRADE_CONFIG[grade];
  const gradeLabel = t(`grades.${grade}`);
  const gradeDesc = t(`grades.desc.${grade}`, { defaultValue: "" });

  return (
    <Link
      to={`/books/${config.slug}`}
      className="group relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className={`${GRADE_BG_CLASSES[grade]} p-5 sm:p-6 min-h-[140px] sm:min-h-[160px] flex flex-col justify-end`}>
        <span className="text-xs sm:text-sm font-medium uppercase tracking-wider opacity-80">{t("grades.year")}</span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold">{gradeLabel}</h3>
        {gradeDesc && <p className="mt-1 text-xs sm:text-sm opacity-90">{gradeDesc}</p>}
      </div>
    </Link>
  );
}
