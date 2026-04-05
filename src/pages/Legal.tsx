import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

interface Section {
  title: string;
  content: string;
}

interface LegalPageProps {
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: Section[];
}

function LegalPage({ title, seoTitle, seoDescription, intro, sections }: LegalPageProps) {
  return (
    <Layout>
      <SEOHead title={seoTitle} description={seoDescription} />
      <section className="container py-12 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8">{title}</h1>
        <div className="prose prose-slate max-w-none text-muted-foreground space-y-4 text-sm leading-relaxed">
          <p>{intro}</p>
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-xl font-bold mt-6">{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export function Privacy() {
  const { t } = useTranslation();
  const sections = t("legal.privacy.sections", { returnObjects: true }) as Section[];
  return (
    <LegalPage
      title={t("legal.privacy.title")}
      seoTitle={t("legal.privacy.seoTitle")}
      seoDescription={t("legal.privacy.seoDesc")}
      intro={t("legal.privacy.intro")}
      sections={sections}
    />
  );
}

export function Terms() {
  const { t } = useTranslation();
  const sections = t("legal.terms.sections", { returnObjects: true }) as Section[];
  return (
    <LegalPage
      title={t("legal.terms.title")}
      seoTitle={t("legal.terms.seoTitle")}
      seoDescription={t("legal.terms.seoDesc")}
      intro={t("legal.terms.intro")}
      sections={sections}
    />
  );
}

export function Cookies() {
  const { t } = useTranslation();
  const sections = t("legal.cookies.sections", { returnObjects: true }) as Section[];
  return (
    <LegalPage
      title={t("legal.cookies.title")}
      seoTitle={t("legal.cookies.seoTitle")}
      seoDescription={t("legal.cookies.seoDesc")}
      intro={t("legal.cookies.intro")}
      sections={sections}
    />
  );
}
