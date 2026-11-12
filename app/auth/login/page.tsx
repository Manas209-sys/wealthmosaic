"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

// R-26: Supabase sign-in; the session is what /api/chat checks.
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.includes("@") || !password) { setError("Enter your email and password"); return; }
    setLoading(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) { setError("Invalid email or password"); return; }
    router.push("/dashboard");
  }

  const input = {
    width: "100%", padding: "11px 14px", border: "0.5px solid #CBD5E1", borderRadius: 8,
    fontSize: 14, outline: "none", background: "#fff", color: "#0F172A",
  } as const;
  const label = { display: "block", fontSize: 12, color: "#64748B", marginBottom: 5, fontWeight: 500 } as const;

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#185FA5,#534AB7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", margin: "0 auto 12px" }}>◈</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#F8FAFC" }}>WealthMosaic</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Sign in to your account</div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); void handleSubmit(); }}
          style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: "28px 28px" }}
        >
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Email address</label>
            <input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={input} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Password</label>
            <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} style={input} />
          </div>
          {error && <div style={{ background: "#FCEBEB", color: "#791F1F", borderRadius: 8, padding: "9px 12px", fontSize: 12, marginBottom: 16 }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in..." : "Sign in →"}
          </button>
          <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#64748B" }}>
            New here?{" "}
            <span onClick={() => router.push("/auth/signup")} style={{ color: "#60A5FA", cursor: "pointer" }}>Create an account</span>
          </div>
        </form>
      </div>
    </div>
  );
}
