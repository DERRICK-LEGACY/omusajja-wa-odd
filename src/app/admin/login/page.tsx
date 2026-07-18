"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-dark)" }}>
      <div className="glass-card" style={{ width: "100%", maxWidth: "400px", padding: "40px 30px" }}>
        <h2 className="text-center mb-4">Galactico <span className="text-green">Admin</span></h2>
        
        {error && <div style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", color: "var(--text-muted)" }}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
              required 
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "5px", color: "var(--text-muted)" }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
              required 
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: "10px" }}>
            {loading ? "Logging in..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
