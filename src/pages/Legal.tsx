import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

interface LegalPageProps {
  title: string;
  seoTitle: string;
  seoDescription: string;
  children: React.ReactNode;
}

function LegalPage({ title, seoTitle, seoDescription, children }: LegalPageProps) {
  return (
    <Layout>
      <SEOHead title={seoTitle} description={seoDescription} />
      <section className="container py-12 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8">{title}</h1>
        <div className="prose prose-slate max-w-none text-muted-foreground space-y-4 text-sm leading-relaxed">
          {children}
        </div>
      </section>
    </Layout>
  );
}

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy" seoTitle="Privacy — English With Hinda" seoDescription="Privacy policy of English With Hinda.">
      <p>English With Hinda is committed to protecting the privacy of its visitors. This policy describes the information we collect and how we use it.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Data collected</h2>
      <p>We may collect your name, email address and phone number when you contact us via our form or WhatsApp.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Use of data</h2>
      <p>Your data is used only to respond to your requests and to inform you of our news if you have consented.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Contact</h2>
      <p>For any questions: contact@englishwithhinda.com</p>
    </LegalPage>
  );
}

export function Terms() {
  return (
    <LegalPage title="Terms of Use" seoTitle="Terms — English With Hinda" seoDescription="Terms of use of English With Hinda.">
      <p>By using this site, you agree to these terms of use.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Intellectual property</h2>
      <p>All content on this site (text, images, logos) is the property of English With Hinda and is protected by copyright.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Liability</h2>
      <p>We strive to provide accurate information but cannot guarantee the absence of errors.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Contact</h2>
      <p>For any questions: contact@englishwithhinda.com</p>
    </LegalPage>
  );
}

export function Cookies() {
  return (
    <LegalPage title="Cookie Policy" seoTitle="Cookies — English With Hinda" seoDescription="Cookie policy of English With Hinda.">
      <p>This site may use cookies to improve your browsing experience.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Types of cookies</h2>
      <p>We use technical cookies necessary for the site to function and analytical cookies to understand how you use the site.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Managing cookies</h2>
      <p>You can disable cookies in your browser settings.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Contact</h2>
      <p>For any questions: contact@englishwithhinda.com</p>
    </LegalPage>
  );
}
