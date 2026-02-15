import { Link } from "react-router-dom";
import { Book, Grade, GRADE_CONFIG } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const GRADE_BADGE_CLASSES: Record<Grade, string> = {
  5: "bg-grade-5 text-grade-5-foreground hover:bg-grade-5/90",
  6: "bg-grade-6 text-grade-6-foreground hover:bg-grade-6/90",
  7: "bg-grade-7 text-grade-7-foreground hover:bg-grade-7/90",
  8: "bg-grade-8 text-grade-8-foreground hover:bg-grade-8/90",
  9: "bg-grade-9 text-grade-9-foreground hover:bg-grade-9/90",
};

export function BookCard({ book }: { book: Book }) {
  const config = GRADE_CONFIG[book.grade];

  return (
    <Link
      to={`/livre/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
        <img
          src={book.coverImage}
          alt={`Couverture ${book.title}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Badge className={`w-fit mb-2 ${GRADE_BADGE_CLASSES[book.grade]}`}>
          {config.label}
        </Badge>
        <h3 className="font-serif text-lg font-semibold text-card-foreground">{book.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{book.descriptionShort}</p>
        {book.priceTnd && (
          <p className="mt-auto pt-3 font-semibold text-foreground">{book.priceTnd} TND</p>
        )}
      </div>
    </Link>
  );
}
