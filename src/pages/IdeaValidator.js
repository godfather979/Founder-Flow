import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { ResponsiveRadar } from "@nivo/radar";

// Gemini AI Setup
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const IdeaValidator = () => {
  const [formData, setFormData] = useState({
    startupName: "",
    problem: "",
    solution: "",
  });

  const [loading, setLoading] = useState(false);
  const [validationResults, setValidationResults] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Function to send idea for AI validation
  const validateIdea = async () => {
    setLoading(true);
    setValidationResults(null);

    const prompt = `
      You are an AI startup analyst. Given a startup's **problem** and **solution**, generate an insightful validation report. 
      Provide:
      - Market size & demand (low, medium, high)
      - Key competitors and their gaps
      - Best monetization strategy (Subscription, Ads, Marketplace, SaaS, etc.)
      - Major risks and mitigation strategies
      - A score (0-100) on **feasibility**, **profitability**, and **competition**

      **User Input:**
      - Startup Name: ${formData.startupName || "Unnamed Startup"}
      - Problem: ${formData.problem}
      - Solution: ${formData.solution}

      **Response format (JSON)**:
      {
        "marketDemand": "high",
        "competitors": ["Competitor A", "Competitor B"],
        "monetizationModel": "Subscription",
        "risks": ["High competition", "Customer acquisition costs"],
        "scores": {
          "feasibility": 78,
          "profitability": 85,
          "competition": 60
        }
      }
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([prompt]);
      const responseText = await result.response.text();
      console.log(responseText)
      const cleanResponse = responseText.match(/\{[\s\S]*\}/);
      console.log(cleanResponse)
      const jsonResponse = JSON.parse(cleanResponse);
      console.log(jsonResponse)
      setValidationResults(jsonResponse);
    } catch (error) {
      console.error("Error generating validation:", error);
    }

    setLoading(false);
  };

  return (
    <div className="h-full w-full overflow-auto">
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-dark-text mb-6">
        Startup Idea Validator 🚀
      </h1>

      {/* Form Inputs */}
      <div className="space-y-4">
        {[
          { field: "startupName", label: "Startup Name (Optional)" },
          { field: "problem", label: "What Problem Does It Solve?" },
          { field: "solution", label: "How Does It Solve the Problem?" },
        ].map(({ field, label }) => (
          <div key={field}>
            <label className="font-semibold text-gray-700">{label}</label>
            <input
              type="text"
              className="p-3 border rounded-lg w-full mt-1"
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Validate Button */}
      <button
        className="mt-5 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        onClick={validateIdea}
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin inline mr-2" /> : "🔍 Validate My Idea"}
      </button>

      {/* Results Section */}
      {validationResults && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white shadow-lg rounded-xl border"
        >
          <h2 className="text-xl font-bold text-blue-700">
            {formData.startupName || "Your Startup"} - Analysis
          </h2>

          {/* Market Demand */}
        <p className="text-gray-700 mt-2">
        <strong>📈 Market Demand:</strong>{" "}
        {validationResults.marketDemand
            .replace(/\*\*(.*?)\*\*/g, "$1") // Remove **markdown**
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </p>

          {/* Competitor Analysis */}
        <div className="mt-4">
        <h3 className="font-semibold text-red-600">⚔️ Competitors & Gaps</h3>
        <ul className="list-disc pl-5 text-gray-700">
            {validationResults.competitors.map((comp, i) => (
            <li key={i}>{comp}</li>
            ))}
        </ul>
        </div>

          {/* Monetization Model */}
        <p className="text-gray-700 mt-4">
        <strong>💰 Best Monetization Model:</strong> {validationResults.monetizationModel}
        </p>

          {/* Risks & Challenges */}
        <div className="mt-4">
        <h3 className="font-semibold text-orange-500">⚠️ Risks & Challenges</h3>
        <ul className="list-disc pl-5 text-gray-700">
            {validationResults.risks.map((risk, i) => (
            <li key={i}>{risk}</li>
            ))}
        </ul>
        </div>

          {/* Radar Chart for Scores */}
          <div className="mt-6 h-64">
            <h3 className="font-semibold text-blue-700 text-center">📊 Idea Score Analysis</h3>
            <ResponsiveRadar
              data={[
                { category: "Feasibility", score: validationResults.scores.feasibility },
                { category: "Profitability", score: validationResults.scores.profitability },
                { category: "Competition", score: validationResults.scores.competition },
              ]}
              keys={["score"]}
              indexBy="category"
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
              colors={{ scheme: "nivo" }}
              borderWidth={2}
              dotSize={8}
              gridLevels={5}
            />
          </div>

          {/* Scores */}
          <div className="mt-2 text-center">
        <ul className="list-none inline-block text-gray-700 text-left">
            <li><strong>Feasibility:</strong> {validationResults.scores.feasibility}%</li>
            <li><strong>Profitability:</strong> {validationResults.scores.profitability}%</li>
            <li><strong>Competition:</strong> {validationResults.scores.competition}%</li>
        </ul>
        </div>

        </motion.div>
      )}
    </div>
    </div>
  );
};

export default IdeaValidator;
