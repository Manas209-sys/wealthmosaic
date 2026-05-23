"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/store/onboarding";
import { RISK_QUESTIONS, getMandateByScore } from "@/lib/mandates";

export default function RiskProfiling() {
  const router = useRouter();
  const { setRisk, setMandate } = useOnboarding();
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(-1));
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const q = RISK_QUESTIONS[current];
  const answered = answers[current] !== -1;
  const totalAnswered = answers.filter(a => a !== -1).length;
  const progress = (totalAnswered / 7) * 100;

  function selectAnswer(score: number, idx: number) {
    const newAnswers = [...answers];
    newAnswers[current] = score;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (current < 6) { setCurrent(c => c + 1); }
      else {
        const total = newAnswers.reduce((s, a) => s + a, 0);
        const mandate = getMandateByScore(total);
        setRisk(total, mandate.id, newAnswers);
        setMandate(mandate.id);
        setDone(true);
      }
    }, 350);
  }

  const profileColors: Record<string, { bg: string, color: string, label: string }> = {
    conservative: { bg: "#FEF3F2", color: "#7F1D1D", label: "Conservative" },
    moderate: { bg: "#FFFBEB", color: "#78350F", label: "Moderate" },
    moderate_aggressive: { bg: "#EAF3DE", color: "#27500A", label: "Moderate Aggressive" },
    aggressive: { bg: "#EEEDFE", color: "#3C3489", label: "Aggressive" },
  };

  const total = answers.reduce((s, a) => s + (a === -1 ? 0 : a), 0);
  const mandate = getMandateByScore(total);

  if (done) {
    const pc = profileColors[mandate.id];
    return (
      <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".07em" }}>Your risk profile</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: "#F8FAFC", marginBottom: 8 }}>{pc.label}</div>
            <div style={{ fontSize: 14, color: "#94A3B8", marginBottom: 6 }}>Score: {total} / 35</div>
            <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24, maxWidth: 300, margin: "0 auto 24px" }}>{mandate.description}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
              {[{l:"Equity target",v:`${mandate.equity_target}%`},{l:"Debt target",v:`${mandate.debt_target}%`},{l:"Gold/liquid",v:`${mandate.gold_target}%`}].map(m => (
                <div key={m.l} style={{ background: "#0F172A", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 500, color: "#F1F5F9" }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: "#64748B", marginTop: 3 }}>{m.l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => router.push("/onboarding/mandate")} style={{ width: "100%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              Review my mandate →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "#64748B" }}>Question {current + 1} of 7</div>
          <div style={{ height: 4, background: "#1E293B", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((current) / 7) * 100}%`, background: "linear-gradient(90deg,#2563EB,#7C3AED)", borderRadius: 2, transition: "width .4s" }} />
          </div>
        </div>

        <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {[0,1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 2 ? "#3B82F6" : "#334155" }} />)}
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 20 }}>Step 3 of 6 — Risk profiling</div>

          <div style={{ fontSize: 16, fontWeight: 500, color: "#F8FAFC", lineHeight: 1.4, marginBottom: 20 }}>{q.question}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.options.map((opt, idx) => (
              <div key={idx} onClick={() => selectAnswer(opt.score, idx)}
                style={{ border: `0.5px solid ${answers[current] === opt.score ? "#3B82F6" : "#334155"}`, borderRadius: 10, padding: "12px 16px", cursor: "pointer", background: answers[current] === opt.score ? "#1e3a5f" : "#0F172A", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all .15s" }}>
                <span style={{ fontSize: 13, color: answers[current] === opt.score ? "#93C5FD" : "#CBD5E1" }}>{opt.text}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: "#64748B", flexShrink: 0, marginLeft: 8 }}>{opt.score} pt{opt.score > 1 ? "s" : ""}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            <button onClick={() => current > 0 && setCurrent(c => c - 1)} style={{ background: "transparent", color: "#64748B", border: "0.5px solid #334155", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: current === 0 ? "not-allowed" : "pointer", opacity: current === 0 ? 0.4 : 1 }}>← Back</button>
            <button onClick={() => answered && current < 6 && setCurrent(c => c + 1)} style={{ background: answered ? "#1e3a5f" : "transparent", color: answered ? "#93C5FD" : "#334155", border: `0.5px solid ${answered ? "#3B82F6" : "#334155"}`, borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: answered ? "pointer" : "not-allowed" }}>Skip to next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
