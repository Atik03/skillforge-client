const faqs = [
  {
    question: "Are the courses beginner friendly?",
    answer:
      "Yes. Most courses start from the fundamentals before moving to advanced topics.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes. After completing a course successfully you'll receive a certificate.",
  },
  {
    question: "Can I access courses on mobile?",
    answer:
      "Absolutely. SkillForge is fully responsive across all devices.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Yes. You can start, pause and continue learning anytime.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-4xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-200"
            >
              <input
                type="radio"
                name="faq"
              />

              <div className="collapse-title font-semibold">
                {faq.question}
              </div>

              <div className="collapse-content">
                {faq.answer}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}