import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { KpiCard } from "@/components/kpi-card";
import { GlassCard } from "@/components/glass-card";

export default function DashboardPage() {
  return (
    <PageShell>
      <div className="mb-8">
        <h1 className="section-title">Dashboard</h1>
        <p className="mt-2 text-slate-300/80">Premium overview of your AI career workflow.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <KpiCard label="Resume Score" value="82" hint="Estimated ATS readiness" />
        <KpiCard label="JD Fit" value="78" hint="Current match based on recent analysis" />
        <KpiCard label="Interview Readiness" value="74" hint="Needs stronger project storytelling" />
        <KpiCard label="Company Signals" value="6" hint="Likely focus areas identified" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard title="Main workflows" subtitle="Choose one to start or continue.">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["/resume-analyzer", "Resume Analyzer"],
              ["/jd-match", "JD Match"],
              ["/company-intelligence", "Company Intelligence"],
              ["/mock-interview", "Mock Interview"],
              ["/knowledge-search", "Knowledge Search"],
              ["/reports", "Reports"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white transition hover:border-blue-400/40 hover:bg-blue-500/10">
                {label}
              </Link>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Creator" subtitle="Branding baked into the experience.">
          <p className="text-lg font-medium text-white">Raja Abimanyu N</p>
          <p className="mt-2 text-slate-300/80">Data Scientist | AI &amp; Applied Machine Learning</p>
          <p className="mt-4 text-sm text-slate-300/80">
            CareerIQ AI is positioned as a premium career copilot, combining structured analysis, mock interviewing, and knowledge-guided preparation.
          </p>
        </GlassCard>
      </div>
    </PageShell>
  );
}
