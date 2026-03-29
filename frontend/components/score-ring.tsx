export function ScoreRing({ value, label }: { value: number; label: string }) {
  const normalized = Math.max(0, Math.min(100, value));
  const degrees = Math.round((normalized / 100) * 360);
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative grid h-24 w-24 place-items-center rounded-full"
        style={{
          background: `conic-gradient(#60a5fa ${degrees}deg, rgba(255,255,255,0.08) ${degrees}deg)`
        }}
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-slate-950 text-xl font-semibold text-white">
          {normalized}
        </div>
      </div>
      <div>
        <div className="text-sm uppercase tracking-[0.2em] text-slate-400">{label}</div>
        <div className="mt-1 text-lg font-medium text-white">
          {normalized >= 75 ? "Strong" : normalized >= 55 ? "Moderate" : "Needs work"}
        </div>
      </div>
    </div>
  );
}
