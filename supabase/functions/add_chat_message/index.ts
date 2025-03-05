
// Supabase Edge Function pour ajouter un message au chat
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

serve(async (req) => {
  // Gestion des requêtes OPTIONS pour CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 })
  }

  try {
    // Créer un client Supabase avec les clés d'environnement
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Récupérer les données du message
    const { message_content, user_identifier } = await req.json()
    
    // Valider les entrées
    if (!message_content || !user_identifier) {
      throw new Error('Le contenu du message et l\'identifiant utilisateur sont requis')
    }

    // Ajouter le message à la base de données
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: user_identifier,
        content: message_content,
        profile_id: user_identifier
      })
      .select()
      .single()

    if (error) throw error

    // Retourner le message créé
    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201 
      }
    )
  } catch (error) {
    // Gérer les erreurs
    console.error('Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
