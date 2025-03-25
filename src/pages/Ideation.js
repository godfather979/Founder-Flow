import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconBulb, IconChecklist, IconTrash } from "@tabler/icons-react";
import { FcMindMap } from "react-icons/fc";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Ideation() {
  const features = [
    {
      label: "Idea Generator",
      href: "/ideation/generator",
      icon: <IconBulb className="text-blue-400 h-8 w-8" />, 
      description: "Generate startup ideas instantly using AI-powered insights."
    },
    {
      label: "Idea Validator",
      href: "/ideation/validator",
      icon: <IconChecklist className="text-blue-400 h-8 w-8" />, 
      description: "Validate your business idea with market analysis and feedback."
    },
    {
      label: "Road Map Maker",
      href: "/ideation/Roadmap",
      icon: <FcMindMap className="h-8 w-8" />, 
      description: "Convert your ideas into structured, interactive mind maps."
    }
  ];

  const [whiteboardItems, setWhiteboardItems] = useState([]);
  const [newIdeaType, setNewIdeaType] = useState("Name");
  const [newIdeaText, setNewIdeaText] = useState("");
  const [finalizedBoards, setFinalizedBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedBoard, setExpandedBoard] = useState(null);

  // Save to localStorage whenever finalizedBoards changes
  React.useEffect(() => {
    localStorage.setItem('finalizedBoards', JSON.stringify(finalizedBoards));
  }, [finalizedBoards]);

  const saveGeneratedIdea = (data) => {
    setFinalizedBoards(prevBoards => [...prevBoards, data]);
  };

  const addToWhiteboard = () => {
    if (newIdeaText.trim() === "") return;
    const newItem = { id: Date.now(), type: newIdeaType, text: newIdeaText };
    setWhiteboardItems([...whiteboardItems, newItem]);
    setNewIdeaText("");
  };

  const deleteFromWhiteboard = (id) => {
    setWhiteboardItems(whiteboardItems.filter(item => item.id !== id));
  };

  const clearWhiteboard = () => {
    setWhiteboardItems([]);
  };

  const clearIdea = () => {
    setFinalizedBoards([]);
    localStorage.removeItem('finalizedBoards');
  };

  const generateGeminiResponse = async (structuredBoard) => {
    if (!structuredBoard || Object.keys(structuredBoard).length === 0) return;

    const context = `
      You are an AI assistant specializing in startup ideation.
      Given a structured JSON input with categories like "Name", "Context", and "Target Audience",
      you must:
      1. Select one name if multiple names are provided.
      2. Write a **2-line description** summarizing the idea.
      3. Provide a concise analysis in bullet points covering:
         - **Merits**
         - **Demerits**
         - **Suggestions for improvement**
      Your output must be in **valid JSON format**.
    `;

    const prompt = `
      Analyze the following startup idea based on the provided details:
      ${JSON.stringify(structuredBoard, null, 2)}
      
      Your response should follow this JSON format:
      {
        "name": "Chosen name",
        "description": "A brief two-line summary of the idea.",
        "analysis": {
          "merits": ["Point 1", "Point 2"],
          "demerits": ["Point 1", "Point 2"],
          "suggestions": ["Point 1", "Point 2"]
        }
      }
    `;

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent([context, prompt]);
      const responseText = await result.response.text();
      // Extract only the JSON part using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      console.log(jsonMatch);

      if (!jsonMatch) {
        throw new Error("Failed to extract valid JSON from the AI response");
      }

      const jsonResponse = JSON.parse(jsonMatch[0]);
      saveGeneratedIdea(jsonResponse);
    } catch (error) {
      console.error("Error generating AI response:", error);
    }
    setLoading(false);
  };

  const finalizeBoard = () => {
    const structuredBoard = whiteboardItems.reduce((acc, item) => {
      acc[item.type] = acc[item.type] ? [...acc[item.type], item.text] : [item.text];
      return acc;
    }, {});
    generateGeminiResponse(structuredBoard);
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
          <h1 className="text-3xl font-bold text-blue-400 mb-6 animate-pulse">
            <span className="glow-text">Ideation Hub 🚀</span>
          </h1>

          {/* Feature Links */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl mb-10">
            {features.map((feature, idx) => (
              <Link
                key={idx}
                to={feature.href}
                className="bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-white/30 text-white"
              >
                <div className="flex items-center space-x-4">
                  {feature.icon}
                  <h2 className="text-xl font-semibold">{feature.label}</h2>
                </div>
                <p className="text-sm mt-2 text-white/80">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Whiteboard Section */}
          <div className="w-full max-w-4xl">
            <div className="bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-md border border-white/30 text-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-blue-400">Whiteboard</h2>
                <button onClick={clearWhiteboard} className="bg-red-500/80 text-white px-4 py-2 rounded-lg hover:bg-red-600/80 transition-colors">
                  Clear All
                </button>
              </div>
              
              <div className="flex gap-2 mb-4">
                <select 
                  value={newIdeaType} 
                  onChange={(e) => setNewIdeaType(e.target.value)}
                  className="bg-gray-800 border border-white/30 p-2 rounded-lg text-white"
                >
                  <option>Name</option>
                  <option>Feature</option>
                  <option>Context</option>
                  <option>Target Audience</option>
                  <option>Other</option>
                </select>
                <input 
                  type="text" 
                  value={newIdeaText} 
                  onChange={(e) => setNewIdeaText(e.target.value)} 
                  className="bg-gray-800 border border-white/30 p-2 rounded-lg flex-1 text-white"
                  placeholder="Enter idea..."
                />
                <button 
                  onClick={addToWhiteboard} 
                  className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Add Idea
                </button>
              </div>

              <div className="mt-4 space-y-2 bg-black/20 p-4 rounded-lg">
                {whiteboardItems.map(item => (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center p-3 bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg"
                  >
                    <span><strong>{item.type}:</strong> {item.text}</span>
                    <button onClick={() => deleteFromWhiteboard(item.id)}>
                      <IconTrash className="h-5 w-5 text-red-400 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Finalize Button */}
          <button 
            onClick={finalizeBoard} 
            className="mt-6 bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Processing..." : "🔍 Finalize Board"}
          </button>

          {/* Display Gemini Output */}
          {finalizedBoards.length > 0 && (
            <div className="mt-6 w-full max-w-4xl">
              <div className="flex justify-end mb-4">
                <button onClick={clearIdea} className="bg-red-500/80 text-white px-4 py-2 rounded-lg hover:bg-red-600/80 transition-colors">
                  Clear All Ideas
                </button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {finalizedBoards.map((board, index) => (
                  <div 
                    key={index}
                    className="cursor-pointer bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-md border border-white/30 hover:shadow-lg transition-transform transform hover:-translate-y-1 text-white"
                    onClick={() => setExpandedBoard(board)}
                  >
                    <h3 className="text-xl font-bold text-blue-400">{board.name}</h3>
                    <p className="text-sm mt-2 text-white/80">
                      {board.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal */}
          {expandedBoard && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30 max-w-lg w-full relative text-white m-4">
                <button 
                  className="absolute top-3 right-3 text-lg text-gray-400 hover:text-white"
                  onClick={() => setExpandedBoard(null)}
                >
                  ✖
                </button>

                <h3 className="text-2xl font-bold mb-4 text-blue-400">{expandedBoard.name}</h3>
                <p className="text-sm text-white/80 mb-4">
                  {expandedBoard.description}
                </p>

                <h4 className="text-lg font-semibold text-blue-400">Merits:</h4>
                <ul className="list-disc pl-6 text-sm mb-4 text-white/80">
                  {expandedBoard.analysis.merits.map((merit, index) => (
                    <li key={index}>{merit}</li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold text-blue-400">Demerits:</h4>
                <ul className="list-disc pl-6 text-sm mb-4 text-white/80">
                  {expandedBoard.analysis.demerits.map((demerit, index) => (
                    <li key={index}>{demerit}</li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold text-blue-400">Suggestions:</h4>
                <ul className="list-disc pl-6 text-sm text-white/80">
                  {expandedBoard.analysis.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}