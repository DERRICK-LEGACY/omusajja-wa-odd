"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FreeTicket {
  id: string;
  content: string;
  imageUrl: string | null;
  postedAt: string;
}

export default function FreeTicketsPage() {
  const [tickets, setTickets] = useState<FreeTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFreeTickets() {
      try {
        const res = await fetch("/api/free-tickets");
        const data = await res.json();
        if (data.success) {
          setTickets(data.tickets);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchFreeTickets();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="section-header text-center mb-4">
        <h1>Free <span className="text-green">Tickets</span></h1>
        <p>A taste of the winning formula. Upgrade to premium packages for massive guaranteed odds.</p>
      </div>

      <div style={{ background: "rgba(255,215,0,0.1)", border: "1px solid var(--gold)", padding: "15px", borderRadius: "8px", textAlign: "center", marginBottom: "40px" }}>
        <strong className="text-gold">⚠️ PRO TIP:</strong> Free tickets are just the beginning. Our VIP and Big Starker subscribers win 5x more every week. <Link href="/packages" style={{ textDecoration: "underline", fontWeight: "bold" }}>Upgrade Now</Link>
      </div>

      {loading ? (
        <div className="text-center">Loading free tickets...</div>
      ) : tickets.length === 0 ? (
        <div className="text-center" style={{ padding: "40px", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
          No free tickets available right now. Check back later or get a premium package for instant access!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px", margin: "0 auto" }}>
          {tickets.map((ticket) => (
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
      )}
    </div>
  );
}
