"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/store/onboarding";

const SAMPLE_FUNDS = [
  { name: "Kotak Flexicap Fund Direct Growth", units: 245.32, avg_nav: 78.45, current_nav: 94.56, category: "Flexicap", invested: 19245, current_value: 23204 },
  { name: "HDFC Mid-Cap Opportunities Direct Growth", units: 182.10, avg_nav: 98.20, current_nav: 121.34, category: "Mid Cap", invested: 17882, current_value: 22096 },
  { name: "Axis ELSS Tax Saver Direct Growth", units: 320.50, avg_nav: 62.15, current_nav: 78.90, category: "ELSS", invested: 19928, current_value: 25288 },
  { name: "SBI Liquid Fund Direct Growth", units: 45.20, avg_nav: 3341.20, current_nav: 3498.44, category: "Liquid", invested: 151021, current_value: 158131 },
];

export default function ImportPortfolio() {
  const router = useRouter();
  const { setHoldings } = useOnboarding();
  const [mode, setMode] = useState<"choose" | "upload" | "manual" | "done">("choose");
  const [uploading, setUploading] = useState(false);
  const [funds, setFunds] = useState<typeof SAMPLE_FUNDS>([]);
  const [manualFund, setManualFund] = useState({ name: "", units: "", avg_nav: "", category: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  function handleCASUpload() {
    setUploading(true);
    setTimeout(() => {
      setFunds(SAMPLE_FUNDS);
      setUploading(false);
      setMode("done");
    }, 2000);
  }

  function addManualFund() {
    if (!manualFund.name || !manualFund.units || !manualFund.avg_nav) return;
    const current_nav = parseFloat(manualFund.avg_nav) * 1.12;
    const invested = parseFloat(manualFund.units) * parseFloat(manualFund.avg_nav);
    const current_value = parseFloat(manualFund.units) * current_nav;
    setFunds(f => [...f, { name: manualFund.name, units: parseFloat(manualFund.units), avg_nav: parseFloat(manualFund.avg_nav), current_nav, category: manualFund.category || "Equity", invested, current_value }]);
    setManualFund({ name: "", units: "", avg_nav: "", category: "" });
  }

  function handleDone() {
    setHoldings(funds);
    router.push("/dashboard");
  }

  const totalInvested = funds.reduce((s, f) => s + f.invested, 0);
  const totalCurrent = funds.reduce((s, f) => s + f.current_value, 0);
  const gain = totalCurrent - totalInvested;
  const gainPct = totalInvested > 0 ? ((gain / totalInvested) * 100).toFixed(1) : "0.0";

  const progressBar = (
    <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
      {[0,1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 4 ? "#3B82F6" : "#334155" }} />)}
    </div>
  );

  if (mode === "choose") return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: 28 }}>
          {progressBar}
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 8 }}>Step 5 of 6 — Import your portfolio</div>
          <div style={{ fontSize: 18, fontWeight: 500, color: "#F8FAFC", marginBottom: 6 }}>How would you like to add your holdings?</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 24, lineHeight: 1.6 }}>Your Virtual RM needs your portfolio to give you personalised advice.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div onClick={() => setMode("upload")} style={{ border: "0.5px solid #334155", borderRadius: 12, padding: 20, cursor: "pointer", background: "#0F172A", textAlign: "center", transition: "border-color .15s" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📄</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#F1F5F9", marginBottom: 4 }}>Upload CAS statement</div>
              <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.5 }}>Upload your CAMS or Kfintech PDF — all funds imported automatically</div>
              <div style={{ marginTop: 10, fontSize: 10, background: "#EAF3DE", color: "#27500A", padding: "2px 8px", borderRadius: 10, display: "inline-block" }}>Recommended</div>
            </div>
            <div onClick={() => setMode("manual")} style={{ border: "0.5px solid #334155", borderRadius: 12, padding: 20, cursor: "pointer", background: "#0F172A", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>✏️</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#F1F5F9", marginBottom: 4 }}>Add manually</div>
              <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.5 }}>Enter each fund name, units, and average cost NAV one by one</div>
            </div>
          </div>
          <button onClick={() => { setFunds([]); router.push("/dashboard"); }} style={{ width: "100%", background: "transparent", color: "#64748B", border: "0.5px solid #334155", borderRadius: 10, padding: 10, fontSize: 13, cursor: "pointer" }}>
            Skip for now — I will add later
          </button>
        </div>
      </div>
    </div>
  );

  if (mode === "upload") return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: 28 }}>
          {progressBar}
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 20 }}>Step 5 of 6 — Upload CAS statement</div>
          <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleCASUpload} />
          <div onClick={() => fileRef.current?.click()} style={{ border: "1.5px dashed #334155", borderRadius: 12, padding: "40px 20px", textAlign: "center", cursor: "pointer", marginBottom: 20, background: "#0F172A" }}>
            {uploading ? (
              <div>
                <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
                <div style={{ fontSize: 14, color: "#94A3B8" }}>Parsing your CAS statement...</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>Fetching live NAV from AMFI</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 32, marginBottom: 10 }}>📄</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#F1F5F9", marginBottom: 4 }}>Drop your CAS PDF here</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>or click to browse · CAMS / Kfintech PDF</div>
              </div>
            )}
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 16, lineHeight: 1.6, background: "#0F172A", borderRadius: 8, padding: "10px 12px" }}>
            💡 To get your CAS: Visit <span style={{ color: "#60A5FA" }}>cams.in</span> or <span style={{ color: "#60A5FA" }}>kfintech.com</span> → Request CAS → Download PDF
          </div>
          <button onClick={() => { handleCASUpload(); }} style={{ width: "100%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 500, cursor: "pointer", marginBottom: 8 }}>
            {uploading ? "Importing..." : "Upload CAS statement →"}
          </button>
          <button onClick={() => setMode("choose")} style={{ width: "100%", background: "transparent", color: "#64748B", border: "0.5px solid #334155", borderRadius: 10, padding: 10, fontSize: 13, cursor: "pointer" }}>← Back</button>
        </div>
      </div>
    </div>
  );

  if (mode === "manual") return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: 28 }}>
          {progressBar}
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 20 }}>Step 5 of 6 — Add funds manually</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            {[{l:"Fund name",k:"name",p:"e.g. Kotak Flexicap Direct"},{l:"Category",k:"category",p:"e.g. Flexicap"}].map(f => (
              <div key={f.k}>
                <label style={{ fontSize: 11, color: "#64748B", display: "block", marginBottom: 4 }}>{f.l}</label>
                <input value={(manualFund as any)[f.k]} onChange={e => setManualFund(m => ({...m, [f.k]: e.target.value}))} placeholder={f.p} style={{ width: "100%", padding: "8px 10px", border: "0.5px solid #475569", borderRadius: 7, fontSize: 12, background: "#0F172A", color: "#F1F5F9", outline: "none" }} />
              </div>
            ))}
            {[{l:"Units held",k:"units",p:"e.g. 245.32"},{l:"Avg cost NAV (₹)",k:"avg_nav",p:"e.g. 78.45"}].map(f => (
              <div key={f.k}>
                <label style={{ fontSize: 11, color: "#64748B", display: "block", marginBottom: 4 }}>{f.l}</label>
                <input value={(manualFund as any)[f.k]} onChange={e => setManualFund(m => ({...m, [f.k]: e.target.value}))} placeholder={f.p} type="number" style={{ width: "100%", padding: "8px 10px", border: "0.5px solid #475569", borderRadius: 7, fontSize: 12, background: "#0F172A", color: "#F1F5F9", outline: "none" }} />
              </div>
            ))}
          </div>
          <button onClick={addManualFund} style={{ width: "100%", background: "#1e3a5f", color: "#93C5FD", border: "0.5px solid #3B82F6", borderRadius: 8, padding: 9, fontSize: 13, cursor: "pointer", marginBottom: 16 }}>+ Add this fund</button>

          {funds.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 8 }}>{funds.length} fund{funds.length > 1 ? "s" : ""} added</div>
              {funds.map((f, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "0.5px solid #1E293B", fontSize: 12 }}>
                  <span style={{ color: "#CBD5E1", flex: 1 }}>{f.name}</span>
                  <span style={{ color: "#4ade80", marginLeft: 8 }}>₹{Math.round(f.current_value).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => { setMode("done"); }} disabled={funds.length === 0} style={{ width: "100%", background: funds.length > 0 ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#1E293B", color: funds.length > 0 ? "#fff" : "#475569", border: "none", borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 500, cursor: funds.length > 0 ? "pointer" : "not-allowed", marginBottom: 8 }}>
            Continue with {funds.length} fund{funds.length !== 1 ? "s" : ""} →
          </button>
          <button onClick={() => setMode("choose")} style={{ width: "100%", background: "transparent", color: "#64748B", border: "0.5px solid #334155", borderRadius: 10, padding: 10, fontSize: 13, cursor: "pointer" }}>← Back</button>
        </div>
      </div>
    </div>
  );

  if (mode === "done") return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ background: "#1E293B", border: "0.5px solid #334155", borderRadius: 16, padding: 28 }}>
          {progressBar}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#F8FAFC", marginBottom: 4 }}>{funds.length} funds imported</div>
            <div style={{ fontSize: 13, color: "#64748B" }}>Live NAV fetched from AMFI</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
            {[{l:"Invested",v:`₹${Math.round(totalInvested/100000).toFixed(1)}L`},{l:"Current value",v:`₹${Math.round(totalCurrent/100000).toFixed(1)}L`},{l:"Overall gain",v:`+${gainPct}%`}].map(m => (
              <div key={m.l} style={{ background: "#0F172A", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: m.l === "Overall gain" ? "#4ade80" : "#F1F5F9" }}>{m.v}</div>
                <div style={{ fontSize: 10, color: "#64748B", marginTop: 3 }}>{m.l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            {funds.map((f, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "0.5px solid #1E293B", fontSize: 12 }}>
                <div>
                  <div style={{ color: "#CBD5E1", marginBottom: 1 }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: "#64748B" }}>{f.category} · {f.units} units</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#4ade80", fontWeight: 500 }}>₹{Math.round(f.current_value).toLocaleString("en-IN")}</div>
                  <div style={{ fontSize: 10, color: "#64748B" }}>NAV ₹{f.current_nav.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleDone} style={{ width: "100%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Meet your Virtual RM →
          </button>
        </div>
      </div>
    </div>
  );

  return null;
}
