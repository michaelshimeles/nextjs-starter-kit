"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  TrendingUp,
  Edit,
  FileDown,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  cpf: string;
  email: string | null;
  phone: string | null;
  birthDate: string | null;
  address: string | null;
  medicalHistory: string | null;
  allergies: string | null;
  currentMedications: string | null;
  createdAt: string;
}

interface FormWithDetails {
  form: {
    id: string;
    patientId: string;
    status: "draft" | "finalized" | "archived";
    totalScore: string | null;
    classification: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface PatientStats {
  totalForms: number;
  finalizedForms: number;
  averageScore: number;
  lastEvaluation: string | null;
}

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [forms, setForms] = useState<FormWithDetails[]>([]);
  const [stats, setStats] = useState<PatientStats>({
    totalForms: 0,
    finalizedForms: 0,
    averageScore: 0,
    lastEvaluation: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientData();
  }, [params.id]);

  const fetchPatientData = async () => {
    try {
      // Fetch patient
      const patientRes = await fetch(`/api/patients/${params.id}`);
      if (!patientRes.ok) {
        throw new Error("Patient not found");
      }
      const patientData = await patientRes.json();
      setPatient(patientData);

      // Fetch forms for this patient
      const formsRes = await fetch(`/api/forms?patientId=${params.id}`);
      const formsData = await formsRes.json();
      setForms(formsData.forms);

      // Calculate statistics
      const finalizedForms = formsData.forms.filter(
        (f: FormWithDetails) => f.form.status === "finalized"
      );

      const scoresSum = finalizedForms.reduce((acc: number, f: FormWithDetails) => {
        return acc + (f.form.totalScore ? parseFloat(f.form.totalScore) : 0);
      }, 0);

      const averageScore =
        finalizedForms.length > 0 ? scoresSum / finalizedForms.length : 0;

      // Find most recent evaluation
      const sortedForms = [...formsData.forms].sort(
        (a, b) =>
          new Date(b.form.createdAt).getTime() -
          new Date(a.form.createdAt).getTime()
      );

      setStats({
        totalForms: formsData.forms.length,
        finalizedForms: finalizedForms.length,
        averageScore,
        lastEvaluation:
          sortedForms.length > 0 ? sortedForms[0].form.createdAt : null,
      });
    } catch (error) {
      console.error("Error fetching patient data:", error);
      // Redirect to patients list if patient not found
      router.push("/dashboard/patients");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      draft: { label: "Rascunho", variant: "secondary" },
      finalized: { label: "Finalizado", variant: "default" },
      archived: { label: "Arquivado", variant: "outline" },
    };
    const config = variants[status] || variants.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getClassificationBadge = (classification: string | null) => {
    if (!classification) return null;

    const variants: Record<string, { label: string; className: string }> = {
      low: { label: "Baixo Risco", className: "bg-green-500 text-white" },
      medium: { label: "Risco Moderado", className: "bg-yellow-500 text-white" },
      high: { label: "Alto Risco", className: "bg-red-500 text-white" },
    };

    const config = variants[classification];
    if (!config) return null;

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados do paciente...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  const calculateAge = (birthDate: string | null) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="flex flex-col items-start justify-start p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="w-full mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard/patients")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Pacientes
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>

            {/* Patient Info */}
            <div>
              <h1 className="text-3xl font-semibold tracking-tight mb-2">
                {patient.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  CPF: {patient.cpf}
                </div>
                {patient.birthDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {calculateAge(patient.birthDate)} anos
                  </div>
                )}
                {patient.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {patient.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button asChild>
            <Link href={`/dashboard/patients?edit=${patient.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Editar Paciente
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4 w-full mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalForms}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Formulários SPE-M
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finalizadas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Avaliação</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.lastEvaluation
                ? new Date(stats.lastEvaluation).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.lastEvaluation
                ? new Date(stats.lastEvaluation).toLocaleDateString("pt-BR", {
                    year: "numeric",
                  })
                : "Nenhuma avaliação"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 w-full">
        {/* Personal Information */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patient.email && (
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{patient.email}</p>
                </div>
              </div>
            )}

            {patient.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">{patient.phone}</p>
                </div>
              </div>
            )}

            {patient.birthDate && (
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Data de Nascimento</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(patient.birthDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            )}

            {patient.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Endereço</p>
                  <p className="text-sm text-muted-foreground">{patient.address}</p>
                </div>
              </div>
            )}

            {patient.medicalHistory && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Histórico Médico</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {patient.medicalHistory}
                </p>
              </div>
            )}

            {patient.allergies && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Alergias</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {patient.allergies}
                </p>
              </div>
            )}

            {patient.currentMedications && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Medicações Atuais</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {patient.currentMedications}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Forms History with Timeline */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Histórico de Avaliações SPE-M</CardTitle>
            <Button asChild size="sm">
              <Link href={`/dashboard/forms?patientId=${patient.id}&new=true`}>
                <FileText className="w-4 h-4 mr-2" />
                Nova Avaliação
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {forms.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Nenhuma avaliação SPE-M criada para este paciente
                </p>
                <Button asChild>
                  <Link href={`/dashboard/forms?patientId=${patient.id}&new=true`}>
                    Criar primeira avaliação
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Timeline */}
                <div className="relative">
                  {forms
                    .sort(
                      (a, b) =>
                        new Date(b.form.createdAt).getTime() -
                        new Date(a.form.createdAt).getTime()
                    )
                    .map((item, index) => (
                      <div key={item.form.id} className="relative pb-8">
                        {/* Timeline line */}
                        {index < forms.length - 1 && (
                          <div className="absolute left-4 top-10 w-0.5 h-full bg-border" />
                        )}

                        <div className="flex items-start gap-4">
                          {/* Timeline dot */}
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
                              item.form.status === "finalized"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <FileText className="w-4 h-4" />
                          </div>

                          {/* Form card */}
                          <Card className="flex-1">
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    {getStatusBadge(item.form.status)}
                                    {item.form.classification &&
                                      getClassificationBadge(item.form.classification)}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Criado em{" "}
                                    {new Date(item.form.createdAt).toLocaleDateString(
                                      "pt-BR",
                                      {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      }
                                    )}
                                  </p>
                                  {item.form.totalScore && (
                                    <div className="flex items-center gap-2">
                                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                      <span className="font-semibold">
                                        Pontuação:{" "}
                                        {parseFloat(item.form.totalScore).toFixed(2)}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/dashboard/forms/${item.form.id}`}>
                                      <Eye className="w-4 h-4 mr-2" />
                                      Ver
                                    </Link>
                                  </Button>
                                  {item.form.status === "finalized" && (
                                    <Button variant="outline" size="sm" asChild>
                                      <Link href={`/dashboard/forms/${item.form.id}/pdf`}>
                                        <FileDown className="w-4 h-4 mr-2" />
                                        PDF
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {item.form.notes && (
                                <div className="pt-4 border-t">
                                  <p className="text-sm font-medium mb-1">Observações</p>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {item.form.notes}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
