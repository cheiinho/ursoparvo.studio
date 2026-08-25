import RevealTitle from "@/components/RevealTitle";
import ContactForm from "@/components/ContactForm";
import type { Dict } from "@/content/dict/types";

type ProjectInquiryProps = {
  dict: Dict;
  email: string;
};

export default function ProjectInquiry({ dict, email }: ProjectInquiryProps) {
  return (
    <section className="site-container project-inquiry" aria-labelledby="projecto-h">
      <RevealTitle
        id="projecto-h"
        text={dict.contact.title}
        className="type-display"
      />
      <p className="type-corpo measure project-inquiry__intro">
        {dict.contact.intro}
      </p>
      <ContactForm dict={dict.contact} email={email} />
    </section>
  );
}
