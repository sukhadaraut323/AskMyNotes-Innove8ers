// // require("dotenv").config();
// // const express = require("express");
// // const cors = require("cors");
// // const multer = require("multer");
// // const OpenAI = require("openai");
// // const pdfParse = require("pdf-parse");

// // const app = express();
// // const PORT = process.env.PORT || 3001;

// // app.use(cors({ origin: "http://localhost:5173" }));
// // app.use(express.json({ limit: "10mb" }));

// // const upload = multer({
// //   storage: multer.memoryStorage(),
// //   limits: { fileSize: 20 * 1024 * 1024 },
// // });

// // const groq = new OpenAI({
// //   apiKey: process.env.GROQ_API_KEY,
// //   baseURL: "https://api.groq.com/openai/v1",
// // });

// // async function extractText(file) {
// //   if (file.mimetype === "text/plain") {
// //     return file.buffer.toString("utf-8");
// //   }
// //   if (file.mimetype === "application/pdf") {
// //     const data = await pdfParse(file.buffer);
// //     return data.text;
// //   }
// //   return "";
// // }

// // app.get("/", (req, res) => {
// //   res.json({ status: "AskMyNotes backend running 🚀" });
// // });

// // app.post("/api/upload", upload.array("files", 10), async (req, res) => {
// //   try {
// //     if (!req.files || req.files.length === 0)
// //       return res.status(400).json({ error: "No files uploaded" });

// //     const results = [];
// //     for (const file of req.files) {
// //       const text = await extractText(file);
// //       const isScanned = file.mimetype === "application/pdf" && text.trim().length < 500;
// //       results.push({
// //         name: file.originalname,
// //         type: file.mimetype === "application/pdf" ? "pdf" : "txt",
// //         text,
// //         warning: isScanned ? "⚠️ This PDF is scanned/image-based. Text could not be extracted. Please upload a text-based PDF or TXT file instead." : null,
// //       });
// //     }
// //     res.json({ files: results });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // app.post("/api/chat", async (req, res) => {
// //   try {
// //     const { question, subjectName, notes } = req.body;

// //     if (!question || !subjectName || !notes || notes.length === 0)
// //       return res.status(400).json({ error: "Missing fields" });

// //     const notesContext = notes
// //       .map((n) => {
// //         const chunks = n.text.slice(0, 15000);
// //         return `[FILE: ${n.name}]\n${chunks}`;
// //       })
// //       .join("\n\n---\n\n");

// //     const system = `You are AskMyNotes, a study assistant. Answer ONLY from the notes below. Never use outside knowledge or make anything up.

// // Subject: "${subjectName}"

// // NOTES:
// // ${notesContext}

// // Rules:
// // - Read the notes carefully before answering
// // - If the answer is NOT in the notes, respond exactly: "Not found in your notes for ${subjectName}"
// // - For "evidence", find a sentence in the NOTES that directly supports your answer and copy it WORD FOR WORD. It must be at least 10 words long. Never use a heading or title as evidence.
// // - For "citations", mention the exact file name from the NOTES above.
// // - Always reply in this exact JSON format (no markdown, no extra text):
// // {
// //   "answer": "your answer here based strictly on the notes",
// //   "confidence": "High|Medium|Low",
// //   "citations": "exact file name from notes",
// //   "evidence": "copy exact words from the notes here"
// // }`;

// //     const response = await groq.chat.completions.create({
// //       model: "llama-3.3-70b-versatile",
// //       max_tokens: 1000,
// //       temperature: 0.2,
// //       messages: [
// //         { role: "system", content: system },
// //         { role: "user", content: question },
// //       ],
// //     });

// //     const text = response.choices[0].message.content;
// //     try {
// //       const cleaned = text.replace(/```json|```/g, "").trim();
// //       res.json(JSON.parse(cleaned));
// //     } catch {
// //       res.json({ answer: text, confidence: "Medium", citations: "", evidence: "" });
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // app.post("/api/study", async (req, res) => {
// //   try {
// //     const { subjectName, notes } = req.body;

// //     if (!subjectName || !notes || notes.length === 0)
// //       return res.status(400).json({ error: "Missing fields" });

// //     const notesContext = notes
// //       .map((n) => `[FILE: ${n.name}]\n${n.text.slice(0, 8000)}`)
// //       .join("\n\n---\n\n");

// //     const system = `You are a study question generator. Generate questions ONLY based on the notes below.

// // Subject: "${subjectName}"

// // NOTES:
// // ${notesContext}

// // Generate exactly this JSON (no markdown, no extra text):
// // {
// //   "mcqs": [
// //     {
// //       "question": "...",
// //       "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
// //       "correct": 0,
// //       "explanation": "...",
// //       "citation": "file name/section"
// //     }
// //   ],
// //   "shortAnswer": [
// //     {
// //       "question": "...",
// //       "modelAnswer": "...",
// //       "citation": "file name/section"
// //     }
// //   ]
// // }
// // Generate exactly 5 MCQs and 3 short-answer questions.`;

// //     const response = await groq.chat.completions.create({
// //       model: "llama-3.1-8b-instant",
// //       max_tokens: 2000,
// //       temperature: 0.9,
// //       messages: [
// //         { role: "system", content: system },
// //         {
// //           role: "user",
// //           content: `Generate a DIFFERENT and UNIQUE set of study questions now. Attempt number: ${Date.now()}. Do not repeat previous questions. Shuffle topics and focus on different aspects of the notes.`,
// //         },
// //       ],
// //     });

// //     const text = response.choices[0].message.content;
// //     const cleaned = text.replace(/```json|```/g, "").trim();
// //     res.json(JSON.parse(cleaned));
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const OpenAI = require("openai");
// const pdfParse = require("pdf-parse");

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors({ origin: "http://localhost:5173" }));
// app.use(express.json({ limit: "10mb" }));

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 20 * 1024 * 1024 },
// });

// const groq = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1",
// });

// async function extractText(file) {
//   if (file.mimetype === "text/plain") {
//     return file.buffer.toString("utf-8");
//   }
//   if (file.mimetype === "application/pdf") {
//     const data = await pdfParse(file.buffer);
//     return data.text;
//   }
//   return "";
// }

// app.get("/", (req, res) => {
//   res.json({ status: "AskMyNotes backend running 🚀" });
// });

// app.post("/api/upload", upload.array("files", 10), async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0)
//       return res.status(400).json({ error: "No files uploaded" });

//     const results = [];
//     for (const file of req.files) {
//       const text = await extractText(file);
//       const isScanned = file.mimetype === "application/pdf" && text.trim().length < 500;
//       results.push({
//         name: file.originalname,
//         type: file.mimetype === "application/pdf" ? "pdf" : "txt",
//         text,
//         warning: isScanned ? "⚠️ This PDF is scanned/image-based. Text could not be extracted. Please upload a text-based PDF or TXT file." : null,
//       });
//     }
//     res.json({ files: results });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/api/chat", async (req, res) => {
//   try {
//     const { question, subjectName, notes } = req.body;

//     if (!question || !subjectName || !notes || notes.length === 0)
//       return res.status(400).json({ error: "Missing fields" });

//     const validNotes = notes.filter((n) => n.text && n.text.trim().length > 100);
//     if (validNotes.length === 0)
//       return res.status(400).json({ error: "No readable text found in uploaded files." });

//     const notesContext = validNotes
//       .map((n) => `[FILE: ${n.name}]\n${n.text.slice(0, 15000)}`)
//       .join("\n\n---\n\n");

//     const system = `You are AskMyNotes, a study assistant. Answer ONLY from the notes below. Never use outside knowledge or make anything up.

// Subject: "${subjectName}"

// NOTES:
// ${notesContext}

// Rules:
// - Read the notes carefully before answering
// - If the answer is NOT in the notes, respond exactly: "Not found in your notes for ${subjectName}"
// - For "evidence", find a sentence in the NOTES that directly supports your answer and copy it WORD FOR WORD. It must be at least 10 words long. Never use a heading or title as evidence.
// - For "citations", mention ONLY the single specific file name where you found the evidence. Do not list multiple files. Just one file name.
// - Always reply in this exact JSON format (no markdown, no extra text):
// {
//   "answer": "your answer here based strictly on the notes",
//   "confidence": "High|Medium|Low",
//   "citations": "exact file name from notes",
//   "evidence": "copy exact words from the notes here"
// }`;

//     // Set headers for streaming
//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");
//     res.setHeader("Connection", "keep-alive");

//     const stream = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       max_tokens: 1000,
//       temperature: 0.2,
//       stream: true,
//       messages: [
//         { role: "system", content: system },
//         { role: "user", content: question },
//       ],
//     });

//     let fullText = "";

//     for await (const chunk of stream) {
//       const delta = chunk.choices[0]?.delta?.content || "";
//       if (delta) {
//         fullText += delta;
//         res.write(`data: ${JSON.stringify({ delta })}\n\n`);
//       }
//     }

//     // Send final parsed JSON at the end
//     try {
//       const cleaned = fullText.replace(/```json|```/g, "").trim();
//       const parsed = JSON.parse(cleaned);
//       res.write(`data: ${JSON.stringify({ done: true, ...parsed })}\n\n`);
//     } catch {
//       res.write(`data: ${JSON.stringify({ done: true, answer: fullText, confidence: "Medium", citations: "", evidence: "" })}\n\n`);
//     }

//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
//     res.end();
//   }
// });

// app.post("/api/study", async (req, res) => {
//   try {
//     const { subjectName, notes } = req.body;

//     if (!subjectName || !notes || notes.length === 0)
//       return res.status(400).json({ error: "Missing fields" });

//     const validNotes = notes.filter((n) => n.text && n.text.trim().length > 100);
//     if (validNotes.length === 0)
//       return res.status(400).json({ error: "No readable text found in uploaded files. Please upload a text-based PDF or TXT file." });

//     const notesContext = validNotes
//       .map((n) => `[FILE: ${n.name}]\n${n.text.slice(0, 8000)}`)
//       .join("\n\n---\n\n");

//     const system = `You are a study question generator. Generate questions ONLY based on the notes below.

// Subject: "${subjectName}"

// NOTES:
// ${notesContext}

// Generate exactly this JSON (no markdown, no extra text):
// {
//   "mcqs": [
//     {
//       "question": "...",
//       "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
//       "correct": 0,
//       "explanation": "...",
//       "citation": "file name/section"
//     }
//   ],
//   "shortAnswer": [
//     {
//       "question": "...",
//       "modelAnswer": "...",
//       "citation": "file name/section"
//     }
//   ]
// }
// Generate exactly 5 MCQs and 3 short-answer questions.`;

//     const response = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       max_tokens: 2000,
//       temperature: 0.9,
//       messages: [
//         { role: "system", content: system },
//         {
//           role: "user",
//           content: `Generate a DIFFERENT and UNIQUE set of study questions now. Attempt number: ${Date.now()}. Do not repeat previous questions. Shuffle topics and focus on different aspects of the notes.`,
//         },
//       ],
//     });

//     const text = response.choices[0].message.content;
//     const cleaned = text.replace(/```json|```/g, "").trim();
//     res.json(JSON.parse(cleaned));
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

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

app.post("/api/upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });

    const results = [];
    for (const file of req.files) {
      const text = await extractText(file);
      const isScanned = file.mimetype === "application/pdf" && text.trim().length < 500;
      results.push({
        name: file.originalname,
        type: file.mimetype === "application/pdf" ? "pdf" : "txt",
        text,
        warning: isScanned ? "⚠️ This PDF is scanned/image-based. Text could not be extracted. Please upload a text-based PDF or TXT file." : null,
      });
    }
    res.json({ files: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { question, subjectName, notes, conversationHistory = [] } = req.body;

    if (!question || !subjectName || !notes || notes.length === 0)
      return res.status(400).json({ error: "Missing fields" });

    const validNotes = notes.filter((n) => n.text && n.text.trim().length > 100);
    if (validNotes.length === 0)
      return res.status(400).json({ error: "No readable text found in uploaded files." });

    const notesContext = validNotes
      .map((n, i) => `[SOURCE ${i + 1} - FILE: "${n.name}"]\n${n.text.slice(0, 15000)}\n[END OF SOURCE ${i + 1}]`)
      .join("\n\n===\n\n");

    const system = `You are AskMyNotes, a study assistant. Answer ONLY from the notes below. Never use outside knowledge or make anything up.

Subject: "${subjectName}"

NOTES:
${notesContext}

${conversationHistory.length > 0 ? `CONVERSATION SO FAR (for context only — still answer strictly from notes above):\n${conversationHistory.map(m => `${m.role === 'user' ? 'Student' : 'You'}: ${m.role === 'assistant' ? JSON.parse(m.content).answer : m.content}`).join('\n')}\n` : ''}

Rules:
- Read the notes carefully before answering
- If the answer is NOT in the notes, respond exactly: "Not found in your notes for ${subjectName}"
- For "evidence", find a sentence in the NOTES that directly supports your answer and copy it WORD FOR WORD. It must be at least 10 words long. Never use a heading or title as evidence.
- For "citations": Find which [SOURCE X - FILE: "filename"] block contains your evidence sentence. Copy ONLY that filename exactly as written between the quotes. If evidence is in SOURCE 1, cite SOURCE 1's filename. If in SOURCE 2, cite SOURCE 2's filename. Never mix them up.
- Always reply in this exact JSON format (no markdown, no extra text):
{
  "answer": "your answer here based strictly on the notes",
  "confidence": "High|Medium|Low",
  "citations": "exact file name where evidence was found",
  "evidence": "copy exact words from the notes here"
}`;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      temperature: 0.2,
      stream: true,
      messages: [
        { role: "system", content: system },
        ...conversationHistory,
        { role: "user", content: question },
      ],
    });

    let fullText = "";

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || "";
      if (delta) {
        fullText += delta;
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }

    try {
      const cleaned = fullText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      res.write(`data: ${JSON.stringify({ done: true, ...parsed })}\n\n`);
    } catch {
      res.write(`data: ${JSON.stringify({ done: true, answer: fullText, confidence: "Medium", citations: "", evidence: "" })}\n\n`);
    }

    res.end();
  } catch (err) {
    console.error(err);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

app.post("/api/study", async (req, res) => {
  try {
    const { subjectName, notes } = req.body;

    if (!subjectName || !notes || notes.length === 0)
      return res.status(400).json({ error: "Missing fields" });

    const validNotes = notes.filter((n) => n.text && n.text.trim().length > 100);
    if (validNotes.length === 0)
      return res.status(400).json({ error: "⚠️ Cannot generate questions — no readable text found in your uploaded files. Please upload a text-based PDF or TXT file." });

    const notesContext = validNotes
      .map((n) => `[FILE: ${n.name}]\n${n.text.slice(0, 8000)}`)
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
      model: "llama-3.1-8b-instant",
      max_tokens: 2000,
      temperature: 0.9,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Generate a DIFFERENT and UNIQUE set of study questions now. Attempt number: ${Date.now()}. Do not repeat previous questions. Shuffle topics and focus on different aspects of the notes.`,
        },
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