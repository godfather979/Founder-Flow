import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BokehParticle = ({ index }) => {
  const colors = ["#1E90FF", "#6495ED", "#A7C7E7"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      className="bokeh-particle"
      style={{
        color: randomColor,
        width: "8vmin",
        height: "8vmin",
        borderRadius: "10vmin",
        backfaceVisibility: "hidden",
        position: "absolute",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: `translate3d(0, 0, 1px)`,
        animation: `move ${Math.random() * 10 + 10}s linear infinite`,
        animationDelay: `${Math.random() * -10}s`,
        boxShadow: `${20 * (Math.random() > 0.5 ? -1 : 1)}vmin 0 ${
          (Math.random() + 0.2) * 5
        }vmin currentColor`,
      }}
    />
  );
};

const BokehBackground = () => {
  return (
    <div className="bokeh-background">
      {Array.from({ length: 20 }).map((_, index) => (
        <BokehParticle key={index} index={index} />
      ))}
    </div>
  );
};

const Test = ({ onNavigate = () => {} }) => {
  const [loaded, setLoaded] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="nmis" ref={mainRef}>
        <header className="header" />

        <div className={`content-container ${loaded ? "loaded" : ""}`}>
          <div className="title-section -mt-12">
            <motion.h1
              className="text-5xl font-bold text-[#D1F8EF] text-center drop-shadow-[0_0_15px_rgba(0,0,255,0.8)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0.8, 1, 0.8], // Glowing effect
                scale: [1, 1.1, 1], // Slight size increase
              }}
              transition={{
                duration: 3,
                repeat: Infinity, // Infinite loop for the beating effect
                repeatType: "loop",
                ease: "easeInOut",
                delay: 1, // Optional delay for the start of the animation
              }}
            >
              FounderFlow
            </motion.h1>

            <motion.h2
              className="text-xl italic font-semibold text-center text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              START-UP
            </motion.h2>
          </div>

          <motion.div
            className="arrow-button"
            onClick={onNavigate}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRight />
          </motion.div>
        </div>

        <div className="decorative-elements">
          <div className="orbit orbit-1">
            <div className="floating-sphere sphere-1" />
          </div>
          <div className="orbit orbit-2">
            <div className="floating-sphere sphere-2" />
          </div>
          {/* <div className="circle-outline" /> */}

          {[...Array(50)].map((_, index) => (
            <motion.div
              key={index}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: Math.random() * 3 }}
            />
          ))}
        </div>

        <BokehBackground />
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

        .page-wrapper {
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          perspective: 10px;
          transform-style: preserve-3d;
          background-color: #040b2b;
        }

        .nmis {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #040b2b;
          overflow: hidden;
        }

        .header {
          padding: 2rem;
          position: relative;
          z-index: 10;
        }

        .content-container {
          z-index: 3;
          position: relative;
          height: calc(100% - 100px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .content-container.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .decorative-elements {
          z-index: 2;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }

        .orbit-1 {
          width: 1200px;
          height: 1200px;
          animation: orbit 10s linear infinite;
        }

        .orbit-2 {
          width: 1200px;
          height: 1200px;
          animation: orbit 15s linear infinite reverse;
        }

        .floating-sphere {
          z-index: 4;
          position: absolute;
          border-radius: 50%;
          transform-origin: center;
          will-change: transform;
        }

        .sphere-1 {
          width: 150px;
          height: 150px;
          top: -75px;
          left: calc(50% - 75px);
          background: radial-gradient(circle at 30% 30%, #1e90ff, #040b2b);
          box-shadow: 0 0 50px rgba(30, 144, 255, 0.3);
          animation: float 2s infinite ease-in-out;
        }

        .sphere-2 {
          width: 180px;
          height: 180px;
          bottom: -90px;
          left: calc(50% - 90px);
          background: radial-gradient(circle at 30% 30%, #1e90ff, #040b2b);
          box-shadow: 0 0 60px rgba(30, 144, 255, 0.3);
          animation: float 2s infinite ease-in-out;
        }

        .circle-outline {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          width: 80vw;
          height: 80vw;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .arrow-button {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          width: 48px;
          height: 48px;
          background-color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease;
          z-index: 10;
        }

        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes move {
          100% {
            transform: translate3d(0, 0, 1px) rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .orbit-1,
          .orbit-2 {
            width: 300px;
            height: 300px;
          }

          .sphere-1 {
            width: 100px;
            height: 100px;
            top: -50px;
            left: calc(50% - 50px);
          }

          .sphere-2 {
            width: 120px;
            height: 120px;
            bottom: -60px;
            left: calc(50% - 60px);
          }
        }
      `}</style>
    </div>
  );
};

export default Test;
