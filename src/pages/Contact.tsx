import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail, Phone } from "lucide-react";

const FAQS = [
  { q: "Comment commander un livre ?", a: "Vous pouvez acheter nos livres en librairie ou commander via WhatsApp. Consultez notre page Où acheter pour trouver le point de vente le plus proche." },
  { q: "Livrez-vous à domicile ?", a: "Contactez-nous via WhatsApp pour discuter des options de livraison dans votre ville." },
  { q: "Proposez-vous des tarifs pour les écoles ?", a: "Oui, nous proposons des tarifs spéciaux pour les commandes groupées. Contactez-nous pour recevoir notre catalogue professionnel." },
  { q: "Les livres sont-ils disponibles dans ma ville ?", a: "Nos livres sont disponibles dans les principales villes de Tunisie. Consultez la page Où acheter ou contactez-nous si votre ville n'y figure pas." },
  { q: "Comment passer une commande groupée ?", a: "Sélectionnez 'Libraire / Distributeur' dans le formulaire ci-dessus ou contactez-nous directement par WhatsApp." },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Veuillez accepter la politique de confidentialité.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Layout>
      <SEOHead
        title="Contact — English With Hinda"
        description="Contactez-nous pour toute question sur nos livres d'anglais. Parents, enseignants et libraires bienvenus."
        jsonLd={faqSchema}
      />

      <section className="container py-12 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold mb-2">Contact</h1>
        <p className="text-muted-foreground mb-8">Une question ? Nous sommes là pour vous aider.</p>

        <div className="flex gap-4 mb-8 flex-wrap">
          <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm hover:shadow-sm transition-shadow">
            <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
          </a>
          <a href="mailto:contact@englishwithhinda.com" className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm hover:shadow-sm transition-shadow">
            <Mail className="h-4 w-4 text-primary" /> Email
          </a>
          <a href="tel:+21600000000" className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm hover:shadow-sm transition-shadow">
            <Phone className="h-4 w-4 text-primary" /> Téléphone
          </a>
        </div>

        {submitted ? (
          <div className="rounded-xl border bg-card p-8 text-center">
            <h2 className="font-serif text-xl font-bold mb-2">Merci !</h2>
            <p className="text-muted-foreground mb-4">Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.</p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>Envoyer un autre message</Button>
          </div>
        ) : (
          <form className="space-y-5 rounded-xl border bg-card p-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="topic">Vous êtes</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Choisissez…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent d'élève</SelectItem>
                  <SelectItem value="teacher">Enseignant(e)</SelectItem>
                  <SelectItem value="bookstore">Libraire / Distributeur</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nom</Label>
                <Input id="name" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" className="mt-1" required />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" className="mt-1" rows={5} required />
            </div>

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <Input name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked === true)}
              />
              <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
                J'accepte la <Link to="/confidentialite" className="text-primary hover:underline">politique de confidentialité</Link> et le traitement de mes données.
              </Label>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full">Envoyer</Button>
          </form>
        )}

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-lg border bg-muted/50 p-5">
                <h3 className="font-semibold text-sm">{faq.q}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}