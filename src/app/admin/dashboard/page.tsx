"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("free-tickets");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-dark)", color: "white", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "20px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem" }}>Omusajja wa ODD <span className="text-green">Admin</span></h1>
      </header>

      <div className="admin-layout" style={{ display: "flex", flex: 1 }}>
        <nav className="admin-sidebar" style={{ width: "250px", borderRight: "1px solid rgba(255,255,255,0.1)", padding: "20px" }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            <li>
              <button 
                onClick={() => setActiveTab("free-tickets")}
                style={{ width: "100%", padding: "10px", background: activeTab === "free-tickets" ? "var(--primary-green)" : "transparent", color: activeTab === "free-tickets" ? "black" : "white", border: "none", borderRadius: "5px", cursor: "pointer", textAlign: "left", fontWeight: "bold" }}
              >
                Post Free Ticket
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("wins")}
                style={{ width: "100%", padding: "10px", background: activeTab === "wins" ? "var(--primary-green)" : "transparent", color: activeTab === "wins" ? "black" : "white", border: "none", borderRadius: "5px", cursor: "pointer", textAlign: "left", fontWeight: "bold" }}
              >
                Upload Win Receipt
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("partners")}
                style={{ width: "100%", padding: "10px", background: activeTab === "partners" ? "var(--primary-green)" : "transparent", color: activeTab === "partners" ? "black" : "white", border: "none", borderRadius: "5px", cursor: "pointer", textAlign: "left", fontWeight: "bold" }}
              >
                Manage Partners
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("settings")}
                style={{ width: "100%", padding: "10px", background: activeTab === "settings" ? "var(--primary-green)" : "transparent", color: activeTab === "settings" ? "black" : "white", border: "none", borderRadius: "5px", cursor: "pointer", textAlign: "left", fontWeight: "bold" }}
              >
                Change Credentials
              </button>
            </li>
            <li style={{ marginTop: "auto", paddingTop: "20px" }}>
              <button 
                onClick={handleLogout}
                style={{ width: "100%", padding: "10px", background: "rgba(255,0,0,0.1)", color: "red", border: "1px solid red", borderRadius: "5px", cursor: "pointer", textAlign: "left", fontWeight: "bold" }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>

        <main className="admin-main" style={{ flex: 1, padding: "40px" }}>
          {activeTab === "free-tickets" && <FreeTicketForm />}
          {activeTab === "wins" && <WinReceiptForm />}
          {activeTab === "partners" && <PartnerForm />}
          {activeTab === "settings" && <SettingsForm />}
        </main>
      </div>
    </div>
  );
}

// --- Sub-components for Admin Forms ---

function FreeTicketForm() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTickets = async () => {
    const res = await fetch("/api/free-tickets");
    if (res.ok) {
      const data = await res.json();
      setTickets(data.tickets || data || []);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, content, imageUrl: image } : { content, imageUrl: image };
      
      const res = await fetch("/api/free-tickets", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        alert(editingId ? "Ticket updated!" : "Free ticket posted!");
        setContent("");
        setImage(null);
        setEditingId(null);
        fetchTickets();
      } else {
        alert("Failed to save");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ticket: any) => {
    setEditingId(ticket.id);
    setContent(ticket.content);
    setImage(ticket.imageUrl || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    const res = await fetch(`/api/free-tickets?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Ticket deleted!");
      fetchTickets();
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div className="glass-card" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4">{editingId ? "Edit Free Ticket" : "Post Free Ticket"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label>Ticket Content / Picks</label>
            <textarea 
              value={content} onChange={(e) => setContent(e.target.value)} required
              style={{ width: "100%", height: "150px", padding: "10px", background: "rgba(0,0,0,0.5)", color: "white", borderRadius: "5px" }}
            />
          </div>
          <div>
            <label>Optional Image (Screenshot)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "block", marginTop: "10px" }} />
            {image && <img src={image} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Saving..." : (editingId ? "Update Ticket" : "Post Free Ticket")}</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setContent(""); setImage(null); }} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.1)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Cancel Edit</button>}
          </div>
        </form>
      </div>

      <div>
        <h3 className="mb-4">Manage Existing Tickets</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "600px" }}>
          {tickets.map(ticket => (
            <div key={ticket.id} style={{ background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: "20px" }}>
                {ticket.content}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleEdit(ticket)} style={{ padding: "5px 10px", background: "var(--primary-green)", color: "black", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                <button onClick={() => handleDelete(ticket.id)} style={{ padding: "5px 10px", background: "rgba(255,0,0,0.2)", color: "red", border: "1px solid red", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))}
          {tickets.length === 0 && <p style={{ color: "var(--text-muted)" }}>No tickets posted yet.</p>}
        </div>
      </div>
    </div>
  );
}

function WinReceiptForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wins, setWins] = useState<any[]>([]);

  const fetchWins = async () => {
    const res = await fetch("/api/wins");
    if (res.ok) {
      const data = await res.json();
      setWins(data.wins || data || []);
    }
  };

  useEffect(() => {
    fetchWins();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");
    setLoading(true);
    try {
      const res = await fetch("/api/wins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: image, amount, description })
      });
      if (res.ok) {
        alert("Win receipt posted!");
        setAmount("");
        setDescription("");
        setImage(null);
        fetchWins();
      } else {
        alert("Failed to post");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this win receipt?")) return;
    const res = await fetch(`/api/wins?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Receipt deleted!");
      fetchWins();
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div className="glass-card" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4">Upload Win Receipt</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label>Screenshot of Win *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} required style={{ display: "block", marginTop: "10px" }} />
            {image && <img src={image} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
          </div>
          <div>
            <label>Win Amount (e.g. UGX 1,500,000) - Optional</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: "100%", padding: "10px", background: "rgba(0,0,0,0.5)", color: "white", borderRadius: "5px", marginTop: "5px" }} />
          </div>
          <div>
            <label>Description - Optional</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: "10px", background: "rgba(0,0,0,0.5)", color: "white", borderRadius: "5px", marginTop: "5px" }} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Uploading..." : "Upload Receipt"}</button>
        </form>
      </div>

      <div>
        <h3 className="mb-4">Manage Win Receipts</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", maxWidth: "800px" }}>
          {wins.map(win => (
            <div key={win.id} style={{ background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "8px", width: "200px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <img src={win.imageUrl} alt="Win Receipt" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
              {win.amount && <strong className="text-green">{win.amount}</strong>}
              <button onClick={() => handleDelete(win.id)} style={{ width: "100%", padding: "5px", background: "rgba(255,0,0,0.2)", color: "red", border: "1px solid red", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
            </div>
          ))}
          {wins.length === 0 && <p style={{ color: "var(--text-muted)" }}>No win receipts posted yet.</p>}
        </div>
      </div>
    </div>
  );
}

function PartnerForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPartners = async () => {
    const res = await fetch("/api/partners");
    if (res.ok) {
      const data = await res.json();
      setPartners(data.partners || data || []);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please upload a partner logo");
    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, name, imageUrl: image, url } : { name, imageUrl: image, url };
      
      const res = await fetch("/api/partners", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        alert(editingId ? "Partner updated!" : "Partner added!");
        setName("");
        setUrl("");
        setImage(null);
        setEditingId(null);
        fetchPartners();
      } else {
        alert("Failed to save partner");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (partner: any) => {
    setEditingId(partner.id);
    setName(partner.name);
    setUrl(partner.url || "");
    setImage(partner.imageUrl || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;
    const res = await fetch(`/api/partners?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Partner deleted!");
      fetchPartners();
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div className="glass-card" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4">{editingId ? "Edit Partner" : "Add Partner"}</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Add a partner logo (like Betika, 1xBet) to show on the homepage.</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label>Partner Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. 1xBet" style={{ width: "100%", padding: "10px", background: "rgba(0,0,0,0.5)", color: "white", borderRadius: "5px", marginTop: "5px" }} />
          </div>
          <div>
            <label>Partner Website URL (Optional affiliate link)</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." style={{ width: "100%", padding: "10px", background: "rgba(0,0,0,0.5)", color: "white", borderRadius: "5px", marginTop: "5px" }} />
          </div>
          <div>
            <label>Partner Logo Image *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "block", marginTop: "10px" }} />
            {image && <img src={image} alt="Preview" style={{ width: "150px", objectFit: "contain", marginTop: "10px", background: "white", padding: "10px", borderRadius: "8px" }} />}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Saving..." : (editingId ? "Update Partner" : "Add Partner")}</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setName(""); setUrl(""); setImage(null); }} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.1)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Cancel Edit</button>}
          </div>
        </form>
      </div>

      <div>
        <h3 className="mb-4">Manage Partners</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "600px" }}>
          {partners.map(partner => (
            <div key={partner.id} style={{ background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
                <img src={partner.imageUrl} alt={partner.name} style={{ width: "50px", height: "auto", objectFit: "contain", background: "white", padding: "5px", borderRadius: "4px" }} />
                <div>
                  <strong style={{ display: "block", color: "var(--primary-green)" }}>{partner.name}</strong>
                  {partner.url && <a href={partner.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem", color: "var(--text-muted)", textDecoration: "underline" }}>{partner.url}</a>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleEdit(partner)} style={{ padding: "5px 10px", background: "var(--primary-green)", color: "black", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                <button onClick={() => handleDelete(partner.id)} style={{ padding: "5px 10px", background: "rgba(255,0,0,0.2)", color: "red", border: "1px solid red", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))}
          {partners.length === 0 && <p style={{ color: "var(--text-muted)" }}>No partners added yet.</p>}
        </div>
      </div>
    </div>
  );
}

function SettingsForm() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername, password: newPassword })
      });
      if (res.ok) {
        alert("Credentials updated! You will need to log in again.");
        window.location.href = "/admin/login";
      } else {
        alert("Failed to update");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Change Admin Credentials</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label>New Username</label>
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required style={{ width: "100%", padding: "10px", background: "rgba(0,0,0,0.5)", color: "white", borderRadius: "5px", marginTop: "5px" }} />
        </div>
        <div>
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ width: "100%", padding: "10px", background: "rgba(0,0,0,0.5)", color: "white", borderRadius: "5px", marginTop: "5px" }} />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Updating..." : "Update Credentials"}</button>
      </form>
    </div>
  );
}
