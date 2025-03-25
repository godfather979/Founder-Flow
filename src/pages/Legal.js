import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown"; // 🔹 Markdown Renderer
import Markdown from "react-markdown";
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Ensure you have this in your .env file
const genAI = new GoogleGenerativeAI(API_KEY);


// Legal Document Simplifier - Gemini Integration
// const simplifyLegalDocument = async (documentText, setLoading, setSimplifiedText) => {
//   setLoading(true);
//   setSimplifiedText("");
//   const context = `You are a legal assistant AI. Simplify the following legal document in a way that is easy for non-lawyers to understand you are explaining this to a person with not much legal and technical knowledge so be cautious to explain in simple terms and in not very long: ${documentText}`;
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent([context]);
//     const simplifiedText = await result.response.text();
//     setSimplifiedText(simplifiedText);
//   } catch (error) {
//     console.error("Error simplifying document:", error);
//   }
//   setLoading(false);
// };
// Corporate Structure Advisor - Gemini Integration
// const getCorporateStructureAdvice = async (businessType, setLoading, setAdvice) => {
//   setLoading(true);
//   setAdvice("");
//   const context = `You are an expert business consultant. Based on the business type '${businessType}', recommend the best corporate structure and provide advice on how to proceed. you are explaining this to a person with not much legal and technical knowledge so be cautious to explain in simple terms and in not very long`;
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent([context]);
//     const responseText = await result.response.text();
//     setAdvice(responseText);
//   } catch (error) {
//     console.error("Error getting corporate structure advice:", error);
//   }
//   setLoading(false);
// };
// Legal Chatbot Component - Gemini Integration

const LegalChatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I can help with legal questions. How can I assist you today?",
      typing: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input, typing: false }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Thinking...", typing: true },
      ]);
    }, 500);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      // **🔹 Custom Prompt Context**
      const context = `You are an AI assistant designed to help users with business-related legal advice and questions. Respond clearly and concisely with actionable insights.`;
      const result = await model.generateContent([context, input]);
      const response = await result.response.text();
      // Update Bot Response
      setMessages((prevMessages) =>
        prevMessages.map((msg, i) =>
          i === prevMessages.length - 1
            ? { ...msg, text: response, typing: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg, i) =>
          i === prevMessages.length - 1
            ? { ...msg, text: "Sorry, I couldn't process your request.", typing: false }
            : msg
        )
      );
    }
    setLoading(false);
  };

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-2">Legal Assistant Chat</h2>
        <p className="text-gray-300 mb-4">Ask me about legal aspects of your startup!</p>

        <div className="h-80 overflow-y-auto p-4 border rounded-md bg-black/20">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 max-w-[75%] rounded-lg ${
                  msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-100"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Legal = () => {
  const [documentText, setDocumentText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [advice, setAdvice] = useState("");
  const [loadingDocument, setLoadingDocument] = useState(false);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [businessType, setBusinessType] = useState("");

  const simplifyDocument = async (documentText, setLoadingAdvice, setSimplifiedText) => {
    setLoadingDocument(true);
    setSimplifiedText("");
    const context = `You are a legal assistant AI. Simplify the following legal document in a way that is easy for non-lawyers to understand you are explaining this to a person with not much legal and technical knowledge so be cautious to explain in simple terms and in not very long: ${documentText}`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([context]);
      const simplifiedText = await result.response.text();
      setSimplifiedText(simplifiedText);
    } catch (error) {
      console.error("Error simplifying document:", error);
    }
    setLoadingDocument(false);
  };

  const getAdvice = async (businessType, setLoadingAdvice, setAdvice) => {
    setLoadingAdvice(true);
    setAdvice("");
    const context = `You are an expert business consultant. Based on the business type '${businessType}', recommend the best corporate structure and provide advice on how to proceed. you are explaining this to a person with not much legal and technical knowledge so be cautious to explain in simple terms and in not very long`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([context]);
      const responseText = await result.response.text();
      setAdvice(responseText);
    } catch (error) {
      console.error("Error getting corporate structure advice:", error);
    }
    setLoadingAdvice(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black to-[#0a192f] overflow-hidden">
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
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full opacity-30 blur-2xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-2xl" />

      {/* Main Content */}
      <div className="relative h-full w-full overflow-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <h1 className="text-3xl font-semibold text-center text-blue-400 animate-pulse">
            Legal Assistant
          </h1>

          {/* Document Simplifier */}
          <div className="bg-black/20 backdrop-blur-lg border border-white/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Legal Document Simplifier</h2>
            <textarea
              placeholder="Paste or type your legal document text here"
              className="w-full p-4 mb-4 bg-gray-800 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
            />
            <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => simplifyDocument(documentText, setLoadingDocument, setSimplifiedText)} // Fix here
            disabled={loadingDocument}
          >
            {loadingDocument ? "Simplifying..." : "Simplify Document"}
          </button>
            {simplifiedText && (
              <div className="mt-6 text-white">
                <h3 className="text-lg font-semibold">Simplified Document</h3>
                <ReactMarkdown className="mt-2">{simplifiedText}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Corporate Structure Advisor */}
          <div className="bg-black/20 backdrop-blur-lg border border-white/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Corporate Structure Advisor</h2>
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 bg-gray-800 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your business type (e.g., LLC, Corporation)"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            />
            <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => getAdvice(businessType, setLoadingAdvice, setAdvice)} // Fix here
            disabled={loadingAdvice}
          >
            {loadingAdvice ? "Generating Advice..." : "Get Advice"}
          </button>
            {advice && (
              <div className="mt-6 text-white">
                <h3 className="text-lg font-semibold">Advice</h3>
                <ReactMarkdown className="mt-2">{advice}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Legal Chatbot */}
          <div className="bg-black/20 backdrop-blur-lg border border-white/30 rounded-lg">
            <LegalChatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;