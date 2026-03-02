// // // import { useState, useRef } from "react";

// // // export default function ChatPage({ subject, API }) {
// // //   const [messages, setMessages] = useState([
// // //     {
// // //       role: "ai",
// // //       text: `Hi! I'm ready to answer questions from your ${subject.name} notes. Ask me anything!`,
// // //       confidence: null,
// // //     },
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const endRef = useRef();

// // //   const send = async () => {
// // //     if (!input.trim() || loading) return;
// // //     const question = input.trim();
// // //     setInput("");
// // //     setMessages((prev) => [...prev, { role: "user", text: question }]);
// // //     setLoading(true);

// // //     try {
// // //       const res = await fetch(`${API}/api/chat`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           question,
// // //           subjectName: subject.name,
// // //           notes: subject.files,
// // //         }),
// // //       });
// // //       const data = await res.json();
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         {
// // //           role: "ai",
// // //           text: data.answer || data.error,
// // //           confidence: data.confidence,
// // //           citations: data.citations,
// // //           evidence: data.evidence,
// // //         },
// // //       ]);
// // //     } catch {
// // //       setMessages((prev) => [...prev, { role: "ai", text: "Connection error. Is the backend running?" }]);
// // //     }

// // //     setLoading(false);
// // //     setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
// // //   };

// // //   const confidenceColor = (c) =>
// // //     c === "High" ? "var(--green)" : c === "Medium" ? "var(--yellow)" : "var(--red)";

// // //   return (
// // //     <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
// // //       {/* Topbar */}
// // //       <div style={{
// // //         padding: "20px 28px", borderBottom: "1px solid var(--border)",
// // //         display: "flex", alignItems: "center", justifyContent: "space-between"
// // //       }}>
// // //         <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>
// // //           💬 Q&A — <span style={{ color: "var(--accent-light)" }}>{subject.name}</span>
// // //         </div>
// // //         <span style={{
// // //           padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
// // //           background: "var(--accent-glow)", color: "var(--accent-light)",
// // //           border: "1px solid var(--accent)"
// // //         }}>
// // //           Subject-Scoped
// // //         </span>
// // //       </div>

// // //       {/* Messages */}
// // //       <div style={{
// // //         flex: 1, overflowY: "auto", padding: "24px 28px",
// // //         display: "flex", flexDirection: "column", gap: 16
// // //       }}>
// // //         {messages.map((msg, i) => (
// // //           <div key={i} style={{
// // //             maxWidth: "80%",
// // //             alignSelf: msg.role === "user" ? "flex-end" : "flex-start"
// // //           }}>
// // //             <div style={{
// // //               padding: "14px 18px", fontSize: 14, lineHeight: 1.6,
// // //               background: msg.role === "user" ? "var(--accent)" : "var(--card)",
// // //               border: msg.role === "ai" ? "1px solid var(--border)" : "none",
// // //               borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
// // //             }}>
// // //               {msg.text}

// // //               {msg.citations && (
// // //                 <div style={{
// // //                   marginTop: 10, padding: "8px 12px", background: "var(--surface)",
// // //                   borderLeft: "3px solid var(--accent)", borderRadius: "0 8px 8px 0", fontSize: 12
// // //                 }}>
// // //                   📎 <strong>Citation:</strong> {msg.citations}
// // //                 </div>
// // //               )}

// // //               {msg.evidence && (
// // //                 <div style={{
// // //                   marginTop: 8, padding: "8px 12px",
// // //                   background: "rgba(108,99,255,0.08)", borderRadius: 8,
// // //                   fontSize: 12, color: "var(--muted)", fontStyle: "italic"
// // //                 }}>
// // //                   💡 "{msg.evidence}"
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {msg.confidence && (
// // //               <div style={{ marginTop: 6 }}>
// // //                 <span style={{
// // //                   padding: "3px 10px", borderRadius: 20, fontSize: 11,
// // //                   border: `1px solid ${confidenceColor(msg.confidence)}`,
// // //                   color: confidenceColor(msg.confidence)
// // //                 }}>
// // //                   {msg.confidence} Confidence
// // //                 </span>
// // //               </div>
// // //             )}
// // //           </div>
// // //         ))}

// // //         {loading && (
// // //           <div style={{ alignSelf: "flex-start" }}>
// // //             <div style={{
// // //               padding: "14px 18px", background: "var(--card)",
// // //               border: "1px solid var(--border)", borderRadius: "14px 14px 14px 4px"
// // //             }}>
// // //               <div style={{ display: "flex", gap: 4 }}>
// // //                 {[0, 0.2, 0.4].map((delay, i) => (
// // //                   <div key={i} style={{
// // //                     width: 6, height: 6, borderRadius: "50%", background: "var(--muted)",
// // //                     animation: `bounce 1.2s ${delay}s infinite`
// // //                   }} />
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //         <div ref={endRef} />
// // //       </div>

// // //       {/* Input */}
// // //       <div style={{
// // //         padding: "20px 28px", borderTop: "1px solid var(--border)",
// // //         display: "flex", gap: 10
// // //       }}>
// // //         <textarea
// // //           value={input}
// // //           onChange={(e) => setInput(e.target.value)}
// // //           onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
// // //           placeholder={`Ask anything from your ${subject.name} notes...`}
// // //           rows={1}
// // //           style={{
// // //             flex: 1, background: "var(--card)", border: "1px solid var(--border)",
// // //             borderRadius: 12, padding: "14px 18px", color: "var(--text)",
// // //             fontFamily: "DM Sans, sans-serif", fontSize: 14, outline: "none", resize: "none"
// // //           }}
// // //         />
// // //         <button
// // //           onClick={send}
// // //           disabled={loading || !input.trim()}
// // //           style={{
// // //             padding: "0 24px", borderRadius: 12, border: "none", cursor: "pointer",
// // //             background: "var(--accent)", color: "#fff",
// // //             fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 14,
// // //             opacity: loading || !input.trim() ? 0.5 : 1, transition: "opacity 0.2s"
// // //           }}
// // //         >
// // //           Send
// // //         </button>
// // //       </div>

// // //       <style>{`
// // //         @keyframes bounce {
// // //           0%, 60%, 100% { transform: translateY(0); }
// // //           30% { transform: translateY(-6px); }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // import { useState, useRef } from "react";

// // export default function ChatPage({ subject, API }) {
// //   const [messages, setMessages] = useState([
// //     {
// //       role: "ai",
// //       text: `Hi! I'm ready to answer questions from your ${subject.name} notes. Ask me anything!`,
// //       confidence: null,
// //     },
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [listening, setListening] = useState(false);
// //   const [speaking, setSpeaking] = useState(false);
// //   const endRef = useRef();
// //   const recognitionRef = useRef(null);

// //   // ── Voice Input (Speech to Text) ──────────────────────────────
// //   const startListening = () => {
// //     const SpeechRecognition =
// //       window.SpeechRecognition || window.webkitSpeechRecognition;

// //     if (!SpeechRecognition) {
// //       alert("Your browser does not support voice input. Use Chrome.");
// //       return;
// //     }

// //     const recognition = new SpeechRecognition();
// //     recognition.lang = "en-US";
// //     recognition.continuous = false;
// //     recognition.interimResults = false;

// //     recognition.onstart = () => setListening(true);

// //     recognition.onresult = (event) => {
// //       const transcript = event.results[0][0].transcript;
// //       setInput(transcript);
// //       setListening(false);
// //     };

// //     recognition.onerror = () => setListening(false);
// //     recognition.onend = () => setListening(false);

// //     recognitionRef.current = recognition;
// //     recognition.start();
// //   };

// //   const stopListening = () => {
// //     recognitionRef.current?.stop();
// //     setListening(false);
// //   };

// //   // ── Voice Output (Text to Speech) ─────────────────────────────
// //   const speak = (text) => {
// //     if (!window.speechSynthesis) return;

// //     // Stop any current speech
// //     window.speechSynthesis.cancel();

// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.lang = "en-US";
// //     utterance.rate = 1;
// //     utterance.pitch = 1;

// //     utterance.onstart = () => setSpeaking(true);
// //     utterance.onend = () => setSpeaking(false);
// //     utterance.onerror = () => setSpeaking(false);

// //     window.speechSynthesis.speak(utterance);
// //   };

// //   const stopSpeaking = () => {
// //     window.speechSynthesis.cancel();
// //     setSpeaking(false);
// //   };

// //   // ── Send Message ───────────────────────────────────────────────
// //   const send = async () => {
// //     if (!input.trim() || loading) return;
// //     const question = input.trim();
// //     setInput("");
// //     setMessages((prev) => [...prev, { role: "user", text: question }]);
// //     setLoading(true);

// //     try {
// //       const res = await fetch(`${API}/api/chat`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           question,
// //           subjectName: subject.name,
// //           notes: subject.files,
// //         }),
// //       });
// //       const data = await res.json();
// //       const aiMessage = {
// //         role: "ai",
// //         text: data.answer || data.error,
// //         confidence: data.confidence,
// //         citations: data.citations,
// //         evidence: data.evidence,
// //       };
// //       setMessages((prev) => [...prev, aiMessage]);

// //       // Auto speak the answer
// //       if (data.answer) speak(data.answer);

// //     } catch {
// //       setMessages((prev) => [
// //         ...prev,
// //         { role: "ai", text: "Connection error. Is the backend running?" },
// //       ]);
// //     }

// //     setLoading(false);
// //     setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
// //   };

// //   const confidenceColor = (c) =>
// //     c === "High" ? "var(--green)" : c === "Medium" ? "var(--yellow)" : "var(--red)";

// //   return (
// //     <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
// //       {/* Topbar */}
// //       <div style={{
// //         padding: "20px 28px", borderBottom: "1px solid var(--border)",
// //         display: "flex", alignItems: "center", justifyContent: "space-between"
// //       }}>
// //         <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>
// //           💬 Q&A — <span style={{ color: "var(--accent-light)" }}>{subject.name}</span>
// //         </div>
// //         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //           {speaking && (
// //             <button
// //               onClick={stopSpeaking}
// //               style={{
// //                 padding: "6px 14px", borderRadius: 8, border: "1px solid var(--yellow)",
// //                 background: "rgba(255,209,102,0.1)", color: "var(--yellow)",
// //                 cursor: "pointer", fontSize: 12, fontFamily: "DM Sans, sans-serif"
// //               }}
// //             >
// //               🔊 Stop Speaking
// //             </button>
// //           )}
// //           <span style={{
// //             padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
// //             background: "var(--accent-glow)", color: "var(--accent-light)",
// //             border: "1px solid var(--accent)"
// //           }}>
// //             Subject-Scoped
// //           </span>
// //         </div>
// //       </div>

// //       {/* Messages */}
// //       <div style={{
// //         flex: 1, overflowY: "auto", padding: "24px 28px",
// //         display: "flex", flexDirection: "column", gap: 16
// //       }}>
// //         {messages.map((msg, i) => (
// //           <div key={i} style={{
// //             maxWidth: "80%",
// //             alignSelf: msg.role === "user" ? "flex-end" : "flex-start"
// //           }}>
// //             <div style={{
// //               padding: "14px 18px", fontSize: 14, lineHeight: 1.6,
// //               background: msg.role === "user" ? "var(--accent)" : "var(--card)",
// //               border: msg.role === "ai" ? "1px solid var(--border)" : "none",
// //               borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
// //             }}>
// //               {msg.text}

// //               {msg.citations && (
// //                 <div style={{
// //                   marginTop: 10, padding: "8px 12px", background: "var(--surface)",
// //                   borderLeft: "3px solid var(--accent)", borderRadius: "0 8px 8px 0", fontSize: 12
// //                 }}>
// //                   📎 <strong>Citation:</strong> {msg.citations}
// //                 </div>
// //               )}

// //               {msg.evidence && (
// //                 <div style={{
// //                   marginTop: 8, padding: "8px 12px",
// //                   background: "rgba(108,99,255,0.08)", borderRadius: 8,
// //                   fontSize: 12, color: "var(--muted)", fontStyle: "italic"
// //                 }}>
// //                   💡 "{msg.evidence}"
// //                 </div>
// //               )}
// //             </div>

// //             {/* Confidence + Speak button for AI messages */}
// //             {msg.role === "ai" && msg.confidence && (
// //               <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
// //                 <span style={{
// //                   padding: "3px 10px", borderRadius: 20, fontSize: 11,
// //                   border: `1px solid ${confidenceColor(msg.confidence)}`,
// //                   color: confidenceColor(msg.confidence)
// //                 }}>
// //                   {msg.confidence} Confidence
// //                 </span>
// //                 <button
// //                   onClick={() => speak(msg.text)}
// //                   style={{
// //                     padding: "3px 10px", borderRadius: 20, fontSize: 11,
// //                     border: "1px solid var(--border)", background: "transparent",
// //                     color: "var(--muted)", cursor: "pointer"
// //                   }}
// //                 >
// //                   🔊 Read Aloud
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         ))}

// //         {loading && (
// //           <div style={{ alignSelf: "flex-start" }}>
// //             <div style={{
// //               padding: "14px 18px", background: "var(--card)",
// //               border: "1px solid var(--border)", borderRadius: "14px 14px 14px 4px"
// //             }}>
// //               <div style={{ display: "flex", gap: 4 }}>
// //                 {[0, 0.2, 0.4].map((delay, i) => (
// //                   <div key={i} style={{
// //                     width: 6, height: 6, borderRadius: "50%", background: "var(--muted)",
// //                     animation: `bounce 1.2s ${delay}s infinite`
// //                   }} />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //         <div ref={endRef} />
// //       </div>

// //       {/* Input Area */}
// //       <div style={{
// //         padding: "20px 28px", borderTop: "1px solid var(--border)",
// //         display: "flex", gap: 10, alignItems: "flex-end"
// //       }}>
// //         {/* Mic Button */}
// //         <button
// //           onClick={listening ? stopListening : startListening}
// //           style={{
// //             width: 48, height: 48, borderRadius: 12, border: `1px solid ${listening ? "var(--red)" : "var(--border)"}`,
// //             background: listening ? "rgba(255,107,107,0.15)" : "var(--card)",
// //             color: listening ? "var(--red)" : "var(--muted)",
// //             cursor: "pointer", fontSize: 20, display: "flex",
// //             alignItems: "center", justifyContent: "center",
// //             transition: "all 0.2s",
// //             animation: listening ? "pulse 1s infinite" : "none"
// //           }}
// //           title={listening ? "Stop recording" : "Start voice input"}
// //         >
// //           {listening ? "⏹" : "🎤"}
// //         </button>

// //         <textarea
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => {
// //             if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
// //           }}
// //           placeholder={listening ? "🎤 Listening... speak now" : `Ask anything from your ${subject.name} notes...`}
// //           rows={1}
// //           style={{
// //             flex: 1, background: "var(--card)",
// //             border: `1px solid ${listening ? "var(--red)" : "var(--border)"}`,
// //             borderRadius: 12, padding: "14px 18px", color: "var(--text)",
// //             fontFamily: "DM Sans, sans-serif", fontSize: 14, outline: "none", resize: "none",
// //             transition: "border-color 0.2s"
// //           }}
// //         />

// //         <button
// //           onClick={send}
// //           disabled={loading || !input.trim()}
// //           style={{
// //             padding: "0 24px", height: 48, borderRadius: 12, border: "none",
// //             cursor: "pointer", background: "var(--accent)", color: "#fff",
// //             fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 14,
// //             opacity: loading || !input.trim() ? 0.5 : 1, transition: "opacity 0.2s"
// //           }}
// //         >
// //           Send
// //         </button>
// //       </div>

// //       <style>{`
// //         @keyframes bounce {
// //           0%, 60%, 100% { transform: translateY(0); }
// //           30% { transform: translateY(-6px); }
// //         }
// //         @keyframes pulse {
// //           0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,107,0.4); }
// //           50% { box-shadow: 0 0 0 8px rgba(255,107,107,0); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// import { useState, useRef } from "react";

// export default function ChatPage({ subject, API }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "ai",
//       text: `Hi! I'm ready to answer questions from your ${subject.name} notes. Ask me anything!`,
//       confidence: null,
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);
//   const [speaking, setSpeaking] = useState(false);
//   const endRef = useRef();
//   const recognitionRef = useRef(null);

//   const startListening = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Your browser does not support voice input. Use Chrome.");
//       return;
//     }
//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.onstart = () => setListening(true);
//     recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setInput(transcript);
//     setListening(false);
//     // Auto send after voice input
//     setTimeout(() => {
//       sendMessage(transcript);
//     }, 300);
//   };
//     recognition.onerror = () => setListening(false);
//     recognition.onend = () => setListening(false);
//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setListening(false);
//   };

//   const speak = (text) => {
//     if (!window.speechSynthesis) return;
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     utterance.rate = 1;
//     utterance.pitch = 1;
//     utterance.onstart = () => setSpeaking(true);
//     utterance.onend = () => setSpeaking(false);
//     utterance.onerror = () => setSpeaking(false);
//     window.speechSynthesis.speak(utterance);
//   };

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel();
//     setSpeaking(false);
//   };

//   const sendMessage = async (voiceText) => {
//     const question = voiceText || input.trim();
//     if (!question || loading) return;
//     setInput("");

//     // Add user message
//     setMessages((prev) => [...prev, { role: "user", text: question }]);
//     setLoading(true);

//     // Add empty AI message that we'll fill in as stream comes in
//     setMessages((prev) => [...prev, {
//       role: "ai",
//       text: "",
//       streaming: true,
//       confidence: null,
//       citations: null,
//       evidence: null,
//     }]);

//     try {
//       const res = await fetch(`${API}/api/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question,
//           subjectName: subject.name,
//           notes: subject.files,
//         }),
//       });

//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();
//       let rawJson = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value);
//         const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

//         for (const line of lines) {
//           try {
//             const data = JSON.parse(line.replace("data: ", ""));

//             if (data.error) {
//               setMessages((prev) => {
//                 const updated = [...prev];
//                 updated[updated.length - 1] = {
//                   role: "ai", text: data.error, streaming: false, confidence: null
//                 };
//                 return updated;
//               });
//               break;
//             }

//             if (data.done) {
//               // Final message with all fields
//               setMessages((prev) => {
//                 const updated = [...prev];
//                 updated[updated.length - 1] = {
//                   role: "ai",
//                   text: data.answer,
//                   streaming: false,
//                   confidence: data.confidence,
//                   citations: data.citations,
//                   evidence: data.evidence,
//                 };
//                 return updated;
//               });
//               if (data.answer) speak(data.answer);
//             } else if (data.delta) {
//               // Stream delta — accumulate raw text
//               rawJson += data.delta;
//               // Try to show partial answer while streaming
//               const answerMatch = rawJson.match(/"answer"\s*:\s*"([^"]*)/);
//               if (answerMatch) {
//                 const partialAnswer = answerMatch[1];
//                 setMessages((prev) => {
//                   const updated = [...prev];
//                   updated[updated.length - 1] = {
//                     ...updated[updated.length - 1],
//                     text: partialAnswer,
//                     streaming: true,
//                   };
//                   return updated;
//                 });
//               }
//             }
//           } catch {}
//         }
//       }
//     } catch {
//       setMessages((prev) => {
//         const updated = [...prev];
//         updated[updated.length - 1] = {
//           role: "ai", text: "Connection error. Is the backend running?", streaming: false, confidence: null
//         };
//         return updated;
//       });
//     }

//     setLoading(false);
//     setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
//   };

//   const confidenceColor = (c) =>
//     c === "High" ? "var(--green)" : c === "Medium" ? "var(--yellow)" : "var(--red)";

//   return (
//     <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
//       {/* Topbar */}
//       <div style={{
//         padding: "20px 28px", borderBottom: "1px solid var(--border)",
//         display: "flex", alignItems: "center", justifyContent: "space-between"
//       }}>
//         <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>
//           💬 Q&A — <span style={{ color: "var(--accent-light)" }}>{subject.name}</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           {speaking && (
//             <button onClick={stopSpeaking} style={{
//               padding: "6px 14px", borderRadius: 8, border: "1px solid var(--yellow)",
//               background: "rgba(255,209,102,0.1)", color: "var(--yellow)",
//               cursor: "pointer", fontSize: 12
//             }}>
//               🔊 Stop Speaking
//             </button>
//           )}
//           <span style={{
//             padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
//             background: "var(--accent-glow)", color: "var(--accent-light)",
//             border: "1px solid var(--accent)"
//           }}>
//             Subject-Scoped
//           </span>
//         </div>
//       </div>

//       {/* Messages */}
//       <div style={{
//         flex: 1, overflowY: "auto", padding: "24px 28px",
//         display: "flex", flexDirection: "column", gap: 16
//       }}>
//         {messages.map((msg, i) => (
//           <div key={i} style={{
//             maxWidth: "80%",
//             alignSelf: msg.role === "user" ? "flex-end" : "flex-start"
//           }}>
//             <div style={{
//               padding: "14px 18px", fontSize: 14, lineHeight: 1.6,
//               background: msg.role === "user" ? "var(--accent)" : "var(--card)",
//               border: msg.role === "ai" ? "1px solid var(--border)" : "none",
//               borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
//             }}>
//               {/* Show typing dots if streaming but no text yet */}
//               {msg.streaming && !msg.text ? (
//                 <div style={{ display: "flex", gap: 4 }}>
//                   {[0, 0.2, 0.4].map((delay, i) => (
//                     <div key={i} style={{
//                       width: 6, height: 6, borderRadius: "50%", background: "var(--muted)",
//                       animation: `bounce 1.2s ${delay}s infinite`
//                     }} />
//                   ))}
//                 </div>
//               ) : (
//                 <>
//                   {msg.text}
//                   {/* Blinking cursor while streaming */}
//                   {msg.streaming && (
//                     <span style={{ animation: "blink 1s infinite", marginLeft: 2 }}>▌</span>
//                   )}
//                 </>
//               )}

//               {/* Citations and evidence only shown when done */}
//               {!msg.streaming && msg.citations && (
//                 <div style={{
//                   marginTop: 10, padding: "8px 12px", background: "var(--surface)",
//                   borderLeft: "3px solid var(--accent)", borderRadius: "0 8px 8px 0", fontSize: 12
//                 }}>
//                   📎 <strong>Citation:</strong> {msg.citations}
//                 </div>
//               )}
//               {!msg.streaming && msg.evidence && (
//                 <div style={{
//                   marginTop: 8, padding: "8px 12px",
//                   background: "rgba(108,99,255,0.08)", borderRadius: 8,
//                   fontSize: 12, color: "var(--muted)", fontStyle: "italic"
//                 }}>
//                   💡 "{msg.evidence}"
//                 </div>
//               )}
//             </div>

//             {!msg.streaming && msg.role === "ai" && msg.confidence && (
//               <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
//                 <span style={{
//                   padding: "3px 10px", borderRadius: 20, fontSize: 11,
//                   border: `1px solid ${confidenceColor(msg.confidence)}`,
//                   color: confidenceColor(msg.confidence)
//                 }}>
//                   {msg.confidence} Confidence
//                 </span>
//                 <button onClick={() => speak(msg.text)} style={{
//                   padding: "3px 10px", borderRadius: 20, fontSize: 11,
//                   border: "1px solid var(--border)", background: "transparent",
//                   color: "var(--muted)", cursor: "pointer"
//                 }}>
//                   🔊 Read Aloud
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//         <div ref={endRef} />
//       </div>

//       {/* Input */}
//       <div style={{
//         padding: "20px 28px", borderTop: "1px solid var(--border)",
//         display: "flex", gap: 10, alignItems: "flex-end"
//       }}>
//         <button
//           onClick={listening ? stopListening : startListening}
//           style={{
//             width: 48, height: 48, borderRadius: 12,
//             border: `1px solid ${listening ? "var(--red)" : "var(--border)"}`,
//             background: listening ? "rgba(255,107,107,0.15)" : "var(--card)",
//             color: listening ? "var(--red)" : "var(--muted)",
//             cursor: "pointer", fontSize: 20, display: "flex",
//             alignItems: "center", justifyContent: "center",
//             animation: listening ? "pulse 1s infinite" : "none"
//           }}
//         >
//           {listening ? "⏹" : "🎤"}
//         </button>

//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
//           }}
//           placeholder={listening ? "🎤 Listening... speak now" : `Ask anything from your ${subject.name} notes...`}
//           rows={1}
//           style={{
//             flex: 1, background: "var(--card)",
//             border: `1px solid ${listening ? "var(--red)" : "var(--border)"}`,
//             borderRadius: 12, padding: "14px 18px", color: "var(--text)",
//             fontFamily: "DM Sans, sans-serif", fontSize: 14, outline: "none", resize: "none",
//           }}
//         />

//         <button
//           onClick={() => sendMessage()}
//           disabled={loading || !input.trim()}
//           style={{
//             padding: "0 24px", height: 48, borderRadius: 12, border: "none",
//             cursor: "pointer", background: "var(--accent)", color: "#fff",
//             fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 14,
//             opacity: loading || !input.trim() ? 0.5 : 1,
//           }}
//         >
//           Send
//         </button>
//       </div>

//       <style>{`
//         @keyframes bounce {
//           0%, 60%, 100% { transform: translateY(0); }
//           30% { transform: translateY(-6px); }
//         }
//         @keyframes pulse {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,107,0.4); }
//           50% { box-shadow: 0 0 0 8px rgba(255,107,107,0); }
//         }
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }

import { useState, useRef } from "react";

export default function ChatPage({ subject, API }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Hi! I'm ready to answer questions from your ${subject.name} notes. Ask me anything!`,
      confidence: null,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const endRef = useRef();
  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);

  // ── Voice Input — stays ON until user clicks stop ──────────────
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;       // keeps listening
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      listeningRef.current = true;
    };

    recognition.onresult = (event) => {
      // Get latest result
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      if (transcript) {
        // Show question in input box briefly
        setInput(transcript);
        // Auto send
        setTimeout(() => {
          sendMessage(transcript);
          setInput("");
        }, 300);
      }
    };

    recognition.onerror = (e) => {
      if (e.error === "no-speech") return; // ignore no-speech errors, keep going
      setListening(false);
      listeningRef.current = false;
    };

    recognition.onend = () => {
      // Restart if user hasn't manually stopped
      if (listeningRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    listeningRef.current = false;
    setListening(false);
    setInput("");
    recognitionRef.current?.stop();
  };

  // ── Voice Output ───────────────────────────────────────────────
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  // ── Send Message (text or voice) ───────────────────────────────
  const sendMessage = async (voiceText) => {
    const question = voiceText || input.trim();
    if (!question) return;
    // For voice: allow new question even if currently loading (queue it)
    if (loading && !voiceText) return;
    if (!voiceText) setInput("");

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question }
    ]);
    setLoading(true);

    // Add empty AI message — will fill as stream comes in
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: "",
        streaming: true,
        confidence: null,
        citations: null,
        evidence: null,
      },
    ]);

    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          subjectName: subject.name,
          notes: subject.files,
          conversationHistory: messages
            .filter(m => !m.streaming && m.text && m.role !== "ai" || (m.role === "ai" && m.confidence))
            .map(m => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.role === "user" 
                ? m.text 
                : `{"answer":"${m.text.replace(/"/g, '\\"')}","confidence":"${m.confidence || 'Medium'}","citations":"${m.citations || ''}","evidence":"${m.evidence || ''}"}`
            }))
            .slice(-6),
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let rawJson = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.replace("data: ", ""));

            if (data.error) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "ai",
                  text: data.error,
                  streaming: false,
                  confidence: null,
                  citations: null,
                  evidence: null,
                };
                return updated;
              });
              break;
            }

            if (data.done) {
              // Final complete message
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "ai",
                  text: data.answer || "",
                  streaming: false,
                  confidence: data.confidence,
                  citations: data.citations,
                  evidence: data.evidence,
                };
                return updated;
              });
              // Speak the answer
              if (data.answer) speak(data.answer);

            } else if (data.delta) {
              rawJson += data.delta;
              // Extract partial answer while streaming
              const answerMatch = rawJson.match(/"answer"\s*:\s*"((?:[^"\\]|\\.)*)"/);
              const partialMatch = rawJson.match(/"answer"\s*:\s*"([^"]*)/);
              const partialAnswer = answerMatch
                ? answerMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')
                : partialMatch
                ? partialMatch[1]
                : "";

              if (partialAnswer) {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    text: partialAnswer,
                    streaming: true,
                  };
                  return updated;
                });
                setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
              }
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: "Connection error. Is the backend running?",
          streaming: false,
          confidence: null,
          citations: null,
          evidence: null,
        };
        return updated;
      });
    }

    setLoading(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const confidenceColor = (c) =>
    c === "High" ? "var(--green)" : c === "Medium" ? "var(--yellow)" : "var(--red)";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Topbar */}
      <div style={{
        padding: "20px 28px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>
          💬 Q&A — <span style={{ color: "var(--accent-light)" }}>{subject.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {listening && (
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
              background: "rgba(255,107,107,0.15)", color: "var(--red)",
              border: "1px solid var(--red)", animation: "pulse 1s infinite"
            }}>
              🎤 Listening...
            </span>
          )}
          {speaking && (
            <button onClick={stopSpeaking} style={{
              padding: "6px 14px", borderRadius: 8, border: "1px solid var(--yellow)",
              background: "rgba(255,209,102,0.1)", color: "var(--yellow)",
              cursor: "pointer", fontSize: 12
            }}>
              🔊 Stop Speaking
            </button>
          )}
          <span style={{
            padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
            background: "var(--accent-glow)", color: "var(--accent-light)",
            border: "1px solid var(--accent)"
          }}>
            Subject-Scoped
          </span>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "24px 28px",
        display: "flex", flexDirection: "column", gap: 16
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            maxWidth: "80%",
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start"
          }}>
            <div style={{
              padding: "14px 18px", fontSize: 14, lineHeight: 1.6,
              background: msg.role === "user" ? "var(--accent)" : "var(--card)",
              border: msg.role === "ai" ? "1px solid var(--border)" : "none",
              borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            }}>
              {/* Typing dots if streaming but no text yet */}
              {msg.streaming && !msg.text ? (
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 0.2, 0.4].map((delay, idx) => (
                    <div key={idx} style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "var(--muted)",
                      animation: `bounce 1.2s ${delay}s infinite`
                    }} />
                  ))}
                </div>
              ) : (
                <>
                  {msg.text}
                  {msg.streaming && (
                    <span style={{ animation: "blink 1s infinite", marginLeft: 2 }}>▌</span>
                  )}
                </>
              )}

              {/* Citation — only when done streaming */}
              {!msg.streaming && msg.citations && (
                <div style={{
                  marginTop: 10, padding: "8px 12px", background: "var(--surface)",
                  borderLeft: "3px solid var(--accent)", borderRadius: "0 8px 8px 0", fontSize: 12
                }}>
                  📎 <strong>Citation:</strong> {msg.citations}
                </div>
              )}

              {/* Evidence — only when done streaming */}
              {!msg.streaming && msg.evidence && (
                <div style={{
                  marginTop: 8, padding: "8px 12px",
                  background: "rgba(108,99,255,0.08)", borderRadius: 8,
                  fontSize: 12, color: "var(--muted)", fontStyle: "italic"
                }}>
                  💡 "{msg.evidence}"
                </div>
              )}
            </div>

            {/* Confidence + Read Aloud */}
            {!msg.streaming && msg.role === "ai" && msg.confidence && (
              <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  padding: "3px 10px", borderRadius: 20, fontSize: 11,
                  border: `1px solid ${confidenceColor(msg.confidence)}`,
                  color: confidenceColor(msg.confidence)
                }}>
                  {msg.confidence} Confidence
                </span>
                <button onClick={() => speak(msg.text)} style={{
                  padding: "3px 10px", borderRadius: 20, fontSize: 11,
                  border: "1px solid var(--border)", background: "transparent",
                  color: "var(--muted)", cursor: "pointer"
                }}>
                  🔊 Read Aloud
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: "20px 28px", borderTop: "1px solid var(--border)",
        display: "flex", gap: 10, alignItems: "flex-end"
      }}>
        {/* Mic Button — toggles listening on/off */}
        <button
          onClick={listening ? stopListening : startListening}
          style={{
            width: 48, height: 48, borderRadius: 12,
            border: `1px solid ${listening ? "var(--red)" : "var(--border)"}`,
            background: listening ? "rgba(255,107,107,0.15)" : "var(--card)",
            color: listening ? "var(--red)" : "var(--muted)",
            cursor: "pointer", fontSize: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: listening ? "pulse 1s infinite" : "none",
            transition: "all 0.2s",
          }}
          title={listening ? "Click to stop listening" : "Click to start voice input"}
        >
          {listening ? "⏹" : "🎤"}
        </button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
          }}
          placeholder={
            listening
              ? "🎤 Listening... ask your question"
              : `Ask anything from your ${subject.name} notes...`
          }
          rows={1}
          style={{
            flex: 1, background: "var(--card)",
            border: `1px solid ${listening ? "var(--red)" : "var(--border)"}`,
            borderRadius: 12, padding: "14px 18px", color: "var(--text)",
            fontFamily: "DM Sans, sans-serif", fontSize: 14,
            outline: "none", resize: "none", transition: "border-color 0.2s",
          }}
        />

        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          style={{
            padding: "0 24px", height: 48, borderRadius: 12, border: "none",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            background: "var(--accent)", color: "#fff",
            fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 14,
            opacity: loading || !input.trim() ? 0.5 : 1, transition: "opacity 0.2s",
          }}
        >
          Send
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,107,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(255,107,107,0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}