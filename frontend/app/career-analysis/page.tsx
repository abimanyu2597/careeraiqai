"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { TextArea } from "@/components/text-area";
import { apiPost } from "@/lib/api";
import { ScoreRing } from "@/components/score-ring";
import type { CareerAnalysis } from "@/lib/types";

export default function CareerAnalysisPage() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [userQuery, setUserQuery] = useState("Prepare me for this interview");
  const [result, setResult] = useState<CareerAnalysis | null>(null);

  async function runAnalysis() {
    const data = await apiPost<CareerAnalysis>("/api/v1/career/analyze", {
      resume_text: resumeText,
      jd_text: jdText,
      company_name: companyName,
      company_url: companyUrl,
      user_query: userQuery,
    });
    setResult(data);
  }

  return (
    <PageShell>
      <div className="mb-8">
        <h1 className="section-title">Full Career Analysis</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassCard title="Inputs" subtitle="Run the full LangGraph-driven workflow.">
          <div className="space-y-4">
            <TextArea label="Resume" value={resumeText} onChange={setResumeText} rows={10} />
            <TextArea label="Job Description" value={jdText} onChange={setJdText} rows={10} />
            <label className="block">
              <div className="mb-2 text-sm font-medium text-slate-200">Company name</div>
              <input value={companyName} onChange={(e)=>setCompanyName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100" />
            </label>
            <label className="block">
              <div className="mb-2 text-sm font-medium text-slate-200">Company URL</div>
              <input value={companyUrl} onChange={(e)=>setCompanyUrl(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100" />
            </label>
            <TextArea label="Goal" value={userQuery} onChange={setUserQuery} rows={4} />
            <button onClick={runAnalysis} className="rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white">Run full analysis</button>
          </div>
        </GlassCard>

        <GlassCard title="Final output" subtitle="Fit score, gaps, interview focus, and 7-day action plan.">
          {result ? (
            <div className="space-y-5">
              <ScoreRing value={result.fit_score} label="career fit" />
              <pre className="overflow-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-200">{JSON.stringify(result, null, 2)}</pre>
            </div>
          ) : (
            <p className="text-slate-300/80">This page uses the full backend workflow and is useful as the main demo.</p>
          )}
        </GlassCard>
      </div>
    </PageShell>
  );
}
