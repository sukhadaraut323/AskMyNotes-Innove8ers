# AskMyNotes 📚
### Subject-Scoped AI Study Copilot

AskMyNotes is a project that lets students upload their lecture notes (PDF/TXT) and interact with them through an AI-powered Q&A chat and study mode — all scoped strictly to their own uploaded content.

---

## Features

- **3-Subject Setup** — Configure up to 3 subjects, each with multiple PDF or TXT note files
- **Subject-Scoped Q&A Chat** — Ask questions and get answers sourced strictly from your uploaded notes (never from outside knowledge)
- **Grounded Responses** — Every answer includes a citation (file name), evidence (exact quote from notes), and a confidence level (High / Medium / Low)
- **"Not Found" Handling** — If the answer isn't in your notes, the AI says so instead of hallucinating
- **Study Mode** — Auto-generates 5 MCQs and 3 short-answer questions from your notes; regenerate for a fresh set
- **Voice Input** — Click the mic and ask questions hands-free; mic stays on for continuous multi-question sessions
- **Voice Output** — AI answers are read aloud automatically; individual "Read Aloud" button on each message
- **Streaming Responses** — Answers appear word-by-word in real time with a blinking cursor
- **Scanned PDF Detection** — Warns the user if an uploaded PDF is image-based and cannot be read

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Plain CSS with CSS variables |
| Backend | Node.js + Express |
| File Upload | Multer |
| PDF Parsing | pdf-parse |
| AI Model (Chat) | Groq — `llama-3.1-8b-instant` |
| AI Model (Study) | Groq — `llama-3.1-8b-instant` |
| Voice Input | Web Speech API (SpeechRecognition) |
| Voice Output | Web Speech API (SpeechSynthesis) |

---

## Project Structure

```
AskMyNotesFinal/
├── backend/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── components/
            ├── Sidebar.jsx
            ├── SetupPage.jsx
            ├── ChatPage.jsx
            └── StudyPage.jsx
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A free Groq API key from [https://console.groq.com](https://console.groq.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AskMyNotes-Innove8ers.git
cd AskMyNotes-Innove8ers
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
GROQ_API_KEY=gsk_your_key_here
PORT=3001
```

> Get your free API key at [https://console.groq.com/keys](https://console.groq.com/keys)

Start the backend:

```bash
node server.js
```

You should see:
```
✅ Server running on http://localhost:3001
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173)

---

## Usage

### Step 1 — Setup Subjects
- Name up to 3 subjects (e.g. Machine Learning, DSA, OS)
- Upload one or more PDF or TXT files per subject
- Click **Start Studying**

### Step 2 — Q&A Chat
- Select a subject from the sidebar
- Type your question and press **Enter** or click **Send**
- Or click the **🎤 mic button** to ask by voice — mic stays on for multiple questions
- Each answer shows the source file, an exact evidence quote, and a confidence badge

### Step 3 — Study Mode
- Click **Study Mode** in the sidebar
- Get 5 MCQs and 3 short-answer questions generated from your notes
- Click options to answer MCQs — correct answers highlight green, wrong ones red
- Click **Show Model Answer** for short-answer questions
- Click **↻ Regenerate** for a fresh set of questions

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload and extract text from PDF/TXT files |
| POST | `/api/chat` | Ask a question, get a streamed grounded answer |
| POST | `/api/study` | Generate MCQs and short-answer questions |

---

## Important Notes

### PDF Compatibility
- Only **text-based PDFs** work (where you can select/highlight text in a PDF viewer)
- **Scanned or image-based PDFs** cannot be parsed — the app will show a warning
- TXT files always work perfectly

### Groq Free Tier Limits
- 100,000 tokens per day
- If you hit the limit, wait ~1–2 hours for it to reset
- The app uses `llama-3.1-8b-instant` to stay within limits

### Voice Input
- Works in **Google Chrome** only (Web Speech API)
- Click mic once to start — it stays on until you click stop
- Ask multiple questions in one session without re-clicking

---

## Known Limitations

- No user authentication or login
- Chat history is not saved between sessions
- Handwritten notes cannot be read (image-based)
- Voice input requires Chrome browser

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key (starts with `gsk_`) |
| `PORT` | Backend port (default: 3001) |

---
