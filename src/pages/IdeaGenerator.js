import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Loader } from "lucide-react";
// import { motion } from "framer-motion";

// Gemini AI Setup
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Spinner function to pick a random choice
const getRandomChoice = (options) => options[Math.floor(Math.random() * options.length)];

const IdeaGenerator = () => {
  const [formData, setFormData] = useState({
    industry: "",
    problem: "",
    targetAudience: "",
    businessModel: "",
    surpriseMode: false,
  });

  const [loading, setLoading] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [shake, setShake] = useState(false);
  const [loadingField, setLoadingField] = useState(null);


  const industries = ["Tech", "Healthcare", "Education", "Finance", "E-commerce", "Entertainment"];
  const problems = ["Time Management", "Health Issues", "Productivity", "Financial Planning", "Sustainability"];
  const audiences = ["Students", "Working Professionals", "Small Businesses", "Freelancers", "Parents"];
  const models = ["Subscription", "One-time Purchase", "Freemium", "Ads-based", "Marketplace"];

  // Handles form updates
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handles the "Surprise Me" feature for individual fields
  const handleSurprise = (field, options) => {
    // Animate a quick fake spin before selecting
    setLoadingField(field); // Show loading effect
  
    setTimeout(() => {
      handleChange(field, getRandomChoice(options));
      setLoadingField(null); // Remove loading effect
    }, 1000); // Fake spin for 1 second
  };

  const handleFullSurprise = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
      setFormData({
        industry: getRandomChoice(industries),
        problem: getRandomChoice(problems),
        targetAudience: getRandomChoice(audiences),
        businessModel: getRandomChoice(models),
        surpriseMode: true,
      });
    }, 1000);
  };

  // Sends data to Gemini AI for startup idea generation
  const generateGeminiResponse = async () => {
    setLoading(true);
    setGeneratedIdea(null);

    const structuredBoard = {
      Industry: formData.industry,
      Problem: formData.problem,
      "Target Audience": formData.targetAudience,
      "Business Model": formData.businessModel,
    };

    const context = `
      You are an AI assistant specializing in startup ideation.
      Given structured JSON input with "Industry", "Problem", "Target Audience", and "Business Model",
      you must:
      1. Generate a unique startup name.
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
        "name": "Generated startup name",
        "description": "A brief two-line summary of the idea.",
        "analysis": {
          "merits": ["Point 1", "Point 2"],
          "demerits": ["Point 1", "Point 2"],
          "suggestions": ["Point 1", "Point 2"]
        }
      }
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([context, prompt]);
      const responseText = await result.response.text();
    
      // Extract only the JSON part using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
      if (!jsonMatch) {
        throw new Error("Failed to extract valid JSON from the AI response");
      }
    
      const jsonResponse = JSON.parse(jsonMatch[0]); // Parse the extracted JSON
      setGeneratedIdea(jsonResponse);
    } catch (error) {
      console.error("Error generating AI response:", error);
    }

    setLoading(false);
  };

  return (
    <div className="h-full w-full overflow-auto">
    <div className="p-6 max-w-3xl mx-auto ">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Startup Idea Generator</h1>

      {/* Form */}
      <div className="space-y-4">
        {[
          { field: "industry", label: "Industry", options: industries },
          { field: "problem", label: "Problem to Solve", options: problems },
          { field: "targetAudience", label: "Target Audience", options: audiences },
          { field: "businessModel", label: "Business Model", options: models },
        ].map(({ field, label, options }) => (
          <div key={field} className="flex items-center gap-3">
            <select
              className="p-3 border rounded-lg w-full"
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            >
              <option value="">{`Select ${label}`}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Surprise Me Button */}
<motion.button
  className="p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center"
  onClick={() => handleSurprise(field, options)}
  animate={{
    rotate: loadingField === field ? [0, 180, 360] : 0, // Dice-like flip rotation
    scale: loadingField === field ? [1, 1.2, 1] : 1, // Quick scale effect
  }}
  transition={{
    duration: 0.6, // Faster than a full spin
    repeat: loadingField === field ? Infinity : 0,
    ease: "easeInOut",
  }}
>
  {loadingField === field ? "🎲 Rolling..." : "🎲 Surprise Me"}
</motion.button>


          </div>
        ))}
      </div>

      {/* Full Surprise Button */}
      <motion.button
  className="mt-5 w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
  onClick={handleFullSurprise}
  animate={{
    x: shake ? [-5, 5, -5, 5, 0] : 0, // Shake effect
  }}
  transition={{ duration: 0.5 }}
>
  🎲 Completely Surprise Me!
</motion.button>

      {/* Generate Idea Button */}
      <button
        className="mt-5 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        onClick={generateGeminiResponse}
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin inline mr-2" /> : "🚀 Generate Startup Idea"}
      </button>

      {/* Display Generated Idea */}
      {generatedIdea && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white shadow-lg rounded-xl border"
        >
          <h2 className="text-xl font-bold text-blue-700">{generatedIdea.name}</h2>
          <p className="text-gray-700 mt-2">{generatedIdea.description}</p>

          <div className="mt-4 space-y-2">
            <h3 className="font-semibold text-green-600">✅ Merits</h3>
            <ul className="list-disc pl-5 text-gray-700">{generatedIdea.analysis.merits.map((m, i) => <li key={i}>{m}</li>)}</ul>

            <h3 className="font-semibold text-red-600">⚠️ Demerits</h3>
            <ul className="list-disc pl-5 text-gray-700">{generatedIdea.analysis.demerits.map((d, i) => <li key={i}>{d}</li>)}</ul>

            <h3 className="font-semibold text-blue-600">💡 Suggestions</h3>
            <ul className="list-disc pl-5 text-gray-700">{generatedIdea.analysis.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        </motion.div>
      )}
    </div>
    </div>
  );
};

export default IdeaGenerator;
