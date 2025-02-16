import React, { useState, useEffect } from 'react';
import { FaTrophy, FaQuoteLeft, FaCheckCircle, FaUsers, FaMedal } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

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
        quote: "Don’t watch the clock; do what it does. Keep going.",
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
        unlocked: true,
        imageUrl: "https://img.freepik.com/free-vector/award-ribbon_24908-54794.jpg?ga=GA1.1.1643919832.1723051198&semt=ais_hybrid"
      },
      {
        title: "Milestone Achiever",
        description: "Complete 25 tasks to unlock this achievement.",
        unlocked: progress.tasksCompleted >= 25,
        imageUrl: "https://img.freepik.com/free-vector/award-ribbon_24908-54794.jpg?ga=GA1.1.1643919832.1723051198&semt=ais_hybrid"
      },
      {
        title: "Master of Progress",
        description: "Complete all tasks to unlock this achievement.",
        unlocked: progress.tasksCompleted >= progress.totalTasks,
        imageUrl: "https://img.freepik.com/free-vector/award-ribbon_24908-54794.jpg?ga=GA1.1.1643919832.1723051198&semt=ais_hybrid"
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

  const progressData = {
    labels: ['Progress'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [progress.tasksCompleted],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="h-full w-full overflow-auto p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto p-6 rounded-3xl shadow-2xl bg-white text-dark-text">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Motivation Center</h1>

        {/* Motivational Quote */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-500">
            <FaQuoteLeft /> Motivational Quote of the Day
          </h2>
          <p className="italic text-xl mt-4 text-gray-800">"{quote.quote}"</p>
          <p className="text-right mt-2 text-gray-500">- {quote.author}</p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-500">
            <FaTrophy /> Progress Tracker
          </h2>
          <div className="mt-4">
            <p>Tasks Completed: {progress.tasksCompleted} / {progress.totalTasks}</p>
            <div className="w-full h-4 bg-gray-300 rounded-full mt-2">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full"
                style={{ width: `${(progress.tasksCompleted / progress.totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-500">
            <FaCheckCircle /> Daily Challenge
          </h2>
          <p className="mt-4 text-gray-700">{dailyChallenge.task}</p>
        </div>

        {/* Success Stories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-500">
            <FaUsers /> Success Story
          </h2>
          <div className="mt-4 text-gray-700">
            <h3 className="text-xl font-bold">{successStory.title}</h3>
            <p>{successStory.story}</p>
          </div>
        </div>

        {/* Positive Affirmation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-500">
            <FaCheckCircle /> Positive Affirmation
          </h2>
          <p className="italic text-xl mt-4 text-gray-800">"{affirmation}"</p>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-500">
            <FaMedal /> Achievements
          </h2>
          <div className="mt-4 flex gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-4 border-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${achievement.unlocked ? 'bg-green-200' : 'bg-gray-300'}`}
              >
                <img
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  className="w-16 h-16 mb-2"
                />
                <p className="font-semibold text-gray-800">{achievement.title}</p>
                <p className="text-center text-gray-600">{achievement.description}</p>
                <p className={`text-sm ${achievement.unlocked ? 'text-green-700' : 'text-gray-700'}`}>
                  {achievement.unlocked ? 'Unlocked' : 'Locked'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Graph */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-500 mb-4">Progress Graph</h2>
          <div className="bg-gradient-to-r from-teal-100 to-blue-100 p-6 rounded-lg shadow-lg">
            <Line data={progressData} options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: progress.totalTasks
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motivation;
