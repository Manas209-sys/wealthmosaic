"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#fff",color:"#0F172A",overflowX:"hidden"}}>
      <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 32px",borderBottom:"0.5px solid #E2E8F0",background:"rgba(255,255,255,.96)",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#185FA5,#534AB7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#fff"}}>◈</div>
          <div>
            <div style={{fontSize:16,fontWeight:500}}>WealthMosaic</div>
            <div style={{fontSize:10,color:"#94A3B8"}}>wealthmosaic.co.in</div>
          </div>
        </div>
        <div style={{display:"flex",gap:24,alignItems:"center"}}>
          {["Features","Virtual RM","For RMs","Pricing"].map(l=>(
            <span key={l} style={{fontSize:13,color:"#64748B",cursor:"pointer"}}>{l}</span>
          ))}
          <button style={{fontSize:13,fontWeight:500,background:"linear-gradient(135deg,#185FA5,#534AB7)",color:"#fff",border:"none",borderRadius:8,padding:"8px 20px",cursor:"pointer"}}>Get started free →</button>
        </div>
      </nav>
      <section style={{background:"#0A0F1E",minHeight:540,position:"relative",overflow:"hidden",display:"grid",gridTemplateColumns:"1fr 1fr"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(59,130,246,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.07) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(83,74,183,.3) 0%,transparent 70%)",top:-100,left:-80}}/>
        <div style={{padding:"72px 32px 72px 40px",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(139,92,246,.15)",color:"#C4B5FD",fontSize:11,padding:"5px 14px",borderRadius:20,marginBottom:22,border:"0.5px solid rgba(139,92,246,.3)",width:"fit-content"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}/>
            Virtual RM · AI advisor · Investment mandate
          </div>
          <h1 style={{fontSize:36,fontWeight:500,color:"#F8FAFC",lineHeight:1.18,marginBottom:16}}>
            Your portfolio.<br/>
            <span style={{background:"linear-gradient(135deg,#60A5FA,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Deeply understood.</span><br/>
            Your wealth.<br/>
            <span style={{background:"linear-gradient(135deg,#4ade80,#60A5FA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Intelligently grown.</span>
          </h1>
          <p style={{fontSize:14,color:"#94A3B8",lineHeight:1.7,marginBottom:28,maxWidth:380}}>Meet your Virtual RM — an AI relationship manager that knows your portfolio inside out and gives real advice within your investment mandate.</p>
          <div style={{display:"flex",gap:10}}>
            <button style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:10,padding:"13px 26px",fontSize:14,fontWeight:500,cursor:"pointer"}}>Meet your Virtual RM →</button>
            <button style={{background:"transparent",color:"#CBD5E1",border:"0.5px solid rgba(255,255,255,.2)",borderRadius:10,padding:"13px 26px",fontSize:14,cursor:"pointer"}}>See a demo</button>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 28px",position:"relative",zIndex:1}}>
          <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:280}}>
            <div style={{background:"#1E293B",border:"0.5px solid #334155",borderRadius:16,padding:16,display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🧑‍💼</div>
              <div>
                <div style={{fontSize:13,fontWeight:500,color:"#F1F5F9",marginBottom:2}}>Priya — Your Virtual RM</div>
                <div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:"#64748B"}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}/>
                  Active now · Watching your portfolio
                </div>
                <div style={{fontSize:10,color:"#A78BFA",marginTop:3}}>CFA-level · Indian markets specialist</div>
              </div>
            </div>
            <div style={{background:"#1E293B",border:"0.5px solid #334155",borderRadius:14,padding:14,display:"flex",flexDirection:"column",gap:10}}>
              <div>
                <div style={{fontSize:9,color:"#64748B",marginBottom:3}}>Priya · Virtual RM</div>
                <div style={{background:"#0F172A",borderRadius:"10px 10px 10px 0",padding:"8px 12px",fontSize:10,color:"#CBD5E1",lineHeight:1.6}}>Good morning! Your portfolio is up ₹18,400 this week. Kotak Flexicap XIRR now at 14.1% 📈</div>
              </div>
              <div>
                <div style={{fontSize:9,color:"#64748B",marginBottom:3}}>Priya · Mandate alert</div>
                <div style={{background:"#1a0a2e",border:"0.5px solid rgba(139,92,246,.3)",borderRadius:"10px 10px 10px 0",padding:"8px 12px",fontSize:10,color:"#A5B4FC",lineHeight:1.6}}>⚠️ Banking sector at 26% exceeds your mandate max of 20%. Suggest switching ₹80K to pharma.</div>
              </div>
              <div style={{alignSelf:"flex-end"}}>
                <div style={{fontSize:9,color:"#64748B",marginBottom:3,textAlign:"right"}}>You</div>
                <div style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",borderRadius:"10px 10px 0 10px",padding:"8px 12px",fontSize:10,color:"#fff",lineHeight:1.6}}>Show me the best pharma funds within my mandate</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[{l:"Portfolio",v:"₹28.8L",c:"#4ade80"},{l:"XIRR",v:"13.4%",c:"#60A5FA"},{l:"Health",v:"82/100",c:"#A78BFA"}].map(m=>(
                <div key={m.l} style={{background:"#1E293B",border:"0.5px solid #334155",borderRadius:10,padding:"9px 10px",textAlign:"center"}}>
                  <div style={{fontSize:9,color:"#64748B",marginBottom:3}}>{m.l}</div>
                  <div style={{fontSize:13,fontWeight:500,color:m.c}}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div style={{background:"linear-gradient(135deg,#185FA5,#534AB7)",padding:"10px 32px",display:"flex",gap:40,overflowX:"auto",whiteSpace:"nowrap"}}>
        {["🤖 Virtual RM — AI advisor that knows you personally","📊 15,000+ mutual funds tracked","🔄 AMFI NAV updated daily","📋 Investment mandate — AI within your rules","💬 Ask anything, anytime","🎯 Goal tracker — retirement, education, home"].map(t=>(
          <span key={t} style={{fontSize:12,color:"rgba(255,255,255,.9)",flexShrink:0}}>{t}</span>
        ))}
      </div>
      <section style={{background:"#0A0F1E",padding:"60px 32px",borderBottom:"0.5px solid #1E293B"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(139,92,246,.15)",color:"#C4B5FD",fontSize:11,padding:"5px 14px",borderRadius:20,marginBottom:16,border:"0.5px solid rgba(139,92,246,.3)"}}>✨ Our biggest differentiator</div>
            <h2 style={{fontSize:28,fontWeight:500,color:"#F8FAFC",marginBottom:10}}>A Virtual RM for every investor</h2>
            <p style={{fontSize:14,color:"#94A3B8",lineHeight:1.7,maxWidth:480,margin:"0 auto"}}>Private banking clients pay ₹5–10L/year for a dedicated Relationship Manager. WealthMosaic gives every investor the same quality of personalised, mandate-driven advice — powered by AI, available instantly.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
            {[
              {ico:"👁️",title:"Watches your portfolio",desc:"Monitors every fund 24/7. Alerts you the moment something needs attention.",tag:"Always on",tc:"#60A5FA",bg:"#1e3a5f"},
              {ico:"⚖️",title:"Rebalances on mandate",desc:"When portfolio drifts, your RM spots it and suggests the exact switch.",tag:"Mandate-aware",tc:"#A78BFA",bg:"#1a0a2e"},
              {ico:"🎯",title:"Tracks your goals",desc:"Retirement, education, home. Tells you if you are on track or need to top up.",tag:"Goal-linked",tc:"#4ade80",bg:"#052e16"},
              {ico:"🧾",title:"Manages your taxes",desc:"LTCG, STCG, 80C harvesting. Flags tax events before they catch you off guard.",tag:"Tax-smart",tc:"#FBBF24",bg:"#2d1b00"},
              {ico:"📄",title:"Analyses factsheets",desc:"Upload any MF factsheet PDF — instant 8-point analysis and verdict.",tag:"Instant report",tc:"#F87171",bg:"#2d0a0a"},
              {ico:"💬",title:"Answers anything",desc:"Ask about any fund, market event, or strategy with your portfolio in context.",tag:"24/7 chat",tc:"#34D399",bg:"#0a2a1a"},
            ].map(f=>(
              <div key={f.title} style={{background:"#1E293B",border:"0.5px solid #334155",borderRadius:14,padding:"1.1rem"}}>
                <div style={{fontSize:22,marginBottom:10}}>{f.ico}</div>
                <div style={{fontSize:13,fontWeight:500,color:"#F1F5F9",marginBottom:5}}>{f.title}</div>
                <div style={{fontSize:11,color:"#94A3B8",lineHeight:1.55,marginBottom:10}}>{f.desc}</div>
                <span style={{fontSize:10,background:f.bg,color:f.tc,padding:"2px 10px",borderRadius:20}}>{f.tag}</span>
              </div>
            ))}
          </div>
          <div style={{background:"linear-gradient(135deg,#1a0a2e,#0a1f3a)",border:"0.5px solid rgba(139,92,246,.3)",borderRadius:16,padding:"22px 24px",display:"flex",gap:18,alignItems:"flex-start"}}>
            <div style={{width:48,height:48,borderRadius:14,background:"rgba(124,58,237,.2)",border:"0.5px solid rgba(139,92,246,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>👑</div>
            <div>
              <div style={{fontSize:16,fontWeight:500,color:"#F1F5F9",marginBottom:6}}>The RM experience, democratised</div>
              <div style={{fontSize:12,color:"#94A3B8",lineHeight:1.65,marginBottom:12}}>Until now, personalised mandate-driven portfolio advice was only for HNI clients. WealthMosaic changes that — every investor gets their own Virtual RM powered by AI, available 24/7, at a fraction of the cost.</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {["Mandate-bound advice","CFA-level analysis","Indian market specialist","Available 24/7","No advisory fees"].map(t=>(
                  <span key={t} style={{fontSize:10,background:"rgba(139,92,246,.15)",color:"#C4B5FD",padding:"3px 10px",borderRadius:20,border:"0.5px solid rgba(139,92,246,.25)"}}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderBottom:"0.5px solid #E2E8F0"}}>
        {[{ico:"📈",num:"15,000+",lbl:"Funds tracked",bg:"#E6F1FB"},{ico:"🔄",num:"Daily",lbl:"NAV refresh",bg:"#EAF3DE"},{ico:"🤖",num:"AI-native",lbl:"Portfolio-aware",bg:"#EEEDFE"},{ico:"📋",num:"Mandate",lbl:"AI within your rules",bg:"#FAEEDA"}].map(s=>(
          <div key={s.lbl} style={{padding:"28px 20px",textAlign:"center",borderRight:"0.5px solid #E2E8F0"}}>
            <div style={{width:40,height:40,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",fontSize:20}}>{s.ico}</div>
            <div style={{fontSize:20,fontWeight:500,color:"#0F172A"}}>{s.num}</div>
            <div style={{fontSize:11,color:"#94A3B8",marginTop:3}}>{s.lbl}</div>
          </div>
        ))}
      </div>
      <section style={{padding:"60px 32px",background:"#F8FAFC",borderBottom:"0.5px solid #E2E8F0"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontSize:10,fontWeight:500,letterSpacing:".08em",textTransform:"uppercase",color:"#94A3B8",marginBottom:8}}>Who it is for</div>
            <h2 style={{fontSize:26,fontWeight:500,color:"#0F172A",marginBottom:8}}>Two powerful modes</h2>
            <p style={{fontSize:13,color:"#64748B",lineHeight:1.7}}>Self-serve for investors. Command centre for RMs.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {[
              {num:"01",color:"#185FA5",bg:"#E6F1FB",ico:"👤",title:"Individual investor",desc:"Import your portfolio, set your investment mandate, and let your Virtual RM advise you.",feats:["Upload CAS or add holdings manually","Set risk profile and investment goals","AI portfolio health score and alerts","Virtual RM answers all your questions","Goal tracker: retirement, education, home"]},
              {num:"02",color:"#534AB7",bg:"#EEEDFE",ico:"💼",title:"Relationship Manager",desc:"Manage all clients from one dashboard. Virtual RM does the analysis — you do the advising.",feats:["Multi-client portfolio dashboard","Investment mandate per client","AI-generated client review reports","Rebalancing alerts across all clients","Fund swap and SIP recommendations"],featured:true},
            ].map(u=>(
              <div key={u.title} style={{background:"#fff",border:u.featured?"1.5px solid #85B7EB":"0.5px solid #E2E8F0",borderRadius:16,padding:"1.5rem"}}>
                {u.featured && <div style={{fontSize:10,fontWeight:500,background:"#E6F1FB",color:"#0C447C",padding:"3px 10px",borderRadius:20,display:"inline-block",marginBottom:8}}>For advisory firms</div>}
                <div style={{fontSize:32,fontWeight:500,opacity:.08,color:u.color,lineHeight:1}}>{u.num}</div>
                <div style={{width:44,height:44,borderRadius:12,background:u.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:12}}>{u.ico}</div>
                <div style={{fontSize:15,fontWeight:500,color:"#0F172A",marginBottom:5}}>{u.title}</div>
                <div style={{fontSize:12,color:"#64748B",lineHeight:1.65,marginBottom:14}}>{u.desc}</div>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:6}}>
                  {u.feats.map(f=>(
                    <li key={f} style={{fontSize:12,color:"#64748B",display:"flex",alignItems:"flex-start",gap:7,lineHeight:1.4}}>
                      <span style={{color:"#3B6D11",flexShrink:0}}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"60px 32px",borderBottom:"0.5px solid #E2E8F0"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontSize:10,fontWeight:500,letterSpacing:".08em",textTransform:"uppercase",color:"#854F0B",marginBottom:8}}>Investment mandate</div>
            <h2 style={{fontSize:26,fontWeight:500,color:"#0F172A",marginBottom:8}}>AI that works within your rules</h2>
            <p style={{fontSize:13,color:"#64748B",lineHeight:1.7,maxWidth:460,margin:"0 auto"}}>Set your mandate once. Every suggestion your Virtual RM makes will respect it.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                {l:"Risk profile",v:"Moderate aggressive"},
                {l:"Investment horizon",v:"7 to 10 years"},
                {l:"Monthly SIP budget",v:"50,000 per month"},
                {l:"Target allocation",v:"75% equity · 25% debt"},
                {l:"Preferred categories",tags:["Flexicap","Large and midcap","ELSS"],tcolor:"#27500A",tbg:"#EAF3DE"},
                {l:"Avoid",tags:["Sectoral","Small cap only"],tcolor:"#791F1F",tbg:"#FCEBEB"},
                {l:"Goals",tags:["Retirement at 60","Child education"],tcolor:"#0C447C",tbg:"#E6F1FB"},
              ].map(f=>(
                <div key={f.l} style={{border:"0.5px solid #E2E8F0",borderRadius:10,padding:"11px 14px",background:"#fff"}}>
                  <div style={{fontSize:10,color:"#94A3B8",textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>{f.l}</div>
                  {f.v && <div style={{fontSize:13,fontWeight:500,color:"#0F172A"}}>{f.v}</div>}
                  {f.tags && <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:4}}>{f.tags.map(t=><span key={t} style={{fontSize:10,background:f.tbg,color:f.tcolor,padding:"2px 8px",borderRadius:10}}>{t}</span>)}</div>}
                </div>
              ))}
            </div>
            <div style={{background:"#0A0F1E",borderRadius:14,padding:18,border:"0.5px solid #1E293B"}}>
              <div style={{fontSize:11,color:"#60A5FA",marginBottom:14,display:"flex",alignItems:"center",gap:6,fontWeight:500}}>✨ How your Virtual RM uses this</div>
              {[
                {ico:"✅",title:"Fund suggestions",desc:"Only Flexicap, Large and midcap, ELSS. Never sectoral or small cap."},
                {ico:"⚠️",title:"Rebalancing alerts",desc:"Triggers if equity drifts above 80% or below 70%."},
                {ico:"🎯",title:"SIP amounts",desc:"Calculated to hit retirement at 60 and education goals."},
                {ico:"🧾",title:"Tax suggestions",desc:"Prioritise ELSS for 80C, flag LTCG before year-end."},
                {ico:"📋",title:"Plan preference",desc:"All recommendations are for Direct plans only."},
              ].map(i=>(
                <div key={i.title} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"10px 0",borderBottom:"0.5px solid #1E293B"}}>
                  <div style={{width:26,height:26,borderRadius:7,background:"#1E293B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{i.ico}</div>
                  <div>
                    <div style={{fontSize:11,fontWeight:500,color:"#E2E8F0",marginBottom:2}}>{i.title}</div>
                    <div style={{fontSize:10,color:"#64748B",lineHeight:1.5}}>{i.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{padding:"60px 32px",borderBottom:"0.5px solid #E2E8F0"}}>
        <div style={{maxWidth:640,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:10,fontWeight:500,letterSpacing:".08em",textTransform:"uppercase",color:"#3B6D11",marginBottom:8}}>How it works</div>
          <h2 style={{fontSize:26,fontWeight:500,color:"#0F172A",marginBottom:8}}>Up and running in 4 steps</h2>
          <p style={{fontSize:13,color:"#64748B",lineHeight:1.7,marginBottom:44}}>From sign-up to AI-powered portfolio analysis in under 5 minutes.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",position:"relative"}}>
            <div style={{position:"absolute",top:22,left:"12%",right:"12%",height:"0.5px",background:"#E2E8F0"}}/>
            {[
              {n:"1",title:"Sign up free",desc:"Google or email. 60 seconds.",bg:"#E6F1FB",c:"#0C447C",bc:"#85B7EB"},
              {n:"2",title:"Set mandate",desc:"Risk, goals, preferences.",bg:"#FAEEDA",c:"#633806",bc:"#EF9F27"},
              {n:"3",title:"Import portfolio",desc:"CAS upload or manual.",bg:"#EAF3DE",c:"#27500A",bc:"#97C459"},
              {n:"4",title:"Meet your Virtual RM",desc:"Health score and AI advice.",bg:"#EEEDFE",c:"#3C3489",bc:"#AFA9EC"},
            ].map(s=>(
              <div key={s.n} style={{textAlign:"center",padding:"0 10px",position:"relative",zIndex:1}}>
                <div style={{width:44,height:44,borderRadius:12,background:s.bg,border:`0.5px solid ${s.bc}`,color:s.c,fontSize:14,fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>{s.n}</div>
                <div style={{fontSize:12,fontWeight:500,color:"#0F172A",marginBottom:4}}>{s.title}</div>
                <div style={{fontSize:11,color:"#64748B",lineHeight:1.5}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"72px 32px",textAlign:"center",background:"#fff"}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:32}}>
            {[
              {t:"Import portfolio",bg:"#E6F1FB",c:"#0C447C",bc:"#85B7EB"},
              {t:"+",bg:"transparent",c:"#94A3B8",bc:"transparent"},
              {t:"Set mandate",bg:"#FAEEDA",c:"#633806",bc:"#EF9F27"},
              {t:"+",bg:"transparent",c:"#94A3B8",bc:"transparent"},
              {t:"Virtual RM",bg:"#EEEDFE",c:"#3C3489",bc:"#AFA9EC"},
              {t:"=",bg:"transparent",c:"#94A3B8",bc:"transparent"},
              {t:"Smarter wealth",bg:"#EAF3DE",c:"#27500A",bc:"#97C459"},
            ].map((t,i)=>(
              <div key={i} style={{padding:t.bg==="transparent"?"10px 4px":"10px 16px",borderRadius:10,fontSize:t.bg==="transparent"?20:12,fontWeight:500,background:t.bg,color:t.c,border:`0.5px solid ${t.bc}`}}>{t.t}</div>
            ))}
          </div>
          <h2 style={{fontSize:28,fontWeight:500,color:"#0F172A",marginBottom:8}}>Start building your wealth mosaic</h2>
          <p style={{fontSize:14,color:"#64748B",marginBottom:24}}>Free for individual investors. Team plans for RMs and advisory firms.</p>
          <div style={{display:"flex",gap:10,maxWidth:420,margin:"0 auto 12px"}}>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address" style={{flex:1,border:"0.5px solid #CBD5E1",borderRadius:8,padding:"12px 14px",fontSize:13,outline:"none"}}/>
            <button style={{background:"linear-gradient(135deg,#185FA5,#534AB7)",color:"#fff",border:"none",borderRadius:8,padding:"12px 22px",fontSize:13,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap"}}>Get started free →</button>
          </div>
          <p style={{fontSize:11,color:"#94A3B8"}}>No credit card · SEBI disclaimer applies · Not investment advice</p>
        </div>
      </section>
      <footer style={{padding:"20px 32px",borderTop:"0.5px solid #E2E8F0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div style={{fontSize:14,fontWeight:500}}>WealthMosaic</div>
        <div style={{display:"flex",gap:18}}>
          {["Privacy","Terms","SEBI disclaimer","For RMs","Contact"].map(l=>(
            <span key={l} style={{fontSize:11,color:"#94A3B8",cursor:"pointer"}}>{l}</span>
          ))}
        </div>
        <div style={{fontSize:11,color:"#94A3B8"}}>2026 wealthmosaic.co.in · Not SEBI registered</div>
      </footer>
    </main>
  );
}
