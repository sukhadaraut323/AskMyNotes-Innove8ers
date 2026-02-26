export default function Sidebar({
  subjects, activeSubjectId, setActiveSubjectId,
  mode, setMode, isReady, setIsReady
}) {
  return (
    <div style={{
      width: 240, background: "var(--surface)", borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column", padding: "24px 16px", flexShrink: 0
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20,
        color: "var(--accent-light)", marginBottom: 32
      }}>
        Ask<span style={{ color: "var(--text)" }}>My</span>Notes
      </div>

      {/* Subjects */}
      <div style={{
        fontSize: 10, fontWeight: 600, color: "var(--muted)",
        textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 10
      }}>
        Subjects
      </div>

      {subjects.map((s) => (
        <div
          key={s.id}
          onClick={() => setActiveSubjectId(s.id)}
          style={{
            background: activeSubjectId === s.id ? "var(--accent-glow)" : "var(--card)",
            border: `1px solid ${activeSubjectId === s.id ? "var(--accent)" : "var(--border)"}`,
            borderRadius: 10, padding: 12, marginBottom: 8, cursor: "pointer",
            transition: "all 0.2s", position: "relative", overflow: "hidden"
          }}
        >
          {activeSubjectId === s.id && (
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: 3, background: "var(--accent)"
            }} />
          )}
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 700 }}>
            {s.name || `Subject ${s.id}`}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>
            {s.files.length} file{s.files.length !== 1 ? "s" : ""}
          </div>
        </div>
      ))}

      {/* Mode switcher - only after setup */}
      {isReady && (
        <>
          <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />
          <div style={{
            fontSize: 10, fontWeight: 600, color: "var(--muted)",
            textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 10
          }}>
            Mode
          </div>

          {[
            { id: "chat", icon: "💬", label: "Q&A Chat" },
            { id: "study", icon: "📚", label: "Study Mode" },
          ].map((m) => (
            <div
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 4,
                color: mode === m.id ? "var(--accent-light)" : "var(--muted)",
                background: mode === m.id ? "var(--card)" : "transparent",
                border: `1px solid ${mode === m.id ? "var(--border)" : "transparent"}`,
                transition: "all 0.2s",
              }}
            >
              {m.icon} {m.label}
            </div>
          ))}

          <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />

          <div
            onClick={() => { setIsReady(false); setMode("setup"); }}
            style={{
              padding: "10px 12px", borderRadius: 8, cursor: "pointer",
              fontSize: 13, color: "var(--muted)"
            }}
          >
            ⚙️ Edit Setup
          </div>
        </>
      )}
    </div>
  );
}