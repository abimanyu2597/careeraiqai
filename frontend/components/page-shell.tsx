import { ReactNode } from "react";
import { BrandHeader } from "@/components/brand-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <BrandHeader />
      <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
    </>
  );
}
