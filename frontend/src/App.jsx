import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SetupPage from "./components/SetupPage";
import ChatPage from "./components/ChatPage";
import StudyPage from "./components/StudyPage";

const API = "http://localhost:3001";

export default function App() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "", files: [] },
    { id: 2, name: "", files: [] },
    { id: 3, name: "", files: [] },
  ]);
  const [activeSubjectId, setActiveSubjectId] = useState(1);
  const [mode, setMode] = useState("setup");
  const [isReady, setIsReady] = useState(false);

  const activeSubject = subjects.find((s) => s.id === activeSubjectId);

  const updateSubject = (id, updates) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleReady = () => {
    setIsReady(true);
    setMode("chat");
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        subjects={subjects}
        activeSubjectId={activeSubjectId}
        setActiveSubjectId={setActiveSubjectId}
        mode={mode}
        setMode={setMode}
        isReady={isReady}
        setIsReady={setIsReady}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {mode === "setup" && (
          <SetupPage
            subjects={subjects}
            updateSubject={updateSubject}
            onReady={handleReady}
            API={API}
          />
        )}
        {mode === "chat" && (
          <ChatPage subject={activeSubject} API={API} />
        )}
        {mode === "study" && (
          <StudyPage subject={activeSubject} API={API} />
        )}
      </div>
    </div>
  );
}