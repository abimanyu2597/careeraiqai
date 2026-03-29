"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { TextArea } from "@/components/text-area";
import { UploadBox } from "@/components/upload-box";
import { ScoreRing } from "@/components/score-ring";
import { apiPost, apiUploadResume } from "@/lib/api";

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function uploadFile(file: File) {
    const data = await apiUploadResume(file);
    setResumeText(data.extracted_text || "");
  }

  async function analyze() {
    setLoading(true);
    try {
      const data = await apiPost("/api/v1/resume/analyze", { resume_text: resumeText });
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Analysis failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="mb-8">
        <h1 className="section-title">Resume Analyzer</h1>
        <p className="mt-2 text-slate-300/80">Upload or paste a resume and get ATS-oriented, role-ready recommendations.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassCard title="Resume input" subtitle="Upload a PDF or paste the content manually.">
          <div className="space-y-4">
            <UploadBox onFile={uploadFile} />
            <TextArea label="Resume text" value={resumeText} onChange={setResumeText} rows={14} placeholder="Paste resume text..." />
            <button onClick={analyze} disabled={loading} className="rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white">
              {loading ? "Analyzing..." : "Analyze resume"}
            </button>
          </div>
        </GlassCard>

        <GlassCard title="Analysis output" subtitle="Structured feedback, priorities, and rewritten bullets.">
          {result ? (
            <div className="space-y-5">
              <ScoreRing value={82} label="resume strength" />
              <pre className="overflow-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-200">{JSON.stringify(result, null, 2)}</pre>
            </div>
          ) : (
            <p className="text-slate-300/80">Run analysis to see strengths, ATS issues, and bullet rewrite suggestions.</p>
          )}
        </GlassCard>
      </div>
    </PageShell>
  );
}
