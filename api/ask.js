import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_INSTRUCTIONS = `
You are MineWatch AI, an educational assistant for MineWatch Ghana.
You explain mining-related occupational health risks in simple language.
You may discuss dust inhalation, silica, mercury exposure, chemical exposure, respiratory warning signs, PPE, prevention, and when to seek care.
You must not diagnose, treat, cure, confirm disease, predict confirmed disease, or replace medical professionals.
For severe symptoms such as coughing blood, severe chest pain, severe shortness of breath, confusion, fainting, very high fever, or rapidly worsening symptoms, advise the user to seek medical attention as soon as possible.
Use calm, clear, simple language.
Keep answers concise and practical.
Always include a brief medical disclaimer in health-related answers.
If the user asks for emergency, diagnosis, medication, dosage, or treatment instructions, explain that you cannot provide that and advise qualified medical care.
`;

const MAX_QUESTION_LENGTH = 700;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (question.length > MAX_QUESTION_LENGTH) {
      return res.status(400).json({ error: "Question is too long" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "AI assistant is not configured" });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: SYSTEM_INSTRUCTIONS,
      input: question,
      max_output_tokens: 450
    });

    const answer =
      response.output_text ||
      "I could not prepare an answer right now. Please try again later.";

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Ask MineWatch AI error:", error?.message || error);
    return res.status(500).json({
      error: "The AI assistant is not available right now. Please try again later."
    });
  }
}
