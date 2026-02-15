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
        <h1 className="font-serif text-4xl font-bold mb-8">{title}</h1>
        <div className="prose prose-slate max-w-none text-muted-foreground space-y-4 text-sm leading-relaxed">
          {children}
        </div>
      </section>
    </Layout>
  );
}

export function Privacy() {
  return (
    <LegalPage title="Politique de confidentialité" seoTitle="Confidentialité — English With Hinda" seoDescription="Politique de confidentialité de English With Hinda.">
      <p>English With Hinda s'engage à protéger la vie privée de ses visiteurs. Cette politique décrit les informations que nous collectons et comment nous les utilisons.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Données collectées</h2>
      <p>Nous pouvons collecter votre nom, adresse e-mail et numéro de téléphone lorsque vous nous contactez via notre formulaire ou WhatsApp.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Utilisation des données</h2>
      <p>Vos données sont utilisées uniquement pour répondre à vos demandes et vous informer de nos nouveautés si vous y avez consenti.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Contact</h2>
      <p>Pour toute question : contact@englishwithhinda.com</p>
    </LegalPage>
  );
}

export function Terms() {
  return (
    <LegalPage title="Conditions générales" seoTitle="Conditions — English With Hinda" seoDescription="Conditions générales d'utilisation de English With Hinda.">
      <p>En utilisant ce site, vous acceptez les présentes conditions générales d'utilisation.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Propriété intellectuelle</h2>
      <p>Tous les contenus de ce site (textes, images, logos) sont la propriété de English With Hinda et protégés par le droit d'auteur.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Responsabilité</h2>
      <p>Nous nous efforçons de fournir des informations exactes mais ne pouvons garantir l'absence d'erreurs.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Contact</h2>
      <p>Pour toute question : contact@englishwithhinda.com</p>
    </LegalPage>
  );
}

export function Cookies() {
  return (
    <LegalPage title="Politique des cookies" seoTitle="Cookies — English With Hinda" seoDescription="Politique des cookies de English With Hinda.">
      <p>Ce site peut utiliser des cookies pour améliorer votre expérience de navigation.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Types de cookies</h2>
      <p>Nous utilisons des cookies techniques nécessaires au fonctionnement du site et des cookies analytiques pour comprendre comment vous utilisez le site.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Gestion des cookies</h2>
      <p>Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
      <h2 className="font-serif text-xl font-bold mt-6">Contact</h2>
      <p>Pour toute question : contact@englishwithhinda.com</p>
    </LegalPage>
  );
}
