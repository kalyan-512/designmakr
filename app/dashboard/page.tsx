"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, Clock, Grid3x3 } from "lucide-react";
import PromptBox from "@/components/PromptBox";
import ImageGrid from "@/components/ImageGrid";
import type { GeneratedImage, DesignType, AgeGroup, Theme } from "@/types";

export default function Dashboard() {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"generate" | "history">("generate");

  const handleGenerate = async (
    prompt: string,
    designType: DesignType,
    ageGroup: AgeGroup,
    theme: Theme
  ) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, designType, ageGroup, theme }),
      });
      const data = await response.json();
      if (data.success && data.imageUrl) {
        const newImage: GeneratedImage = {
          id: Date.now().toString(),
          url: data.imageUrl,
          prompt,
          designType,
          ageGroup,
          theme,
          createdAt: new Date(),
        };
        setGeneratedImages((prev) => [newImage, ...prev]);
      } else {
        alert(data.error || "Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image");
    } finally {
      setIsGenerating(false);
    }
  };

  const stats = [
    { label: "Total Designs", value: generatedImages.length, icon: ImageIcon },
    { label: "This Session", value: generatedImages.length, icon: Clock },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-gray-200 bg-white shadow-lg">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Navigation</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("generate")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "generate"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <Sparkles className="h-5 w-5" />
                Generate
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "history"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <Grid3x3 className="h-5 w-5" />
                Your Designs
              </button>
            </nav>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Stats</h2>
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-3">
                  <stat.icon className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              D
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Designer</p>
              <p className="text-xs text-gray-500 truncate">Testing Mode</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {activeTab === "generate" ? "Create Your Design" : "Your Designs"}
            </h1>
            <p className="text-gray-600">
              {activeTab === "generate" 
                ? "Transform your ideas into stunning preschool designs with AI" 
                : "Browse and manage all your generated designs"}
            </p>
          </div>

          {activeTab === "generate" ? (
            <div className="space-y-6">
              <PromptBox onGenerate={handleGenerate} isGenerating={isGenerating} />
              
              {generatedImages.length > 0 && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-gray-900">Recent Generations</h2>
                  <ImageGrid images={generatedImages.slice(0, 3)} />
                </div>
              )}
            </div>
          ) : (
            <div>
              {generatedImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
                  <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-xl font-semibold text-gray-900 mb-2">No designs yet</p>
                  <p className="text-gray-600 mb-6">Create your first design to get started!</p>
                  <button
                    onClick={() => setActiveTab("generate")}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all shadow-purple-500/30"
                  >
                    Start Creating
                  </button>
                </div>
              ) : (
                <ImageGrid images={generatedImages} />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
