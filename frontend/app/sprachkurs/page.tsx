import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export default function SprachkursPage() {
  return (
    <>
      <Header />
      <PageHeader title="Sprachkurs in Korea" subtitle="Level, Dauer, Stadt – passende Kurse gezielt finden." />
      <Section glass>
        <div className="prose prose-neutral max-w-none">
          <h3>Leistungen</h3>
          <ul>
            <li>Schulauswahl & Kursvergleich</li>
            <li>Anmeldung & Unterlagen</li>
            <li>Vorbereitung vor der Abreise</li>
          </ul>
        </div>
      </Section>
      <Footer />
    </>
  );
}
