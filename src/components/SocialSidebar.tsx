"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function SocialSidebar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="social-sidebar" style={{
      position: "fixed",
      left: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      zIndex: 999
    }}>
      {/* TikTok */}
      <a href="https://www.tiktok.com/@omusajjawaodd.16" className="social-icon" target="_blank" rel="noopener noreferrer" style={iconStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
      </a>

      {/* Facebook */}
      <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer" style={iconStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
      </a>
      
      {/* X / Twitter */}
      <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer" style={iconStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>

      {/* Global styles for this component to handle hover/responsive */}
      <style dangerouslySetInnerHTML={{__html: `
        .social-icon {
          transition: all 0.3s ease;
          opacity: 0.6;
        }
        .social-icon:hover {
          opacity: 1;
          transform: scale(1.1);
          color: var(--primary-green) !important;
        }
        @media (max-width: 768px) {
          .social-sidebar {
            position: static !important;
            flex-direction: row !important;
            justify-content: center;
            transform: none !important;
            padding: 20px 0;
            background: rgba(0,0,0,0.5);
            border-bottom: 1px solid rgba(255,255,255,0.05);
          }
        }
      `}} />
    </div>
  );
}

const iconStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  padding: "12px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  border: "1px solid rgba(255,255,255,0.1)"
};
