const { Groq } = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = {};

  try {
    body = req.body && typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  if (question.length > 700) {
    return res.status(413).json({ error: "Question is too long" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(200).json({ fallback: true });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are MineWatch AI, an educational assistant for MineWatch Ghana. Explain mining-related occupational health risks in simple language. Do not diagnose, treat, cure, or replace medical professionals. For severe symptoms such as coughing blood, severe chest pain, severe shortness of breath, confusion, fainting, very high fever, or rapidly worsening symptoms, advise urgent medical attention. Keep answers practical and concise. Always include a brief disclaimer that the answer is educational and not a diagnosis."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.3,
      max_tokens: 220,
      stream: false
    });

    const answer = completion.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(200).json({ fallback: true });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(200).json({ fallback: true });
  }
};
