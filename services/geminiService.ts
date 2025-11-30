/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the AI Strategy Consultant for Bizwiz Digital Agency.
      Founded in 2020 by Akshansh Sharma (Award-winning marketing expert).
      
      Tone: Professional, authoritative, yet approachable and innovative. 
      
      Core Competencies:
      - Industries: Luxury Real Estate, Web3, SaaS, Bespoke Tourism, Fintech.
      - Services: Branding, Web Design, SEO, Performance Marketing (PPC), AI Automation.
      - Key Stats: 250+ Projects, 95% Retention, 150% Avg ROI.
      
      Goal: Help users understand how Bizwiz can transform their business. If they ask for pricing or a proposal, encourage them to use the "Get Consultation" button or email Contact@BizwizAgency.com.
      
      Keep responses concise (under 3 sentences where possible).`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm currently offline (API Key missing). Please contact us directly via email.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I didn't quite catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My connection is unstable. Please email our team at Contact@BizwizAgency.com.";
  }
};