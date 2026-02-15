import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";
import { books } from "@/data/books";
import { GRADE_CONFIG } from "@/lib/types";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

function extractHeadings(content: string): string[] {
  return content.split("\n").filter((l) => l.startsWith("## ")).map((l) => l.replace("## ", ""));
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");

  if (!post) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold">Article non trouvé</h1>
          <Button asChild className="mt-4"><Link to="/blog">Retour au blog</Link></Button>
        </div>
      </Layout>
    );
  }

  const headings = extractHeadings(post.content);
  const gradeBooks = post.gradeOptional ? books.filter((b) => b.grade === post.gradeOptional) : [];
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://englishwithhinda.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://englishwithhinda.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <Layout>
      <SEOHead title={post.seoTitle} description={post.seoDescription} jsonLd={breadcrumbSchema} />

      <article className="container py-12 max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/blog"><ArrowLeft className="mr-1 h-4 w-4" /> Retour au blog</Link>
        </Button>

        <div className="flex gap-2 mb-4 flex-wrap">
          <Badge variant="outline">{post.category}</Badge>
          {post.gradeOptional && <Badge variant="secondary">{GRADE_CONFIG[post.gradeOptional].label}</Badge>}
        </div>

        <h1 className="font-serif text-3xl font-bold md:text-4xl">{post.title}</h1>

        {/* Author + meta */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif font-bold text-sm shrink-0">H</div>
          <div className="text-sm">
            <p className="font-semibold">{post.authorName}</p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span>{new Date(post.publishDate).toLocaleDateString("fr-TN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readingTime(post.content)} min de lecture</span>
            </div>
          </div>
        </div>

        {/* Table of contents */}
        {headings.length > 0 && (
          <nav className="mt-8 rounded-lg border bg-muted/50 p-4">
            <p className="font-semibold text-sm mb-2">Sommaire</p>
            <ul className="space-y-1">
              {headings.map((h, i) => (
                <li key={i}>
                  <a href={`#section-${i}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {i + 1}. {h}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Content */}
        <div className="mt-8">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              const headingIndex = headings.indexOf(paragraph.replace("## ", ""));
              return (
                <h2 key={i} id={`section-${headingIndex}`} className="font-serif text-xl font-bold mt-8 mb-3 scroll-mt-24">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
          })}
        </div>

        {/* Related books */}
        {gradeBooks.length > 0 && (
          <div className="mt-12 rounded-xl border bg-card p-6">
            <h2 className="font-serif text-lg font-bold mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Livre recommandé
            </h2>
            {gradeBooks.map((book) => (
              <Link
                key={book.id}
                to={`/livre/${book.slug}`}
                className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="h-16 w-12 shrink-0 rounded bg-muted overflow-hidden">
                  <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-sm">{book.title}</h3>
                  <p className="text-xs text-muted-foreground">{book.descriptionShort}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-8">
            <h2 className="font-serif text-lg font-bold mb-4">Articles similaires</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow">
                  <Badge variant="outline" className="mb-2">{p.category}</Badge>
                  <h3 className="font-serif font-semibold text-sm">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.content.replace(/## /g, "").substring(0, 100)}…</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-12 rounded-xl bg-secondary p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Restez informé</h2>
          <p className="text-sm text-muted-foreground mb-4">Recevez nos nouveaux articles et ressources gratuites.</p>
          <form className="flex gap-2 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Votre email" className="flex-1" />
            <Button type="submit">S'inscrire</Button>
          </form>
        </div>
      </article>
    </Layout>
  );
}