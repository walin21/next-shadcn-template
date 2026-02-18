"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { sleep, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";

const formSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === "" ? "Por favor ingrese su correo electrónico" : undefined,
  }),
  password: z
    .string()
    .min(1, "Por favor ingrese su contraseña")
    .min(7, "La contraseña debe tener al menos 7 caracteres"),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string;
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const { auth } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    toast.promise(sleep(2000), {
      loading: "Iniciando sesión...",
      success: () => {
        setIsLoading(false);

        // Mock successful authentication with expiry computed at success time
        const mockUser = {
          accountNo: "ACC001",
          email: data.email,
          role: ["user"],
          exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        };

        // Set user and access token
        auth.setUser(mockUser);
        auth.setAccessToken("mock-access-token");

        // Redirect to the stored location or default to dashboard
        const targetPath = redirectTo || "/";
        navigate.push(targetPath);

        return `¡Bienvenido de nuevo, ${data.email}!`;
      },
      error: "Error al iniciar sesión",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
              <Link
                href="/forgot-password"
                className="absolute end-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </FormItem>
          )}
        />
        <Button className="my-2" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
}
