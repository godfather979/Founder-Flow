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
    return "";
  };

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

  const botReply = (text) => {
    setMessages((prev) => [...prev, { text, sender: "bot" }]);
  };

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
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Invalid JSON response");
      const jsonResponse = JSON.parse(jsonMatch[0]);
      setRoadmap(jsonResponse);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
    setLoading(false);
  };

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
    <div className="relative h-screen w-full bg-gradient-to-b from-black to-[#0a192f] overflow-hidden">
      {/* Twinkling Stars */}
      <div className="absolute w-full h-full overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random(),
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Glowing Spheres */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>

      <div className="relative h-full w-full overflow-auto">
        <div className="p-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-6 animate-pulse">
            <span className="glow-text">📍 Startup Roadmap Maker</span>
          </h2>

          {/* Chatbot UI */}
          <div className="w-full max-w-2xl bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl border border-white/20 p-4 overflow-y-auto max-h-60">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-lg my-2 ${
                  msg.sender === "user"
                    ? "bg-blue-400/50 text-white ml-auto max-w-[80%]"
                    : "bg-gray-800/50 text-white mr-auto max-w-[80%]"
                }`}
              >
                {msg.sender === "user" ? "👤" : "🤖"} {msg.text}
              </motion.div>
            ))}
          </div>

          {/* Input Section */}
          {!roadmap && (
            <div className="w-full max-w-lg text-center mt-4">
              <p className="text-blue-400 text-lg font-medium mb-2">{getCurrentQuestion()}</p>
              <input
                type="text"
                placeholder="Type your answer..."
                className="w-full p-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleUserInput(e.target.value)}
              />
            </div>
          )}

          {/* Roadmap Display */}
          {loading && (
            <motion.p 
              className="text-blue-400 mt-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🚀 Generating your roadmap...
            </motion.p>
          )}
          
          {roadmap && (
            <motion.div
              id="roadmap-container"
              className="mt-6 bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl border border-white/20 p-6 max-w-4xl w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">🛤️ Your Startup Roadmap</h3>
              <div className="space-y-4">
                {roadmap.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="absolute left-0 top-0 w-1 h-full bg-blue-400/50" />
                    <motion.div
                      className="ml-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-4 w-4 h-4 bg-blue-400 rounded-full 
                        group-hover:scale-125 group-hover:bg-blue-300 transition-all duration-300" />
                      <h4 className="text-xl font-semibold text-blue-400 mb-2">{step.name}</h4>
                      <p className="text-white/80 mb-2">{step.description}</p>
                      <div className="flex items-center text-blue-300 text-sm">
                        <span className="mr-2">⏳</span>
                        {step.timeframe}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                onClick={exportToPDF}
                className="mt-6 w-full p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📄 Export Roadmap as PDF
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadMap;