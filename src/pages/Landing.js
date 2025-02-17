import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Landing() {
  const [loaded, setLoaded] = useState(false);
  const mainRef = useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoaded(true);
  }, []);
  const handleArrowClick = () => {
    navigate("/Home");
  };

  return (
    <div className="page-wrapper">
      <div className="nmis" ref={mainRef}>
        <header className="header">
          <div className="logo-container">
            <div>
              {" "}
              <img
                src="/TextlessLogo.png"
                alt="Your Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className={`content-container ${loaded ? "loaded" : ""}`}>
          <div className="title-section mt-1">
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
              Boost your <br></br> START-UP <br></br>with us
            </motion.h2>
          </div>

          <div className="arrow-button" onClick={handleArrowClick}>
            <ArrowRight />
          </div>
        </div>

        <div className="decorative-elements">
          <div className="orbit orbit-1">
            <div className="floating-sphere sphere-1"></div>
          </div>
          <div className="orbit orbit-2">
            <div className="floating-sphere sphere-2"></div>
          </div>
          <div className="circle-outline"></div>
          {[...Array(50)].map((_, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
