import { useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const RoadMap = () => {
    const [messages, setMessages] = useState([
        { text: "What industry is your startup in?", sender: "bot" }
      ]);      
  const [userInputs, setUserInputs] = useState({ industry: "", stage: "" });
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentQuestion = () => {
    if (!userInputs.industry) return "What industry is your startup in?";
    if (!userInputs.stage) return "What stage is your startup in? (Idea, MVP, Scaling)";
    return ""; // No more questions needed
  };
  

  // Handle user input
  const handleUserInput = (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);

    if (!userInputs.industry) {
      setUserInputs({ ...userInputs, industry: message });
      botReply("Great! What stage is your startup in? (Idea, MVP, Scaling)");
    } else if (!userInputs.stage) {
      setUserInputs({ ...userInputs, stage: message });
      botReply("Awesome! Let me generate a roadmap for you. 🚀");
      generateRoadmap({ ...userInputs, stage: message });
    }
  };

  // Bot's reply
  const botReply = (text) => {
    setMessages((prev) => [...prev, { text, sender: "bot" }]);
  };

  // Generate roadmap using Gemini AI
  const generateRoadmap = async (inputs) => {
    setLoading(true);

    const prompt = `Generate a startup roadmap for a ${inputs.industry} startup at the ${inputs.stage} stage. 
    Provide steps with:
    - Name of the step
    - Short description
    - Estimated timeframe.
    
    Format it as valid JSON:
    {
      "steps": [
        { "name": "Step 1", "description": "Brief details", "timeframe": "1 month" },
        { "name": "Step 2", "description": "Brief details", "timeframe": "2 months" }
      ]
    }`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([prompt]);
      const responseText = await result.response.text();

      // Extract JSON using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Invalid JSON response");

      const jsonResponse = JSON.parse(jsonMatch[0]);
      setRoadmap(jsonResponse);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
    setLoading(false);
  };

  // Export Roadmap as PDF
  const exportToPDF = () => {
    const input = document.getElementById("roadmap-container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
      pdf.save("roadmap.pdf");
    });
  };

  return (
    <div className="h-full w-full overflow-auto bg-[#0F172A] p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-white mb-4">📍 Roadmap Maker</h2>
  
      {/* Chatbot UI */}
      <div className="w-full max-w-2xl bg-[#1E293B] p-4 rounded-lg shadow-lg overflow-y-auto max-h-60">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`p-2 rounded-lg my-1 ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end text-right"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            {msg.sender === "user" ? "👤" : "🤖"} {msg.text}
          </p>
        ))}
      </div>
  
      {/* Display Current Question */}
      {!roadmap && (
        <div className="w-full max-w-lg text-center mt-4">
          <p className="text-gray-200 text-lg font-medium mb-2">{getCurrentQuestion()}</p>
  
          {/* Input Field */}
          <input
            type="text"
            placeholder="Type your answer..."
            className="w-full p-3 border rounded-lg bg-[#334155] text-white outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === "Enter" && handleUserInput(e.target.value)}
          />
        </div>
      )}

      {/* Roadmap Display */}
      {loading && <p className="text-blue-400 mt-4">Generating roadmap...</p>}
      {roadmap && (
        <div
          id="roadmap-container"
          className="mt-6 bg-[#1E3A8A] p-4 shadow-lg rounded-lg max-w-2xl w-full"
        >
          <h3 className="text-xl font-bold text-white">🛤️ Your Startup Roadmap</h3>
          {roadmap.steps.map((step, index) => (
            <motion.div
              key={index}
              className="p-3 mt-3 border-l-4 border-yellow-500 bg-[#475569] rounded text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <h4 className="font-semibold">{step.name}</h4>
              <p className="text-sm">{step.description}</p>
              <span className="text-xs text-gray-300">⏳ {step.timeframe}</span>
            </motion.div>
          ))}
          <button
            onClick={exportToPDF}
            className="mt-4 bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600"
          >
            📄 Save as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadMap;
