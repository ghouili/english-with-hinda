import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog-posts";
import { GRADE_CONFIG } from "@/lib/types";

export default function BlogIndex() {
  return (
    <Layout>
      <SEOHead
        title="Blog — English With Hinda"
        description="Conseils, astuces et guides pour réussir en anglais. Articles pour élèves, parents et enseignants."
      />

      <section className="container py-12">
        <h1 className="font-serif text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground mb-10">Conseils et guides pratiques pour réussir en anglais.</p>

        {/* Author box */}
        <div className="mb-10 flex items-center gap-4 rounded-xl border bg-card p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-xl font-bold">H</div>
          <div>
            <p className="font-serif font-semibold">Hinda</p>
            <p className="text-sm text-muted-foreground">Enseignante et auteure de livres d'anglais pour les élèves tunisiens.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex gap-2 mb-3">
                <Badge variant="outline">{post.category}</Badge>
                {post.gradeOptional && (
                  <Badge variant="secondary">{GRADE_CONFIG[post.gradeOptional].label}</Badge>
                )}
              </div>
              <h2 className="font-serif text-lg font-semibold">
                <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {post.content.substring(0, 200)}…
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Par {post.authorName}</span>
                <span>{new Date(post.publishDate).toLocaleDateString("fr-TN")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
