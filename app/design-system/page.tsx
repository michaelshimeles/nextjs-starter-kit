/**
 * Design System Demo Page
 *
 * @description Página de demonstração do Design System SPE-M com Apple Vision Pro aesthetics
 * Para testar: http://localhost:3000/design-system
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Moon,
  Sun,
  Activity,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useTheme } from "next-themes";

export default function DesignSystemPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useState(() => {
    setMounted(true);
  });

  return (
    <div className="min-h-screen bg-primary">
      {/* Skip to main content - Accessibility */}
      <a href="#main-content" className="skip-to-main">
        Pular para conteúdo principal
      </a>

      {/* Header */}
      <header className="glass-effect border-b border-subtle sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-semibold">SPE-M Design System</h1>
                <p className="text-sm text-secondary">Apple Vision Pro Inspired</p>
              </div>
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Alternar tema"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-6 py-12 space-y-12">

        {/* Colors Section */}
        <section className="animate-fade-in">
          <h2 className="text-3xl font-semibold mb-6">Paleta de Cores</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Colors */}
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Primary (Medical Blue)</h3>
              <div className="space-y-2">
                <div className="h-16 rounded-lg" style={{ backgroundColor: 'var(--color-primary)' }} />
                <p className="text-sm text-secondary">--color-primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg" style={{ backgroundColor: 'var(--color-primary-hover)' }} />
                <p className="text-sm text-secondary">--color-primary-hover</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg" style={{ backgroundColor: 'var(--color-primary-light)' }} />
                <p className="text-sm text-secondary">--color-primary-light</p>
              </div>
            </Card>

            {/* Semantic Colors */}
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Semantic Colors</h3>
              <div className="space-y-2">
                <div className="h-12 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }} />
                <p className="text-sm text-secondary">Success (Green)</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded-lg" style={{ backgroundColor: 'var(--color-warning)' }} />
                <p className="text-sm text-secondary">Warning (Orange)</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded-lg" style={{ backgroundColor: 'var(--color-error)' }} />
                <p className="text-sm text-secondary">Error (Red)</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded-lg" style={{ backgroundColor: 'var(--color-accent)' }} />
                <p className="text-sm text-secondary">Accent (Purple)</p>
              </div>
            </Card>

            {/* Risk Classification */}
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Risk Classification</h3>
              <div className="space-y-3">
                <div className="risk-badge-low px-4 py-2 rounded-full font-medium text-center">
                  BAIXO RISCO
                </div>
                <div className="risk-badge-medium px-4 py-2 rounded-full font-medium text-center">
                  MÉDIO RISCO
                </div>
                <div className="risk-badge-high px-4 py-2 rounded-full font-medium text-center">
                  ALTO RISCO
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="animate-slide-in-up">
          <h2 className="text-3xl font-semibold mb-6">Tipografia</h2>

          <Card className="p-6 space-y-4">
            <h1 className="text-primary">Heading 1 - Apple San Francisco</h1>
            <h2 className="text-primary">Heading 2 - Medium Weight</h2>
            <h3 className="text-primary">Heading 3 - Tracking Tight</h3>
            <h4 className="text-primary">Heading 4 - Readable</h4>
            <p className="text-primary">
              Parágrafo normal com fonte system Apple. Otimizado para legibilidade em telas de alta resolução.
            </p>
            <p className="text-secondary">
              Texto secundário com menor contraste, ideal para informações complementares.
            </p>
            <p className="text-tertiary">
              Texto terciário para labels e metadados.
            </p>
            <code>const variable = "SF Mono - Monospace Font";</code>
          </Card>
        </section>

        {/* Glassmorphism Effects */}
        <section className="animate-slide-in-up">
          <h2 className="text-3xl font-semibold mb-6">Glassmorphism & Depth</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Glass Effect</h3>
              <p className="text-secondary">
                Backdrop blur + saturação + transparência
              </p>
            </div>

            <Card className="depth-1 p-6">
              <h3 className="text-xl font-semibold mb-2">Depth Level 1</h3>
              <p className="text-secondary">
                Shadow suave para elementos próximos
              </p>
            </Card>

            <Card className="depth-2 p-6">
              <h3 className="text-xl font-semibold mb-2">Depth Level 2</h3>
              <p className="text-secondary">
                Shadow média para elevação moderada
              </p>
            </Card>

            <Card className="depth-3 p-6 md:col-span-3">
              <h3 className="text-xl font-semibold mb-2">Depth Level 3</h3>
              <p className="text-secondary">
                Shadow profunda para modais e overlays
              </p>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section className="animate-slide-in-up">
          <h2 className="text-3xl font-semibold mb-6">Buttons & Actions</h2>

          <Card className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Primary Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Default Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Pacientes
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Fichas
                </Button>
                <Button variant="ghost">
                  <Activity className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Badges */}
        <section className="animate-slide-in-up">
          <h2 className="text-3xl font-semibold mb-6">Badges & Status</h2>

          <Card className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Standard Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Medical Context - Risk Levels</h3>
              <div className="flex flex-wrap gap-3">
                <div className="risk-badge-low px-4 py-2 rounded-full font-medium inline-flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Risco Baixo (18-24 pts)
                </div>
                <div className="risk-badge-medium px-4 py-2 rounded-full font-medium inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Risco Médio (12-17 pts)
                </div>
                <div className="risk-badge-high px-4 py-2 rounded-full font-medium inline-flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Risco Alto (0-11 pts)
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Forms */}
        <section className="animate-slide-in-up">
          <h2 className="text-3xl font-semibold mb-6">Form Elements</h2>

          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Paciente</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite o nome completo"
                className="transition-fast"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF (Mascarado)</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="***.***.***-XX"
                disabled
                value="***.***.***-45"
              />
              <p className="text-xs text-tertiary">
                CPF sempre mascarado para compliance LGPD
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="flex gap-3">
              <Button>Salvar</Button>
              <Button variant="outline">Cancelar</Button>
            </div>
          </Card>
        </section>

        {/* Hover Effects */}
        <section className="animate-slide-in-up">
          <h2 className="text-3xl font-semibold mb-6">Hover & Transitions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-lift p-6 cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">Hover Lift</h3>
              <p className="text-secondary">
                Passe o mouse para ver o efeito de elevação suave
              </p>
            </Card>

            <Card className="hover-glow p-6 cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">Hover Glow</h3>
              <p className="text-secondary">
                Passe o mouse para ver o efeito de brilho
              </p>
            </Card>
          </div>
        </section>

        {/* Animations */}
        <section className="animate-scale-in">
          <h2 className="text-3xl font-semibold mb-6">Animations</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="animate-fade-in p-6">
              <h3 className="text-lg font-semibold mb-2">Fade In</h3>
              <p className="text-sm text-secondary">
                Animação de entrada suave
              </p>
            </Card>

            <Card className="animate-slide-in-up p-6">
              <h3 className="text-lg font-semibold mb-2">Slide In Up</h3>
              <p className="text-sm text-secondary">
                Desliza de baixo para cima
              </p>
            </Card>

            <Card className="animate-scale-in p-6">
              <h3 className="text-lg font-semibold mb-2">Scale In</h3>
              <p className="text-sm text-secondary">
                Escala de 95% para 100%
              </p>
            </Card>
          </div>
        </section>

        {/* Accessibility */}
        <section className="animate-slide-in-up">
          <h2 className="text-3xl font-semibold mb-6">Acessibilidade</h2>

          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">WCAG 2.1 AA Compliance</h3>
              <ul className="list-disc list-inside space-y-1 text-secondary">
                <li>Contraste mínimo de 4.5:1 para texto normal</li>
                <li>Contraste mínimo de 3:1 para texto grande (≥18px)</li>
                <li>Foco visível em todos os elementos interativos</li>
                <li>Labels associados a todos os inputs</li>
                <li>ARIA labels em botões sem texto</li>
                <li>Navegação por teclado funcional</li>
                <li>Suporte para leitores de tela</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Teclado</h3>
              <p className="text-secondary">
                Pressione <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Tab</kbd> para navegar entre elementos interativos.
              </p>
              <p className="text-secondary">
                Todos os elementos focáveis mostram um outline de 2px na cor primária.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Reduced Motion</h3>
              <p className="text-secondary">
                Animações são desabilitadas automaticamente quando o usuário tem preferência por movimento reduzido (prefers-reduced-motion).
              </p>
            </div>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-subtle mt-12 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-secondary">
            SPE-M Design System v2.0 - Apple Vision Pro Inspired
          </p>
          <p className="text-tertiary text-sm mt-2">
            Built with Next.js 15, TypeScript, Tailwind CSS 4, and Shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
}
