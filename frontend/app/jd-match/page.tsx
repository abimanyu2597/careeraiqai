"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { TextArea } from "@/components/text-area";
import { apiPost } from "@/lib/api";

export default function JDMatchPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

const [resumeText, setResumeText] = useState("");
const [jdText, setJdText] = useState("");
function buildPayload() {
  return { resume_text: resumeText, jd_text: jdText };
}
function renderInputs() {
  return (
    <>
      <TextArea label="Resume text" value={resumeText} onChange={setResumeText} placeholder="Paste resume here..." rows={11} />
      <TextArea label="Job description" value={jdText} onChange={setJdText} placeholder="Paste JD here..." rows={11} />
    </>
  );
}


  async function handleSubmit() {
    setLoading(true);
    try {
      const data = await apiPost("/api/v1/match/analyze", buildPayload());
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
        <h1 className="section-title">JD Match</h1>
        <p className="mt-2 text-slate-300/80">Compare your resume against a job description and get a fit score with targeted improvement suggestions.</p>
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
  <div className="space-y-4 text-sm">
    <div className="rounded-2xl bg-white/5 p-4 text-white">Fit score: <span className="font-semibold text-blue-300">{result.fit_score ?? "-"}</span></div>
    <pre className="overflow-auto rounded-2xl bg-slate-950/80 p-4 text-slate-200">{JSON.stringify(result, null, 2)}</pre>
  </div>
) : (
  <p className="text-slate-300/80">Run the match engine to see score, missing skills, and suggested resume edits.</p>
)}

        </GlassCard>
      </div>
    </PageShell>
  );
}
