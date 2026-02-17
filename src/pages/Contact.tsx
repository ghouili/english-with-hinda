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
import { MessageCircle, Mail, Phone, Send, CheckCircle } from "lucide-react";

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
        <ScrollReveal>
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">Contact</h1>
            <p className="text-muted-foreground">Questions? We're here to help.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-3 gap-3 mb-10">
            <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <a href="mailto:contact@englishwithhenda.com" className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">Email</span>
            </a>
            <a href="tel:+21600000000" className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">Phone</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {submitted ? (
            <div className="rounded-xl border bg-card p-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">Message sent!</h2>
              <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
            </div>
          ) : (
            <form className="space-y-6 rounded-xl border bg-card p-6 sm:p-8 shadow-sm" onSubmit={handleSubmit}>
              <h2 className="font-serif text-lg font-semibold">Send us a message</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="role">I am a…</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
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
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General question</SelectItem>
                      <SelectItem value="order">Order</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Your full name" className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" required />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" type="tel" placeholder="+216 XX XXX XXX" className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="contact-method">Preferred contact method</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" className="mt-1.5" rows={5} required />
              </div>

              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <Input name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
                  I agree to the <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link> and the processing of my data.
                </Label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" /> Send message
              </Button>
            </form>
          )}
        </ScrollReveal>
      </section>
    </Layout>
  );
}
