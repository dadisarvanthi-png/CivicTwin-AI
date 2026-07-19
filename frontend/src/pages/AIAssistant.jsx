import { useState } from "react";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = () => {
    const q = question.toLowerCase();

    if (q.includes("hospital")) {
      setAnswer(
        "🏥 AI Recommendation: Build a new hospital in Zone 5 because the population has increased by 28%."
      );
    } else if (q.includes("traffic")) {
      setAnswer(
        "🚦 AI Analysis: Heavy congestion is predicted near the Central Junction between 5 PM and 8 PM."
      );
    } else if (q.includes("flood")) {
      setAnswer(
        "🌊 AI Prediction: Zone 2 has a high flood risk during heavy rainfall."
      );
    } else if (q.includes("garbage")) {
      setAnswer(
        "🗑️ AI Recommendation: Increase garbage collection frequency in Ward 12."
      );
    } else {
      setAnswer(
        "🤖 AI: I couldn't find a matching recommendation. Please ask about hospitals, traffic, floods, or garbage."
      );
    }
  };

  return (
    <div className="page">
      <h1>🤖 CivicTwin AI Assistant</h1>

      <p>Ask AI about your smart city.</p>

      <div className="ai-chat">
        <input
          type="text"
          placeholder="Example: Where should a new hospital be built?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={askAI}
        >
          Ask AI
        </button>

        {answer && (
          <div className="ai-answer">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAssistant;