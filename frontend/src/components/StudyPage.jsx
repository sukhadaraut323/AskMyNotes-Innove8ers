// // import { useState, useEffect } from "react";

// // export default function StudyPage({ subject, API }) {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [tab, setTab] = useState("mcq");
// //   const [mcqAnswers, setMcqAnswers] = useState({});
// //   const [shownAnswers, setShownAnswers] = useState({});
// //   const [attemptCount, setAttemptCount] = useState(0);

// //   const generate = async () => {
// //     setLoading(true);
// //     setData(null);
// //     setMcqAnswers({});
// //     setShownAnswers({});
// //     setTab("mcq");

// //     try {
// //       const res = await fetch(`${API}/api/study`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           subjectName: subject.name,
// //           notes: subject.files,
// //           attempt: attemptCount,
// //         }),
// //       });
// //       const json = await res.json();
// //       if (json.error) {
// //         alert("Error: " + json.error);
// //       } else {
// //         setData(json);
// //         setAttemptCount((prev) => prev + 1);
// //       }
// //     } catch (err) {
// //       alert("Failed to generate: " + err.message);
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     generate();
// //   }, [subject.id]);

// //   return (
// //     <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
// //       {/* Topbar */}
// //       <div style={{
// //         padding: "20px 28px", borderBottom: "1px solid var(--border)",
// //         display: "flex", alignItems: "center", justifyContent: "space-between"
// //       }}>
// //         <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>
// //           📚 Study Mode — <span style={{ color: "var(--accent-light)" }}>{subject.name}</span>
// //         </div>
// //         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //           {attemptCount > 0 && (
// //             <span style={{ fontSize: 12, color: "var(--muted)" }}>
// //               Set #{attemptCount}
// //             </span>
// //           )}
// //           <button
// //             onClick={generate}
// //             disabled={loading}
// //             style={{
// //               padding: "8px 16px", borderRadius: 8,
// //               border: "1px solid var(--border)",
// //               background: loading ? "var(--surface)" : "transparent",
// //               color: loading ? "var(--muted)" : "var(--text)",
// //               cursor: loading ? "not-allowed" : "pointer",
// //               fontSize: 13, transition: "all 0.2s"
// //             }}
// //           >
// //             {loading ? "Generating..." : "↻ Regenerate"}
// //           </button>
// //         </div>
// //       </div>

// //       <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
// //         {loading && (
// //           <div style={{ textAlign: "center", color: "var(--muted)", paddingTop: 60 }}>
// //             <div style={{ fontSize: 32, marginBottom: 16 }}>📖</div>
// //             <div>Generating a new set of questions from your notes...</div>
// //             <div style={{ fontSize: 12, marginTop: 8 }}>This may take a few seconds</div>
// //           </div>
// //         )}

// //         {!loading && !data && (
// //           <div style={{ textAlign: "center", color: "var(--muted)", paddingTop: 60 }}>
// //             <div style={{ fontSize: 32, marginBottom: 16 }}>❌</div>
// //             <div>Failed to load questions.</div>
// //             <button
// //               onClick={generate}
// //               style={{
// //                 marginTop: 16, padding: "10px 20px", borderRadius: 8,
// //                 border: "1px solid var(--accent)", background: "var(--accent-glow)",
// //                 color: "var(--accent-light)", cursor: "pointer", fontSize: 13
// //               }}
// //             >
// //               Try Again
// //             </button>
// //           </div>
// //         )}

// //         {!loading && data && (
// //           <>
// //             {/* Tabs */}
// //             <div style={{
// //               display: "flex", gap: 4, background: "var(--surface)",
// //               padding: 4, borderRadius: 10, marginBottom: 24
// //             }}>
// //               {[
// //                 { id: "mcq", label: `Multiple Choice (${data.mcqs?.length || 0})` },
// //                 { id: "shortAnswer", label: `Short Answer (${data.shortAnswer?.length || 0})` },
// //               ].map((t) => (
// //                 <div
// //                   key={t.id}
// //                   onClick={() => setTab(t.id)}
// //                   style={{
// //                     flex: 1, padding: 8, borderRadius: 7, textAlign: "center",
// //                     cursor: "pointer", fontSize: 13, transition: "all 0.2s",
// //                     background: tab === t.id ? "var(--card)" : "transparent",
// //                     color: tab === t.id ? "var(--text)" : "var(--muted)",
// //                     border: `1px solid ${tab === t.id ? "var(--border)" : "transparent"}`,
// //                   }}
// //                 >
// //                   {t.label}
// //                 </div>
// //               ))}
// //             </div>

// //             {/* MCQs */}
// //             {tab === "mcq" && data.mcqs?.map((q, qi) => (
// //               <div key={qi} style={{
// //                 background: "var(--card)", border: "1px solid var(--border)",
// //                 borderRadius: 12, padding: 20, marginBottom: 14
// //               }}>
// //                 <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>
// //                   Q{qi + 1}. {q.question}
// //                 </div>
// //                 {q.options.map((opt, oi) => {
// //                   const answered = mcqAnswers[qi] !== undefined;
// //                   const isCorrect = oi === q.correct;
// //                   const isChosen = mcqAnswers[qi] === oi;
// //                   let border = "var(--border)", bg = "transparent", color = "var(--text)";
// //                   if (answered) {
// //                     if (isCorrect) { border = "var(--green)"; bg = "rgba(0,212,170,0.1)"; color = "var(--green)"; }
// //                     else if (isChosen) { border = "var(--red)"; bg = "rgba(255,107,107,0.1)"; color = "var(--red)"; }
// //                   }
// //                   return (
// //                     <div
// //                       key={oi}
// //                       onClick={() => { if (!answered) setMcqAnswers((p) => ({ ...p, [qi]: oi })); }}
// //                       style={{
// //                         padding: "10px 14px", borderRadius: 8,
// //                         border: `1px solid ${border}`,
// //                         marginBottom: 6,
// //                         cursor: answered ? "default" : "pointer",
// //                         fontSize: 13, background: bg, color,
// //                         transition: "all 0.2s"
// //                       }}
// //                     >
// //                       {opt}
// //                     </div>
// //                   );
// //                 })}
// //                 {mcqAnswers[qi] !== undefined && (
// //                   <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
// //                     💡 {q.explanation}
// //                     <br />
// //                     <span style={{ color: "var(--accent)" }}>📎 {q.citation}</span>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}

// //             {/* Short Answer */}
// //             {tab === "shortAnswer" && data.shortAnswer?.map((q, qi) => (
// //               <div key={qi} style={{
// //                 background: "var(--card)", border: "1px solid var(--border)",
// //                 borderRadius: 12, padding: 20, marginBottom: 14
// //               }}>
// //                 <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>
// //                   Q{qi + 1}. {q.question}
// //                 </div>
// //                 <button
// //                   onClick={() => setShownAnswers((p) => ({ ...p, [qi]: !p[qi] }))}
// //                   style={{
// //                     padding: "6px 14px", borderRadius: 8,
// //                     border: "1px solid var(--border)",
// //                     background: "transparent", color: "var(--text)",
// //                     cursor: "pointer", fontSize: 13
// //                   }}
// //                 >
// //                   {shownAnswers[qi] ? "Hide Answer" : "Show Model Answer"}
// //                 </button>
// //                 {shownAnswers[qi] && (
// //                   <div style={{
// //                     marginTop: 12, padding: 12, background: "var(--surface)",
// //                     borderRadius: 8, fontSize: 13, color: "var(--muted)", lineHeight: 1.6
// //                   }}>
// //                     {q.modelAnswer}
// //                     <div style={{ marginTop: 8, color: "var(--accent)" }}>
// //                       📎 {q.citation}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";

// export default function StudyPage({ subject, API }) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [tab, setTab] = useState("mcq");
//   const [mcqAnswers, setMcqAnswers] = useState({});
//   const [shownAnswers, setShownAnswers] = useState({});
//   const [attemptCount, setAttemptCount] = useState(0);

//   const generate = async () => {
//     // Check if subject has any readable files before calling API
//     const hasReadableFiles = subject.files.some(
//       (f) => f.text && f.text.trim().length > 100
//     );
//     if (!hasReadableFiles) {
//       setError("⚠️ Cannot generate questions — no readable text found in your uploaded files. Please upload a text-based PDF or TXT file.");
//       return;
//     }

//     setLoading(true);
//     setData(null);
//     setError(null);
//     setMcqAnswers({});
//     setShownAnswers({});
//     setTab("mcq");

//     try {
//       const res = await fetch(`${API}/api/study`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           subjectName: subject.name,
//           notes: subject.files,
//           attempt: attemptCount,
//         }),
//       });
//       const json = await res.json();
//       if (json.error) {
//         setError(json.error);
//       } else {
//         setData(json);
//         setAttemptCount((prev) => prev + 1);
//       }
//     } catch (err) {
//       setError("Failed to connect to server: " + err.message);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     generate();
//   }, [subject.id]);

//   return (
//     <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
//       {/* Topbar */}
//       <div style={{
//         padding: "20px 28px", borderBottom: "1px solid var(--border)",
//         display: "flex", alignItems: "center", justifyContent: "space-between"
//       }}>
//         <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>
//           📚 Study Mode — <span style={{ color: "var(--accent-light)" }}>{subject.name}</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           {attemptCount > 0 && !error && (
//             <span style={{ fontSize: 12, color: "var(--muted)" }}>Set #{attemptCount}</span>
//           )}
//           <button
//             onClick={generate}
//             disabled={loading}
//             style={{
//               padding: "8px 16px", borderRadius: 8,
//               border: "1px solid var(--border)",
//               background: loading ? "var(--surface)" : "transparent",
//               color: loading ? "var(--muted)" : "var(--text)",
//               cursor: loading ? "not-allowed" : "pointer",
//               fontSize: 13, transition: "all 0.2s"
//             }}
//           >
//             {loading ? "Generating..." : "↻ Regenerate"}
//           </button>
//         </div>
//       </div>

//       <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

//         {/* Loading */}
//         {loading && (
//           <div style={{ textAlign: "center", color: "var(--muted)", paddingTop: 60 }}>
//             <div style={{ fontSize: 32, marginBottom: 16 }}>📖</div>
//             <div>Generating questions from your notes...</div>
//             <div style={{ fontSize: 12, marginTop: 8 }}>This may take a few seconds</div>
//           </div>
//         )}

//         {/* Error — scanned PDF or no text */}
//         {!loading && error && (
//           <div style={{ textAlign: "center", paddingTop: 60 }}>
//             <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
//             <div style={{
//               padding: "16px 24px", borderRadius: 12,
//               border: "1px solid var(--yellow)",
//               background: "rgba(255,209,102,0.08)",
//               color: "var(--yellow)", fontSize: 14,
//               maxWidth: 500, margin: "0 auto", lineHeight: 1.6
//             }}>
//               {error}
//             </div>
//             <div style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
//               Please go to <strong>Edit Setup</strong> and upload a text-based PDF or TXT file for <strong>{subject.name}</strong>
//             </div>
//           </div>
//         )}

//         {/* Questions */}
//         {!loading && data && !error && (
//           <>
//             {/* Tabs */}
//             <div style={{
//               display: "flex", gap: 4, background: "var(--surface)",
//               padding: 4, borderRadius: 10, marginBottom: 24
//             }}>
//               {[
//                 { id: "mcq", label: `Multiple Choice (${data.mcqs?.length || 0})` },
//                 { id: "shortAnswer", label: `Short Answer (${data.shortAnswer?.length || 0})` },
//               ].map((t) => (
//                 <div
//                   key={t.id}
//                   onClick={() => setTab(t.id)}
//                   style={{
//                     flex: 1, padding: 8, borderRadius: 7, textAlign: "center",
//                     cursor: "pointer", fontSize: 13, transition: "all 0.2s",
//                     background: tab === t.id ? "var(--card)" : "transparent",
//                     color: tab === t.id ? "var(--text)" : "var(--muted)",
//                     border: `1px solid ${tab === t.id ? "var(--border)" : "transparent"}`,
//                   }}
//                 >
//                   {t.label}
//                 </div>
//               ))}
//             </div>

//             {/* MCQs */}
//             {tab === "mcq" && data.mcqs?.map((q, qi) => (
//               <div key={qi} style={{
//                 background: "var(--card)", border: "1px solid var(--border)",
//                 borderRadius: 12, padding: 20, marginBottom: 14
//               }}>
//                 <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>
//                   Q{qi + 1}. {q.question}
//                 </div>
//                 {q.options.map((opt, oi) => {
//                   const answered = mcqAnswers[qi] !== undefined;
//                   const isCorrect = oi === q.correct;
//                   const isChosen = mcqAnswers[qi] === oi;
//                   let border = "var(--border)", bg = "transparent", color = "var(--text)";
//                   if (answered) {
//                     if (isCorrect) { border = "var(--green)"; bg = "rgba(0,212,170,0.1)"; color = "var(--green)"; }
//                     else if (isChosen) { border = "var(--red)"; bg = "rgba(255,107,107,0.1)"; color = "var(--red)"; }
//                   }
//                   return (
//                     <div
//                       key={oi}
//                       onClick={() => { if (!answered) setMcqAnswers((p) => ({ ...p, [qi]: oi })); }}
//                       style={{
//                         padding: "10px 14px", borderRadius: 8,
//                         border: `1px solid ${border}`,
//                         marginBottom: 6,
//                         cursor: answered ? "default" : "pointer",
//                         fontSize: 13, background: bg, color,
//                         transition: "all 0.2s"
//                       }}
//                     >
//                       {opt}
//                     </div>
//                   );
//                 })}
//                 {mcqAnswers[qi] !== undefined && (
//                   <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
//                     💡 {q.explanation}
//                     <br />
//                     <span style={{ color: "var(--accent)" }}>📎 {q.citation}</span>
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Short Answer */}
//             {tab === "shortAnswer" && data.shortAnswer?.map((q, qi) => (
//               <div key={qi} style={{
//                 background: "var(--card)", border: "1px solid var(--border)",
//                 borderRadius: 12, padding: 20, marginBottom: 14
//               }}>
//                 <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>
//                   Q{qi + 1}. {q.question}
//                 </div>
//                 <button
//                   onClick={() => setShownAnswers((p) => ({ ...p, [qi]: !p[qi] }))}
//                   style={{
//                     padding: "6px 14px", borderRadius: 8,
//                     border: "1px solid var(--border)",
//                     background: "transparent", color: "var(--text)",
//                     cursor: "pointer", fontSize: 13
//                   }}
//                 >
//                   {shownAnswers[qi] ? "Hide Answer" : "Show Model Answer"}
//                 </button>
//                 {shownAnswers[qi] && (
//                   <div style={{
//                     marginTop: 12, padding: 12, background: "var(--surface)",
//                     borderRadius: 8, fontSize: 13, color: "var(--muted)", lineHeight: 1.6
//                   }}>
//                     {q.modelAnswer}
//                     <div style={{ marginTop: 8, color: "var(--accent)" }}>
//                       📎 {q.citation}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function StudyPage({ subject, API }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("mcq");
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [shownAnswers, setShownAnswers] = useState({});
  const [attemptCount, setAttemptCount] = useState(0);

  const generate = async () => {
    console.log("FILES CHECK:", subject.files.map(f => ({ name: f.name, textLen: f.text?.length || 0 })));
    const hasReadableFiles = subject.files.some(
      (f) => f.text && f.text.trim().length > 100
    );

    if (!hasReadableFiles) {
      setError("⚠️ Cannot generate questions — the uploaded PDF is scanned or image-based and text could not be extracted. Please upload a text-based PDF or a TXT file.");
      setData(null);
      return;
    }

    setLoading(true);
    setData(null);
    setError(null);
    setMcqAnswers({});
    setShownAnswers({});
    setTab("mcq");

    try {
      const res = await fetch(`${API}/api/study`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectName: subject.name,
          notes: subject.files,
          attempt: attemptCount,
        }),
      });
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else {
        setData(json);
        setAttemptCount((prev) => prev + 1);
      }
    } catch (err) {
      setError("Failed to connect to server: " + err.message);
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {attemptCount > 0 && !error && (
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Set #{attemptCount}</span>
          )}
          <button
            onClick={generate}
            disabled={loading}
            style={{
              padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)",
              background: loading ? "var(--surface)" : "transparent",
              color: loading ? "var(--muted)" : "var(--text)",
              cursor: loading ? "not-allowed" : "pointer", fontSize: 13,
            }}
          >
            {loading ? "Generating..." : "↻ Regenerate"}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", color: "var(--muted)", paddingTop: 60 }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>📖</div>
            <div>Generating questions from your notes...</div>
            <div style={{ fontSize: 12, marginTop: 8 }}>This may take a few seconds</div>
          </div>
        )}

        {/* Error state — scanned PDF */}
        {!loading && error && (
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📄</div>
            <div style={{
              padding: "20px 28px", borderRadius: 12, maxWidth: 520, margin: "0 auto",
              border: "1px solid var(--yellow)", background: "rgba(255,209,102,0.08)",
              color: "var(--yellow)", fontSize: 14, lineHeight: 1.7
            }}>
              {error}
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
              Go to <strong style={{ color: "var(--text)" }}>Edit Setup</strong> and upload a text-based PDF or TXT file for <strong style={{ color: "var(--text)" }}>{subject.name}</strong>
            </div>
          </div>
        )}

        {/* Questions */}
        {!loading && data && !error && (
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
                <div key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: 8, borderRadius: 7, textAlign: "center",
                  cursor: "pointer", fontSize: 13, transition: "all 0.2s",
                  background: tab === t.id ? "var(--card)" : "transparent",
                  color: tab === t.id ? "var(--text)" : "var(--muted)",
                  border: `1px solid ${tab === t.id ? "var(--border)" : "transparent"}`,
                }}>
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
                    <div key={oi}
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
                    💡 {q.explanation}<br />
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