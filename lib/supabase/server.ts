import { createClient, type User } from "@supabase/supabase-js";

/**
 * R-26: resolves the Supabase user from "Authorization: Bearer <access token>". The token is checked
 * by Supabase Auth itself (signature, expiry, revoked sessions), not decoded locally.
 */
export async function getRequestUser(req: Request): Promise<User | null> {
  const header = req.headers.get("authorization") ?? "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!token || !url || !anonKey) return null;
  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  return error ? null : data.user;
}
