"use client";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/store/onboarding";
import { MANDATES } from "@/lib/mandates";

export default function MandateReview() {
  const router = useRouter();
  const { mandateId, riskScore, confirmMandate } = useOnboarding();
  const mandate = MANDATES.find(m => m.id === mandateId) ?? MANDATES[2];

  function handleConfirm() {
    confirmMandate();
    router.push("/onboarding/import");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {[0,1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 3 ? "#3B82F6" : "#334155" }} />)}
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 20 }}>Step 4 of 6 — Your investment mandate</div>

          {/* Priya message */}
          <div style={{ background: "linear-gradient(135deg,#1a0a2e,#0a1f3a)", border: "0.5px solid rgba(139,92,246,.3)", borderRadius: 12, padding: "14px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🧑‍💼</div>
            <div style={{ fontSize: 12, color: "#A5B4FC", lineHeight: 1.6 }}>
              Based on your score of <strong style={{ color: "#C4B5FD" }}>{riskScore}/35</strong>, I have prepared your <strong style={{ color: "#C4B5FD" }}>{mandate.label}</strong> investment mandate. I will always advise within these boundaries — every fund suggestion, rebalancing alert, and SIP recommendation will respect this mandate.
            </div>
          </div>

          {/* Mandate card */}
          <div style={{ border: `1.5px solid ${mandate.border}`, borderRadius: 12, padding: 18, background: "#0F172A", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#F1F5F9" }}>{mandate.label} mandate</div>
              <span style={{ fontSize: 11, background: mandate.bg, color: mandate.color, padding: "3px 10px", borderRadius: 20 }}>Score {riskScore}/35</span>
            </div>

            {/* Allocation bars */}
            <div style={{ marginBottom: 16 }}>
              {[{l:"Equity",v:mandate.equity_target,c:"#3B82F6"},{l:"Debt",v:mandate.debt_target,c:"#8B5CF6"},{l:"Gold / Liquid",v:mandate.gold_target,c:"#F59E0B"}].map(b => (
                <div key={b.l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ minWidth: 80, color: "#94A3B8" }}>{b.l}</span>
                  <div style={{ flex: 1, height: 6, background: "#1E293B", borderRadius: 3 }}>
                    <div style={{ height: 6, width: `${b.v}%`, background: b.c, borderRadius: 3 }} />
                  </div>
                  <span style={{ minWidth: 32, textAlign: "right", fontWeight: 500, color: "#F1F5F9" }}>{b.v}%</span>
                </div>
              ))}
            </div>

            {/* Details */}
            {[
              { l: "Equity range allowed", v: `${mandate.equity_min}% – ${mandate.equity_max}%` },
              { l: "Max single fund", v: `${mandate.max_single_fund}%` },
              { l: "Plan preference", v: "Direct plans only" },
            ].map(r => (
              <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #1E293B", fontSize: 12 }}>
                <span style={{ color: "#64748B" }}>{r.l}</span>
                <span style={{ color: "#F1F5F9", fontWeight: 500 }}>{r.v}</span>
              </div>
            ))}

            {/* Allowed */}
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6 }}>Allowed fund categories</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {mandate.allowed.map(t => <span key={t} style={{ fontSize: 10, background: "#EAF3DE", color: "#27500A", padding: "2px 8px", borderRadius: 10 }}>{t}</span>)}
              </div>
            </div>

            {/* Avoid */}
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6 }}>Avoid</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {mandate.avoid.map(t => <span key={t} style={{ fontSize: 10, background: "#FCEBEB", color: "#791F1F", padding: "2px 8px", borderRadius: 10 }}>{t}</span>)}
              </div>
            </div>
          </div>

          <button onClick={handleConfirm} style={{ width: "100%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 500, cursor: "pointer", marginBottom: 10 }}>
            I confirm this mandate →
          </button>
          <button onClick={() => router.push("/onboarding/risk")} style={{ width: "100%", background: "transparent", color: "#64748B", border: "0.5px solid #334155", borderRadius: 10, padding: 10, fontSize: 13, cursor: "pointer" }}>
            Retake risk assessment
          </button>
        </div>
      </div>
    </div>
  );
}
