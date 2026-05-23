"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hello! I am your **personal AI Wealth Advisor** specialising in Indian markets.\n\nI can help you with:\n- 📊 **Mutual fund analysis**\n- 💰 **SIP planning & strategy**\n- 🎯 **Goal-based investing**\n- 🧾 **Tax planning (LTCG, STCG, 80C)**\n- 📄 **Upload any MF factsheet PDF** for instant analysis\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfContext, setPdfContext] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handlePdfUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPdfContext(data.text);
      setPdfName(file.name);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "✅ **" + file.name + "** uploaded! (" + data.pages + " pages)\n\nI have read the full factsheet. Ask me anything about this fund!",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Could not read PDF: " + (err instanceof Error ? err.message : "Unknown error") },
      ]);
    } finally {
      setUploading(false);
    }
  }

  async function sendMessage(overrideInput?: string) {
    const text = overrideInput ?? input;
    if (!text.trim() || loading) return;
    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, context: pdfContext }),
      });
      if (!res.ok) throw new Error("Failed to get response");
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const parsed = JSON.parse(line.slice(6));
              if (parsed.content) {
                assistantMessage += parsed.content;
                setMessages((prev) => [
                  ...prev.slice(0, -1),
                  { role: "assistant", content: assistantMessage },
                ]);
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Sorry, could not connect. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="bg-slate-900/80 backdrop-blur border-b border-slate-700 px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          ₹
        </div>
        <div>
          <h1 className="font-semibold text-white text-base">Wealth Advisor AI</h1>
          <p className="text-xs text-slate-400">Indian Markets Specialist · Llama 3.3 70B</p>
        </div>
        {pdfName && (
          <div className="ml-4 flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1">
            <span className="text-xs text-blue-400">📄 {pdfName}</span>
            <button onClick={() => { setPdfContext(null); setPdfName(null); }} className="text-slate-500 hover:text-red-400 text-xs">✕</button>
          </div>
        )}
        <div className="ml-auto flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-xs text-green-400 font-medium">Live</span>
        </div>
      </div>

      <div className="flex gap-2 px-6 py-3 overflow-x-auto bg-slate-900/50 border-b border-slate-700/50">
        {[
          "📊 Analyse Kotak Flexicap Fund",
          "💰 Best SIP strategy for 2026",
          "🧾 Explain LTCG tax rules",
          "🎯 How to build retirement corpus",
          "📈 Compare Kotak vs Abakkus",
        ].map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt.slice(3))}
            className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-600 text-slate-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={"flex gap-3 " + (msg.role === "user" ? "justify-end" : "justify-start")}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1 shadow">
                ₹
              </div>
            )}
            <div className={"max-w-[80%] flex flex-col gap-1 " + (msg.role === "user" ? "items-end" : "items-start")}>
              <div className={"rounded-2xl px-4 py-3 text-sm leading-relaxed " + (msg.role === "user" ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-lg" : "bg-slate-800/80 border border-slate-700 text-slate-100 rounded-bl-sm shadow-lg")}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-blue-300 prose-headings:font-semibold prose-strong:text-white prose-p:text-slate-200 prose-li:text-slate-200 prose-table:text-slate-200 prose-th:text-blue-300 prose-th:border prose-th:border-slate-600 prose-th:px-3 prose-th:py-2 prose-th:bg-slate-700/50 prose-td:border prose-td:border-slate-700 prose-td:px-3 prose-td:py-2 prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-300">
                    {msg.content ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    ) : (
                      <span className="inline-flex gap-1 py-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
              <span className="text-xs text-slate-500 px-1">
                {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                U
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="bg-slate-900/80 backdrop-blur border-t border-slate-700 px-6 py-4">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handlePdfUpload(file); }} />
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-700 border border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white transition-all flex items-center justify-center text-lg disabled:opacity-50" title="Upload PDF factsheet">
            {uploading ? "⏳" : "📄"}
          </button>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder={pdfContext ? "Ask about " + pdfName + "..." : "Ask about mutual funds, SIPs, tax planning..."} rows={2} className="flex-1 resize-none rounded-xl bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-3 text-sm font-medium hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg">
            {loading ? "⏳" : "Send →"}
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-2 text-center">📄 Upload any MF factsheet PDF · Enter to send · Your data stays private</p>
      </div>
    </div>
  );
}
