import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";

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
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn(nunito.variable, "antialiased font-sans dark")}>
        {children}
      </body>
    </html>
  );
}
