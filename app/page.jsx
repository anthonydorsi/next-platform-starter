// app/page.jsx  (SERVER component — no "use client" here)
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
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>LimboAI</h1>
      <p style={{ fontSize: "1.25rem", maxWidth: 600, lineHeight: 1.6 }}>
        Track how your brand appears inside ChatGPT, Google AI Overviews, and Perplexity answers.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <a href="/search" style={{ color: "#38bdf8" }}>Try AI Visibility Search →</a>
      </p>
    </main>
  );
}
