import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import ServiceIconGrid from "@/components/ServiceIconGrid";
import NewsletterForm from "@/components/NewsletterForm";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />

      {/* 서비스 카테고리 */}
      <Section id="services" glass>
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Studium · Sprachkurs · Au‑Pair · Arbeit · Reise</h2>
          <p className="mt-2 text-neutral-600">
            Deine Ziele, unser Plan: Wir beraten individuell und begleiten den gesamten Prozess – von der ersten Idee bis zur Ankunft in Korea.
          </p>
        </div>
        <ServiceIconGrid />
      </Section>

      {/* Über uns */}
      <Section id="about" glass>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold">Über uns – Willkommen bei Kudamm</h3>
            <p className="mt-3 text-neutral-600">
              Wir sind deine Anlaufstelle für Korea: mit klaren Infos, persönlicher Beratung und einem Ablauf, der wirklich funktioniert.
              Ob Studium, Sprachkurs, Au‑Pair, Arbeit oder Reise – wir machen deine Ausreise planbar.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-6 text-neutral-600">
            <div className="font-medium">Was du erwarten kannst</div>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
              <li>Individuelle Beratung & Programmwahl</li>
              <li>Unterlagen-Check, Fristen, Visumsschritte</li>
              <li>Vorbereitung auf Ankunft & erstes Ankommen</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Bleiben Sie informiert! */}
      <Section id="updates" glass>
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-semibold">Bleiben Sie informiert!</h3>
          <p className="mt-2 text-neutral-600">
            Tragen Sie sich ein und erhalten Sie Neuigkeiten sowie den Starttermin unserer Website zuerst.
          </p>
          <div className="mt-5 flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
