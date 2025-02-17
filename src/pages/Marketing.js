import React, { useState } from "react";
import { Mail, Hash, BarChart } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const Marketing = () => {
  const [coldEmailText, setColdEmailText] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [socialMediaText, setSocialMediaText] = useState("");
  const [instaHandle, setInstaHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [seoDomain, setSeoDomain] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [niche, setNiche] = useState("");
  const [seoTopic, setSeoTopic] = useState("");
  const [generatedColdEmail, setGeneratedColdEmail] = useState("");
  const [generatedSocialContent, setGeneratedSocialContent] = useState("");
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [loadingColdEmail, setLoadingColdEmail] = useState(false);
  const [loadingSocialContent, setLoadingSocialContent] = useState(false);
  const [loadingSeoKeywords, setLoadingSeoKeywords] = useState(false);

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Ensure you have this in your .env file
const genAI = new GoogleGenerativeAI(API_KEY);

  // Simplified handlers that set mock responses for demo purposes
  const handleColdEmailGeneration = async (receiverEmail, messageContext, tone, setLoading, setGeneratedContent) => {
    if (!messageContext.trim()) {
      alert("Please provide a message context for the cold email!");
      return;
    }
    setLoadingColdEmail(true);
    const context = `Generate a cold email to ${receiverEmail} with the following message: "${messageContext}" in a ${tone} tone.`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([context]);
      const responseText = await result.response.text();
      setGeneratedContent(responseText);
    } catch (error) {
      console.error("Error generating cold email:", error);
    }
    setLoadingColdEmail(false);
  };

  const handleSocialMediaContent = async (handles, context, setLoading, setGeneratedContent) => {
    if (!context.trim()) {
      alert("Please provide content for the social media posts!");
      return;
    }
    setLoadingSocialContent(true);
    const { instaHandle, facebookHandle, twitterHandle } = handles;
    const contextMessage = `Generate social media content for Instagram: ${instaHandle}, Facebook: ${facebookHandle}, and X (Twitter): ${twitterHandle} with this message: "${context}"`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([contextMessage]);
      const responseText = await result.response.text();
      setGeneratedContent(responseText);
    } catch (error) {
      console.error("Error generating social media content:", error);
    }
    setLoadingSocialContent(false);
  };

  const handleSEOKeywordSuggestion = async (domain, businessName, niche, context, setLoading, setKeywords) => {
    if (!context.trim()) {
      alert("Please provide context for the SEO keywords!");
      return;
    }
    setLoadingSeoKeywords(true);
    const contextMessage = `Suggest SEO keywords for the website ${domain} with the business name ${businessName}, niche ${niche}, and context: "${context}"`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([contextMessage]);
      const responseText = await result.response.text();
      setKeywords(responseText.split("\n"));
    } catch (error) {
      console.error("Error generating SEO keywords:", error);
    }
    setLoadingSeoKeywords(false);
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-black to-[#0a192f] overflow-hidden">
      {/* Twinkling Stars */}
      <div className="absolute w-full h-full overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: Math.random() * 2 + 1 + "s",
              animationDelay: Math.random() * 2 + "s"
            }}
          />
        ))}
      </div>

      {/* Glowing Spheres */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>

      {/* Main Content */}
      <div className="relative h-full w-full overflow-auto">
        <div className="max-w-4xl mx-auto p-6 rounded-lg text-white">
          <h1 className="text-3xl font-semibold text-center mb-6 text-blue-400 animate-pulse">
            Marketing Assistant 
          </h1>

          {/* Cold Email Generator */}
          <div className="my-6 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                <Mail className="w-6 h-6" /> Cold Email Generator
              </h2>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Receiver's Email"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
              />
              <textarea
                placeholder="Enter message for email generation"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={coldEmailText}
                onChange={(e) => setColdEmailText(e.target.value)}
              />
              <select
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="Friendly">Friendly</option>
                <option value="Formal">Formal</option>
                <option value="Professional">Professional</option>
              </select>
              <button
                onClick={() => handleColdEmailGeneration(receiverEmail, coldEmailText, tone, setLoadingColdEmail, setGeneratedColdEmail)} 
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                disabled={loadingColdEmail}
              >
                {loadingColdEmail ? "Generating..." : "Generate Cold Email"}
              </button>

              {generatedColdEmail && !loadingColdEmail && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Generated Email</h3>
              <ReactMarkdown>{generatedColdEmail}</ReactMarkdown>
            </div>
          )}
            </div>
          </div>

          {/* Social Media Content Generator */}
          <div className="my-6 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                <Hash className="w-6 h-6" /> Social Media Content Generator
              </h2>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Instagram Handle"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={instaHandle}
                onChange={(e) => setInstaHandle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Facebook Handle"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={facebookHandle}
                onChange={(e) => setFacebookHandle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Twitter Handle"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
              />
              <textarea
                placeholder="Enter content description for social media"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={socialMediaText}
                onChange={(e) => setSocialMediaText(e.target.value)}
              />
              <button
                onClick={() => handleSocialMediaContent({ instaHandle, facebookHandle, twitterHandle }, socialMediaText, setLoadingSocialContent, setGeneratedSocialContent)}
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                disabled={loadingSocialContent}
              >
                {loadingSocialContent ? "Generating..." : "Generate Social Content"}
              </button>

              {generatedSocialContent && !loadingSocialContent && (
                <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-white/10">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Generated Content</h3>
                  <ReactMarkdown className="whitespace-pre-wrap text-white/80">{generatedSocialContent}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>

          {/* SEO Keyword Suggestion Tool */}
          <div className="my-6 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                <BarChart className="w-6 h-6" /> SEO Keyword Suggestion Tool
              </h2>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter website domain"
                value={seoDomain}
                onChange={(e) => setSeoDomain(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter niche"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
              <textarea
                placeholder="Enter context for SEO keywords"
                className="w-full p-3 rounded-md bg-gray-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={seoTopic}
                onChange={(e) => setSeoTopic(e.target.value)}
              />
              <button
                onClick={() => handleSEOKeywordSuggestion(seoDomain, businessName, niche, seoTopic, setLoadingSeoKeywords, setSeoKeywords)}
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                disabled={loadingSeoKeywords}
              >
                {loadingSeoKeywords ? "Generating..." : "Get SEO Keywords"}
              </button>

              {seoKeywords.length > 0 && !loadingSeoKeywords && (
                <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-white/10">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Suggested Keywords</h3>
                  <ul className="text-white/80 space-y-2">
                    {seoKeywords.map((keyword, index) => (
                      <li key={index}><ReactMarkdown>{keyword}</ReactMarkdown></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;