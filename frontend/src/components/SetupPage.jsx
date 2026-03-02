import { useRef } from "react";

export default function SetupPage({ subjects, updateSubject, onReady, API }) {
  const fileInputRef = useRef();
  const allReady = subjects.every((s) => s.name.trim() && s.files.length > 0);

  const handleUpload = async (subjectId, fileList) => {
    const formData = new FormData();
    Array.from(fileList).forEach((f) => formData.append("files", f));

    try {
      const res = await fetch(`${API}/api/upload`, { method: "POST", body: formData });
      const data = await res.json();
      const subject = subjects.find((s) => s.id === subjectId);
      updateSubject(subjectId, { files: [...subject.files, ...data.files] });
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Topbar */}
      <div style={{
        padding: "20px 28px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18 }}>
            Setup Your Subjects
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
            Name 3 subjects and upload notes (PDF or TXT)
          </div>
        </div>
        <button
          onClick={onReady}
          disabled={!allReady}
          style={{
            padding: "10px 20px", borderRadius: 8, border: "none",
            cursor: allReady ? "pointer" : "not-allowed",
            background: allReady ? "var(--accent)" : "var(--border)",
            color: "#fff", fontFamily: "DM Sans, sans-serif",
            fontWeight: 500, fontSize: 14, transition: "all 0.2s"
          }}
        >
          Start Studying →
        </button>
      </div>

      {/* Subject Cards */}
      <div style={{ padding: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {subjects.map((s) => (
          <div key={s.id} style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 14, padding: 20
          }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, marginBottom: 6, fontSize: 15 }}>
              Subject {s.id}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>
              Enter a name for this subject
            </div>
            <input
              placeholder="e.g. Physics, History..."
              value={s.name}
              onChange={(e) => updateSubject(s.id, { name: e.target.value })}
              style={{
                width: "100%", background: "var(--surface)",
                border: "1px solid var(--border)", borderRadius: 8,
                padding: "10px 14px", color: "var(--text)",
                fontFamily: "DM Sans, sans-serif", fontSize: 13,
                outline: "none", marginBottom: 14,
              }}
            />

            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
              Uploaded Files
            </div>

            <div style={{ marginBottom: 10, minHeight: 28 }}>
              {s.files.map((f) => (
                <div key={f.name}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "var(--surface)", border: `1px solid ${f.warning ? "var(--yellow)" : "var(--border)"}`,
                    borderRadius: 6, padding: "4px 8px", fontSize: 11, margin: 3
                  }}>
                    {f.type === "pdf" ? "📄" : "📝"} {f.name}
                    <button
                      onClick={() => updateSubject(s.id, { files: s.files.filter((x) => x.name !== f.name) })}
                      style={{ background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontSize: 14, lineHeight: 1 }}
                    >×</button>
                  </span>
                  {f.warning && (
                    <div style={{ fontSize: 11, color: "var(--yellow)", margin: "4px 3px 0", lineHeight: 1.4 }}>
                      {f.warning}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              onClick={() => { fileInputRef.current.dataset.sid = s.id; fileInputRef.current.click(); }}
              style={{
                border: "2px dashed var(--border)", borderRadius: 10,
                padding: 16, textAlign: "center", cursor: "pointer",
                fontSize: 12, color: "var(--muted)", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
            >
              + Upload PDF / TXT
            </div>
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".txt,.pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          const sid = parseInt(fileInputRef.current.dataset.sid);
          handleUpload(sid, e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}