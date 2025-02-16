import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MoveRight, Lightbulb, Target, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  const [boards] = useState([
    {
      id: 1,
      title: "Problem Validation",
      cards: [
        { id: 1, content: "Target market identification", status: "completed" },
        { id: 2, content: "Customer pain points", status: "in-progress" },
        { id: 3, content: "Market size estimation", status: "pending" }
      ]
    },
    {
      id: 2,
      title: "Solution Development",
      cards: [
        { id: 4, content: "Feature brainstorming", status: "in-progress" },
        { id: 5, content: "MVP definition", status: "pending" },
        { id: 6, content: "Technology stack", status: "pending" }
      ]
    },
    {
      id: 3,
      title: "Business Model",
      cards: [
        { id: 7, content: "Revenue streams", status: "pending" },
        { id: 8, content: "Cost structure", status: "pending" },
        { id: 9, content: "Pricing strategy", status: "pending" }
      ]
    }
  ]);

  const stages = [
    { icon: Lightbulb, title: "Ideation", count: 3 },
    { icon: Target, title: "Validation", count: 2 },
    { icon: Users, title: "Customer Discovery", count: 4 },
    { icon: TrendingUp, title: "Growth", count: 1 }
  ];

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

      <div className="relative p-6 md:p-12 flex flex-col gap-6 flex-1 w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome to FounderFlow
            </h1>
            <p className="text-lg text-blue-300">
              Your ultimate startup assistant to streamline your journey.
            </p>
          </div>
          <button
            onClick={() => navigate('/ideation')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            New Board
          </button>
        </div>

        {/* Progress Stages */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {stages.map((stage, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-white">
                  {stage.title}
                </h3>
                <stage.icon className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {stage.count}
              </div>
              <p className="text-xs text-blue-300">
                tasks in progress
              </p>
            </div>
          ))}
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {boards.map((board) => (
            <div 
              key={board.id} 
              className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-white/10"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {board.title}
                  </h3>
                  <MoveRight className="h-4 w-4 text-blue-400" />
                </div>
              </div>
              <div className="space-y-4">
                {board.cards.map((card) => (
                  <div
                    key={card.id}
                    className={`p-3 rounded-lg border ${
                      card.status === 'completed'
                        ? 'bg-green-900/20 border-green-500/30 text-green-300'
                        : card.status === 'in-progress'
                        ? 'bg-blue-900/20 border-blue-500/30 text-blue-300'
                        : 'bg-gray-800/50 border-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm">
                      {card.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}