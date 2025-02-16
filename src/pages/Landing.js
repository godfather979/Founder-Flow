import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { ArrowRight } from "lucide-react";

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
          {/* <div className="logo-container">
            <div className="logo-circle">O</div>
            <span className="company-name">Wardiere, Inc.</span>
          </div> */}
        </header>

        <div className={`content-container ${loaded ? "loaded" : ""}`}>
          <div className="title-section -mt-12">
            <h1>FounderFlow</h1>
            <h1>START-UP</h1>
            {/* <button className="read-more">Read More</button> */}
          </div>

          {/* <div className="website-url">
            www.reallygreatsite.com
          </div> */}

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
