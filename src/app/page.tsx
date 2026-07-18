import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import "./page.css";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch previews
  const recentWins = await prisma.winReceipt.findMany({
    orderBy: { postedAt: 'desc' },
    take: 3
  });

  const recentTickets = await prisma.freeTicket.findMany({
    where: { isActive: true },
    orderBy: { postedAt: 'desc' },
    take: 2
  });

  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg">
          <div className="glow-circle"></div>
          <div className="grid-overlay"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-badge">Omusajja wa ODD, ne Receipt</div>
          <h1 className="hero-title" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
            OMUSAJJA WA ODD<br />
            <span className="text-green">EVERY ODD WINS</span>
          </h1>
          <p className="hero-subtitle">
            Uganda's most trusted sports betting tipster. Join the winning team today and turn your stakes into massive profits.
          </p>
          <div className="hero-actions">
            <Link href="/packages" className="btn-primary">View Packages</Link>
            <Link href="/free-tickets" className="btn-outline">Free Tickets</Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <AnimatedCounter end={95} suffix="%" />
              <p>Win Rate</p>
            </div>
            <div className="stat-card">
              <AnimatedCounter end={10} suffix="k+" />
              <p>Happy Subscribers</p>
            </div>
            <div className="stat-card">
              <AnimatedCounter end={5} suffix="+" />
              <p>Years Active</p>
            </div>
            <div className="stat-card">
              <AnimatedCounter end={100} suffix="%" />
              <p>Daily Winning Tickets</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE TIPSTER (PROFILE PIC) */}
      <section style={{ padding: "6rem 0", background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0) 100%)" }}>
        <div className="container" style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap-reverse" }}>
          <div style={{ flex: "1 1 350px", position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "-15px",
              left: "-15px",
              right: "15px",
              bottom: "15px",
              border: "2px solid var(--primary-green)",
              borderRadius: "20px",
              zIndex: 1
            }}></div>
            <div style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              zIndex: 2,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}>
              <img 
                src="/profile.jpg" 
                alt="Omusajja wa ODD" 
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", maxHeight: "500px" }} 
              />
            </div>
          </div>
          <div style={{ flex: "1.2 1 400px" }}>
            <span style={{ color: "var(--primary-green)", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "bold", fontSize: "0.9rem" }}>Meet the Expert</span>
            <h2 style={{ fontSize: "2.8rem", margin: "10px 0 20px", color: "white" }}>Omusajja wa <span className="text-gold">ODD</span></h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "20px" }}>
              Known in the streets and online as the most reliable betting guide in Uganda, Omusajja wa ODD (Kalibbala Robert) delivers precision tips day-in and day-out. By studying team performance, market movements, and strict risk analytics, we ensure a steady win rate.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "30px" }}>
              Whether you are looking for free tips or want to lock in VIP status, you are joining a family of winners. Join today and start getting receipts!
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              <a href="https://wa.me/256774032355?text=Hello%20Omusajja%20wa%20ODD,%20I%20want%20to%20subscribe" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Join VIP on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT WINS PREVIEW */}
      {recentWins.length > 0 && (
        <section style={{ padding: "6rem 0", background: "rgba(0, 230, 118, 0.02)" }}>
          <div className="container">
            <div className="section-header text-center mb-4">
              <h2>Recent <span className="text-gold">Wins</span></h2>
              <p>Don't just take our word for it—see the latest receipts.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "2rem" }}>
              {recentWins.map((win) => (
                <div key={win.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", overflow: "hidden" }}>
                  <div style={{ position: "relative", width: "100%", height: "300px" }}>
                    <img 
                      src={win.imageUrl} 
                      alt="Win Receipt" 
                      style={{ objectFit: "cover", width: "100%", height: "100%" }} 
                    />
                  </div>
                  {(win.description || win.amount) && (
                    <div style={{ padding: "15px" }}>
                      {win.amount && <h3 className="text-gold mb-2">{win.amount}</h3>}
                      {win.description && <p className="text-muted">{win.description}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4" style={{ marginTop: "2rem" }}>
              <Link href="/wins" className="btn-outline">View All Receipts</Link>
            </div>
          </div>
        </section>
      )}

      {/* LATEST FREE TICKETS PREVIEW */}
      {recentTickets.length > 0 && (
        <section style={{ padding: "6rem 0" }}>
          <div className="container">
            <div className="section-header text-center mb-4">
              <h2>Latest <span className="text-green">Free Picks</span></h2>
              <p>A taste of our winning formula.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px", margin: "2rem auto 0" }}>
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="glass-card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px" }}>
                    <span className="text-green font-bold">Free Pick</span>
                    <span className="text-muted">{new Date(ticket.postedAt).toLocaleDateString()}</span>
                  </div>
                  <p style={{ whiteSpace: "pre-wrap", fontSize: "1.1rem", marginBottom: ticket.imageUrl ? "20px" : "0" }}>
                    {ticket.content}
                  </p>
                  {ticket.imageUrl && (
                    <img src={ticket.imageUrl} alt="Free Ticket" style={{ width: "100%", borderRadius: "8px" }} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4" style={{ marginTop: "2rem" }}>
              <Link href="/free-tickets" className="btn-outline">More Free Tickets</Link>
            </div>
          </div>
        </section>
      )}

      {/* PACKAGES PREVIEW */}
      <section className="packages-section" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
        <div className="container">
          <div className="section-header text-center">
            <h2>Choose Your <span className="text-gold">Winning</span> Package</h2>
            <p>Select the plan that fits your betting strategy.</p>
          </div>

          <div className="packages-grid mt-4" style={{ marginTop: "3rem" }}>
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
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <ReviewsSection />

      {/* PARTNERS SECTION */}
      {partners.length > 0 && (
        <section style={{ padding: "4rem 0", background: "rgba(0, 0, 0, 0.5)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container text-center">
            <h3 style={{ color: "var(--text-muted)", marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.9rem" }}>Our Trusted Partners</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "40px" }}>
              {partners.map(partner => {
                const partnerContent = (
                  <div key={partner.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: partner.url ? "pointer" : "default" }}>
                    <img src={partner.imageUrl} alt={partner.name} style={{ height: "60px", width: "auto", objectFit: "contain" }} />
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "bold" }}>{partner.name}</span>
                  </div>
                );
                
                return partner.url ? (
                  <a key={partner.id} href={partner.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    {partnerContent}
                  </a>
                ) : (
                  partnerContent
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2>How To <span className="text-green">Subscribe</span></h2>
          </div>
          
          <div className="steps-grid" style={{ marginTop: "3rem" }}>
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Pick a Package</h3>
              <p>Choose between GOLO GOLO, VIP, or Big Starker based on your goals.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Send Mobile Money</h3>
              <p>Send the exact amount to <strong className="text-gold">0774 032 355</strong> (Registered as Kalibbala Robert).</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Inbox Receipt</h3>
              <p>Send a screenshot of the payment to our WhatsApp to get added instantly!</p>
            </div>
          </div>
          
          <div className="text-center mt-4" style={{ marginTop: "3rem" }}>
            <a href="https://wa.me/256774032355?text=Hello%20Omusajja%20wa%20ODD,%20how%20do%20I%20pay?" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Chat on WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
