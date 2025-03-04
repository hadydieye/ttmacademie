
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize the Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials are not configured properly");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { message, chatHistory } = await req.json();

    if (!message) {
      throw new Error("No message provided");
    }

    // Create a system message that explains the assistant's role
    const systemMessage = {
      role: "system", 
      content: `Tu es un assistant spécialisé en trading financier, conçu pour aider les débutants à comprendre les concepts de base du trading.
      
      Voici tes directives :
      - Explique les concepts de trading de façon simple et adaptée aux débutants
      - Mets l'accent sur les marchés africains quand c'est pertinent
      - Sois précis mais accessible dans tes explications
      - Si on te demande des conseils d'investissement spécifiques, précise que tu ne peux pas donner de recommandations financières personnalisées
      - Encourage de bonnes pratiques de gestion des risques
      - Ne fournis jamais d'informations incorrectes - si tu ne sais pas, dis-le clairement
      - Priorise les explications sur les concepts fondamentaux du trading avant les stratégies avancées
      - Adapte ton niveau d'explication en fonction du niveau perçu de l'utilisateur
      - Reste courtois et patient en toutes circonstances`
    };

    // Prépare l'historique de conversation pour l'API
    const messages = [
      systemMessage,
      ...chatHistory,
      { role: "user", content: message }
    ];

    console.log("Sending request to Supabase AI");
    
    // Use Supabase's AI service
    const { data, error } = await supabase.functions.invoke("ai", {
      body: {
        messages: messages,
        model: "gpt-3.5-turbo", // Supabase's default AI model
        temperature: 0.7,
        max_tokens: 1000,
      }
    });

    if (error) {
      console.error("Supabase AI API error:", error);
      throw new Error(`Supabase AI API error: ${error.message || 'Unknown error'}`);
    }

    console.log("Response from Supabase AI:", data);
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        reply: assistantMessage,
        usage: data.usage
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
