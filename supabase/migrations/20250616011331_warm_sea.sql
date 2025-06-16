/*
  # Chat and Events Functions

  1. New Functions
    - `add_chat_message` - Function to add a chat message with user information
    - `get_chat_messages` - Function to retrieve chat messages with user names
    - `count_upcoming_events` - Function to count upcoming events from a given date

  2. Security
    - All functions use SECURITY DEFINER for proper access control
    - Functions handle user identification and data retrieval safely
*/

-- Function to add a chat message
CREATE OR REPLACE FUNCTION public.add_chat_message(message_content TEXT, user_identifier UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_message_id UUID;
  created_message jsonb;
BEGIN
  -- Insert the new message
  INSERT INTO public.chat_messages (user_id, content, profile_id)
  VALUES (user_identifier, message_content, user_identifier)
  RETURNING id INTO new_message_id;
  
  -- Retrieve the newly created message with username
  SELECT 
    jsonb_build_object(
      'id', cm.id,
      'user_id', cm.user_id,
      'user_name', COALESCE(p.name, 'Utilisateur anonyme'),
      'content', cm.content,
      'created_at', cm.created_at
    ) INTO created_message
  FROM 
    public.chat_messages cm
  LEFT JOIN 
    public.profiles p ON p.id = cm.profile_id
  WHERE 
    cm.id = new_message_id;
  
  RETURN created_message;
END;
$$;

-- Function to get chat messages
CREATE OR REPLACE FUNCTION public.get_chat_messages()
RETURNS SETOF jsonb
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    jsonb_build_object(
      'id', cm.id,
      'user_id', cm.user_id,
      'user_name', COALESCE(p.name, 'Utilisateur anonyme'),
      'content', cm.content,
      'created_at', cm.created_at
    )
  FROM 
    public.chat_messages cm
  LEFT JOIN 
    public.profiles p ON p.id = cm.profile_id
  ORDER BY 
    cm.created_at ASC
  LIMIT 50;
$$;

-- Function to count upcoming events
CREATE OR REPLACE FUNCTION public.count_upcoming_events(reference_date TIMESTAMP WITH TIME ZONE)
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.events
  WHERE event_date >= reference_date;
$$;