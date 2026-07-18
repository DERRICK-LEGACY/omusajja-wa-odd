"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface WinReceipt {
  id: string;
  imageUrl: string;
  description: string | null;
  amount: string | null;
  postedAt: string;
}

export default function WinsPage() {
  const [wins, setWins] = useState<WinReceipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWins() {
      try {
        const res = await fetch("/api/wins");
        const data = await res.json();
        if (data.success) {
          setWins(data.wins);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchWins();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="section-header text-center mb-4">
        <h1>Proof of <span className="text-green">Wins</span></h1>
        <p>Every odd wins. Don't just take our word for it—see the receipts.</p>
      </div>

      {loading ? (
        <div className="text-center mt-4">Loading receipts...</div>
      ) : wins.length === 0 ? (
        <div className="text-center mt-4">No receipts uploaded yet. Check back soon!</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {wins.map((win) => (
            <div key={win.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ position: "relative", width: "100%", height: "400px" }}>
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
      )}
    </div>
  );
}
