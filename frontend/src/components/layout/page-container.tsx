import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function PageContainer({ children }: Props) {
  return (
    <main className="mx-auto grid max-w-[1120px] gap-4 px-6 py-6">
      {children}
    </main>
  );
}