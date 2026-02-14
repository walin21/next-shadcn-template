"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <>
      <Header>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main fixed>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Titulo de la sección
          </h2>
          <p className="text-muted-foreground">
            Descripción de la sección, puedes colocar cualquier cosa aquí, como
            un resumen o una introducción a lo que se muestra en esta sección.
          </p>
        </div>
        <div className="flex justify-between gap-4 my-4"></div>
        <Separator className="shadow-sm" />
        <div className="pt-4 pb-16">{/* Aquí iría contenido */}</div>
      </Main>
    </>
  );
}
