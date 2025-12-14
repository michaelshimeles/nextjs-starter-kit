import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/provider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title: "SPE-M - Sistema de Pontuação Estética Médica",
  description:
    "Sistema profissional de avaliação estética médica. Gerencie pacientes, registre avaliações detalhadas e acompanhe resultados com segurança e compliance LGPD.",
  openGraph: {
    title: "SPE-M - Sistema de Pontuação Estética Médica",
    description:
      "Sistema profissional de avaliação estética médica com compliance LGPD e design Apple Vision Pro.",
    url: "https://spe-m.app",
    siteName: "SPE-M",
    locale: "pt-BR",
    type: "website",
  },
  keywords: [
    "estética médica",
    "avaliação estética",
    "prontuário digital",
    "LGPD",
    "sistema médico",
    "dermatologia",
    "cirurgia plástica",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-[-apple-system,BlinkMacSystemFont]antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
