import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { MessageCircle, Mail, Package } from "lucide-react";

const ORDER_STEPS = [
  "Message us on WhatsApp with the student's level (4th–9th).",
  "We confirm availability and price.",
  "We coordinate delivery or pickup privately.",
];

export default function HowToOrder() {
  return (
    <Layout>
      <SEOHead
        title="How to Order — English With Hinda"
        description="Order English textbooks for Tunisian students via WhatsApp. Simple, fast, and reliable delivery."
      />

      <section className="container py-10 md:py-16 max-w-3xl">
        <RevealOnScroll>
          <h1 className="font-serif text-4xl font-bold mb-2">How to Order</h1>
          <p className="text-muted-foreground mb-10">Simple ordering via WhatsApp — fast and reliable.</p>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2">
          <RevealOnScroll>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <MessageCircle className="h-8 w-8 text-primary mb-4" />
              <h2 className="font-serif text-xl font-bold mb-3">Order via WhatsApp</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Send the level (4th–9th) and your city. We'll confirm availability and price.
              </p>
              <ol className="space-y-3 mb-6">
                {ORDER_STEPS.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
              <Button asChild className="w-full">
                <a href="https://wa.me/21600000000?text=Hello%2C%20I%20would%20like%20to%20order%20a%20book.%20Thank%20you!" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Open WhatsApp
                </a>
              </Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <Package className="h-8 w-8 text-primary mb-4" />
              <h2 className="font-serif text-xl font-bold mb-3">Bulk orders (schools / bookstores)</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Contact us for bulk pricing and distribution options. Special rates available for schools and bookstores.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact?topic=pro">
                  <Mail className="mr-2 h-4 w-4" /> Contact us
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </Layout>
  );
}
