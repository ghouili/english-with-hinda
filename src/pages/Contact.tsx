import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail, Phone } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please accept the privacy policy.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEOHead
        title="Contact — English With Henda"
        description="Get in touch with us for any questions about our English books. Parents, teachers and distributors welcome."
      />

      <section className="container py-12 max-w-2xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">Contact</h1>
        <p className="text-muted-foreground mb-8">Have a question? We're here to help.</p>

        <ScrollReveal>
          <div className="flex gap-3 sm:gap-4 mb-8 flex-wrap">
            <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm hover:shadow-sm transition-shadow flex-1 min-w-[120px] justify-center sm:flex-none">
              <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
            </a>
            <a href="mailto:contact@englishwithhenda.com" className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm hover:shadow-sm transition-shadow flex-1 min-w-[120px] justify-center sm:flex-none">
              <Mail className="h-4 w-4 text-primary" /> Email
            </a>
            <a href="tel:+21600000000" className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm hover:shadow-sm transition-shadow flex-1 min-w-[120px] justify-center sm:flex-none">
              <Phone className="h-4 w-4 text-primary" /> Phone
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {submitted ? (
            <div className="rounded-xl border bg-card p-8 text-center">
              <h2 className="font-serif text-xl font-bold mb-2">Thank you!</h2>
              <p className="text-muted-foreground mb-4">Your message has been sent. We'll get back to you as soon as possible.</p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
            </div>
          ) : (
            <form className="space-y-5 rounded-xl border bg-card p-5 sm:p-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="topic">I am a…</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choose…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="bookstore">Bookstore / Distributor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" className="mt-1" required />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" type="tel" className="mt-1" />
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
                  I agree to the <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link> and data processing.
                </Label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" size="lg">Send message</Button>
            </form>
          )}
        </ScrollReveal>
      </section>
    </Layout>
  );
}
