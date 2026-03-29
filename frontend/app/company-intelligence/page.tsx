"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { TextArea } from "@/components/text-area";
import { apiPost } from "@/lib/api";

export default function CompanyIntelligencePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

const [companyName, setCompanyName] = useState("");
const [companyUrl, setCompanyUrl] = useState("");
const [jdText, setJdText] = useState("");
function buildPayload() {
  return { company_name: companyName, company_url: companyUrl, jd_text: jdText };
}
function renderInputs() {
  return (
    <>
      <label className="block">
        <div className="mb-2 text-sm font-medium text-slate-200">Company name</div>
        <input value={companyName} onChange={(e)=>setCompanyName(e.target.value)} placeholder="e.g. OpenAI" className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400" />
      </label>
      <label className="block">
        <div className="mb-2 text-sm font-medium text-slate-200">Company URL</div>
        <input value={companyUrl} onChange={(e)=>setCompanyUrl(e.target.value)} placeholder="https://company.com" className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400" />
      </label>
      <TextArea label="Job description (optional)" value={jdText} onChange={setJdText} placeholder="Paste JD..." rows={10} />
    </>
  );
}


  async function handleSubmit() {
    setLoading(true);
    try {
      const data = await apiPost("/api/v1/company/research", buildPayload());
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
        <h1 className="section-title">Company Intelligence</h1>
        <p className="mt-2 text-slate-300/80">Generate useful company and role context to prepare more effectively.</p>
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
  <pre className="overflow-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-200">{JSON.stringify(result, null, 2)}</pre>
) : (
  <p className="text-slate-300/80">Analyze company context, likely interview focus, and role expectations.</p>
)}

        </GlassCard>
      </div>
    </PageShell>
  );
}
