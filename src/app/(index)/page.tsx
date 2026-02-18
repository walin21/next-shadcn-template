import Link from "next/link";
import { Logo } from "@/assets/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAuthForm } from "./components/user-auth-form";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Index() {
  return (
    <div className="relative flex h-screen">
      <div className="absolute top-4 right-4">
        <ThemeSwitch />
      </div>
      <div className="container grid h-svh max-w-none items-center justify-center mx-5 lg:mx-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-120 sm:p-8">
          <div className="mb-4 flex items-center justify-center">
            <Logo className="me-2" />
            <h1 className="text-xl font-medium">
              {process.env.NEXT_PUBLIC_COMPANY_NAME || "Nombre_Empresa"}
            </h1>
          </div>
          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="text-lg tracking-tight">
                Iniciar sesión
              </CardTitle>
              <CardDescription>
                Ingrese su correo electrónico y contraseña a continuación para
                iniciar sesión en su cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserAuthForm redirectTo="/dashboard" />
            </CardContent>
            <CardFooter>
              <p className="px-8 text-center text-sm text-muted-foreground">
                Al hacer clic en iniciar sesión, usted acepta nuestros{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Términos de Servicio
                </Link>{" "}
                y{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Política de Privacidad
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
