"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "20px 0", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", zIndex: 1000, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        <Link href="/" onClick={closeMenu} style={{ fontSize: "1.5rem", fontWeight: "bold", letterSpacing: "1px", zIndex: 101 }}>
          Omusajja wa <span className="text-green">ODD</span>
        </Link>
        
        <button className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className="desktop-menu">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/packages" className="nav-link">Packages</Link>
          <Link href="/wins" className="nav-link">Wins</Link>
          <Link href="/free-tickets" className="nav-link">Free Tickets</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Mobile Dropdown */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link href="/packages" className="nav-link" onClick={closeMenu}>Packages</Link>
          <Link href="/wins" className="nav-link" onClick={closeMenu}>Wins</Link>
          <Link href="/free-tickets" className="nav-link" onClick={closeMenu}>Free Tickets</Link>
          <Link href="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
