import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const getRandomChoice = (options) =>
  options[Math.floor(Math.random() * options.length)];

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

  const industries = [
    "Tech",
    "Healthcare",
    "Education",
    "Finance",
    "E-commerce",
    "Entertainment",
  ];
  const problems = [
    "Time Management",
    "Health Issues",
    "Productivity",
    "Financial Planning",
    "Sustainability",
  ];
  const audiences = [
    "Students",
    "Working Professionals",
    "Small Businesses",
    "Freelancers",
    "Parents",
  ];
  const models = [
    "Subscription",
    "One-time Purchase",
    "Freemium",
    "Ads-based",
    "Marketplace",
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSurprise = (field, options) => {
    setLoadingField(field);
    setTimeout(() => {
      handleChange(field, getRandomChoice(options));
      setLoadingField(null);
    }, 1000);
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
      console.log(responseText);

      // Extract only the JSON part using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      console.log(jsonMatch);

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
    <div className="relative h-screen w-full bg-gradient-to-b from-black to-[#1a1a2e] overflow-hidden flex items-center justify-center">
      {/* Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full w-[2px] h-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="h-full w-full overflow-auto">
        <div className="relative mt-6 p-6 max-w-3xl mx-auto bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl border border-white/20 text-white">
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-6 animate-pulse">
            <span className="glow-text">Startup Idea Generator 🚀</span>
          </h1>

          <div className="space-y-4">
            {[
              { field: "industry", label: "Industry", options: industries },
              {
                field: "problem",
                label: "Problem to Solve",
                options: problems,
              },
              {
                field: "targetAudience",
                label: "Target Audience",
                options: audiences,
              },
              {
                field: "businessModel",
                label: "Business Model",
                options: models,
              },
            ].map(({ field, label, options }) => (
              <div key={field} className="flex items-center gap-3">
                <select
                  className="p-3 bg-black/40 border border-white/30 rounded-lg w-full text-white"
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

                <motion.button
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleSurprise(field, options)}
                  animate={{ x: loadingField === field ? [-5, 5, -5] : 0 }}
                  transition={{
                    duration: 0.3,
                    repeat: loadingField === field ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                >
                  Surprise Me
                </motion.button>
              </div>
            ))}
          </div>

          <motion.button
            className="mt-5 w-full p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-400"
            onClick={handleFullSurprise}
            animate={{ x: shake ? [-5, 5, -5, 5, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            🎲 Completely Surprise Me!
          </motion.button>

          <button
            className="mt-5 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            onClick={generateGeminiResponse}
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin inline mr-2" />
            ) : (
              "🚀 Generate Startup Idea"
            )}
          </button>

          {generatedIdea && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-black/50 backdrop-blur-lg shadow-lg rounded-xl border border-white/20"
            >
              <h2 className="text-xl font-bold text-blue-400">
                {generatedIdea.name}
              </h2>
              <p className="text-gray-300 mt-2">{generatedIdea.description}</p>

              <h3 className="font-semibold text-green-400 mt-4">✅ Merits</h3>
              <ul className="list-disc pl-5 text-gray-300">
                {generatedIdea.analysis.merits.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaGenerator;
