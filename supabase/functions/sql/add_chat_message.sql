
CREATE OR REPLACE FUNCTION public.add_chat_message(message_content TEXT, user_identifier UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_message_id UUID;
  created_message jsonb;
BEGIN
  -- Insérer le nouveau message
  INSERT INTO public.chat_messages (user_id, content, profile_id)
  VALUES (user_identifier, message_content, user_identifier)
  RETURNING id INTO new_message_id;
  
  -- Récupérer le message nouvellement créé avec le nom d'utilisateur
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
