
import { GoogleGenAI, Type } from "@google/genai";
import { MovieSuggestion } from '../types';

// The API key is sourced from environment variables for security.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is not defined. Please set it in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const movieSuggestionSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "The full title of the movie.",
        },
        year: {
          type: Type.INTEGER,
          description: "The year the movie was released.",
        },
      },
      required: ["title", "year"],
    },
};

export const getMovieSuggestions = async (query: string): Promise<MovieSuggestion[]> => {
  try {
    const prompt = `You are a movie recommendation expert. Based on the user's request, provide a list of 10 relevant movie titles.
    Return ONLY a valid JSON array of objects, where each object has a "title" and "year" key.
    User request: "${query}"`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: movieSuggestionSchema,
        },
    });

    const text = response.text.trim();
    if (!text) {
        console.warn("Gemini API returned an empty response.");
        return [];
    }
    
    const suggestions: MovieSuggestion[] = JSON.parse(text);
    return suggestions;

  } catch (error) {
    console.error('Error fetching movie suggestions from Gemini API:', error);
    throw new Error('Failed to communicate with the AI service.');
  }
};
