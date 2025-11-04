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
