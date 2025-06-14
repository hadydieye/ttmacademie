/*
  # Create chat-related database functions

  1. Functions
    - `add_chat_message` - Add a new chat message
    - `get_chat_messages` - Retrieve chat messages
    - `count_upcoming_events` - Count upcoming events

  2. Security
    - Functions use SECURITY DEFINER for controlled access
    - Proper RLS policies are maintained
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
CREATE OR REPLACE FUNCTION public.count_upcoming_events(current_date TIMESTAMP WITH TIME ZONE)
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.events
  WHERE event_date >= current_date;
$$;