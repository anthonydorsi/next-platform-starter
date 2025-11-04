import OpenAI from "openai";

// This defines a POST route for Next.js App Router
export async function POST(req) {
  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(JSON.stringify({ error: "No query provided." }), {
        status: 400,
      });
    }

    // Initialize OpenAI client with your Netlify environment variable
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Make an API call to OpenAI using the Responses API (GPT-4o recommended)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI visibility tracker. Given a search query, simulate how an AI assistant (like ChatGPT, Perplexity, or Google AI Overviews) would answer it. Include any brand or company names that appear in the answer, and return a list of citations or sources if possible.",
        },
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0.3,
    });

    // Extract main text from the response
    const answerText = response.choices?.[0]?.message?.content || "";

    // Simple regex to extract URLs from text (if any exist)
    const citationMatches = [...answerText.matchAll(/https?:\/\/[^\s)]+/g)];
    const citations = citationMatches.map((m) => m[0]);

    // Return AI answer + citations
    return new Response(JSON.stringify({ answerText, citations }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("AI Visibility API Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
