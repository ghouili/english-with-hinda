import { Link } from "react-router-dom";
import { Book, Grade, GRADE_CONFIG } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const GRADE_BADGE_CLASSES: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground hover:bg-grade-4/90",
  5: "bg-grade-5 text-grade-5-foreground hover:bg-grade-5/90",
  6: "bg-grade-6 text-grade-6-foreground hover:bg-grade-6/90",
  7: "bg-grade-7 text-grade-7-foreground hover:bg-grade-7/90",
  8: "bg-grade-8 text-grade-8-foreground hover:bg-grade-8/90",
  9: "bg-grade-9 text-grade-9-foreground hover:bg-grade-9/90",
};

const SKILL_LABELS: Record<string, string> = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  reading: "Reading",
  writing: "Writing",
  listening: "Listening",
};

export function BookCard({ book, showActions = false }: { book: Book; showActions?: boolean }) {
  const config = GRADE_CONFIG[book.grade];

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <Link to={`/book/${book.slug}`} className="flex items-center justify-center p-4 bg-muted/30">
        <img
          src={book.coverImage}
          alt={`${book.title} book cover`}
          className="h-48 w-auto object-contain transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Badge className={`w-fit mb-2 ${GRADE_BADGE_CLASSES[book.grade]}`}>
          {config.shortLabel}
        </Badge>
        <h3 className="font-serif text-base font-semibold text-card-foreground leading-tight">
          <Link to={`/book/${book.slug}`} className="hover:text-primary transition-colors">{book.title}</Link>
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
              <Link to={`/book/${book.slug}`}>View book</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="text-xs">
              <a href={`https://wa.me/21600000000?text=${encodeURIComponent(book.whatsappInquiryTemplate)}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-3 w-3" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
