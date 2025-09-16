// app/providers.tsx (Server Component)

import AuthGate from "@/components/AuthGuard";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <AuthGate>
        {children}
      </AuthGate>
  );
}