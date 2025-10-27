/**
 * Forms Page - SPE-M
 *
 * @description Página de gerenciamento de fichas de avaliação
 * TODO: Implementar listagem, filtros, criação de fichas
 */

import { DashboardLayout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, TrendingUp, Calendar } from "lucide-react";

// Mock user - TODO: Replace with real auth
const mockUser = {
  name: "Dr. João Silva",
  email: "joao.silva@spe-m.app",
  role: "Médico Dermatologista",
  avatar: undefined,
};

export default function FormsPage() {
  return (
    <DashboardLayout user={mockUser}>
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Fichas de Avaliação</h1>
              <p className="text-secondary">Sistema de Pontuação Estética (0-24 pontos)</p>
            </div>
          </div>

          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Ficha
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-in-up">
        <Card className="p-6 hover-lift transition-base">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-secondary">Total de Fichas</p>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-semibold">342</p>
        </Card>

        <Card className="p-6 hover-lift transition-base">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-secondary">Este Mês</p>
            <Calendar className="w-5 h-5 text-color-secondary" />
          </div>
          <p className="text-3xl font-semibold">28</p>
        </Card>

        <Card className="p-6 hover-lift transition-base">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-secondary">Score Médio</p>
            <TrendingUp className="w-5 h-5 text-color-warning" />
          </div>
          <p className="text-3xl font-semibold">16.4</p>
        </Card>

        <Card className="p-6 hover-lift transition-base">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-secondary">Rascunhos</p>
            <Badge variant="secondary">Pendentes</Badge>
          </div>
          <p className="text-3xl font-semibold">5</p>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card className="p-6 mb-8 animate-slide-in-up">
        <h3 className="text-lg font-semibold mb-4">Distribuição de Risco</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="risk-badge-low p-4 rounded-xl text-center">
            <p className="text-sm font-medium mb-1">Risco Baixo</p>
            <p className="text-2xl font-bold">45%</p>
            <p className="text-xs opacity-75 mt-1">18-24 pontos</p>
          </div>
          <div className="risk-badge-medium p-4 rounded-xl text-center">
            <p className="text-sm font-medium mb-1">Risco Médio</p>
            <p className="text-2xl font-bold">38%</p>
            <p className="text-xs opacity-75 mt-1">12-17 pontos</p>
          </div>
          <div className="risk-badge-high p-4 rounded-xl text-center">
            <p className="text-sm font-medium mb-1">Risco Alto</p>
            <p className="text-2xl font-bold">17%</p>
            <p className="text-xs opacity-75 mt-1">0-11 pontos</p>
          </div>
        </div>
      </Card>

      {/* 8 Criteria Overview */}
      <Card className="p-6 mb-8 animate-slide-in-up">
        <h3 className="text-lg font-semibold mb-4">8 Critérios de Avaliação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 1, name: "Desvio de Septo", icon: "🔹" },
            { id: 2, name: "Giba Óssea", icon: "🔸" },
            { id: 3, name: "Sulco Nasogeniano", icon: "〰️" },
            { id: 4, name: "Rugas Periorbitais", icon: "👁️" },
            { id: 5, name: "Flacidez Facial", icon: "📐" },
            { id: 6, name: "Acne/Cicatrizes", icon: "🔴" },
            { id: 7, name: "Pigmentação Cutânea", icon: "🎨" },
            { id: 8, name: "Textura da Pele", icon: "✨" },
          ].map((criterion) => (
            <div
              key={criterion.id}
              className="p-4 bg-secondary rounded-lg hover:bg-tertiary transition-base"
            >
              <div className="text-2xl mb-2">{criterion.icon}</div>
              <p className="text-sm font-medium">{criterion.name}</p>
              <p className="text-xs text-tertiary mt-1">0-3 pontos</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Forms List - Placeholder */}
      <Card className="p-6 animate-slide-in-up">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-tertiary" />
          <h3 className="text-xl font-semibold mb-2">Lista de fichas</h3>
          <p className="text-secondary mb-6">
            Esta funcionalidade será implementada na próxima fase.
          </p>
          <div className="space-y-2 text-sm text-tertiary">
            <p>✅ Sistema de pontuação definido (0-24)</p>
            <p>✅ 8 critérios configurados</p>
            <p>✅ Risk badges funcionando</p>
            <p>⏳ Formulário de criação (próxima etapa)</p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
