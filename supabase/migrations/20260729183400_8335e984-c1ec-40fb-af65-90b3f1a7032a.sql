
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.viz_count_current_month(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.viz_count_current_month(UUID) TO authenticated;
