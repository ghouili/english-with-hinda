import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { resources } from "@/data/resources";
import { books } from "@/data/books";
import { Grade } from "@/lib/types";
import { localizeResource, localizeBook } from "@/lib/useLocalized";
import { ArrowLeft, Headphones, MessageCircle } from "lucide-react";

const GRADE_BADGE: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

const FORMAT_ICONS = {
  audio: Headphones,
};

export default function ResourceDetail() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const rawResource = resources.find((r) => r.slug === slug);

  if (!rawResource) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">{t("resourceDetail.notFound")}</h1>
          <Button asChild className="mt-4"><Link to="/resources">{t("resourceDetail.backToResources")}</Link></Button>
        </div>
      </Layout>
    );
  }

  const resource = localizeResource(rawResource, i18n.language);
  const FormatIcon = FORMAT_ICONS[resource.format];
  const relatedBooks = books
    .filter((b) => resource.relatedBookIds.includes(b.id))
    .map((b) => localizeBook(b, i18n.language));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://englishwithhenda.com/" },
      { "@type": "ListItem", position: 2, name: t("nav.resources"), item: "https://englishwithhenda.com/resources" },
      { "@type": "ListItem", position: 3, name: resource.title },
    ],
  };

  return (
    <Layout>
      <SEOHead
        title={resource.seoTitle}
        description={resource.seoDescription}
        jsonLd={breadcrumbSchema}
      />

      <section className="container py-12 max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/resources"><ArrowLeft className="me-1 h-4 w-4" /> {t("resourceDetail.backToResources")}</Link>
        </Button>

        {/* Badges */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <Badge className={GRADE_BADGE[resource.grade]}>{t(`grades.${resource.grade}`)}</Badge>
          <Badge variant="secondary">{t(`skills.${resource.skill}`)}</Badge>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold md:text-4xl">{resource.title}</h1>

        {/* Summary */}
        <ScrollReveal>
          <div className="mt-6 rounded-xl border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FormatIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold mb-2">{t("resourceDetail.practiceTitle")}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{resource.summary}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Audio player */}
        <ScrollReveal>
          <div className="mt-6 rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Headphones className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-semibold">{t("resourceDetail.formatActions.audio")}</h2>
            </div>
            {resource.fileUrl && resource.fileUrl !== "#" ? (
              <audio
                controls
                className="w-full rounded-lg"
                src={resource.fileUrl}
              >
                {t("resourceDetail.audioNotSupported")}
              </audio>
            ) : (
              <p className="text-sm text-muted-foreground italic">{t("resourceDetail.audioComingSoon")}</p>
            )}
          </div>
        </ScrollReveal>

        {/* Related books */}
        {relatedBooks.length > 0 && (
          <ScrollReveal>
            <div className="mt-12">
              <h2 className="font-serif text-2xl font-bold mb-4">{t("resourceDetail.relatedBooks")}</h2>
              <div className="space-y-3">
                {relatedBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/book/${book.slug}`}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="h-20 w-16 shrink-0 rounded-lg bg-muted overflow-hidden">
                      <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <Badge className={`mb-1 ${GRADE_BADGE[book.grade]}`}>{t(`grades.${book.grade}`)}</Badge>
                      <h3 className="font-serif font-semibold text-sm">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{book.descriptionShort}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-12 rounded-xl border bg-secondary p-6 text-center">
            <h2 className="font-serif text-xl font-bold mb-2">{t("resourceDetail.needHelp")}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t("resourceDetail.needHelpDesc")}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href="https://wa.me/21692053416" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="me-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="ghost" className="w-full sm:w-auto">
                <Link to="/contact">{t("bookDetail.contactUs")}</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}
