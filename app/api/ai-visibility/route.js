"use client";
import { useState } from "react";

// OPTIONAL: list your domains to highlight when cited
const MY_DOMAINS = ["limboai.com", "1800lionlaw.com"];

function isMine(u) {
  try {
    const host = new URL(u).hostname.replace(/^www\./, "");
    return MY_DOMAINS.some(d => host.endsWith(d));
  } catch { return false; }
}

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [cites, setCites] = useState([]);

  async function run(e) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true); setAnswer(""); setCites([]);
    try {
      const res = await fetch("/api/ai-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      setAnswer(data.answerText || data.error || "");
      setCites(data.citations || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      fontFamily: "sans-serif",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white", padding: "2rem"
    }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>AI Visibility — Search</h1>
      <p style={{ color: "#94a3b8", marginBottom: 16 }}>
        Enter a query (e.g., “best car accident lawyer in dallas”) to see the AI answer and citations.
      </p>

      <form onSubmit={run} style={{ display: "flex", gap: 8, maxWidth: 800 }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Type a high-intent query…"
          style={{ flex: 1, padding: "12px 14px", borderRadius: 8, border: "none" }}
        />
        <button
          disabled={loading}
          style={{ padding: "12px 16px", borderRadius: 8, border: "none",
                   background: "#38bdf8", color: "black", fontWeight: 700 }}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {answer && (
        <section style={{ marginTop: 16, background: "#0b1220", padding: 16, borderRadius: 12 }}>
          <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Answer</h2>
          <div style={{ whiteSpace: "pre-wrap", color: "#cbd5e1" }}>{answer}</div>
        </section>
      )}

      {cites.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h3 style={{ marginBottom: 8 }}>Citations ({cites.length})</h3>
          <ul style={{ listStyle: "disc", paddingLeft: 20 }}>
            {cites.map((u, i) => (
              <li key={i} style={{ fontWeight: isMine(u) ? 700 : 400 }}>
                <a href={u} target="_blank" rel="noreferrer"
                   style={{ color: isMine(u) ? "#22d3ee" : "#93c5fd" }}>
                  {u}
                </a>
                {isMine(u) && "  ← YOUR DOMAIN"}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
