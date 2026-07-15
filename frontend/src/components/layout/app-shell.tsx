import { ReactNode } from "react";

import { AppHeader } from "./app-header";
import { PageContainer } from "./page-container";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <>
      <AppHeader />

      <PageContainer>
        {children}
      </PageContainer>
    </>
  );
}