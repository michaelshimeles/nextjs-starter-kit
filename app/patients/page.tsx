/**
 * Patients Page - SPE-M
 *
 * @description Página de gerenciamento de pacientes
 * TODO: Implementar CRUD completo, tabela com paginação, busca
 */

import { DashboardLayout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, Filter } from "lucide-react";

// Mock user - TODO: Replace with real auth
const mockUser = {
  name: "Dr. João Silva",
  email: "joao.silva@spe-m.app",
  role: "Médico Dermatologista",
  avatar: undefined,
};

export default function PatientsPage() {
  return (
    <DashboardLayout user={mockUser}>
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Pacientes</h1>
              <p className="text-secondary">Gerencie seus pacientes e históricos</p>
            </div>
          </div>

          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Paciente
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-in-up">
        <Card className="p-6 hover-lift transition-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Total de Pacientes</p>
              <p className="text-3xl font-semibold">127</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover-lift transition-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Novos este mês</p>
              <p className="text-3xl font-semibold">12</p>
            </div>
            <div className="p-3 bg-color-secondary/10 rounded-xl">
              <Plus className="w-6 h-6" style={{ color: "var(--color-secondary)" }} />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover-lift transition-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Ativos</p>
              <p className="text-3xl font-semibold">118</p>
            </div>
            <Badge className="bg-color-secondary text-white">+8% mês</Badge>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="p-6 mb-6 animate-slide-in-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou email..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-subtle bg-secondary focus:border-primary transition-fast"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>
      </Card>

      {/* Patients List - Placeholder */}
      <Card className="p-6 animate-slide-in-up">
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto mb-4 text-tertiary" />
          <h3 className="text-xl font-semibold mb-2">Lista de pacientes</h3>
          <p className="text-secondary mb-6">
            Esta funcionalidade será implementada na próxima fase.
          </p>
          <div className="space-y-2 text-sm text-tertiary">
            <p>✅ TopNavBar funcionando</p>
            <p>✅ Layout responsivo</p>
            <p>✅ Dark mode ativo</p>
            <p>⏳ Tabela de pacientes (próxima etapa)</p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
