const contactFaqItems: { q: string; a: string }[] = [
  {
    q: "Do you require a deposit?",
    a: "Yes. A deposit may be required to confirm your booking and secure your service date.",
  },
  {
    q: "When is the remaining balance due?",
    a: "The remaining balance is typically due upon unloading or completion of service unless other written terms apply.",
  },
  {
    q: "Do you discuss extra charges first?",
    a: "Yes. Any additional work or charges outside the original estimate are discussed and approved before being added.",
  },
  {
    q: "What services do you provide?",
    a: "We support residential moving, commercial moving, freight coordination, and last-mile delivery services.",
  },
  {
    q: "How do I get an accurate quote?",
    a: "You can submit your job details through the Get a Quote form, and we will provide a clear estimate based on your requirements.",
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
