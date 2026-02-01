import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/openai";
import type { GenerateImageRequest, GenerateImageResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: GenerateImageRequest = await request.json();
    const { prompt, designType, ageGroup, theme } = body;
    if (!prompt || !designType || !ageGroup || !theme) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.GOOGLE_CLOUD_PROJECT_ID || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return NextResponse.json({ 
        success: false, 
        error: "Google Cloud credentials not configured. Please set GOOGLE_CLOUD_PROJECT_ID and GOOGLE_APPLICATION_CREDENTIALS" 
      }, { status: 500 });
    }

    // Use the enhanced prompt directly from the frontend
    const imageUrl = await generateImage(prompt, designType);

    const response: GenerateImageResponse = { success: true, imageUrl };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to generate image" },
      { status: 500 }
    );
  }
}
