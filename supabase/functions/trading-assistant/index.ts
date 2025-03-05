
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = "AIzaSyAMkSYkOwlbjxuEi_mNah2m6YYIhah8sNE";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, chatHistory } = await req.json();

    if (!message) {
      throw new Error("No message provided");
    }

    console.log("Processing chat request with Gemini AI");
    
    // Create system prompt that explains the assistant's role
    const systemPrompt = `Tu es un assistant spécialisé en trading financier, conçu pour aider les débutants à comprendre les concepts de base du trading.
      
      Voici tes directives :
      - Explique les concepts de trading de façon simple et adaptée aux débutants
      - Mets l'accent sur les marchés africains quand c'est pertinent
      - Sois précis mais accessible dans tes explications
      - Si on te demande des conseils d'investissement spécifiques, précise que tu ne peux pas donner de recommandations financières personnalisées
      - Encourage de bonnes pratiques de gestion des risques
      - Ne fournis jamais d'informations incorrectes - si tu ne sais pas, dis-le clairement
      - Priorise les explications sur les concepts fondamentaux du trading avant les stratégies avancées
      - Adapte ton niveau d'explication en fonction du niveau perçu de l'utilisateur
      - Reste courtois et patient en toutes circonstances`;

    // Prepare messages for Gemini API
    // Gemini has different structure than OpenAI, so we need to format differently
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Add the current message
    const requestBody = {
      contents: [
        // Start with system prompt in a model message
        {
          role: "model",
          parts: [{ text: systemPrompt }]
        },
        // Add all previous chat history
        ...formattedHistory,
        // Add current user message
        {
          role: "user",
          parts: [{ text: message }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    };

    // Make request to Gemini API
    console.log("Sending request to Gemini API");
    const geminiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${errorData}`);
    }

    const geminiData = await geminiResponse.json();
    console.log("Received response from Gemini AI");
    
    // Extract the response content from Gemini's response format
    const assistantMessage = geminiData.candidates[0].content.parts[0].text;

    // Return the response to the client
    return new Response(
      JSON.stringify({ 
        reply: assistantMessage,
        model: "gemini-1.5-flash"
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error in trading-assistant function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
