import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { resources } from "@/data/resources";
import { books } from "@/data/books";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { ArrowLeft, Download, Headphones, FileText, BookOpen, MessageCircle } from "lucide-react";

const GRADE_BADGE: Record<Grade, string> = {
  4: "bg-grade-4 text-grade-4-foreground",
  5: "bg-grade-5 text-grade-5-foreground",
  6: "bg-grade-6 text-grade-6-foreground",
  7: "bg-grade-7 text-grade-7-foreground",
  8: "bg-grade-8 text-grade-8-foreground",
  9: "bg-grade-9 text-grade-9-foreground",
};

const FORMAT_META = {
  pdf: { icon: FileText, label: "PDF", action: "Download PDF" },
  audio: { icon: Headphones, label: "Audio", action: "Listen to audio" },
  article: { icon: BookOpen, label: "Article", action: "Read article" },
};

const SKILL_LABELS: Record<string, string> = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  reading: "Reading",
  writing: "Writing",
  listening: "Listening",
};

export default function ResourceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const resource = resources.find((r) => r.slug === slug);

  if (!resource) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">Resource not found</h1>
          <Button asChild className="mt-4"><Link to="/resources">Back to resources</Link></Button>
        </div>
      </Layout>
    );
  }

  const format = FORMAT_META[resource.format];
  const FormatIcon = format.icon;
  const relatedBooks = books.filter((b) => resource.relatedBookIds.includes(b.id));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://englishwithhinda.com/" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://englishwithhinda.com/resources" },
      { "@type": "ListItem", position: 3, name: resource.title },
    ],
  };

  return (
    <Layout>
      <SEOHead title={resource.seoTitle} description={resource.seoDescription} jsonLd={breadcrumbSchema} />

      <section className="container py-10 md:py-16 max-w-3xl">
        <RevealOnScroll>
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/resources"><ArrowLeft className="mr-1 h-4 w-4" /> Back to resources</Link>
          </Button>

          <div className="flex gap-2 mb-4 flex-wrap">
            <Badge className={GRADE_BADGE[resource.grade]}>{GRADE_CONFIG[resource.grade].shortLabel}</Badge>
            <Badge variant="outline">{format.label}</Badge>
            <Badge variant="secondary">{SKILL_LABELS[resource.skill] || resource.skill}</Badge>
          </div>

          <h1 className="font-serif text-3xl font-bold md:text-4xl">{resource.title}</h1>

          <div className="mt-6 rounded-xl border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FormatIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold mb-2">What the student will practice</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{resource.summary}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" /> {format.action}
              </a>
            </Button>
          </div>
        </RevealOnScroll>

        {relatedBooks.length > 0 && (
          <RevealOnScroll>
            <div className="mt-12">
              <h2 className="font-serif text-2xl font-bold mb-4">Related book(s)</h2>
              <div className="space-y-3">
                {relatedBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/book/${book.slug}`}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="h-20 w-16 shrink-0 overflow-hidden flex items-center justify-center">
                      <img src={book.coverImage} alt={book.title} className="h-full w-auto object-contain" loading="lazy" />
                    </div>
                    <div>
                      <Badge className={`mb-1 ${GRADE_BADGE[book.grade]}`}>{GRADE_CONFIG[book.grade].shortLabel}</Badge>
                      <h3 className="font-serif font-semibold text-sm">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{book.descriptionShort}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}

        <RevealOnScroll>
          <div className="mt-12 rounded-xl border bg-secondary p-6 text-center">
            <h2 className="font-serif text-xl font-bold mb-2">Need help?</h2>
            <p className="text-sm text-muted-foreground mb-4">Contact us for any questions about our resources or books.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button asChild variant="outline">
                <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </Layout>
  );
}
