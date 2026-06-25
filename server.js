import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in .env");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/test", (req, res) => {
  console.log("GET /test hit");
  res.status(200).json({
    ok: true,
    message: "Server is running",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    console.log("POST /api/chat hit");
    console.log("BODY:", req.body);

    const message = req.body?.message?.trim();

    if (!message) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant for a real estate website. Reply briefly, clearly, and professionally.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      response.output_text ||
      "Sorry, I could not generate a response right now.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("OPENAI ERROR:", error);

    return res.status(500).json({
      error:
        error?.message || "Something went wrong while generating a response.",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});