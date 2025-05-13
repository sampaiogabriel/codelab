import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

import "../styles/globals.css";
import "../styles/clerk.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeLab",
  description: "Plataforma de Cursos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        variables: {
          colorPrimary: "hsl(160 100% 37%)",
        },
      }}
    >
      <html lang="pt-br" suppressHydrationWarning>
        <body className={cn(nunito.variable, "antialiased font-sans dark")}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
