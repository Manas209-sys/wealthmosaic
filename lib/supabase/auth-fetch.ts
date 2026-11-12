import { supabase } from "./client";

/**
 * R-26: fetch with the signed-in user's Supabase access token. Sends the user to /auth/login when
 * there is no session or the server answers 401.
 */
export async function authFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) {
    window.location.href = "/auth/login";
    throw new Error("Not signed in");
  }
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401) {
    window.location.href = "/auth/login";
  }
  return res;
}
