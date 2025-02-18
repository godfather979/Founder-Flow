import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; 
import logo from '../img/TextlessLogo.png';

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
            <div className=" py-5 px -2 text-white font-bm" >
              Innovate.   Implement.    Repeat.
            </div>
          </div>
        </header>

        <div className={`content-container ${loaded ? "loaded" : ""}`}>
          <div className="title-section -mt-32 flex flex-col items-center">
          <motion.img
    src={logo}
    alt="Your Logo"
    className="w-96 h-96 object-contain "
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  />
            
            <motion.h1
              className="text-5xl font-bold text-[#D1F8EF] text-center drop-shadow-[0_0_15px_rgba(0,0,255,0.8)] -mt-20"
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
              className="text-xl italic font-semibold text-center text-white py-5"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Boost your  START-UP  with us
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
