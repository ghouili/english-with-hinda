import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEOHead
        title="404 — Page Not Found | English With Hinda"
        description="The page you are looking for does not exist. Explore books and free resources for Tunisian students."
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/40 to-background text-foreground min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/10" />
          <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-primary/5" />
        </div>

        <div className="container relative py-12 md:py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-6 md:p-10 text-center shadow-xl">
            <p className="text-sm md:text-base tracking-wide uppercase font-semibold text-primary">
              Error 404
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Page not found
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              The page <span className="font-semibold text-foreground">{location.pathname}</span> doesn&apos;t exist or may have been moved.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="font-semibold w-full sm:w-auto shadow-lg">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-semibold w-full sm:w-auto"
              >
                <Link to="/books">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Books
                </Link>
              </Button>
            </div>

            <div className="mt-4">
              <Button
                asChild
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <Link to="/resources">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
