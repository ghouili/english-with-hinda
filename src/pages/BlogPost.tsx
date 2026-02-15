import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/data/blog-posts";
import { GRADE_CONFIG } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

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

  return (
    <Layout>
      <SEOHead title={post.seoTitle} description={post.seoDescription} />

      <article className="container py-12 max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/blog"><ArrowLeft className="mr-1 h-4 w-4" /> Retour au blog</Link>
        </Button>

        <div className="flex gap-2 mb-4">
          <Badge variant="outline">{post.category}</Badge>
          {post.gradeOptional && <Badge variant="secondary">{GRADE_CONFIG[post.gradeOptional].label}</Badge>}
        </div>

        <h1 className="font-serif text-3xl font-bold md:text-4xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <span>Par {post.authorName}</span>
          <span>•</span>
          <span>{new Date(post.publishDate).toLocaleDateString("fr-TN")}</span>
        </div>

        <div className="mt-8 prose prose-slate max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="font-serif text-xl font-bold mt-8 mb-3">{paragraph.replace("## ", "")}</h2>;
            }
            return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
          })}
        </div>
      </article>
    </Layout>
  );
}
