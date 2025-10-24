"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, FileDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { SPE_M_CRITERIA, classifyProfile } from "@/lib/spe-m-criteria";

interface FormData {
  form: {
    id: string;
    patientId: string;
    status: string;
    totalScore: string | null;
    profileClassification: string | null;
    generalNotes: string | null;
    recommendations: string | null;
    createdAt: string;
    finalizedAt: string | null;
  };
  patient: {
    id: string;
    name: string;
    cpf: string;
    birthDate: string | null;
    phone: string | null;
    email: string | null;
  };
  criteria: Array<{
    id: string;
    criterionNumber: number;
    data: Record<string, string>;
    score: string | null;
    notes: string | null;
  }>;
  images: Array<{
    id: string;
    imageType: string;
    storageUrl: string;
    uploadedAt: string;
  }>;
}

export default function ViewFormPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.id as string;

  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    fetchForm();
  }, [formId]);

  const fetchForm = async () => {
    try {
      const response = await fetch(`/api/forms/${formId}`);
      if (!response.ok) throw new Error("Failed to fetch form");

      const data = await response.json();
      setFormData(data);
    } catch (error) {
      toast.error("Erro ao carregar formulário");
      console.error(error);
      router.push("/dashboard/forms");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-muted-foreground">Formulário não encontrado</p>
      </div>
    );
  }

  const totalScore = formData.form.totalScore ? parseFloat(formData.form.totalScore) : 0;
  const classification = classifyProfile(totalScore);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/forms">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Avaliação SPE-M</h1>
            <p className="text-muted-foreground">
              Paciente: {formData.patient.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {formData.form.status !== "finalized" && (
            <Button asChild>
              <Link href={`/dashboard/forms/${formId}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Link>
            </Button>
          )}
          {formData.form.status === "finalized" && (
            <Button asChild>
              <Link href={`/dashboard/forms/${formId}/pdf`}>
                <FileDown className="w-4 h-4 mr-2" />
                Baixar PDF
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Patient Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informações do Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{formData.patient.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CPF</p>
              <p className="font-medium">
                {formData.patient.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
              </p>
            </div>
            {formData.patient.birthDate && (
              <div>
                <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                <p className="font-medium">
                  {format(new Date(formData.patient.birthDate), "dd/MM/yyyy")}
                </p>
              </div>
            )}
            {formData.patient.phone && (
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{formData.patient.phone}</p>
              </div>
            )}
            {formData.patient.email && (
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{formData.patient.email}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Score Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resultado da Avaliação SPE-M</CardTitle>
          <CardDescription>
            {formData.form.status === "finalized"
              ? `Finalizado em ${format(new Date(formData.form.finalizedAt!), "dd/MM/yyyy 'às' HH:mm")}`
              : "Rascunho - Avaliação não finalizada"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Pontuação Total</p>
              <p className="text-4xl font-bold">{totalScore.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">de 10.00 pontos</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Classificação</p>
              <p className={`text-3xl font-bold ${classification.color}`}>
                {classification.label}
              </p>
            </div>
            <div className="flex items-center justify-center p-4 border rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Descrição</p>
                <p className="text-sm">{classification.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criteria Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detalhes dos Critérios</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
              {SPE_M_CRITERIA.map((criterion) => (
                <TabsTrigger key={criterion.number} value={criterion.number.toString()}>
                  {criterion.number}
                </TabsTrigger>
              ))}
            </TabsList>

            {SPE_M_CRITERIA.map((criterion) => {
              const criterionData = formData.criteria.find(
                (c) => c.criterionNumber === criterion.number
              );

              return (
                <TabsContent key={criterion.number} value={criterion.number.toString()}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{criterion.name}</h3>
                      <p className="text-muted-foreground">{criterion.description}</p>
                      {criterionData?.score && (
                        <p className="text-lg font-semibold mt-2">
                          Pontuação: {parseFloat(criterionData.score).toFixed(2)} / {criterion.maxScore}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {criterion.fields.map((field) => {
                        const selectedValue = criterionData?.data[field.id];
                        const selectedOption = field.options?.find(
                          (opt) => opt.value === selectedValue
                        );

                        return (
                          <div key={field.id} className="p-4 border rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground">
                              {field.label}
                            </p>
                            <p className="text-lg font-semibold mt-1">
                              {selectedOption
                                ? `${selectedOption.label} (${selectedOption.score} pontos)`
                                : "Não avaliado"}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {criterionData?.notes && (
                      <div className="p-4 bg-muted rounded-lg mt-4">
                        <p className="text-sm font-medium mb-2">Observações:</p>
                        <p className="text-sm">{criterionData.notes}</p>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentTab((parseInt(currentTab) - 1).toString())
                        }
                        disabled={criterion.number === 1}
                      >
                        Anterior
                      </Button>
                      <Button
                        onClick={() =>
                          setCurrentTab((parseInt(currentTab) + 1).toString())
                        }
                        disabled={criterion.number === 8}
                      >
                        Próximo
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* General Notes */}
      {(formData.form.generalNotes || formData.form.recommendations) && (
        <Card>
          <CardHeader>
            <CardTitle>Observações e Recomendações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.form.generalNotes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Notas Gerais:
                </p>
                <p className="text-sm whitespace-pre-wrap">
                  {formData.form.generalNotes}
                </p>
              </div>
            )}
            {formData.form.recommendations && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Recomendações:
                </p>
                <p className="text-sm whitespace-pre-wrap">
                  {formData.form.recommendations}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Images Section - Placeholder for now */}
      {formData.images.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Fotos da Avaliação</CardTitle>
            <CardDescription>
              {formData.images.length} foto(s) anexada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.images.map((image) => (
                <div key={image.id} className="border rounded-lg p-4">
                  <p className="text-sm font-medium">{image.imageType}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(image.uploadedAt), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
