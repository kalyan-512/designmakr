// Type definitions for DesignMakr

export type DesignType = 'instagram-post' | 'instagram-story' | 'poster';
export type AgeGroup = '2-3' | '3-4' | '4-5';
export type Theme = 'birthday' | 'admission' | 'festival' | 'general';

export interface GenerateImageRequest {
  prompt: string;
  designType: DesignType;
  ageGroup: AgeGroup;
  theme: Theme;
  size?: string;
}

export interface GenerateImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  designType: DesignType;
  ageGroup: AgeGroup;
  theme: Theme;
  size?: string;
  createdAt: Date;
}
