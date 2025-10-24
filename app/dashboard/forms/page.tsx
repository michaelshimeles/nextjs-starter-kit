"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, Eye, FileDown, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Form {
  form: {
    id: string;
    patientId: string;
    status: string;
    totalScore: string | null;
    profileClassification: string | null;
    createdAt: string;
    finalizedAt: string | null;
  };
  patient: {
    id: string;
    name: string;
    cpf: string;
  } | null;
}

interface Patient {
  id: string;
  name: string;
  cpf: string;
}

export default function FormsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientIdParam = searchParams.get("patient");

  const [forms, setForms] = useState<Form[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isNewFormDialogOpen, setIsNewFormDialogOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  // Fetch forms
  const fetchForms = async () => {
    try {
      const params = new URLSearchParams();
      if (patientIdParam) params.append("patientId", patientIdParam);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const response = await fetch(`/api/forms?${params}`);
      if (!response.ok) throw new Error("Failed to fetch forms");

      const data = await response.json();
      setForms(data.forms);
    } catch (error) {
      toast.error("Erro ao carregar formulários");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch patients for dropdown
  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/patients");
      if (!response.ok) throw new Error("Failed to fetch patients");

      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
    fetchPatients();
  }, [statusFilter, patientIdParam]);

  // Handle create form
  const handleCreateForm = async () => {
    if (!selectedPatientId) {
      toast.error("Selecione um paciente");
      return;
    }

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: selectedPatientId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create form");
      }

      const data = await response.json();
      toast.success("Formulário criado com sucesso!");
      setIsNewFormDialogOpen(false);
      setSelectedPatientId("");

      // Navigate to edit page
      router.push(`/dashboard/forms/${data.form.id}/edit`);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string, patientName: string) => {
    if (!confirm(`Tem certeza que deseja excluir o formulário do paciente ${patientName}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete form");

      toast.success("Formulário excluído com sucesso!");
      fetchForms();
    } catch (error) {
      toast.error("Erro ao excluir formulário");
      console.error(error);
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { label: "Rascunho", className: "bg-yellow-100 text-yellow-800" },
      finalized: { label: "Finalizado", className: "bg-green-100 text-green-800" },
      archived: { label: "Arquivado", className: "bg-gray-100 text-gray-800" },
    };

    const badge = badges[status as keyof typeof badges] || badges.draft;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  // Get classification badge
  const getClassificationBadge = (classification: string | null) => {
    if (!classification) return <span className="text-muted-foreground">-</span>;

    const badges = {
      low: { label: "Baixo Risco", className: "bg-green-100 text-green-800" },
      medium: { label: "Médio Risco", className: "bg-yellow-100 text-yellow-800" },
      high: { label: "Alto Risco", className: "bg-red-100 text-red-800" },
    };

    const badge = badges[classification as keyof typeof badges];
    if (!badge) return <span className="text-muted-foreground">-</span>;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Carregando formulários...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Formulários SPE-M</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie avaliações cirúrgicas e estéticas
            </p>
          </div>
          <Dialog open={isNewFormDialogOpen} onOpenChange={setIsNewFormDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Avaliação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Avaliação SPE-M</DialogTitle>
                <DialogDescription>
                  Selecione o paciente para iniciar uma nova avaliação
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="patient">Paciente *</Label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsNewFormDialogOpen(false);
                      setSelectedPatientId("");
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateForm}>
                    Criar Formulário
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
                <SelectItem value="finalized">Finalizados</SelectItem>
                <SelectItem value="archived">Arquivados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pontuação</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Finalizado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">
                      Nenhum formulário encontrado
                    </p>
                    <Button
                      variant="link"
                      onClick={() => setIsNewFormDialogOpen(true)}
                      className="mt-2"
                    >
                      Criar primeiro formulário
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                forms.map((item) => (
                  <TableRow key={item.form.id}>
                    <TableCell className="font-medium">
                      {item.patient?.name || "Paciente não encontrado"}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.form.status)}</TableCell>
                    <TableCell>
                      {item.form.totalScore
                        ? parseFloat(item.form.totalScore).toFixed(2)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {getClassificationBadge(item.form.profileClassification)}
                    </TableCell>
                    <TableCell>
                      {format(new Date(item.form.createdAt), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      {item.form.finalizedAt
                        ? format(new Date(item.form.finalizedAt), "dd/MM/yyyy HH:mm")
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link href={`/dashboard/forms/${item.form.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        {item.form.status !== "finalized" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <Link href={`/dashboard/forms/${item.form.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                        {item.form.status === "finalized" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <Link href={`/dashboard/forms/${item.form.id}/pdf`}>
                              <FileDown className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDelete(item.form.id, item.patient?.name || "")
                          }
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total de Formulários</p>
            <p className="text-2xl font-bold mt-1">{forms.length}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Rascunhos</p>
            <p className="text-2xl font-bold mt-1">
              {forms.filter((f) => f.form.status === "draft").length}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Finalizados</p>
            <p className="text-2xl font-bold mt-1">
              {forms.filter((f) => f.form.status === "finalized").length}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Pontuação Média</p>
            <p className="text-2xl font-bold mt-1">
              {forms.length > 0
                ? (
                    forms
                      .filter((f) => f.form.totalScore)
                      .reduce(
                        (acc, f) => acc + parseFloat(f.form.totalScore || "0"),
                        0
                      ) /
                    forms.filter((f) => f.form.totalScore).length
                  ).toFixed(2)
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
