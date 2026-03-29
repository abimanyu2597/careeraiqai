import Link from "next/link";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/resume-analyzer", label: "Resume" },
  { href: "/jd-match", label: "JD Match" },
  { href: "/company-intelligence", label: "Company" },
  { href: "/mock-interview", label: "Interview" },
  { href: "/knowledge-search", label: "Knowledge" },
  { href: "/reports", label: "Reports" },
];

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="group">
          <div className="text-lg font-semibold text-white">
            CareerIQ <span className="text-blue-400">AI</span>
          </div>
          <div className="text-xs text-slate-300/70">
            Created by Raja Abimanyu N
          </div>
        </Link>

        <nav className="hidden gap-5 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
