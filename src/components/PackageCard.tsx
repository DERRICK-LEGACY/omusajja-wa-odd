interface PackageCardProps {
  title: string;
  price: string;
  duration: string;
  odds: string;
  features: string[];
  isPopular?: boolean;
}

export default function PackageCard({ title, price, duration, odds, features, isPopular }: PackageCardProps) {
  return (
    <div 
      className={`glass-card ${isPopular ? "popular" : ""}`} 
      style={{ 
        position: "relative", 
        padding: "30px 20px", 
        display: "flex", 
        flexDirection: "column", 
        height: "100%", 
        border: isPopular ? "2px solid var(--primary-green)" : "1px solid rgba(255,255,255,0.05)", 
        background: isPopular ? "rgba(0, 230, 118, 0.03)" : "rgba(255,255,255,0.02)", 
        borderRadius: "16px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {isPopular && (
        <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "var(--primary-green)", color: "black", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold", letterSpacing: "1px", textTransform: "uppercase" }}>
          Most Popular
        </div>
      )}
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "10px", color: isPopular ? "var(--primary-green)" : "white" }}>{title}</h3>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
          <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>UGX</span>
          <span style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 5px" }}>{price}</span>
          <span style={{ color: "var(--text-muted)" }}>/{duration}</span>
        </div>
        <div style={{ marginTop: "10px", padding: "5px 10px", background: "rgba(255,215,0,0.1)", color: "var(--gold)", borderRadius: "8px", display: "inline-block", fontSize: "0.9rem", fontWeight: "bold" }}>
          Target: {odds}
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "20px 0", flex: 1 }}>
        {features.map((feature, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", marginBottom: "12px", color: "var(--text-muted)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="3" style={{ marginRight: "10px", flexShrink: 0 }}>
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "auto", textAlign: "center" }}>
        <a 
          href={`https://wa.me/256774032355?text=Hello%20Omusajja%20wa%20ODD,%20I%20want%20to%20subscribe%20to%20the%20${encodeURIComponent(title)}%20package`}
          target="_blank" 
          rel="noopener noreferrer" 
          className={isPopular ? "btn-primary" : "btn-outline"}
          style={{ width: "100%", display: "block" }}
        >
          Subscribe Now
        </a>
      </div>
    </div>
  );
}
