import React, { useState, useEffect } from 'react';
import { Trophy, Quote, CheckCircle, Users, Medal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Star Component
const Star = ({ index }) => {
  const size = Math.random() * 3;
  return (
    <div
      className="absolute bg-white rounded-full animate-twinkle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${Math.random() * 2 + 1}s`
      }}
    />
  );
};

// Background Sphere Component
const BackgroundSphere = ({ position, color }) => (
  <div
    className={`absolute w-40 h-40 rounded-full opacity-30 blur-2xl ${position} ${color}`}
  />
);

const Motivation = () => {
  const [quote, setQuote] = useState({});
  const [progress, setProgress] = useState({});
  const [dailyChallenge, setDailyChallenge] = useState({});
  const [affirmation, setAffirmation] = useState('');
  const [successStory, setSuccessStory] = useState({});
  const [achievements, setAchievements] = useState([]);

  const motivationData = {
    quotes: [
      {
        quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
      },
      {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
      },
      {
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
      }
    ],
    progress: {
      tasksCompleted: 35,
      totalTasks: 50
    },
    dailyChallenge: {
      task: "Write down 3 ideas for your startup."
    },
    successStories: [
      {
        title: "Elon Musk: From PayPal to SpaceX",
        story: "Elon Musk founded SpaceX after creating and selling PayPal. With an unshakable belief in his vision, he built a company that revolutionized space travel."
      },
      {
        title: "Sara Blakely: Founder of Spanx",
        story: "Sara Blakely started Spanx with $5,000 and transformed it into a billion-dollar business. Her journey is an inspiring example of persistence and creativity."
      }
    ],
    affirmations: [
      "You are capable of achieving anything you set your mind to.",
      "Your hard work will pay off, keep going.",
      "Believe in yourself and all that you are."
    ],
    achievements: [
      {
        title: "First Task Completed",
        description: "Complete your first task to get started!",
        unlocked: true
      },
      {
        title: "Milestone Achiever",
        description: "Complete 25 tasks to unlock this achievement.",
        unlocked: false
      },
      {
        title: "Master of Progress",
        description: "Complete all tasks to unlock this achievement.",
        unlocked: false
      }
    ]
  };

  useEffect(() => {
    setQuote(motivationData.quotes[Math.floor(Math.random() * motivationData.quotes.length)]);
    setProgress(motivationData.progress);
    setDailyChallenge(motivationData.dailyChallenge);
    setAffirmation(motivationData.affirmations[Math.floor(Math.random() * motivationData.affirmations.length)]);
    setSuccessStory(motivationData.successStories[Math.floor(Math.random() * motivationData.successStories.length)]);
    setAchievements(motivationData.achievements);
  }, []);

  const progressData = [
    {
      name: 'Progress',
      completed: progress.tasksCompleted,
      total: progress.totalTasks
    }
  ];

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-black to-[#0a192f] overflow-hidden">
      {/* Twinkling Stars */}
      <div className="absolute w-full h-full">
        {[...Array(100)].map((_, i) => (
          <Star key={i} index={i} />
        ))}
      </div>

      {/* Gradient Spheres */}
      <BackgroundSphere position="top-10 left-10" color="bg-blue-500" />
      <BackgroundSphere position="bottom-10 right-10" color="bg-blue-400" />
      
      <div className="relative h-full w-full overflow-auto p-6">
        <div className="max-w-4xl mx-auto p-6 rounded-3xl shadow-2xl bg-opacity-20 backdrop-blur-lg border border-white/30 text-white">
          <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 animate-pulse">
            Motivation Center
          </h1>

          {/* Motivational Quote */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-400">
              <Quote className="w-6 h-6" /> Motivational Quote of the Day
            </h2>
            <p className="italic text-xl mt-4 text-white/90">"{quote.quote}"</p>
            <p className="text-right mt-2 text-white/70">- {quote.author}</p>
          </div>

          {/* Progress Tracker */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-400">
              <Trophy className="w-6 h-6" /> Progress Tracker
            </h2>
            <div className="mt-4">
              <p className="text-white/90">Tasks Completed: {progress.tasksCompleted} / {progress.totalTasks}</p>
              <div className="w-full h-4 bg-gray-800/50 rounded-full mt-2">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
                  style={{ width: `${(progress.tasksCompleted / progress.totalTasks) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Rest of the sections... */}
          {/* Daily Challenge */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-400">
              <CheckCircle className="w-6 h-6" /> Daily Challenge
            </h2>
            <p className="mt-4 text-white/90">{dailyChallenge.task}</p>
          </div>

          {/* Success Stories */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-400">
              <Users className="w-6 h-6" /> Success Story
            </h2>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white/90">{successStory.title}</h3>
              <p className="text-white/80">{successStory.story}</p>
            </div>
          </div>

          {/* Positive Affirmation */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-400">
              <CheckCircle className="w-6 h-6" /> Positive Affirmation
            </h2>
            <p className="italic text-xl mt-4 text-white/90">"{affirmation}"</p>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-400">
              <Medal className="w-6 h-6" /> Achievements
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-105 ${
                    achievement.unlocked ? 'bg-blue-400/20' : 'bg-gray-800/20'
                  }`}
                >
                  <p className="font-semibold text-white/90">{achievement.title}</p>
                  <p className="text-center text-white/70">{achievement.description}</p>
                  <p className={`text-sm ${achievement.unlocked ? 'text-blue-400' : 'text-gray-400'}`}>
                    {achievement.unlocked ? 'Unlocked' : 'Locked'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Graph */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-400 mb-4">Progress Graph</h2>
            <div className="bg-opacity-20 backdrop-blur-lg p-6 rounded-lg border border-white/30 h-64">
              <LineChart width={600} height={200} data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                <YAxis domain={[0, progress.totalTasks]} stroke="rgba(255,255,255,0.7)" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#60a5fa" 
                  strokeWidth={2}
                  dot={{ fill: '#60a5fa' }}
                />
              </LineChart>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for star animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Motivation;