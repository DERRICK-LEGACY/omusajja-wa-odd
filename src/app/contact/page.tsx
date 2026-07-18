export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px", maxWidth: "800px" }}>
      <div className="section-header text-center mb-4">
        <h1>Contact <span className="text-green">Galactico</span></h1>
        <p>Omusajja wa ODD, ne Receipt. Get in touch for subscriptions or support.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginTop: "40px" }}>
        <div className="glass-card text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "60px", height: "60px", background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <h3>WhatsApp</h3>
          <p className="text-muted mt-2 mb-4">Fastest way to get your tickets</p>
          <a href="https://wa.me/256774032355" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: "100%" }}>
            +256 774 032 355
          </a>
        </div>

        <div className="glass-card text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "60px", height: "60px", background: "var(--primary-green)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3>Phone Calls</h3>
          <p className="text-muted mt-2 mb-4">Available during working hours</p>
          <a href="tel:+256740709075" className="btn-outline" style={{ width: "100%", marginBottom: "10px" }}>
            +256 740 709 075
          </a>
          <a href="tel:+256774032355" className="btn-outline" style={{ width: "100%" }}>
            +256 774 032 355
          </a>
        </div>
      </div>
    </div>
  );
}
