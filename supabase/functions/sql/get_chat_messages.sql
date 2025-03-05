
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
