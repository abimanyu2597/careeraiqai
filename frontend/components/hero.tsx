"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreatorBadge } from "@/components/creator-badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950/90 to-blue-950/40 px-6 py-14 md:px-10 md:py-20">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="relative grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <CreatorBadge />
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            A premium <span className="text-blue-400">AI Career Intelligence</span> platform for resumes, JD matching, interviews, and knowledge search.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300/90">
            Built with OpenAI, Groq, FastAPI, Next.js, and LangGraph. Analyze fit, tailor resumes, prep for interviews, and turn career questions into actionable plans.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-400">
              Launch Dashboard
            </Link>
            <Link href="/resume-analyzer" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-blue-400/60">
              Upload Resume
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Live analysis flow</div>
              <div className="mt-1 text-xl font-semibold text-white">CareerIQ AI Engine</div>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              realtime-ready
            </div>
          </div>

          {[
            "Resume parsing",
            "ATS scoring",
            "JD semantic match",
            "Company intelligence",
            "Mock interview generation",
            "Action plan synthesis"
          ].map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="text-sm text-slate-100">{item}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,.95)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
