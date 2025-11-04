// app/search/page.jsx  (CLIENT component)
"use client";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [citations, setCitations] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setAnswer(""); setCitations([]);
    try {
      const res = await fetch("/api/ai-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAnswer(data.answerText || data.error || "");
      setCitations(data.citations || []);
    } catch (err) {
      setAnswer("⚠️ Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      fontFamily: "sans-serif",
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      color: "white",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>AI Visibility Search</h1>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, maxWidth: 800 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g., best car accident lawyer in Dallas"
          style={{ flex: 1, padding: "12px 14px", borderRadius: 8, border: "none" }}
        />
        <button disabled={loading}
          style={{ padding: "12px 16px", borderRadius: 8, border: "none", background: "#38bdf8", color: "black", fontWeight: 700 }}>
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {answer && (
        <section style={{ marginTop: 16, background: "#0b1220", padding: 16, borderRadius: 12 }}>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>AI Answer</h2>
          <div style={{ whiteSpace: "pre-wrap", color: "#cbd5e1" }}>{answer}</div>
        </section>
      )}

      {citations.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h3 style={{ marginBottom: 8 }}>Citations ({citations.length})</h3>
          <ul style={{ listStyle: "disc", paddingLeft: 20 }}>
            {citations.map((url, i) => (
              <li key={i}>
                <a href={url} target="_blank" rel="noreferrer" style={{ color: "#93c5fd" }}>
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
