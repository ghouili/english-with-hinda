import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Award,
  Heart,
  GraduationCap,
  Users,
  CheckCircle,
} from "lucide-react";
import { Grade, GRADE_CONFIG } from "@/lib/types";
import { useTranslation } from "react-i18next";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "English With Henda",
  description: "Publisher of English workbooks for Tunisian students.",
  url: "https://englishwithhenda.com",
};

const GRADES: Grade[] = [4, 5, 6, 7, 8, 9];

export default function About() {
  const { t } = useTranslation();

  const credentials = t("about.credentials", { returnObjects: true }) as string[];
  const timeline = t("about.journey.timeline", { returnObjects: true }) as {
    year: string;
    label: string;
  }[];
  const insideItems = t("about.insideBooks.items", { returnObjects: true }) as {
    title: string;
    desc: string;
  }[];

  const methodItems = [
    { icon: Heart, ...t("about.method.mission", { returnObjects: true }) as { title: string; desc: string } },
    { icon: BookOpen, ...t("about.method.ourBooks", { returnObjects: true }) as { title: string; desc: string } },
    { icon: Award, ...t("about.method.commitment", { returnObjects: true }) as { title: string; desc: string } },
  ];

  const insideBooksIcons = [BookOpen, CheckCircle, GraduationCap, Users];

  return (
    <Layout>
      <SEOHead
        title="About â€” English With Henda"
        description="Discover Henda's story and her mission: making English accessible to every Tunisian student."
        jsonLd={ORG_SCHEMA}
      />

      <section className="container py-12 max-w-4xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8">
          {t("about.title")}
        </h1>

        {/* Bio */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-4xl font-bold">
              H
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold">Henda</h2>
              <p className="text-muted-foreground mt-1">{t("about.teacher")}</p>
              <div className="mt-3 space-y-1">
                {credentials.map((c, i) => (
                  <p
                    key={i}
                    className="flex items-center gap-2 text-base text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />{" "}
                    {c}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Story */}
        <ScrollReveal>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed mb-12">
            <p>{t("about.story.p1")}</p>
            <p>{t("about.story.p2")}</p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        {/* <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">{t("about.journey.title")}</h2>
            <div className="relative border-s-2 border-primary/20 ps-6 space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -start-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-primary" />
                  <p className="font-serif text-lg font-bold text-primary">{item.year}</p>
                  <p className="text-base text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal> */}

        {/* Teaching approach */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-2">{t("about.method.title")}</h2>
            <p className="text-muted-foreground text-base mb-6">{t("about.method.subtitle")}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {methodItems.map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-5">
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-serif text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-base text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Inside the books */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">{t("about.insideBooks.title")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {insideItems.map((item, idx) => {
                const Icon = insideBooksIcons[idx];
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-xl border bg-card p-5"
                  >
                    <Icon className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-base">{item.title}</h3>
                      <p className="text-base text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA to grade hubs */}
        <ScrollReveal>
          <div className="rounded-xl bg-secondary p-6 sm:p-8 text-center">
            <h2 className="font-serif text-2xl font-bold mb-3">{t("about.chooseLevel.title")}</h2>
            <p className="text-muted-foreground mb-6">{t("about.chooseLevel.subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {GRADES.map((g) => (
                <Button
                  key={g}
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:text-primary bg-transparent hover:bg-primary/10 font-semibold w-full sm:w-auto"
                >
                  <Link to={`/books/${GRADE_CONFIG[g].slug}`}>{t(`grades.${g}`)}</Link>
                </Button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}
