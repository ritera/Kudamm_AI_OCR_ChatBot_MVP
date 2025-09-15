import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export default function KontaktPage() {
  return (
    <>
      <Header />
      <PageHeader title="Kontakt" subtitle="Wir freuen uns auf deine Nachricht." />
      <Section glass>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="font-medium">E-Mail</div>
            <div className="text-neutral-700">deutsch_kudamm@naver.com</div>
            <div className="mt-4 font-medium">Adresse</div>
            <div className="text-neutral-700">
              Metapolis-ro 47-25, 543,<br />Hwaseong-si, Gyeonggi-do, Südkorea
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
