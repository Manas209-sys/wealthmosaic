"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/store/onboarding";

export default function Signup() {
  const router = useRouter();
  const { setProfile } = useOnboarding();
  const [form, setForm] = useState({ email: "", mobile: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!form.email.includes("@")) return "Enter a valid email";
    if (form.mobile.length !== 10) return "Enter a valid 10-digit mobile number";
    if (form.password.length < 8) return "Password must be at least 8 characters";
    if (form.password !== form.confirm) return "Passwords do not match";
    return "";
  }

  async function handleSubmit() {
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError("");
    setProfile({ email: form.email, mobile: form.mobile });
    setTimeout(() => { setLoading(false); router.push("/onboarding/profile"); }, 800);
  }

  const field = (label: string, key: string, type = "text", placeholder = "") => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, color: "#64748B", marginBottom: 5, fontWeight: 500 }}>{label} <span style={{ color: "#E24B4A" }}>*</span></label>
      <input
        type={type}
        value={(form as any)[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        style={{ width: "100%", padding: "11px 14px", border: "0.5px solid #CBD5E1", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff", color: "#0F172A" }}
      />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#185FA5,#534AB7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", margin: "0 auto 12px" }}>◈</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#F8FAFC" }}>WealthMosaic</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Create your account</div>
        </div>

        {/* Card */}
        <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: "28px 28px" }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {["Sign up", "Profile", "Risk", "Mandate", "Import", "Dashboard"].map((s, i) => (
              <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: i === 0 ? "#3B82F6" : "#334155" }} />
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 20 }}>Step 1 of 6 — Create your account</div>

          {field("Email address", "email", "email", "you@example.com")}
          {field("Mobile number", "mobile", "tel", "10-digit mobile number")}
          {field("Password", "password", "password", "Min. 8 characters")}
          {field("Confirm password", "confirm", "password", "Re-enter password")}

          {error && <div style={{ background: "#FCEBEB", color: "#791F1F", borderRadius: 8, padding: "9px 12px", fontSize: 12, marginBottom: 16 }}>{error}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Creating account..." : "Create account →"}
          </button>

          <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#64748B" }}>
            Already have an account?{" "}
            <span onClick={() => router.push("/auth/login")} style={{ color: "#60A5FA", cursor: "pointer" }}>Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
