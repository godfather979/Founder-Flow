import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown"; // 🔹 Markdown Renderer
import Markdown from "react-markdown";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Ensure you have this in your .env file
const genAI = new GoogleGenerativeAI(API_KEY);

// Legal Document Simplifier - Gemini Integration
const simplifyLegalDocument = async (documentText, setLoading, setSimplifiedText) => {
  setLoading(true);
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

  setLoading(false);
};

// Corporate Structure Advisor - Gemini Integration
const getCorporateStructureAdvice = async (businessType, setLoading, setAdvice) => {
  setLoading(true);
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

  setLoading(false);
};

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
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
    <div className="w-full bg-gray-100 p-6 shadow-md">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Legal Assistant Chat</h2>
        <p className="text-gray-600 mb-4">Ask me about legal aspects of your startup!</p>

        {/* Chat Window */}
        <div className="h-80 overflow-y-auto p-4 border rounded-md bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 max-w-[75%] rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                {msg.typing ? (
                  <Skeleton count={1} width={100} />
                ) : msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown> // ✅ Markdown Support Added
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white placeholder-gray-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
            onClick={sendMessage}
            disabled={loading}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

// Legal Page - Document Simplifier and Corporate Advisor
const Legal = () => {
  const [documentText, setDocumentText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [advice, setAdvice] = useState("");
  const [loadingDocument, setLoadingDocument] = useState(false);  // Separate loading state for document
  const [loadingAdvice, setLoadingAdvice] = useState(false);  // Separate loading state for advice
  const [businessType, setBusinessType] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      // You can implement a function to extract text from the PDF here
      alert("File uploaded successfully");
    } else {
      alert("Please upload a valid PDF document");
    }
  };

  return (
    <div className="h-full w-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md text-dark-text">
        <h1 className="text-3xl font-semibold text-center mb-6">Legal Assistant</h1>

        {/* Document Simplifier */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Legal Document Simplifier</h2>
          <textarea
            placeholder="Paste or type your legal document text here"
            className="w-full p-3 border rounded-md mb-4"
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
          />

          <button
            onClick={() => simplifyLegalDocument(documentText, setLoadingDocument, setSimplifiedText)}
            className="w-full bg-blue-500 text-white p-3 rounded-md"
            disabled={loadingDocument}
          >
            {loadingDocument ? "Simplifying..." : "Simplify Document"}
          </button>

          {simplifiedText && !loadingDocument && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Simplified Document</h3>
              <Markdown>{simplifiedText}</Markdown>
            </div>
          )}
        </div>

        {/* Corporate Structure Advisor */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Corporate Structure Advisor</h2>
          <input
            type="text"
            className="w-full p-3 border rounded-md mb-4"
            placeholder="Enter your business type (e.g., LLC, Corporation)"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
          <button
            onClick={() => getCorporateStructureAdvice(businessType, setLoadingAdvice, setAdvice)}
            className="w-full bg-blue-500 text-white p-3 rounded-md"
            disabled={loadingAdvice}
          >
            {loadingAdvice ? "Generating Advice..." : "Get Advice"}
          </button>

          {advice && !loadingAdvice && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Advice</h3>
              <Markdown>{advice}</Markdown>
            </div>
          )}
        </div>

        <LegalChatbot />
      </div>
    </div>
  );
};

export default Legal;
