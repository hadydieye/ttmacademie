
CREATE OR REPLACE FUNCTION public.count_upcoming_events(current_date TIMESTAMP WITH TIME ZONE)
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.events
  WHERE event_date >= current_date;
$$;
