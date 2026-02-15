import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { stockists, getUniqueCities } from "@/data/stockists";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export default function WhereToBuy() {
  const cities = getUniqueCities();
  const [cityFilter, setCityFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return cityFilter ? stockists.filter((s) => s.city === cityFilter) : stockists;
  }, [cityFilter]);

  return (
    <Layout>
      <SEOHead
        title="Où acheter — English With Hinda"
        description="Trouvez nos livres d'anglais dans les librairies en Tunisie. Tunis, Sfax, Sousse et plus."
      />

      <section className="container py-12">
        <h1 className="font-serif text-4xl font-bold mb-2">Où acheter nos livres</h1>
        <p className="text-muted-foreground mb-8">Retrouvez nos livres dans les librairies partenaires à travers la Tunisie.</p>

        {/* City filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button onClick={() => setCityFilter(null)} className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${!cityFilter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
            Toutes les villes
          </button>
          {cities.map((c) => (
            <button key={c} onClick={() => setCityFilter(c)} className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${cityFilter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div key={s.id} className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="font-serif font-semibold">{s.name}</h3>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {s.address}</p>
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {s.phone}</p>
                <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {s.hours}</p>
              </div>
              {s.notes && <p className="mt-2 text-xs text-muted-foreground italic">{s.notes}</p>}
              <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                Voir sur la carte →
              </a>
            </div>
          ))}
        </div>

        {/* WhatsApp + B2B */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-serif text-xl font-bold mb-3">Commander via WhatsApp</h2>
            <p className="text-sm text-muted-foreground mb-4">Vous pouvez commander directement en nous contactant sur WhatsApp.</p>
            <Button asChild>
              <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Nous contacter
              </a>
            </Button>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-serif text-xl font-bold mb-3">Vous êtes libraire ?</h2>
            <p className="text-sm text-muted-foreground mb-4">Devenez revendeur de nos livres. Contactez-nous pour les conditions de distribution.</p>
            <Button asChild variant="outline">
              <a href="mailto:contact@englishwithhinda.com">Nous écrire</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
