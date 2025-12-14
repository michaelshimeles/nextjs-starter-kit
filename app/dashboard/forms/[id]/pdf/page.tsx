"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Mail, Printer, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import { downloadPDF } from "@/lib/pdf-generator";

interface FormData {
  form: {
    id: string;
    totalScore: string;
    profileClassification: string;
    generalNotes: string | null;
    recommendations: string | null;
    createdAt: string;
    finalizedAt: string | null;
    status: string;
  };
  patient: {
    name: string;
    cpf: string;
    birthDate: string | null;
    phone: string | null;
    email: string | null;
  };
  criteria: Array<{
    criterionNumber: number;
    data: Record<string, string>;
    score: string;
    notes: string | null;
  }>;
  images: Array<{
    imageType: string;
    storageUrl: string;
  }>;
}

interface UserData {
  name: string;
  crm: string | null;
  specialty: string | null;
}

export default function FormPDFPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.id as string;

  const [formData, setFormData] = useState<FormData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetchData();
  }, [formId]);

  const fetchData = async () => {
    try {
      // Fetch form
      const formResponse = await fetch(`/api/forms/${formId}`);
      if (!formResponse.ok) throw new Error("Failed to fetch form");
      const formData = await formResponse.json();

      // Fetch user data
      const userResponse = await fetch("/api/auth/me");
      if (!userResponse.ok) throw new Error("Failed to fetch user");
      const userData = await userResponse.json();

      setFormData(formData);
      setUserData(userData.user);

      // Set default email
      if (formData.patient.email) {
        setEmailForm((prev) => ({
          ...prev,
          to: formData.patient.email,
          subject: `Relatório de Avaliação SPE-M - ${formData.patient.name}`,
          message: `Prezado(a) ${formData.patient.name},\n\nSegue em anexo o relatório da sua avaliação SPE-M realizada em ${new Date(formData.form.createdAt).toLocaleDateString("pt-BR")}.\n\nAtenciosamente,\nDr(a). ${userData.user.name}`,
        }));
      }
    } catch (error) {
      toast.error("Erro ao carregar dados");
      console.error(error);
      router.push("/dashboard/forms");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!formData || !userData) return;

    setGenerating(true);
    try {
      await downloadPDF({
        form: formData.form,
        patient: formData.patient,
        criteria: formData.criteria,
        images: formData.images,
        doctor: {
          name: userData.name,
          crm: userData.crm,
          specialty: userData.specialty,
        },
      });

      toast.success("PDF gerado e baixado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar PDF");
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = async () => {
    if (!formData || !userData) return;

    setGenerating(true);
    try {
      const { generateSPEMPDF } = await import("@/lib/pdf-generator");
      const pdf = await generateSPEMPDF({
        form: formData.form,
        patient: formData.patient,
        criteria: formData.criteria,
        images: formData.images,
        doctor: {
          name: userData.name,
          crm: userData.crm,
          specialty: userData.specialty,
        },
      });

      // Open in new window for printing
      window.open(pdf.output("bloburl"), "_blank");
      toast.success("PDF aberto em nova janela para impressão");
    } catch (error) {
      toast.error("Erro ao abrir PDF");
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailForm.to) {
      toast.error("Email do destinatário é obrigatório");
      return;
    }

    // TODO: Implement email sending
    toast.info("Funcionalidade de envio de email será implementada em breve");
    setEmailDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!formData || !userData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-muted-foreground">Dados não encontrados</p>
      </div>
    );
  }

  if (formData.form.status !== "finalized") {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Avaliação Não Finalizada</CardTitle>
            <CardDescription>
              O PDF só pode ser gerado para avaliações finalizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Esta avaliação ainda está em rascunho. Finalize a avaliação para poder gerar o relatório em PDF.
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/dashboard/forms/${formId}`}>
                  Visualizar Avaliação
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/dashboard/forms/${formId}/edit`}>
                  Continuar Edição
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/forms/${formId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Relatório PDF</h1>
            <p className="text-muted-foreground">
              {formData.patient.name}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Button
          onClick={handleDownload}
          disabled={generating}
          size="lg"
          className="h-24 flex-col gap-2"
        >
          {generating ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              <span>Baixar PDF</span>
            </>
          )}
        </Button>

        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="h-24 flex-col gap-2"
              disabled={generating}
            >
              <Mail className="w-6 h-6" />
              <span>Enviar por Email</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar PDF por Email</DialogTitle>
              <DialogDescription>
                Preencha os dados para enviar o relatório
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="to">Para (Email) *</Label>
                <Input
                  id="to"
                  type="email"
                  value={emailForm.to}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, to: e.target.value })
                  }
                  placeholder="paciente@email.com"
                />
              </div>
              <div>
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  value={emailForm.subject}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, subject: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  value={emailForm.message}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, message: e.target.value })
                  }
                  rows={5}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setEmailDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSendEmail}>
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          onClick={handlePrint}
          disabled={generating}
          size="lg"
          className="h-24 flex-col gap-2"
        >
          <Printer className="w-6 h-6" />
          <span>Imprimir</span>
        </Button>
      </div>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo do Relatório</CardTitle>
          <CardDescription>
            O PDF incluirá as seguintes informações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Document Structure */}
            <div className="border-l-4 border-primary pl-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Cabeçalho</h3>
                <p className="text-sm text-muted-foreground">
                  Logo do Sistema SPE-M
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Dados do Paciente</h3>
                <p className="text-sm text-muted-foreground">
                  Nome, CPF, Data de Nascimento, Contato
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Informações da Avaliação</h3>
                <p className="text-sm text-muted-foreground">
                  Data, Médico Responsável, CRM, Especialidade
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Resultado da Avaliação</h3>
                <p className="text-sm text-muted-foreground">
                  Pontuação Total: {parseFloat(formData.form.totalScore).toFixed(2)} / 10.00
                  <br />
                  Classificação: {formData.form.profileClassification}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. Tabela de Critérios</h3>
                <p className="text-sm text-muted-foreground">
                  8 critérios com pontuações individuais
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">6. Detalhamento dos Critérios</h3>
                <p className="text-sm text-muted-foreground">
                  Campos selecionados e observações de cada critério
                </p>
              </div>

              {(formData.form.generalNotes || formData.form.recommendations) && (
                <div>
                  <h3 className="font-semibold mb-2">7. Observações e Recomendações</h3>
                  <p className="text-sm text-muted-foreground">
                    Notas gerais e recomendações do médico
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">8. Rodapé</h3>
                <p className="text-sm text-muted-foreground">
                  Paginação e data de geração do documento
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <FileText className="w-5 h-5 mt-0.5 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Formato do Documento</p>
                  <p className="text-muted-foreground">
                    PDF A4, fonte Helvetica, margens padrão, paginação automática
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
