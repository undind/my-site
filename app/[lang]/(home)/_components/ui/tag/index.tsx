import { type ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return <div className="inline-block rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 text-[12px] text-(--color-gold)">{children}</div>;
}
