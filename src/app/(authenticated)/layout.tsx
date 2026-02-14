"use client";

import { ThemeProvider } from "@/components/context/theme-provider";
import { DirectionProvider } from "@/components/context/direction-provider";
import { FontProvider } from "@/components/context/font-provider";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <DirectionProvider>
        <FontProvider>
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </FontProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
}
