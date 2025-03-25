import React, { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Ensure you have this in your .env file
const genAI = new GoogleGenerativeAI(API_KEY);

const Branding = () => {
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [generatedBranding, setGeneratedBranding] = useState("");
  const [loadingBranding, setLoadingBranding] = useState(false);
  const [stylePreference, setStylePreference] = useState("");
  const [generatedColorScheme, setGeneratedColorScheme] = useState("");
  const [loadingColorScheme, setLoadingColorScheme] = useState(false);

  // Generate Brand Name & Tagline
  const handleGenerateBranding = async () => {
    setLoadingBranding(true);
    const context = `Generate a brand name and tagline based on the following keywords: ${keywords}, Description: ${description}`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent([context]);
      setGeneratedBranding(result.response.text());
    } catch (error) {
      console.error("Error generating branding:", error);
    }
    setLoadingBranding(false);
  };

  const handleGenerateColorScheme = async () => {
    setLoadingColorScheme(true);
    const context = `Generate a color scheme and suitable fonts (light and dark mode) for a business with the following style preference: ${stylePreference}, Description: ${description}`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent([context]);
      setGeneratedColorScheme(result.response.text());
    } catch (error) {
      console.error("Error generating color scheme:", error);
    }
    setLoadingColorScheme(false);
  };

  // Function to render color swatches alongside color names
  const renderColorSwatches = (colorText) => {
    // Regex to match color names and hex codes
    const regex = /(\w+):\s*(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3})/g;
    const colorMatches = [];
    let match;
    while ((match = regex.exec(colorText)) !== null) {
      colorMatches.push({ name: match[1], hex: match[2] });
    }
    return colorMatches.map((color, index) => (
      <div key={index} className="flex items-center space-x-2">
        <span style={{ backgroundColor: color.hex }} className="w-6 h-6 rounded-full"></span>
        <span>{color.name}: {color.hex}</span>
      </div>
    ));
  };


  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black to-[#0a192f] overflow-x-hidden">
      {/* Twinkling Stars */}
      <div className="fixed w-full h-full overflow-hidden">
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
      <div className="fixed top-10 left-10 w-40 h-40 bg-blue-500 rounded-full opacity-30 blur-2xl"></div>
      <div className="fixed bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
      <div className="fixed top-1/3 left-1/3 w-60 h-60 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="fixed bottom-1/3 right-1/4 w-50 h-50 bg-blue-300 rounded-full opacity-25 blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-400 animate-pulse">
          Branding Assistant
        </h1>

        {/* Brand Name & Tagline Generator */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
            <Tag className="h-6 w-6" /> Brand Name & Tagline Generator
          </h2>
          <input
            className="w-full p-2 mt-4 rounded bg-gray-800 text-white placeholder-gray-400"
            placeholder="Keywords (e.g., innovative, tech)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <textarea
            className="w-full p-2 mt-4 rounded bg-gray-800 text-white placeholder-gray-400"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleGenerateBranding}
            disabled={loadingBranding}
          >
            {loadingBranding ? "Generating..." : "Generate Brand Name & Tagline"}
          </button>
          {generatedBranding && (
            <div className="mt-4 p-2 bg-gray-800 text-white rounded">
              <ReactMarkdown>{generatedBranding}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Color Scheme Generator */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
            <Palette className="h-6 w-6" /> Color Scheme Generator
          </h2>
          <select
            className="w-full p-2 mt-4 rounded bg-gray-800 text-white"
            value={stylePreference}
            onChange={(e) => setStylePreference(e.target.value)}
          >
            <option value="" disabled>Select Style Preference</option>
            <option value="professional">Professional</option>
            <option value="simplistic">Simplistic</option>
            <option value="modern">Modern</option>
            <option value="futuristic">Futuristic</option>
          </select>
          <textarea
            className="w-full p-2 mt-4 rounded bg-gray-800 text-white placeholder-gray-400"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleGenerateColorScheme}
            disabled={loadingColorScheme}
          >
            {loadingColorScheme ? "Generating..." : "Generate Color Scheme"}
          </button>
          {generatedColorScheme && (
            <div className="mt-4 p-2 bg-gray-800 text-white rounded">
              <ReactMarkdown>{generatedColorScheme}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Branding;
