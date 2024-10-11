"use client";

import { Search, Menu, Grid } from "lucide-react";
import { useState, useEffect } from "react";
import LogoMinato from "./LogoMinato";
import CanvasCursor from "./CursorCanvas/canvas-cursor";
import TableauDeBordProduit from "./TableauDeBordProduit";
import Popup from "./Popup";

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const placeholders = [
    "Search for any product...",
    "Search for anything...",
    "What's on your mind?",
    "Discover new ideas",
    "Find answers here",
    "Ask anything about the products...",
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gradient, setGradient] = useState("from-blue-500 to-purple-500");

  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    const gradientInterval = setInterval(() => {
      const gradients = [
        "from-blue-500 via-pink-500 to-purple-500",
        "from-green-600 via-purple-600 to-blue-600",
        "from-pink-500 to-yellow-500 via-red-500",
      ];
      setGradient(gradients[Math.floor(Math.random() * gradients.length)]);
    }, 8000);

    return () => {
      clearInterval(placeholderInterval);
      clearInterval(gradientInterval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a search that takes 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsLoading(false);
    setShowResults(true);
  };

  const handleSuggestionClick = () => {
    setShowResults(true);
  };

  return (
    <div className="poppins-extralight-italic">
      <CanvasCursor />
      <header
        className={`fixed top-0 left-0 right-0 transition-colors duration-300 ${
          isScrolled ? "bg-black/30 backdrop-blur-lg" : "bg-transparent"
        } flex justify-between items-center p-4 shadow z-50`}
      >
        <div className="flex items-center space-x-2">
          <LogoMinato />
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex p-2 bg-zinc-800 rounded-full whatsapp-status-bar">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white fill-current"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <span className="text-sm font-medium text-white">Login</span>
          </button>
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] whatsapp-status-bar"></div>
      </header>
      <main
        className={`flex flex-col items-center justify-center w-full ${
          showResults ? "mt-20" : "mt-36"
        } px-4`}
      >
        {!showResults && (
          <div className="text-center space-y-2 mb-8">
            <span className="px-3 py-1 bg-zinc-800 text-xs text-white rounded-full poppins-extralight-italic">
              AI product search
            </span>
            <h1
              className={`text-5xl poppins-extralight-italic max-w-4xl leading-tight bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}
            >
              Find brands & products , faster and better with AI.
            </h1>
          </div>
        )}
        <div
          className={`w-full ${
            showResults ? "max-w-xl top-24 fixed z-50" : "max-w-2xl"
          } space-y-4`}
        >
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder={placeholders[currentPlaceholder]}
              required
              className="w-full py-4 pl-14 pr-20 bg-zinc-900 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-zinc-700 text-sm text-white font-medium rounded-full whatsapp-status-bar"
            >
              {isLoading ? <LoadingAnimation /> : "Search"}
            </button>
          </form>
          {!showResults && (
            <div className="flex flex-wrap justify-center gap-4 poppins-extralight-italic">
              <button
                onClick={handleSuggestionClick}
                className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-md text-sm text-white font-medium z-10"
              >
                <Menu className="w-4 h-4" />
                <span>Browse Categories</span>
              </button>
              <button
                onClick={handleSuggestionClick}
                className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-md text-sm text-white font-medium z-10"
              >
                <Grid className="w-4 h-4" />
                <span>Builder</span>
              </button>
              <button
                onClick={handleSuggestionClick}
                className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 rounded-md text-sm text-white font-medium z-10"
              >
                <Grid className="w-4 h-4" />
                <span>Search Products</span>
              </button>
            </div>
          )}
        </div>
        {isLoading && (
          <div className="mt-8 text-white text-center">
            <LoadingAnimation />
            <p className="mt-2">Searching for results...</p>
          </div>
        )}
        {!isLoading && showResults && (
          <TableauDeBordProduit
            imageUrl={""}
            productName={""}
            price={""}
            source={""}
            link={""}
          />
        )}
      </main>
    </div>
  );
}

function LoadingAnimation() {
  return (
    <div className="flex space-x-1">
      <div className="w-[6px] h-[6px] bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-[6px] h-[6px] bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-[6px] h-[6px] bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
}