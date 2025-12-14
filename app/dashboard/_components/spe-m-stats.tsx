"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Stats {
  totalPatients: number;
  totalForms: number;
  finalizedForms: number;
  averageScore: number;
  recentForms: Array<{
    form: {
      id: string;
      totalScore: string | null;
      createdAt: string;
    };
    patient: {
      name: string;
    } | null;
  }>;
}

export function SPEMStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch patients
      const patientsRes = await fetch("/api/patients");
      const patientsData = await patientsRes.json();

      // Fetch forms
      const formsRes = await fetch("/api/forms?limit=100");
      const formsData = await formsRes.json();

      const finalizedForms = formsData.forms.filter(
        (f: any) => f.form.status === "finalized"
      );

      const scoresSum = finalizedForms.reduce((acc: number, f: any) => {
        return acc + (f.form.totalScore ? parseFloat(f.form.totalScore) : 0);
      }, 0);

      const averageScore = finalizedForms.length > 0
        ? scoresSum / finalizedForms.length
        : 0;

      setStats({
        totalPatients: patientsData.patients.length,
        totalForms: formsData.forms.length,
        finalizedForms: finalizedForms.length,
        averageScore,
        recentForms: formsData.forms.slice(0, 5),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carregando...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cadastrados no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Criadas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalForms}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total de formulários SPE-M
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finalizadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.finalizedForms}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.totalForms > 0
                ? `${((stats.finalizedForms / stats.totalForms) * 100).toFixed(0)}% do total`
                : "Nenhuma avaliação"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontuação Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.averageScore > 0 ? stats.averageScore.toFixed(2) : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Das avaliações finalizadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Forms */}
      <Card>
        <CardHeader>
          <CardTitle>Avaliações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentForms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Nenhuma avaliação criada ainda
              </p>
              <Button asChild>
                <Link href="/dashboard/forms">Criar primeira avaliação</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentForms.map((item) => (
                <div
                  key={item.form.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">
                      {item.patient?.name || "Paciente não encontrado"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.form.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.form.totalScore && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Pontuação</p>
                        <p className="font-semibold">
                          {parseFloat(item.form.totalScore).toFixed(2)}
                        </p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/forms/${item.form.id}`}>Ver</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/dashboard/patients">
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Pacientes
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/forms">
                <FileText className="w-4 h-4 mr-2" />
                Ver Formulários
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sobre o Sistema SPE-M</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sistema Digital de Pontuação Estética Médica para avaliação
              cirúrgica completa com 8 critérios específicos, cálculo automático
              de pontuação e classificação de perfil.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
