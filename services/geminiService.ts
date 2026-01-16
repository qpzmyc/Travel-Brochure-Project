import { GoogleGenAI } from "@google/genai";
import { MONTH_DATA, TEMP_EQUATION, SUN_EQUATION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAdvice = async (userQuery: string): Promise<string> => {
  try {
    const context = `
      You are an expert travel guide for Montreal, Canada, assisting a student with a math project.
      
      Here is the mathematical data for the city:
      
      Temperature Model (Celsius): ${TEMP_EQUATION.label}
      Sunlight Model (Hours): ${SUN_EQUATION.label}
      
      Raw Data:
      ${JSON.stringify(MONTH_DATA)}
      
      The user asks: "${userQuery}"
      
      Provide a helpful, engaging answer. 
      Crucially, reference the math (sine/cosine waves, peaks, troughs, specific data points) in your answer to help the student with their project analysis.
      
      IMPORTANT: Format your response using Markdown. 
      - Do NOT use LaTeX or '$' symbols for math.
      - Write equations in plain text (e.g., "y = sin(x)").
      - Use bold for key mathematical terms.
      - Use lists for steps or options.
      
      Keep it under 100 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context,
    });

    return response.text || "I couldn't generate advice at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the travel database right now.";
  }
};