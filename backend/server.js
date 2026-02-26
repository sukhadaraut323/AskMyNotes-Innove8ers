require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const OpenAI = require("openai");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function extractText(file) {
  if (file.mimetype === "text/plain") {
    return file.buffer.toString("utf-8");
  }
  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);
    return data.text;
  }
  return "";
}

app.get("/", (req, res) => {
  res.json({ status: "AskMyNotes backend running 🚀" });
});

// Upload files and extract text
app.post("/api/upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });

    const results = [];
    for (const file of req.files) {
      const text = await extractText(file);
      results.push({
        name: file.originalname,
        type: file.mimetype === "application/pdf" ? "pdf" : "txt",
        text,
      });
    }
    res.json({ files: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Chat - answer question from notes
app.post("/api/chat", async (req, res) => {
  try {
    const { question, subjectName, notes } = req.body;

    if (!question || !subjectName || !notes || notes.length === 0)
      return res.status(400).json({ error: "Missing fields" });

    const notesContext = notes
        .map((n) => `[FILE: ${n.name}]\n${n.text.slice(0, 20000)}`)
        .join("\n\n---\n\n");

    const system = `You are AskMyNotes, a study assistant. Answer ONLY from the notes below. Never use outside knowledge.

Subject: "${subjectName}"

NOTES:
${notesContext}

Rules:
- If the answer is NOT in the notes, respond exactly: "Not found in your notes for ${subjectName}"
- Always reply in this exact JSON format (no markdown, no extra text):
{
  "answer": "your answer here",
  "confidence": "High|Medium|Low",
  "citations": "file name + section reference",
  "evidence": "short supporting quote from notes"
}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      messages: [
        { role: "system", content: system },
        { role: "user", content: question },
      ],
    });

    const text = response.choices[0].message.content;
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      res.json(JSON.parse(cleaned));
    } catch {
      res.json({ answer: text, confidence: "Medium", citations: "", evidence: "" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Study mode - generate MCQs + short answer questions
app.post("/api/study", async (req, res) => {
  try {
    const { subjectName, notes } = req.body;

    if (!subjectName || !notes || notes.length === 0)
      return res.status(400).json({ error: "Missing fields" });

    const notesContext = notes
        .map((n) => `[FILE: ${n.name}]\n${n.text.slice(0, 20000)}`)
        .join("\n\n---\n\n");

    const system = `You are a study question generator. Generate questions ONLY based on the notes below.

Subject: "${subjectName}"

NOTES:
${notesContext}

Generate exactly this JSON (no markdown, no extra text):
{
  "mcqs": [
    {
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct": 0,
      "explanation": "...",
      "citation": "file name/section"
    }
  ],
  "shortAnswer": [
    {
      "question": "...",
      "modelAnswer": "...",
      "citation": "file name/section"
    }
  ]
}
Generate exactly 5 MCQs and 3 short-answer questions.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2000,
      messages: [
        { role: "system", content: system },
        { role: "user", content: "Generate study questions now." },
      ],
    });

    const text = response.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(cleaned));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));