import { useState, useEffect } from "react";

export default function StudyPage({ subject, API }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("mcq");
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [shownAnswers, setShownAnswers] = useState({});

  const generate = async () => {
    setLoading(true);
    setData(null);
    setMcqAnswers({});
    setShownAnswers({});

    try {
      const res = await fetch(`${API}/api/study`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectName: subject.name, notes: subject.files }),
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      alert("Failed to generate: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => { generate(); }, [subject.id]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Topbar */}
      <div style={{
        padding: "20px 28px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>
          📚 Study Mode — <span style={{ color: "var(--accent-light)" }}>{subject.name}</span>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          style={{
            padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)",
            background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 13
          }}
        >
          ↻ Regenerate
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
        {loading && (
          <div style={{ textAlign: "center", color: "var(--muted)", paddingTop: 60 }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>📖</div>
            Generating questions from your notes...
          </div>
        )}

        {!loading && data && (
          <>
            {/* Tabs */}
            <div style={{
              display: "flex", gap: 4, background: "var(--surface)",
              padding: 4, borderRadius: 10, marginBottom: 24
            }}>
              {[
                { id: "mcq", label: `Multiple Choice (${data.mcqs?.length || 0})` },
                { id: "shortAnswer", label: `Short Answer (${data.shortAnswer?.length || 0})` },
              ].map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    flex: 1, padding: 8, borderRadius: 7, textAlign: "center",
                    cursor: "pointer", fontSize: 13, transition: "all 0.2s",
                    background: tab === t.id ? "var(--card)" : "transparent",
                    color: tab === t.id ? "var(--text)" : "var(--muted)",
                    border: `1px solid ${tab === t.id ? "var(--border)" : "transparent"}`,
                  }}
                >
                  {t.label}
                </div>
              ))}
            </div>

            {/* MCQs */}
            {tab === "mcq" && data.mcqs?.map((q, qi) => (
              <div key={qi} style={{
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: 12, padding: 20, marginBottom: 14
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>
                  Q{qi + 1}. {q.question}
                </div>
                {q.options.map((opt, oi) => {
                  const answered = mcqAnswers[qi] !== undefined;
                  const isCorrect = oi === q.correct;
                  const isChosen = mcqAnswers[qi] === oi;
                  let border = "var(--border)", bg = "transparent", color = "var(--text)";
                  if (answered) {
                    if (isCorrect) { border = "var(--green)"; bg = "rgba(0,212,170,0.1)"; color = "var(--green)"; }
                    else if (isChosen) { border = "var(--red)"; bg = "rgba(255,107,107,0.1)"; color = "var(--red)"; }
                  }
                  return (
                    <div
                      key={oi}
                      onClick={() => { if (!answered) setMcqAnswers((p) => ({ ...p, [qi]: oi })); }}
                      style={{
                        padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`,
                        marginBottom: 6, cursor: answered ? "default" : "pointer",
                        fontSize: 13, background: bg, color, transition: "all 0.2s"
                      }}
                    >
                      {opt}
                    </div>
                  );
                })}
                {mcqAnswers[qi] !== undefined && (
                  <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
                    💡 {q.explanation}
                    <br />
                    <span style={{ color: "var(--accent)" }}>📎 {q.citation}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Short Answer */}
            {tab === "shortAnswer" && data.shortAnswer?.map((q, qi) => (
              <div key={qi} style={{
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: 12, padding: 20, marginBottom: 14
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>
                  Q{qi + 1}. {q.question}
                </div>
                <button
                  onClick={() => setShownAnswers((p) => ({ ...p, [qi]: !p[qi] }))}
                  style={{
                    padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)",
                    background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 13
                  }}
                >
                  {shownAnswers[qi] ? "Hide Answer" : "Show Model Answer"}
                </button>
                {shownAnswers[qi] && (
                  <div style={{
                    marginTop: 12, padding: 12, background: "var(--surface)",
                    borderRadius: 8, fontSize: 13, color: "var(--muted)", lineHeight: 1.6
                  }}>
                    {q.modelAnswer}
                    <div style={{ marginTop: 8, color: "var(--accent)" }}>📎 {q.citation}</div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}