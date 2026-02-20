"use client";

import { useAuthStore } from "@/stores/auth-store";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { signOut } from "next-auth/react";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const { auth } = useAuthStore();

  const handleSignOut = () => {
    auth.reset();
    // Preserve current location for redirect after sign-in
    const currentPath = location.pathname;
    signOut({
      callbackUrl: `/?redirect=${encodeURIComponent(currentPath)}`,
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Cerrar sesión"
      desc="¿Estás seguro de que deseas cerrar sesión? Necesitarás iniciar sesión nuevamente para acceder a tu cuenta."
      confirmText="Cerrar sesión"
      destructive
      handleConfirm={handleSignOut}
      className="sm:max-w-sm"
    />
  );
}
