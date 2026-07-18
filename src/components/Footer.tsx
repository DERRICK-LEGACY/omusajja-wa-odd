import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 0", marginTop: "auto", textAlign: "center", color: "var(--text-muted)" }}>
      <div className="container text-center">
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "10px 20px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50px", background: "rgba(0,0,0,0.3)" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--primary-green)", background: "white", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>18+</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Responsible Gambling. Betting can be addictive. Please play responsibly.</span>
          </div>
        </div>
        
        <h2>Omusajja wa <span className="text-gold">ODD</span></h2>
        <p className="text-muted mt-2">Every Odd Wins. Uganda's Most Trusted Tipster.</p>
        
        <div style={{ marginTop: "30px", fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
          <p>&copy; {new Date().getFullYear()} Omusajja wa ODD. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/packages" className="nav-link">Packages</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/admin/login" className="nav-link" style={{ opacity: 0.3 }}>Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
