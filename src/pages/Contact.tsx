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
import { useTranslation } from "react-i18next";
import { whatsappUrl, SITE } from "@/lib/site";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Honeypot — real users never fill this hidden field.
    if (data.get("website")) return;

    if (!consent) {
      setError(t("contact.form.consentError"));
      return;
    }
    setError("");

    const get = (k: string) => ((data.get(k) as string | null) ?? "").trim();
    const tLabel = (group: string, val: string) => (val ? t(`contact.form.${group}.${val}`) : "");

    const lines: string[] = [`Name: ${get("name")}`];
    if (get("role")) lines.push(`Role: ${tLabel("role", get("role"))}`);
    if (get("subject")) lines.push(`Subject: ${tLabel("subject", get("subject"))}`);
    if (get("email")) lines.push(`Email: ${get("email")}`);
    if (get("phone")) lines.push(`Phone: ${get("phone")}`);
    if (get("contactMethod")) lines.push(`Preferred contact: ${tLabel("contactMethod", get("contactMethod"))}`);
    lines.push("", "Message:", get("message"));

    const message = `New inquiry from englishwithhenda.com\n\n${lines.join("\n")}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
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
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">{t("contact.title")}</h1>
            <p className="text-muted-foreground">{t("contact.subtitle")}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-2 gap-3 mb-10">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{t("contact.channels.whatsapp")}</span>
            </a>
            {/* <a href="mailto:contact@learnenglish.com" className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{t("contact.channels.email")}</span>
            </a> */}
            <a href={`tel:${SITE.phoneTel}`} className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{t("contact.channels.phone")}</span>
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
              <h2 className="font-serif text-2xl font-bold mb-2">{t("contact.success.title")}</h2>
              <p className="text-muted-foreground mb-6">{t("contact.success.subtitle")}</p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>{t("contact.success.sendAnother")}</Button>
            </div>
          ) : (
            <form className="space-y-6 rounded-xl border bg-card p-6 sm:p-8 shadow-sm" onSubmit={handleSubmit}>
              <h2 className="font-serif text-lg font-semibold">{t("contact.form.title")}</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="role">{t("contact.form.role.label")}</Label>
                  <Select name="role">
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder={t("contact.form.role.placeholder")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">{t("contact.form.role.parent")}</SelectItem>
                      <SelectItem value="student">{t("contact.form.role.student")}</SelectItem>
                      <SelectItem value="teacher">{t("contact.form.role.teacher")}</SelectItem>
                      <SelectItem value="school">{t("contact.form.role.school")}</SelectItem>
                      <SelectItem value="bookstore">{t("contact.form.role.bookstore")}</SelectItem>
                      <SelectItem value="other">{t("contact.form.role.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subject">{t("contact.form.subject.label")}</Label>
                  <Select name="subject">
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder={t("contact.form.subject.placeholder")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">{t("contact.form.subject.general")}</SelectItem>
                      <SelectItem value="order">{t("contact.form.subject.order")}</SelectItem>
                      <SelectItem value="partnership">{t("contact.form.subject.partnership")}</SelectItem>
                      <SelectItem value="support">{t("contact.form.subject.support")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">{t("contact.form.name.label")}</Label>
                  <Input id="name" name="name" placeholder={t("contact.form.name.placeholder")} className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="email">{t("contact.form.email.label")}</Label>
                  <Input id="email" name="email" type="email" placeholder={t("contact.form.email.placeholder")} className="mt-1.5" required />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">{t("contact.form.phone.label")}</Label>
                <Input id="phone" name="phone" type="tel" placeholder={t("contact.form.phone.placeholder")} className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="contact-method">{t("contact.form.contactMethod.label")}</Label>
                <Select name="contactMethod">
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder={t("contact.form.contactMethod.placeholder")} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">{t("contact.form.contactMethod.whatsapp")}</SelectItem>
                    <SelectItem value="email">{t("contact.form.contactMethod.email")}</SelectItem>
                    <SelectItem value="phone">{t("contact.form.contactMethod.phone")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">{t("contact.form.message.label")}</Label>
                <Textarea id="message" name="message" placeholder={t("contact.form.message.placeholder")} className="mt-1.5" rows={5} required />
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
                  {t("contact.form.consent")}
                </Label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" size="lg">
                <Send className="me-2 h-4 w-4" /> {t("contact.form.submit")}
              </Button>
            </form>
          )}
        </ScrollReveal>
      </section>
    </Layout>
  );
}
