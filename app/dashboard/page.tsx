"use client";
import { useState, useEffect, useRef } from "react";
import { useOnboarding } from "@/lib/store/onboarding";
import { MANDATES } from "@/lib/mandates";
import { authFetch } from "@/lib/supabase/auth-fetch";

interface Message { role: "user" | "assistant"; content: string; }

export default function Dashboard() {
  const { name, holdings, mandateId, riskProfile, riskScore } = useOnboarding();
  const mandate = MANDATES.find(m => m.id === mandateId) ?? MANDATES[2];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"chat" | "portfolio">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
  const totalCurrent = holdings.reduce((s, h) => s + h.current_value, 0);
  const gain = totalCurrent - totalInvested;
  const gainPct = totalInvested > 0 ? ((gain / totalInvested) * 100).toFixed(1) : "0.0";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const greeting = holdings.length > 0
      ? `Hello ${name || "there"}! 👋 I am Priya, your Virtual RM.\n\nI have analysed your portfolio — here is what I see:\n\n**Portfolio value:** ₹${Math.round(totalCurrent).toLocaleString("en-IN")}\n**Overall gain:** +${gainPct}% (₹${Math.round(gain).toLocaleString("en-IN")})\n**Your mandate:** ${mandate.label}\n\nYour top 3 priorities right now:\n1. Your portfolio has ${holdings.length} funds across categories\n2. Check if your equity allocation aligns with your ${mandate.label} mandate target of ${mandate.equity_target}%\n3. Review if any fund overlaps exist\n\nWhat would you like to explore first?`
      : `Hello ${name || "there"}! 👋 I am Priya, your Virtual RM.\n\nWelcome to WealthMosaic! Your **${mandate.label}** investment mandate is set up.\n\nI noticed you have not added your portfolio yet. You can:\n- Add funds manually from the portfolio tab\n- Ask me about any mutual fund\n- Ask me anything about investing\n\nHow can I help you today?`;
    setMessages([{ role: "assistant", content: greeting }]);
  }, []);

  async function sendMessage(override?: string) {
    const text = override ?? input;
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    const portfolioContext = holdings.length > 0
      ? `\n\nUSER PORTFOLIO:\nTotal invested: ₹${Math.round(totalInvested).toLocaleString("en-IN")}\nCurrent value: ₹${Math.round(totalCurrent).toLocaleString("en-IN")}\nGain: +${gainPct}%\nFunds: ${holdings.map(h => `${h.name} (${h.category}, ₹${Math.round(h.current_value).toLocaleString("en-IN")})`).join(", ")}\n\nMANDATE: ${mandate.label} — Equity target ${mandate.equity_target}%, Debt ${mandate.debt_target}%, Allowed: ${mandate.allowed.join(", ")}, Avoid: ${mandate.avoid.join(", ")}`
      : `\n\nMy mandate: ${mandate.label}. Risk score: ${riskScore}/35.`;

    try {
      const res = await authFetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated,
          context: portfolioContext,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const d = JSON.parse(line.slice(6));
              if (d.content) {
                full += d.content;
                setMessages(prev => [...prev.slice(0, -1), { role: "assistant", content: full }]);
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I could not connect. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  const formatINR = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0A0F1E", fontFamily: "system-ui, sans-serif" }}>

      {/* SIDEBAR */}
      <div style={{ width: 220, background: "#0F172A", borderRight: "0.5px solid #1E293B", display: "flex", flexDirection: "column", padding: "20px 0" }}>
        <div style={{ padding: "0 16px 20px", borderBottom: "0.5px solid #1E293B" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#185FA5,#534AB7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff" }}>◈</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#F8FAFC" }}>WealthMosaic</div>
          </div>
        </div>
        <div style={{ padding: "16px 12px", flex: 1 }}>
          {[
            { id: "chat", label: "Virtual RM", ico: "🧑‍💼" },
            { id: "portfolio", label: "Portfolio", ico: "📊" },
          ].map(item => (
            <div key={item.id} onClick={() => setTab(item.id as any)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 8, marginBottom: 4, cursor: "pointer", background: tab === item.id ? "#1e3a5f" : "transparent", color: tab === item.id ? "#93C5FD" : "#64748B", fontSize: 13, fontWeight: tab === item.id ? 500 : 400 }}>
              <span>{item.ico}</span>{item.label}
            </div>
          ))}
        </div>
        {/* Mandate badge */}
        <div style={{ padding: "12px 16px", borderTop: "0.5px solid #1E293B" }}>
          <div style={{ fontSize: 10, color: "#64748B", marginBottom: 4 }}>Investment mandate</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#A78BFA", background: "#1a0a2e", padding: "4px 8px", borderRadius: 6 }}>{mandate.label}</div>
          <div style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>Score: {riskScore}/35</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* TOP BAR */}
        <div style={{ background: "#0F172A", borderBottom: "0.5px solid #1E293B", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧑‍💼</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#F1F5F9" }}>Priya — Your Virtual RM</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#64748B" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Active · {mandate.label} mandate
              </div>
            </div>
          </div>
          {holdings.length > 0 && (
            <div style={{ display: "flex", gap: 12 }}>
              {[{l:"Value",v:formatINR(totalCurrent),c:"#4ade80"},{l:"Gain",v:`+${gainPct}%`,c:"#4ade80"}].map(m => (
                <div key={m.l} style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: m.c }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: "#64748B" }}>{m.l}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CHAT TAB */}
        {tab === "chat" && (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Quick prompts */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Analyse my portfolio", "Am I aligned to my mandate?", "Suggest rebalancing", "Calculate my XIRR", "Tax saving ideas"].map(p => (
                    <button key={p} onClick={() => sendMessage(p)} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, background: "#1E293B", border: "0.5px solid #334155", color: "#94A3B8", cursor: "pointer" }}>{p}</button>
                  ))}
                </div>

                {messages.map((msg, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    {msg.role === "assistant" && (
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginTop: 2 }}>🧑‍💼</div>
                    )}
                    <div style={{ maxWidth: "78%", background: msg.role === "user" ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#1E293B", border: msg.role === "assistant" ? "0.5px solid #334155" : "none", borderRadius: msg.role === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0", padding: "10px 14px", fontSize: 13, color: "#F1F5F9", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                      {msg.content || <span style={{ display: "flex", gap: 4 }}>{[0,150,300].map(d => <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "#60A5FA", opacity: 0.7 }} />)}</span>}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </div>
            <div style={{ background: "#0F172A", borderTop: "0.5px solid #1E293B", padding: "14px 20px" }}>
              <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 10 }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask Priya anything about your portfolio, funds, tax, or strategy..." style={{ flex: 1, padding: "11px 14px", background: "#1E293B", border: "0.5px solid #334155", borderRadius: 10, fontSize: 13, color: "#F1F5F9", outline: "none" }} />
                <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontSize: 13, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>
                  {loading ? "..." : "Send →"}
                </button>
              </div>
              <div style={{ textAlign: "center", fontSize: 11, color: "#334155", marginTop: 6 }}>Priya advises within your {mandate.label} mandate · All data stays on your device</div>
            </div>
          </>
        )}

        {/* PORTFOLIO TAB */}
        {tab === "portfolio" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              {/* Summary cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
                {[{l:"Total invested",v:formatINR(totalInvested)},{l:"Current value",v:formatINR(totalCurrent)},{l:"Overall gain",v:`+${gainPct}%`,g:true}].map(m => (
                  <div key={m.l} style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>{m.l}</div>
                    <div style={{ fontSize: 20, fontWeight: 500, color: m.g ? "#4ade80" : "#F1F5F9" }}>{m.v}</div>
                  </div>
                ))}
              </div>

              {/* Mandate compliance */}
              <div style={{ background: "#1a0a2e", border: "0.5px solid rgba(139,92,246,.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 20 }}>📋</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#C4B5FD", marginBottom: 2 }}>{mandate.label} mandate active</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Equity target {mandate.equity_target}% · Debt {mandate.debt_target}% · Direct plans only</div>
                </div>
              </div>

              {/* Holdings */}
              {holdings.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#64748B" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
                  <div style={{ fontSize: 14, marginBottom: 8 }}>No holdings yet</div>
                  <div style={{ fontSize: 12 }}>Go back to the import screen or ask Priya to help you get started</div>
                </div>
              ) : (
                <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #334155", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", fontSize: 11, color: "#64748B", fontWeight: 500 }}>
                    <span>Fund</span><span style={{ textAlign: "right" }}>Invested</span><span style={{ textAlign: "right" }}>Current</span><span style={{ textAlign: "right" }}>Gain</span>
                  </div>
                  {holdings.map((h, i) => {
                    const g = ((h.current_value - h.invested) / h.invested * 100).toFixed(1);
                    return (
                      <div key={i} style={{ padding: "12px 16px", borderBottom: i < holdings.length - 1 ? "0.5px solid #1E293B" : "none", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 12, color: "#F1F5F9", marginBottom: 2 }}>{h.name}</div>
                          <div style={{ fontSize: 10, color: "#64748B" }}>{h.category} · {h.units?.toFixed(2)} units</div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 12, color: "#94A3B8" }}>{formatINR(h.invested)}</div>
                        <div style={{ textAlign: "right", fontSize: 12, color: "#F1F5F9", fontWeight: 500 }}>{formatINR(h.current_value)}</div>
                        <div style={{ textAlign: "right", fontSize: 12, color: "#4ade80", fontWeight: 500 }}>+{g}%</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
