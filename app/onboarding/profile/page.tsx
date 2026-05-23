"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/store/onboarding";

export default function Profile() {
  const router = useRouter();
  const { email, mobile, setProfile } = useOnboarding();
  const [form, setForm] = useState({ name: "", pan: "", userType: "" as "investor" | "rm" | "" });
  const [error, setError] = useState("");

  function validatePAN(pan: string) {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
  }

  function handleSubmit() {
    if (!form.name.trim()) { setError("Please enter your full name"); return; }
    if (!validatePAN(form.pan)) { setError("Enter a valid PAN (e.g. ABCDE1234F)"); return; }
    if (!form.userType) { setError("Please select investor or RM"); return; }
    setProfile({ name: form.name, pan: form.pan.toUpperCase(), userType: form.userType });
    router.push("/onboarding/risk");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#185FA5,#534AB7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", margin: "0 auto 12px" }}>◈</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#F8FAFC" }}>WealthMosaic</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Tell us about yourself</div>
        </div>

        <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: "28px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {[0,1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 1 ? "#3B82F6" : "#334155" }} />)}
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 20 }}>Step 2 of 6 — Profile setup</div>

          {/* Prefilled read-only */}
          {[{l:"Email", v: email}, {l:"Mobile", v: mobile}].map(f => (
            <div key={f.l} style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, color: "#64748B", marginBottom: 4, fontWeight: 500 }}>{f.l}</label>
              <div style={{ padding: "10px 14px", background: "#0F172A", border: "0.5px solid #334155", borderRadius: 8, fontSize: 13, color: "#64748B" }}>{f.v || "—"}</div>
            </div>
          ))}

          {/* Full name */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: "#64748B", marginBottom: 4, fontWeight: 500 }}>Full name <span style={{ color: "#E24B4A" }}>*</span></label>
            <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="As per PAN card" style={{ width: "100%", padding: "10px 14px", border: "0.5px solid #475569", borderRadius: 8, fontSize: 13, background: "#0F172A", color: "#F1F5F9", outline: "none" }} />
          </div>

          {/* PAN */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: "#64748B", marginBottom: 4, fontWeight: 500 }}>PAN number <span style={{ color: "#E24B4A" }}>*</span></label>
            <input value={form.pan} onChange={e => setForm(f => ({...f, pan: e.target.value.toUpperCase()}))} placeholder="ABCDE1234F" maxLength={10} style={{ width: "100%", padding: "10px 14px", border: "0.5px solid #475569", borderRadius: 8, fontSize: 13, background: "#0F172A", color: "#F1F5F9", outline: "none", letterSpacing: 2, fontFamily: "monospace" }} />
            <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>Required for tax calculations and LTCG tracking</div>
          </div>

          {/* User type */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, color: "#64748B", marginBottom: 8, fontWeight: 500 }}>I am a <span style={{ color: "#E24B4A" }}>*</span></label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[{v:"investor",l:"Investor",d:"Managing my own portfolio",ico:"👤"},{v:"rm",l:"Relationship Manager",d:"Managing client portfolios",ico:"💼"}].map(t => (
                <div key={t.v} onClick={() => setForm(f => ({...f, userType: t.v as any}))}
                  style={{ border: `1.5px solid ${form.userType === t.v ? "#3B82F6" : "#334155"}`, borderRadius: 10, padding: "12px", cursor: "pointer", background: form.userType === t.v ? "#1e3a5f" : "#0F172A", transition: "all .15s" }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{t.ico}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#F1F5F9", marginBottom: 2 }}>{t.l}</div>
                  <div style={{ fontSize: 10, color: "#64748B" }}>{t.d}</div>
                </div>
              ))}
            </div>
          </div>

          {error && <div style={{ background: "#FCEBEB", color: "#791F1F", borderRadius: 8, padding: "9px 12px", fontSize: 12, marginBottom: 14 }}>{error}</div>}

          <button onClick={handleSubmit} style={{ width: "100%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Continue to risk profiling →
          </button>
        </div>
      </div>
    </div>
  );
}
