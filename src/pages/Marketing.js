import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaHashtag, FaChartBar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Ensure you have this in your .env file
const genAI = new GoogleGenerativeAI(API_KEY);

// Marketing Features Handlers
const handleColdEmailGeneration = async (receiverEmail, messageContext, tone, setLoading, setGeneratedContent) => {
  if (!messageContext.trim()) {
    alert("Please provide a message context for the cold email!");
    return;
  }

  setLoading(true);
  const context = `Generate a cold email to ${receiverEmail} with the following message: "${messageContext}" in a ${tone} tone.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent([context]);
    const responseText = await result.response.text();
    setGeneratedContent(responseText);
  } catch (error) {
    console.error("Error generating cold email:", error);
  }

  setLoading(false);
};


const handleSocialMediaContent = async (handles, context, setLoading, setGeneratedContent) => {
  if (!context.trim()) {
    alert("Please provide content for the social media posts!");
    return;
  }

  setLoading(true);
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

  setLoading(false);
};


const handleSEOKeywordSuggestion = async (domain, businessName, niche, context, setLoading, setKeywords) => {
  if (!context.trim()) {
    alert("Please provide context for the SEO keywords!");
    return;
  }

  setLoading(true);
  const contextMessage = `Suggest SEO keywords for the website ${domain} with the business name ${businessName}, niche ${niche}, and context: "${context}"`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent([contextMessage]);
    const responseText = await result.response.text();
    setKeywords(responseText.split("\n"));
  } catch (error) {
    console.error("Error generating SEO keywords:", error);
  }

  setLoading(false);
};


// Marketing Page Component
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

  return (
    <div className="h-full w-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md text-dark-text">
        <h1 className="text-3xl font-semibold text-center mb-6">Marketing Assistant</h1>

        {/* Cold Email Generator */}
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-4">✉️ Cold Email Generator</h2>
          <input
            type="email"
            placeholder="Receiver's Email"
            className="w-full p-3 border rounded-md mb-4"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
          />
          <textarea
            placeholder="Enter message for email generation"
            className="w-full p-3 border rounded-md mb-4"
            value={coldEmailText}
            onChange={(e) => setColdEmailText(e.target.value)}
          />
          <select
            className="w-full p-3 border rounded-md mb-4"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="Friendly">Friendly</option>
            <option value="Formal">Formal</option>
            <option value="Professional">Professional</option>
          </select>
          <button
            onClick={() => handleColdEmailGeneration(receiverEmail, coldEmailText, tone, setLoadingColdEmail, setGeneratedColdEmail)}
            className="w-full bg-blue-500 text-white p-3 rounded-md"
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

        {/* Social Media Content Generator */}
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-4">📱 Social Media Content Generator</h2>
          <input
            type="text"
            placeholder="Instagram Handle"
            className="w-full p-3 border rounded-md mb-4"
            value={instaHandle}
            onChange={(e) => setInstaHandle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Facebook Handle"
            className="w-full p-3 border rounded-md mb-4"
            value={facebookHandle}
            onChange={(e) => setFacebookHandle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Twitter Handle"
            className="w-full p-3 border rounded-md mb-4"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
          />
          <textarea
            placeholder="Enter content description for social media"
            className="w-full p-3 border rounded-md mb-4"
            value={socialMediaText}
            onChange={(e) => setSocialMediaText(e.target.value)}
          />
          <button
            onClick={() => handleSocialMediaContent({ instaHandle, facebookHandle, twitterHandle }, socialMediaText, setLoadingSocialContent, setGeneratedSocialContent)}
            className="w-full bg-blue-500 text-white p-3 rounded-md"
            disabled={loadingSocialContent}
          >
            {loadingSocialContent ? "Generating..." : "Generate Social Content"}
          </button>

          {generatedSocialContent && !loadingSocialContent && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Generated Content</h3>
              <ReactMarkdown>{generatedSocialContent}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* SEO Keyword Suggestion Tool */}
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-4">🔍 SEO Keyword Suggestion Tool</h2>
          <input
            type="text"
            className="w-full p-3 border rounded-md mb-4"
            placeholder="Enter website domain"
            value={seoDomain}
            onChange={(e) => setSeoDomain(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border rounded-md mb-4"
            placeholder="Enter business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border rounded-md mb-4"
            placeholder="Enter niche"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
          <textarea
            placeholder="Enter context for SEO keywords"
            className="w-full p-3 border rounded-md mb-4"
            value={seoTopic}
            onChange={(e) => setSeoTopic(e.target.value)}
          />
          <button
            onClick={() => handleSEOKeywordSuggestion(seoDomain, businessName, niche, seoTopic, setLoadingSeoKeywords, setSeoKeywords)}
            className="w-full bg-blue-500 text-white p-3 rounded-md"
            disabled={loadingSeoKeywords}
          >
            {loadingSeoKeywords ? "Generating..." : "Get SEO Keywords"}
          </button>

          {seoKeywords.length > 0 && !loadingSeoKeywords && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Suggested Keywords</h3>
              <ul>
                {seoKeywords.map((keyword, index) => (
                  <li key={index}><ReactMarkdown>{keyword}</ReactMarkdown></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketing;
