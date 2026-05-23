import OpenAI from "openai";

export const ollamaClient = new OpenAI({
  apiKey: "ollama",
  baseURL: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1",
});

export const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.1:8b";

export async function checkOllamaHealth(): Promise<{
  running: boolean;
  model: string;
  error?: string;
}> {
  try {
    const res = await fetch(
      `${process.env.OLLAMA_BASE_URL?.replace("/v1", "") ?? "http://localhost:11434"}/api/tags`,
      { signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const models: string[] = (data.models ?? []).map(
      (m: { name: string }) => m.name
    );
    const modelAvailable = models.some((m) =>
      m.startsWith(OLLAMA_MODEL.split(":")[0])
    );
    return {
      running: true,
      model: OLLAMA_MODEL,
      error: modelAvailable
        ? undefined
        : `Model '${OLLAMA_MODEL}' not pulled. Run: ollama pull ${OLLAMA_MODEL}`,
    };
  } catch (err) {
    return { running: false, model: OLLAMA_MODEL, error: String(err) };
  }
}