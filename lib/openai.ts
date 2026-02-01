import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { helpers } from "@google-cloud/aiplatform";

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || "";
const location = "us-central1";
const publisher = "google";
const model = "imagegeneration@006";

export async function generateImage(prompt: string, designType: string): Promise<string> {
  try {
    // Initialize the client
    const clientOptions = {
      apiEndpoint: `${location}-aiplatform.googleapis.com`,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    };
    
    const predictionServiceClient = new PredictionServiceClient(clientOptions);
    
    // Map design types to aspect ratios
    const aspectRatioMap: Record<string, string> = {
      "instagram-post": "1:1",      // Square
      "instagram-story": "9:16",    // Vertical
      "poster": "3:4",              // Portrait
    };

    const aspectRatio = aspectRatioMap[designType] || "1:1";
    
    // Construct the endpoint
    const endpoint = `projects/${projectId}/locations/${location}/publishers/${publisher}/models/${model}`;
    
    // Prepare the request
    const parameters = helpers.toValue({
      sampleCount: 1,
      aspectRatio: aspectRatio,
      negativePrompt: "scary, dark, violent, text, words, letters, numbers, sharp objects, weapons",
      safetySetting: "block_some",
    });
    
    const instances = [
      helpers.toValue({
        prompt: prompt,
      }),
    ];
    
    const request = {
      endpoint,
      instances,
      parameters,
    };
    
    // Make the prediction request
    const [response] = await predictionServiceClient.predict(request);
    
    if (!response.predictions || response.predictions.length === 0) {
      throw new Error("No image generated");
    }
    
    // Extract the image from the response
    const prediction = response.predictions[0];
    const imageData = prediction.structValue?.fields?.bytesBase64Encoded?.stringValue;
    
    if (!imageData) {
      throw new Error("No image data in response");
    }
    
    // Convert base64 to data URL
    const imageUrl = `data:image/png;base64,${imageData}`;
    
    return imageUrl;
    
  } catch (error) {
    console.error("Google Vertex AI Error:", error);
    throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
