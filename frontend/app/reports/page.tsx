"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { TextArea } from "@/components/text-area";
import { apiPost } from "@/lib/api";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

const [title, setTitle] = useState("CareerIQ AI Report");
const [sections, setSections] = useState(`{
  "Fit Summary": "Strong shortlist potential after tailored edits.",
  "Critical Gaps": ["system design", "cloud depth"],
  "Action Plan": ["Tailor resume", "Practice mock interview", "Study likely technical focus"]
}`);
function buildPayload() {
  return { title, sections: JSON.parse(sections) };
}
function renderInputs() {
  return (
    <>
      <label className="block">
        <div className="mb-2 text-sm font-medium text-slate-200">Report title</div>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100" />
      </label>
      <TextArea label="Sections JSON" value={sections} onChange={setSections} rows={12} />
    </>
  );
}


  async function handleSubmit() {
    setLoading(true);
    try {
      const data = await apiPost("/api/v1/reports/create", buildPayload());
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
        <h1 className="section-title">Report Export</h1>
        <p className="mt-2 text-slate-300/80">Export structured reports with creator branding and premium presentation.</p>
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
    <div className="rounded-2xl bg-white/5 p-4 text-white">Generated: {result.filename || result.error}</div>
    {result.download_url ? <a className="inline-block rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white" href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${result.download_url}`} target="_blank">Download PDF</a> : null}
    <pre className="overflow-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-200">{JSON.stringify(result, null, 2)}</pre>
  </div>
) : (
  <p className="text-slate-300/80">Create a clean PDF report from analysis output.</p>
)}

        </GlassCard>
      </div>
    </PageShell>
  );
}
