
// Supabase Edge Function pour récupérer les messages du chat
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

    // Récupérer les messages du chat avec les noms d'utilisateurs
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        id,
        user_id,
        content,
        created_at,
        profiles:profile_id(name)
      `)
      .order('created_at', { ascending: true })
      .limit(50)

    if (error) throw error

    // Formater les messages pour l'affichage
    const formattedMessages = data?.map(message => ({
      id: message.id,
      user_id: message.user_id,
      user_name: message.profiles?.name || 'Utilisateur anonyme',
      content: message.content,
      created_at: message.created_at
    })) || []

    // Retourner les messages formatés
    return new Response(
      JSON.stringify(formattedMessages),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
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
