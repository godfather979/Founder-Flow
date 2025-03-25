import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { ResponsiveRadar } from "@nivo/radar";

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

  const validateIdea = async () => {
    setLoading(true);
    setValidationResults(null);

    const prompt = `
      You are an AI startup analyst. Given a startup's *problem* and *solution*, generate an insightful validation report. 
      Provide:
      - Market size & demand (low, medium, high)
      - Key competitors and their gaps
      - Best monetization strategy (Subscription, Ads, Marketplace, SaaS, etc.)
      - Major risks and mitigation strategies
      - A score (0-100) on *feasibility, **profitability, and **competition*

      *User Input:*
      - Startup Name: ${formData.startupName || "Unnamed Startup"}
      - Problem: ${formData.problem}
      - Solution: ${formData.solution}

      *Response format (JSON)*:
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
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent([prompt]);
      const responseText = await result.response.text();
      const cleanResponse = responseText.match(/\{[\s\S]*\}/);
      const jsonResponse = JSON.parse(cleanResponse);
      setValidationResults(jsonResponse);
    } catch (error) {
      console.error("Error generating validation:", error);
    }

    setLoading(false);
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
        <div className="p-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-6 animate-pulse">
            <span className="glow-text">Startup Idea Validator 🚀</span>
          </h1>

          {/* Form Inputs */}
          <div className="space-y-4">
            {[
              { field: "startupName", label: "Startup Name (Optional)" },
              { field: "problem", label: "What Problem Does It Solve?" },
              { field: "solution", label: "How Does It Solve the Problem?" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="font-semibold text-white">{label}</label>
                <input
                  type="text"
                  className="p-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/30 rounded-lg w-full mt-1 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Validate Button */}
          <button
            className="mt-5 w-full p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-all duration-300"
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
              className="mt-8 p-6 bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl border border-white/20 text-white"
            >
              <h2 className="text-xl font-bold text-blue-400">
                {formData.startupName || "Your Startup"} - Analysis
              </h2>

              {/* Market Demand */}
              <p className="text-white/90 mt-2">
                <strong>📈 Market Demand:</strong>{" "}
                {validationResults.marketDemand
                  .replace(/\\(.?)\\/g, "$1")
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>

              {/* Competitor Analysis */}
              <div className="mt-4">
                <h3 className="font-semibold text-red-400">⚔ Competitors & Gaps</h3>
                <ul className="list-disc pl-5 text-white/80">
                  {validationResults.competitors.map((comp, i) => (
                    <li key={i}>{comp}</li>
                  ))}
                </ul>
              </div>

              {/* Monetization Model */}
              <p className="text-white/90 mt-4">
                <strong>💰 Best Monetization Model:</strong> {validationResults.monetizationModel}
              </p>

              {/* Risks & Challenges */}
              <div className="mt-4">
                <h3 className="font-semibold text-orange-400">⚠ Risks & Challenges</h3>
                <ul className="list-disc pl-5 text-white/80">
                  {validationResults.risks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                </ul>
              </div>

              {/* Radar Chart for Scores */}
              <div className="mt-6 h-64">
                <h3 className="font-semibold text-blue-400 text-center">📊 Idea Score Analysis</h3>
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
                  theme={{
                    textColor: "white",
                    grid: { line: { stroke: "#ffffff30" } },
                  }}
                />
              </div>

              {/* Scores */}
              <div className="mt-2 text-center">
                <ul className="list-none inline-block text-white/90 text-left">
                  <li><strong>Feasibility:</strong> {validationResults.scores.feasibility}%</li>
                  <li><strong>Profitability:</strong> {validationResults.scores.profitability}%</li>
                  <li><strong>Competition:</strong> {validationResults.scores.competition}%</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaValidator;