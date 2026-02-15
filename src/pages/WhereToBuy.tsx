import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { stockists, getUniqueCities } from "@/data/stockists";
import { MapPin, Phone, Clock, MessageCircle, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WhereToBuy() {
  const cities = getUniqueCities();
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return cityFilter ? stockists.filter((s) => s.city === cityFilter) : stockists;
  }, [cityFilter]);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({ title: "Adresse copiée", description: address });
  };

  const chipClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`;

  return (
    <Layout>
      <SEOHead
        title="Où acheter — English With Hinda"
        description="Trouvez nos livres d'anglais dans les librairies en Tunisie. Tunis, Sfax, Sousse et plus."
      />

      <section className="container py-12">
        <h1 className="font-serif text-4xl font-bold mb-2">Où acheter nos livres</h1>
        <p className="text-muted-foreground mb-8">
          Retrouvez nos livres dans {stockists.length} librairies partenaires à travers la Tunisie.
        </p>

        {/* City filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button onClick={() => setCityFilter(null)} className={chipClass(!cityFilter)}>
            Toutes les villes ({stockists.length})
          </button>
          {cities.map((c) => {
            const count = stockists.filter((s) => s.city === c).length;
            return (
              <button key={c} onClick={() => setCityFilter(c)} className={chipClass(cityFilter === c)}>
                {c} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div key={s.id} className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="font-serif font-semibold">{s.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{s.city}</p>
              <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" /> {s.address}</p>
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0" /> <a href={`tel:${s.phone}`} className="hover:text-foreground">{s.phone}</a></p>
                <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 shrink-0" /> {s.hours}</p>
              </div>
              {s.notes && <p className="mt-2 text-xs text-muted-foreground italic">{s.notes}</p>}
              <div className="mt-4 flex gap-2 flex-wrap">
                <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  <ExternalLink className="h-3 w-3" /> Carte
                </a>
                <button onClick={() => copyAddress(s.address)} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  <Copy className="h-3 w-3" /> Copier
                </button>
                <a href={`tel:${s.phone}`} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  <Phone className="h-3 w-3" /> Appeler
                </a>
                <a
                  href={`https://wa.me/21600000000?text=${encodeURIComponent(`Bonjour, je souhaite savoir si le livre est disponible chez ${s.name} à ${s.city}. Merci !`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <MessageCircle className="h-3 w-3" /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp + B2B */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-serif text-xl font-bold mb-3">Commander via WhatsApp</h2>
            <p className="text-sm text-muted-foreground mb-4">Commandez directement en nous contactant sur WhatsApp. Précisez le livre et la ville souhaitée.</p>
            <Button asChild>
              <a href="https://wa.me/21600000000?text=Bonjour%2C%20je%20souhaite%20commander%20un%20livre.%20Merci%20!" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Commander maintenant
              </a>
            </Button>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-serif text-xl font-bold mb-3">Vous êtes libraire ou école ?</h2>
            <p className="text-sm text-muted-foreground mb-4">Demandez notre catalogue et conditions de distribution. Tarifs spéciaux pour les commandes groupées.</p>
            <Button asChild variant="outline">
              <Link to="/contact?topic=pro">Demander le catalogue</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}