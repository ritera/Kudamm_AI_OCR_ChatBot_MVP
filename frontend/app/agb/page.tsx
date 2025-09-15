import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <PageHeader title="Datenschutz" subtitle="Diese Seite enthält Platzhaltertexte. Bitte später ersetzen." />
      <Section glass>
        <div className="text-neutral-700">
          <p>Hier folgt Ihre Datenschutzerklärung. Ersetzen Sie diesen Platzhalter durch Ihren finalen Text.</p>
        </div>
      </Section>
      <Footer />
    </>
  );
}
