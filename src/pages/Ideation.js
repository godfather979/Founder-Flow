import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconBulb, IconChecklist, IconTrash } from "@tabler/icons-react";
import { FcMindMap } from "react-icons/fc";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCFdu2Bg60WxMakJsBwlHI212aHCoMkpwo";
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Ideation() {
  const features = [
    {
      label: "Idea Generator",
      href: "/ideation/generator",
      icon: <IconBulb className="text-light-primary dark:text-dark-primary h-8 w-8" />, 
      description: "Generate startup ideas instantly using AI-powered insights."
    },
    {
      label: "Idea Validator",
      href: "/ideation/validator",
      icon: <IconChecklist className="text-light-primary dark:text-dark-primary h-8 w-8" />, 
      description: "Validate your business idea with market analysis and feedback."
    },
    {
      label: "Mind Map Maker",
      href: "/ideation/mindmap",
      icon: <FcMindMap className="h-8 w-8" />, 
      description: "Convert your ideas into structured, interactive mind maps."
    }
  ];

  const [whiteboardItems, setWhiteboardItems] = useState([]);
  const [newIdeaType, setNewIdeaType] = useState("Name");
  const [newIdeaText, setNewIdeaText] = useState("");
  const [finalizedBoards, setFinalizedBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandedBoard, setExpandedBoard] = useState(null);

  // Function to save AI-generated idea to the list
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
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([context, prompt]);
      const responseText = await result.response.text();
      const jsonResponse = JSON.parse(responseText)
      // Save the generated idea using a separate function
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
    <div className="h-full w-full overflow-auto bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Ideation Hub</h1>
      
      {/* Feature Links */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl mb-10">
        {features.map((feature, idx) => (
          <Link
            key={idx}
            to={feature.href}
            className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-light-border dark:border-dark-border"
          >
            <div className="flex items-center space-x-4">
              {feature.icon}
              <h2 className="text-xl font-semibold">{feature.label}</h2>
            </div>
            <p className="text-sm mt-2 text-light-text dark:text-dark-text opacity-75">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Whiteboard Section */}
      <div className="w-full max-w-4xl flex gap-6">
        <div className="flex-1 bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md border border-light-border dark:border-dark-border min-h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Whiteboard</h2>
            <button onClick={clearWhiteboard} className="bg-red-500 text-white px-4 py-2 rounded-lg">Clear All</button>
          </div>
          <div className="flex gap-2 mb-4 text-light-text">
            <select 
              value={newIdeaType} 
              onChange={(e) => setNewIdeaType(e.target.value)}
              className="border p-2 rounded-lg"
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
              className="border p-2 rounded-lg flex-1"
              placeholder="Enter idea..."
            />
            <button onClick={addToWhiteboard} className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg">Add Idea</button>
          </div>
          <div className="mt-4 grid gap-2 bg-light-background dark:bg-dark-background p-4 rounded-lg min-h-[300px]">
            {whiteboardItems.map(item => (
              <div key={item.id} className="p-4 bg-light-card dark:bg-dark-card border rounded-lg flex justify-between items-center">
                <span><strong>{item.type}:</strong> {item.text}</span>
                <button onClick={() => deleteFromWhiteboard(item.id)}>
                  <IconTrash className="h-5 w-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Finalize Button */}
      <button 
        onClick={finalizeBoard} 
        className="mt-6 bg-light-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg"
        disabled={loading}
      >
        {loading ? "Processing..." : "Finalize Board"}
      </button>

      {/* Display Gemini Output */}
      {finalizedBoards && (
        <div className="mt-6 w-full max-w-4xl">
        {/* Clickable Card */}
        <div 
          className="cursor-pointer bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md border border-light-border dark:border-dark-border hover:shadow-lg transition-transform transform hover:-translate-y-1"
          onClick={() => setExpanded(true)}
        >
          <h3 className="text-xl font-bold">{finalizedBoards.name}</h3>
          <p className="text-sm mt-2 text-light-text dark:text-dark-text opacity-75">
            {finalizedBoards.description}
          </p>
        </div>
      
        {/* Popup Modal */}
        {expanded && (
          <div className="mt-6 w-full max-w-4xl">
          {finalizedBoards.map((board, index) => (
            <div 
              key={index}
              className="cursor-pointer bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md border border-light-border dark:border-dark-border hover:shadow-lg transition-transform transform hover:-translate-y-1 mb-4"
              onClick={() => setExpandedBoard(board)}
            >
              <h3 className="text-xl font-bold">{board.name}</h3>
              <p className="text-sm mt-2 text-light-text dark:text-dark-text opacity-75">
                {board.description}
              </p>
            </div>
          ))}
        
          {/* Popup Modal */}
          {expandedBoard && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border border-light-border dark:border-dark-border max-w-lg w-full relative">
                {/* Close Button */}
                <button 
                  className="absolute top-3 right-3 text-lg text-gray-500 hover:text-gray-800 dark:hover:text-white"
                  onClick={() => setExpandedBoard(null)}
                >
                  ✖
                </button>
        
                <h3 className="text-2xl font-bold mb-4">{expandedBoard.name}</h3>
                <p className="text-sm text-light-text dark:text-dark-text mb-4">
                  {expandedBoard.description}
                </p>
        
                <h4 className="text-lg font-semibold">Merits:</h4>
                <ul className="list-disc pl-6 text-sm mb-4">
                  {expandedBoard.analysis.merits.map((merit, index) => (
                    <li key={index}>{merit}</li>
                  ))}
                </ul>
        
                <h4 className="text-lg font-semibold">Demerits:</h4>
                <ul className="list-disc pl-6 text-sm mb-4">
                  {expandedBoard.analysis.demerits.map((demerit, index) => (
                    <li key={index}>{demerit}</li>
                  ))}
                </ul>
        
                <h4 className="text-lg font-semibold">Suggestions:</h4>
                <ul className="list-disc pl-6 text-sm">
                  {expandedBoard.analysis.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        )}
      </div>
      )}
    </div>
  );
}


// KHALI DABBA ARAI IDKY BADMAI DEKHTEY