/**
 * Navigation Demo - SPE-M
 *
 * @description Página de demonstração do sistema de navegação completo
 * Acesse: http://localhost:3000/navigation-demo
 */

import { DashboardLayout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Mock user - TODO: Replace with real auth
const mockUser = {
  name: "Dr. João Silva",
  email: "joao.silva@spe-m.app",
  role: "Médico Dermatologista",
  avatar: undefined,
};

export default function NavigationDemoPage() {
  return (
    <DashboardLayout user={mockUser}>
      {/* Hero Section */}
      <div className="mb-12 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Sistema de Navegação Ativo
          </span>
        </div>

        <h1 className="text-5xl font-bold mb-4">
          SPE-M Sistema Médico
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Sistema de Pontuação Estética Médica com navegação Apple Vision Pro
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-in-up">
        {/* Feature 1 */}
        <Card className="p-6 hover-lift transition-base">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">TopNavBar</h3>
          <p className="text-secondary mb-4">
            Navegação fixa com glassmorphism, dark mode toggle e user menu
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-color-secondary">
              <CheckCircle className="w-4 h-4" />
              <span>Glassmorphism effect</span>
            </div>
            <div className="flex items-center gap-2 text-color-secondary">
              <CheckCircle className="w-4 h-4" />
              <span>Responsive + Mobile nav</span>
            </div>
            <div className="flex items-center gap-2 text-color-secondary">
              <CheckCircle className="w-4 h-4" />
              <span>Accessibility WCAG 2.1</span>
            </div>
          </div>
        </Card>

        {/* Feature 2 */}
        <Card className="p-6 hover-lift transition-base">
          <div className="w-12 h-12 bg-color-secondary rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Pacientes</h3>
          <p className="text-secondary mb-4">
            Gestão completa de pacientes com dados protegidos (LGPD)
          </p>
          <Link href="/patients">
            <Button variant="outline" className="w-full gap-2">
              Acessar Pacientes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>

        {/* Feature 3 */}
        <Card className="p-6 hover-lift transition-base">
          <div className="w-12 h-12 bg-color-warning rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Fichas</h3>
          <p className="text-secondary mb-4">
            Sistema de pontuação estética com 8 critérios (0-24 pontos)
          </p>
          <Link href="/forms">
            <Button variant="outline" className="w-full gap-2">
              Acessar Fichas
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </div>

      {/* Implementation Status */}
      <Card className="p-8 mb-12 animate-slide-in-up">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Status de Implementação
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-color-secondary" />
              Concluído
            </h3>
            <ul className="space-y-2">
              {[
                "Design System Apple Vision Pro",
                "CSS Variables (light + dark)",
                "Glassmorphism & Depth Effects",
                "Risk Classification Badges",
                "TopNavBar Component",
                "DashboardLayout Wrapper",
                "Mobile Bottom Navigation",
                "Theme Toggle (Dark Mode)",
                "User Menu & Dropdown",
                "Accessibility (WCAG 2.1 AA)",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-secondary">
                  <div className="w-2 h-2 rounded-full bg-color-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pending */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-color-warning" />
              Próximas Etapas
            </h3>
            <ul className="space-y-2">
              {[
                "CRUD de Pacientes",
                "Tabela com paginação",
                "Formulário de 8 critérios",
                "Cálculo automático de score",
                "PatientCard Component",
                "RiskBadge Component (React)",
                "Validações LGPD",
                "Masking de dados sensíveis",
                "Audit logs",
                "Integração com Backend",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-secondary">
                  <div className="w-2 h-2 rounded-full bg-color-warning" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Testing Instructions */}
      <Card className="p-8 glass-effect animate-scale-in">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Como Testar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
              1
            </div>
            <h3 className="font-semibold mb-2">Navegação</h3>
            <p className="text-sm text-secondary">
              Clique em "Pacientes" ou "Fichas" na TopNavBar para navegar
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
              2
            </div>
            <h3 className="font-semibold mb-2">Dark Mode</h3>
            <p className="text-sm text-secondary">
              Clique no ícone de lua/sol no canto superior direito
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
              3
            </div>
            <h3 className="font-semibold mb-2">User Menu</h3>
            <p className="text-sm text-secondary">
              Clique no avatar para ver perfil, configurações e logout
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Links */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <Link href="/design-system" className="block">
          <Card className="p-6 hover-lift transition-base cursor-pointer">
            <h3 className="font-semibold mb-2">Design System</h3>
            <p className="text-sm text-secondary mb-3">
              Ver todos os componentes e paleta de cores
            </p>
            <Badge>Demo completa</Badge>
          </Card>
        </Link>

        <Link href="/patients" className="block">
          <Card className="p-6 hover-lift transition-base cursor-pointer">
            <h3 className="font-semibold mb-2">Pacientes</h3>
            <p className="text-sm text-secondary mb-3">
              Página de gestão de pacientes
            </p>
            <Badge variant="secondary">Em construção</Badge>
          </Card>
        </Link>

        <Link href="/forms" className="block">
          <Card className="p-6 hover-lift transition-base cursor-pointer">
            <h3 className="font-semibold mb-2">Fichas</h3>
            <p className="text-sm text-secondary mb-3">
              Sistema de pontuação estética
            </p>
            <Badge variant="secondary">Em construção</Badge>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}
