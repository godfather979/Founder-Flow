import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaPalette, FaTag } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Ensure you have this in your .env file
const genAI = new GoogleGenerativeAI(API_KEY);

const Branding = () => {
  // States for Brand Name & Tagline Generator
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [generatedBranding, setGeneratedBranding] = useState("");
  const [loadingBranding, setLoadingBranding] = useState(false);

  // States for Color Scheme Generator
  const [stylePreference, setStylePreference] = useState("");
  const [generatedColorScheme, setGeneratedColorScheme] = useState("");
  const [loadingColorScheme, setLoadingColorScheme] = useState(false);

  // Generate Brand Name & Tagline
  const handleGenerateBranding = async () => {
    setLoadingBranding(true);
    const context = `Generate a brand name and tagline based on the following keywords: ${keywords}, Description: ${description}`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([context]);
      setGeneratedBranding(result.response.text());
    } catch (error) {
      console.error("Error generating branding:", error);
    }
    setLoadingBranding(false);
  };

  // Generate Color Scheme
  const handleGenerateColorScheme = async () => {
    setLoadingColorScheme(true);
    const context = `Generate a color scheme and suitable fonts (light and dark mode) for a business with the following style preference: ${stylePreference}, Description: ${description}`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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
    <div className="h-full w-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md text-dark-text">
        <h1 className="text-3xl font-semibold text-center mb-6">Branding Assistant</h1>

        {/* Brand Name & Tagline Generator */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaTag /> Brand Name & Tagline Generator
          </h2>

          <div className="my-4">
            <input
              type="text"
              className="w-full p-3 border rounded-md mb-4"
              placeholder="Keywords (e.g., innovative, tech)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <textarea
              className="w-full p-3 border rounded-md mb-4"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={handleGenerateBranding}
              className="w-full bg-blue-500 text-white p-3 rounded-md"
              disabled={loadingBranding}
            >
              {loadingBranding ? "Generating..." : "Generate Brand Name & Tagline"}
            </button>
          </div>

          {generatedBranding && !loadingBranding && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Generated Brand Name & Tagline</h3>
              <ReactMarkdown>{generatedBranding}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Color Scheme Generator */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaPalette /> Color Scheme Generator
          </h2>

          <div className="my-4">
            <select
              className="w-full p-3 border rounded-md mb-4"
              value={stylePreference}
              onChange={(e) => setStylePreference(e.target.value)}
            >
              <option value="">Select Style Preference</option>
              <option value="professional">Professional</option>
              <option value="simplistic">Simplistic</option>
              <option value="modern">Modern</option>
              <option value="futuristic">Futuristic</option>
            </select>
            <textarea
              className="w-full p-3 border rounded-md mb-4"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={handleGenerateColorScheme}
              className="w-full bg-blue-500 text-white p-3 rounded-md"
              disabled={loadingColorScheme}
            >
              {loadingColorScheme ? "Generating..." : "Generate Color Scheme"}
            </button>
          </div>

          {generatedColorScheme && !loadingColorScheme && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Generated Color Scheme</h3>
              <div className="space-y-2">
                {renderColorSwatches(generatedColorScheme)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Branding;
