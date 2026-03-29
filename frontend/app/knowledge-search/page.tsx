"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { TextArea } from "@/components/text-area";
import { apiPost } from "@/lib/api";

export default function KnowledgeSearchPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

const [query, setQuery] = useState("");
const [resumeText, setResumeText] = useState("");
const [jdText, setJdText] = useState("");
function buildPayload() {
  return { query, resume_text: resumeText, jd_text: jdText, uploaded_context_ids: [] };
}
function renderInputs() {
  return (
    <>
      <TextArea label="Your question" value={query} onChange={setQuery} placeholder="What should I prepare for this role?" rows={5} />
      <TextArea label="Resume context (optional)" value={resumeText} onChange={setResumeText} placeholder="Paste resume..." rows={8} />
      <TextArea label="JD context (optional)" value={jdText} onChange={setJdText} placeholder="Paste JD..." rows={8} />
    </>
  );
}


  async function handleSubmit() {
    setLoading(true);
    try {
      const data = await apiPost("/api/v1/knowledge/ask", buildPayload());
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Request failed. Check the backend or API keys." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="mb-8">
        <h1 className="section-title">Knowledge Search</h1>
        <p className="mt-2 text-slate-300/80">Search across your context and turn vague preparation into concrete next steps.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassCard title="Input" subtitle="Provide your content and run the analysis.">
          <div className="space-y-4">
            {renderInputs()}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400 disabled:opacity-60"
            >
              {loading ? "Running..." : "Run analysis"}
            </button>
          </div>
        </GlassCard>

        <GlassCard title="Output" subtitle="Structured result for the current workflow.">

{result ? (
  <div className="space-y-4">
    <div className="rounded-2xl bg-white/5 p-4 text-white">{result.direct_answer || result.error}</div>
    <pre className="overflow-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-200">{JSON.stringify(result, null, 2)}</pre>
  </div>
) : (
  <p className="text-slate-300/80">Ask role-specific or career-specific questions and get structured action points.</p>
)}

        </GlassCard>
      </div>
    </PageShell>
  );
}
