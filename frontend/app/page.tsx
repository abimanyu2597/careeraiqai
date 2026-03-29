import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/hero";
import { GlassCard } from "@/components/glass-card";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <GlassCard title="Resume Intelligence" subtitle="Upload, parse, score, and rewrite for ATS and hiring managers.">
          <p className="muted">Turn resumes into sharper, role-aligned documents with impact-oriented recommendations.</p>
        </GlassCard>
        <GlassCard title="JD Match Engine" subtitle="Estimate fit score and surface missing skills.">
          <p className="muted">Map your experience against the job description and generate focused edits for better alignment.</p>
        </GlassCard>
        <GlassCard title="Interview + Knowledge" subtitle="Prepare with mock questions and career intelligence.">
          <p className="muted">Get role-specific interview questions, company insights, and concise action plans.</p>
        </GlassCard>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <GlassCard title="Why this project stands out" subtitle="Portfolio-grade, premium UI, real business value.">
          <ul className="space-y-3 text-sm text-slate-200/90">
            <li>• Combines GenAI, RAG-style retrieval, and agent orchestration.</li>
            <li>• Supports OpenAI for quality and Groq for low-latency interactions.</li>
            <li>• Designed for career preparation, not just generic chat.</li>
          </ul>
        </GlassCard>

        <GlassCard title="Quick launch" subtitle="Start with the main workflow now.">
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white">
              Open Dashboard
            </Link>
            <Link href="/mock-interview" className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white">
              Try Interview Mode
            </Link>
          </div>
        </GlassCard>
      </section>
    </PageShell>
  );
}
