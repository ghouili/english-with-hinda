import { Link } from "react-router-dom";
import { Book, Grade, GRADE_CONFIG } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const GRADE_BADGE_CLASSES: Record<Grade, string> = {
  5: "bg-grade-5 text-grade-5-foreground hover:bg-grade-5/90",
  6: "bg-grade-6 text-grade-6-foreground hover:bg-grade-6/90",
  7: "bg-grade-7 text-grade-7-foreground hover:bg-grade-7/90",
  8: "bg-grade-8 text-grade-8-foreground hover:bg-grade-8/90",
  9: "bg-grade-9 text-grade-9-foreground hover:bg-grade-9/90",
};

const SKILL_LABELS: Record<string, string> = {
  grammar: "Grammaire",
  vocabulary: "Vocabulaire",
  reading: "Lecture",
  writing: "Rédaction",
  listening: "Écoute",
};

export function BookCard({ book, showActions = false }: { book: Book; showActions?: boolean }) {
  const config = GRADE_CONFIG[book.grade];

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <Link to={`/livre/${book.slug}`} className="aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
        <img
          src={book.coverImage}
          alt={`Couverture ${book.title}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Badge className={`w-fit mb-2 ${GRADE_BADGE_CLASSES[book.grade]}`}>
          {config.label}
        </Badge>
        <h3 className="font-serif text-lg font-semibold text-card-foreground">
          <Link to={`/livre/${book.slug}`} className="hover:text-primary transition-colors">{book.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{book.descriptionShort}</p>

        {/* Skills chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {book.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {SKILL_LABELS[skill] || skill}
            </span>
          ))}
        </div>

        {book.priceTnd && (
          <p className="mt-auto pt-3 font-semibold text-foreground">{book.priceTnd} TND</p>
        )}

        {showActions && (
          <div className="mt-3 flex gap-2">
            <Button asChild size="sm" className="flex-1 text-xs">
              <Link to={`/livre/${book.slug}`}>Voir le livre</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="text-xs">
              <Link to="/ou-acheter"><MapPin className="h-3 w-3" /></Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}