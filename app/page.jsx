export default function Home() {
  return (
    <main
      style={{
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>LimboAI</h1>
      <p style={{ fontSize: "1.25rem", maxWidth: "600px", lineHeight: "1.6" }}>
        Track how your brand appears inside ChatGPT, Google AI Overviews, and Perplexity answers.
      </p>

      <form
        name="waitlist"
        method="POST"
        data-netlify="true"
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <input type="hidden" name="form-name" value="waitlist" />
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          required
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "none",
            width: "260px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#38bdf8",
            color: "black",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Join Waitlist
        </button>
      </form>

      <footer style={{ marginTop: "3rem", fontSize: "0.875rem", color: "#94a3b8" }}>
        © {new Date().getFullYear()} LimboAI. All rights reserved.
      </footer>
    </main>
  );
}


*AI SEARCH CODE***************************************
  

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

    setLoading(true);
    setAnswer("");
    setCitations([]);

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
    <main
      style={{
        minHeight: "100vh",
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>AI Visibility Search</h1>
      <p style={{ color: "#94a3b8", marginBottom: 16 }}>
        Type a query to see how AI answers it and what sources are cited.
      </p>

      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: 8, maxWidth: 800 }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., best car accident lawyer in Dallas"
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 8,
            border: "none",
          }}
        />
        <button
          disabled={loading}
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            border: "none",
            background: "#38bdf8",
            color: "black",
            fontWeight: 700,
          }}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {answer && (
        <section
          style={{
            marginTop: 16,
            background: "#0b1220",
            padding: 16,
            borderRadius: 12,
          }}
        >
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
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#93c5fd" }}
                >
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


<p style={{ marginTop: "2rem" }}>
  <a href="/search" style={{ color: "#38bdf8" }}>
    Try AI Visibility Search →
  </a>
</p>


END AI SEARCH CODE**********************
