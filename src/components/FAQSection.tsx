"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long after payment do I get the VIP ticket?",
    answer: "Instantly! As soon as you send your Mobile Money receipt to our WhatsApp, you will be added to the VIP broadcast list and receive the day's sure ticket immediately."
  },
  {
    question: "What happens if a VIP ticket loses?",
    answer: "We have a 95% win rate, but in the rare event of a loss, all active VIP and Big Starker subscribers receive the next day's ticket absolutely FREE as a recovery."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Yes. You can start with the Team GOLO GOLO package and upgrade to Big Starker or VIP at any time by paying the difference."
  },
  {
    question: "Which bookmakers do you recommend?",
    answer: "You can use any bookmaker you prefer, but we highly recommend our partners like Betika Uganda and 1xBet for the best odds and fastest payouts."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "6rem 0", background: "rgba(0, 0, 0, 0.3)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="section-header text-center mb-4">
          <h2>Frequently Asked <span className="text-green">Questions</span></h2>
          <p>Everything you need to know before joining the winning team.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "3rem" }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{ 
                background: "rgba(255,255,255,0.02)", 
                border: "1px solid rgba(255,255,255,0.1)", 
                borderRadius: "10px", 
                overflow: "hidden" 
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: "100%",
                  padding: "20px",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {faq.question}
                <span style={{ color: "var(--primary-green)", fontSize: "1.5rem", transition: "transform 0.3s", transform: openIndex === index ? "rotate(45deg)" : "rotate(0)" }}>
                  +
                </span>
              </button>
              
              <div 
                style={{
                  padding: openIndex === index ? "0 20px 20px" : "0 20px",
                  maxHeight: openIndex === index ? "200px" : "0",
                  opacity: openIndex === index ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.3s ease-in-out",
                  color: "var(--text-muted)",
                  lineHeight: "1.6"
                }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
