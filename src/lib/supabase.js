import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sceimrxswzobcrvyevmx.supabase.co";
const supabaseAnonKey = "sb_publishable_HgiMzuYfx2XSsQ8rnhM_DQ_iO1mx5Bz";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
