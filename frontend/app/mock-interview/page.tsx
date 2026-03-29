"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { TextArea } from "@/components/text-area";
import { apiPost } from "@/lib/api";

export default function MockInterviewPage() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [generated, setGenerated] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [chatResult, setChatResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const data = await apiPost("/api/v1/interview/generate", {
        resume_text: resumeText,
        jd_text: jdText,
        company_context: {}
      });
      setGenerated(data);
      setChatResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function sendAnswer() {
    if (!generated?.session_id) return;
    setLoading(true);
    try {
      const data = await apiPost("/api/v1/interview/chat", {
        session_id: generated.session_id,
        answer
      });
      setChatResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="mb-8">
        <h1 className="section-title">Mock Interview</h1>
        <p className="mt-2 text-slate-300/80">Generate role-specific questions and get AI feedback in a premium interview workspace.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassCard title="Interview setup" subtitle="Paste your resume and JD to create a guided mock interview.">
          <div className="space-y-4">
            <TextArea label="Resume text" value={resumeText} onChange={setResumeText} rows={11} />
            <TextArea label="Job description" value={jdText} onChange={setJdText} rows={11} />
            <button onClick={generate} disabled={loading} className="rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white">
              {loading ? "Generating..." : "Generate interview"}
            </button>
          </div>
        </GlassCard>

        <GlassCard title="Interview panel" subtitle="Questions, follow-ups, and answer feedback.">
          {generated ? (
            <div className="space-y-4">
              <pre className="overflow-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-200">{JSON.stringify(generated, null, 2)}</pre>
              <TextArea label="Your answer" value={answer} onChange={setAnswer} rows={6} />
              <button onClick={sendAnswer} disabled={loading} className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white">
                Submit answer
              </button>
              {chatResult ? (
                <pre className="overflow-auto rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-200">{JSON.stringify(chatResult, null, 2)}</pre>
              ) : null}
            </div>
          ) : (
            <p className="text-slate-300/80">Generate interview questions to begin.</p>
          )}
        </GlassCard>
      </div>
    </PageShell>
  );
}
