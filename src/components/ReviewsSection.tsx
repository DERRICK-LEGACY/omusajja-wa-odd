"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (e) {
      console.error("Failed to fetch reviews");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return alert("Please fill out all fields");
    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment }),
      });
      if (res.ok) {
        alert("Review submitted successfully! Thank you!");
        setName("");
        setComment("");
        setRating(5);
        fetchReviews(); // Refresh the list
      } else {
        alert("Failed to submit review");
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper to render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < rating ? "var(--gold)" : "rgba(255,255,255,0.2)", fontSize: "1.2rem" }}>
        ★
      </span>
    ));
  };

  return (
    <section style={{ padding: "6rem 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2>Community <span className="text-gold">Reviews</span></h2>
          <p>See what our winners are saying.</p>
        </div>

        {/* Reviews List */}
        <div style={{ marginBottom: "4rem" }}>
          {fetching ? (
            <div className="text-center">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center text-muted">No reviews yet. Be the first to leave one!</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {reviews.map((r) => (
                <div key={r.id} className="glass-card" style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h4 style={{ margin: 0, color: "var(--primary-green)" }}>{r.name}</h4>
                    <div>{renderStars(r.rating)}</div>
                  </div>
                  <p style={{ color: "var(--text-main)", fontSize: "1rem", fontStyle: "italic" }}>"{r.comment}"</p>
                  <div style={{ marginTop: "10px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "right" }}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="glass-card" style={{ maxWidth: "600px", margin: "0 auto", padding: "30px" }}>
          <h3 className="text-center mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "var(--text-muted)" }}>Your Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={{ width: "100%", padding: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "var(--text-muted)" }}>Rating</label>
              <select 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ width: "100%", padding: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
                <option value={2}>⭐⭐ (2 Stars)</option>
                <option value={1}>⭐ (1 Star)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "var(--text-muted)" }}>Your Review</label>
              <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                required 
                rows={4}
                style={{ width: "100%", padding: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", resize: "vertical" }}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: "10px" }}>
              {loading ? "Submitting..." : "Post Review"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
