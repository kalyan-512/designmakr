"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { DesignType, AgeGroup, Theme } from "@/types";

interface PromptBoxProps {
  onGenerate: (prompt: string, designType: DesignType, ageGroup: AgeGroup, theme: Theme) => Promise<void>;
  isGenerating: boolean;
}

const designTypes: { value: DesignType; label: string; size: string; dimensions: string }[] = [
  { value: "instagram-post", label: "Instagram Post", size: "1080x1080", dimensions: "Square (1:1)" },
  { value: "instagram-story", label: "Instagram Story", size: "1080x1920", dimensions: "Vertical (9:16)" },
  { value: "poster", label: "Preschool Poster", size: "1080x1350", dimensions: "Portrait (4:5)" },
];

const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: "2-3", label: "Age 2-3" },
  { value: "3-4", label: "Age 3-4" },
  { value: "4-5", label: "Age 4-5" },
];

const themes: { value: Theme; label: string }[] = [
  { value: "birthday", label: "Birthday" },
  { value: "admission", label: "Admission" },
  { value: "festival", label: "Festival" },
  { value: "general", label: "General" },
];

export default function PromptBox({ onGenerate, isGenerating }: PromptBoxProps) {
  const [prompt, setPrompt] = useState("");
  const [designType, setDesignType] = useState<DesignType>("instagram-post");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("3-4");
  const [theme, setTheme] = useState<Theme>("general");
  const [customElements, setCustomElements] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // Build enhanced prompt
    const selectedSize = designTypes.find(d => d.value === designType);
    let enhancedPrompt = prompt;
    
    // Add theme-specific elements
    const themeElements: Record<Theme, string> = {
      birthday: "birthday balloons, cake, party decorations, confetti",
      admission: "school building, books, happy children, welcome banner",
      festival: "colorful decorations, celebration elements, festive atmosphere",
      general: "cheerful, colorful, child-friendly"
    };
    
    // Add age-appropriate elements
    const ageElements: Record<AgeGroup, string> = {
      "2-3": "very simple shapes, bright primary colors, large friendly characters",
      "3-4": "playful illustrations, vibrant colors, engaging characters",
      "4-5": "detailed but fun artwork, rich colors, expressive characters"
    };
    
    enhancedPrompt = `Create a ${selectedSize?.label.toLowerCase()} for preschool age ${ageGroup}. ${prompt}. Include ${themeElements[theme]}. Style: ${ageElements[ageGroup]}. ${customElements ? `Additional elements: ${customElements}.` : ''} Professional, safe for children, engaging, educational.`;
    
    await onGenerate(enhancedPrompt, designType, ageGroup, theme);
    setCustomElements("");
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-200">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">What do you want to create?</label>
          <textarea
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Happy kids playing with colorful blocks"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">Additional Elements (Optional)</label>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            value={customElements}
            onChange={(e) => setCustomElements(e.target.value)}
            placeholder="e.g., rainbow, stars, teddy bears"
          />
          <p className="mt-2 text-xs text-gray-500">Add specific elements you want to include in your design</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">Design Type</label>
            <select
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              value={designType}
              onChange={(e) => setDesignType(e.target.value as DesignType)}
            >
              {designTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label} - {item.dimensions}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-gray-500">
              {designTypes.find(d => d.value === designType)?.size}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">Age Group</label>
            <select
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
            >
              {ageGroups.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">Theme</label>
            <select
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
            >
              {themes.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="group relative rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating Magic...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generate Design
              </span>
            )}
          </button>
          <p className="text-xs text-gray-500">Uses a preschool-safe prompt template.</p>
        </div>
      </form>
    </div>
  );
}
