import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const getRandomChoice = (options) => options[Math.floor(Math.random() * options.length)];

const IdeaGenerator = () => {
  const [formData, setFormData] = useState({
    industry: "",
    problem: "",
    targetAudience: "",
    businessModel: "",
    surpriseMode: false,
  });

  const [loadingField, setLoadingField] = useState(null);
  const [shake, setShake] = useState(false);

  const industries = ["Tech", "Healthcare", "Education", "Finance", "E-commerce", "Entertainment"];
  const problems = ["Time Management", "Health Issues", "Productivity", "Financial Planning", "Sustainability"];
  const audiences = ["Students", "Working Professionals", "Small Businesses", "Freelancers", "Parents"];
  const models = ["Subscription", "One-time Purchase", "Freemium", "Ads-based", "Marketplace"];

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

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-black to-[#0a192f] overflow-hidden flex items-center justify-center">
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

      <div className="relative p-8 max-w-4xl mx-auto bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl border border-white/20 text-white">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6 animate-pulse">
          <span className="glow-text">Startup Idea Generator 🚀</span>
        </h1>

        <div className="space-y-4">
          {[{ field: "industry", label: "Industry", options: industries },
            { field: "problem", label: "Problem to Solve", options: problems },
            { field: "targetAudience", label: "Target Audience", options: audiences },
            { field: "businessModel", label: "Business Model", options: models }
          ].map(({ field, label, options }) => (
            <div key={field} className="flex items-center gap-3">
              <select
                className="p-3 bg-black/40 border border-white/30 rounded-lg w-full text-white"
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              >
                <option value="">{`Select ${label}`}</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <motion.button
                className="p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-600"
                onClick={() => handleSurprise(field, options)}
                animate={loadingField === field ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {loadingField === field ? "🎲 Randomizing..." : "🎲 Surprise Me"}
              </motion.button>
            </div>
          ))}
        </div>

        <motion.button
          className="mt-5 w-full p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-700"
          onClick={handleFullSurprise}
          animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          🎲 Completely Surprise Me!
        </motion.button>
      </div>
    </div>
  );
};

export default IdeaGenerator;
