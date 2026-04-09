const contactFaqItems: { q: string; a: string }[] = [
  {
    q: "Do you require a deposit?",
    a: "Yes. A deposit is required to confirm booking.",
  },
  {
    q: "When is balance due?",
    a: "Upon completion or unloading unless stated otherwise.",
  },
  {
    q: "Do you discuss extra charges first?",
    a: "Yes. All additional charges are discussed before being added.",
  },
  {
    q: "What services do you provide?",
    a: "Residential, commercial, freight coordination, and last-mile delivery.",
  },
];

export default function ContactFaq() {
  return (
    <div>
      <p className="contactFaqEyebrow">Have questions before booking? Here are answers to common inquiries.</p>
      <h2 className="contactFaqTitle">Common Questions</h2>
      <div className="contactFaqList">
        {contactFaqItems.map((item) => (
          <details key={item.q} className="contactFaqDetails">
            <summary className="contactFaqSummary">{item.q}</summary>
            <p className="contactFaqAnswer">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
