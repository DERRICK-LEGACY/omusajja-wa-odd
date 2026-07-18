import PackageCard from "@/components/PackageCard";

export default function PackagesPage() {
  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="section-header text-center mb-4">
        <h1>Our <span className="text-gold">Packages</span></h1>
        <p>Choose the winning plan that fits your betting strategy. Pay via MTN/Airtel Mobile Money and start winning today.</p>
      </div>

      <div className="packages-grid mt-4">
        <PackageCard 
          title="Team GOLO GOLO"
          price="30,000"
          duration="month"
          odds="Daily Sure Odds"
          features={[
            "Daily winning tips",
            "High probability picks",
            "Bankroll management advice",
            "24/7 WhatsApp support"
          ]}
        />
        
        <PackageCard 
          title="VIP Package"
          price="40,000"
          duration="2 weeks"
          odds="2.0+"
          isPopular={true}
          features={[
            "Premium 2.0+ odds",
            "Highest confidence picks",
            "Priority WhatsApp delivery",
            "Special weekend accumulators"
          ]}
        />

        <PackageCard 
          title="Big Starker"
          price="50,000"
          duration="month"
          odds="1.5+"
          features={[
            "Consistent 1.5+ rollovers",
            "Perfect for high stakes",
            "Safe and steady growth",
            "VIP group access"
          ]}
        />
      </div>

      <div className="how-it-works" style={{ marginTop: "60px", background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <h2 className="text-center mb-4">How to Pay (Uganda)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <h3 className="text-green mb-2">1. Send Mobile Money</h3>
            <p>Send the package amount to <strong className="text-gold">0774 032 355</strong> (MTN). The number is registered under <strong>Kalibbala Robert</strong>.</p>
          </div>
          <div>
            <h3 className="text-green mb-2">2. Confirm on WhatsApp</h3>
            <p>Send a screenshot of the message confirming your payment to the same number on WhatsApp to receive your tickets immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
