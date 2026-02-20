// src/app/(authenticated)/layout.tsx

import { ThemeProvider } from "@/components/context/theme-provider";
import { DirectionProvider } from "@/components/context/direction-provider";
import { FontProvider } from "@/components/context/font-provider";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthUser } from "@/types/user.type";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user: AuthUser | null = (session?.user as AuthUser) || null;
  return (
    <ThemeProvider>
      <DirectionProvider>
        <FontProvider>
          <AuthenticatedLayout session={user}>{children}</AuthenticatedLayout>
        </FontProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
}
