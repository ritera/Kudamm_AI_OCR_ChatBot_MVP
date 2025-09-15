import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export default function StudiumPage() {
  return (
    <>
      <Header />
      <PageHeader title="Studium in Korea" subtitle="Programmwahl, Bewerbung, Fristen & Visum – alles aus einer Hand." />
      <Section glass>
        <div className="prose prose-neutral max-w-none">
          <h3>So unterstützen wir dich</h3>
          <ul>
            <li>Universitäts- & Programmrecherche nach deinen Zielen</li>
            <li>Unterlagen-Check (Zeugnisse, Nachweise, Übersetzungen)</li>
            <li>Fristenmanagement & Bewerbungsbegleitung</li>
            <li>Visumsschritte (Allgemeine Info & Ablaufplan)</li>
          </ul>
          <p>Starte mit einer kurzen Anfrage – wir melden uns mit einer klaren Roadmap zurück.</p>
        </div>
      </Section>
      <Footer />
    </>
  );
}
