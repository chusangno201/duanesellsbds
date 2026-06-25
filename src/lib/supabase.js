import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://imdmetieuwsvckcnmlhg.supabase.co";
const supabaseAnonKey = "sb_publishable_zTXaIQzDRar4_RKjDbaTNg_zBmW3uXp";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});