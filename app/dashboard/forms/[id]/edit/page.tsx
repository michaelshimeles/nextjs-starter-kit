"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, CheckCircle2, Loader2, Check, Circle } from "lucide-react";
import Link from "next/link";
import { SPE_M_CRITERIA, calculateCriterionScore, calculateTotalScore, classifyProfile } from "@/lib/spe-m-criteria";

interface FormData {
  form: {
    id: string;
    patientId: string;
    status: string;
    totalScore: string | null;
    profileClassification: string | null;
    generalNotes: string | null;
    recommendations: string | null;
  };
  patient: {
    id: string;
    name: string;
    cpf: string;
  };
  criteria: Array<{
    id: string;
    criterionNumber: number;
    data: Record<string, string>;
    score: string | null;
    notes: string | null;
    recommendations: string | null;
  }>;
}

export default function EditFormPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.id as string;

  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);

  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialDataRef = useRef<string>("");

  // Fetch form data
  useEffect(() => {
    fetchForm();
  }, [formId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!formData || formData.form.status === "finalized") return;

    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearInterval(autoSaveTimerRef.current);
    }

    // Set up auto-save
    autoSaveTimerRef.current = setInterval(() => {
      if (hasUnsavedChanges) {
        handleAutoSave();
      }
    }, 30000); // 30 seconds

    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, [formData, hasUnsavedChanges]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Track changes
  useEffect(() => {
    if (!formData) return;

    const currentData = JSON.stringify({
      criteria: formData.criteria,
      generalNotes: formData.form.generalNotes,
      recommendations: formData.form.recommendations,
    });

    if (initialDataRef.current && currentData !== initialDataRef.current) {
      setHasUnsavedChanges(true);
    }
  }, [formData]);

  const fetchForm = async () => {
    try {
      const response = await fetch(`/api/forms/${formId}`);
      if (!response.ok) throw new Error("Failed to fetch form");

      const data = await response.json();
      setFormData(data);

      // Store initial data for comparison
      initialDataRef.current = JSON.stringify({
        criteria: data.criteria,
        generalNotes: data.form.generalNotes,
        recommendations: data.form.recommendations,
      });
    } catch (error) {
      toast.error("Erro ao carregar formulário");
      console.error(error);
      router.push("/dashboard/forms");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoSave = async () => {
    if (!formData || autoSaving) return;

    setAutoSaving(true);
    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generalNotes: formData.form.generalNotes,
          recommendations: formData.form.recommendations,
          criteria: formData.criteria.map((c) => ({
            criterionNumber: c.criterionNumber,
            data: c.data,
            score: c.score,
            notes: c.notes,
            recommendations: c.recommendations,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to auto-save form");

      setLastSaved(new Date());
      setHasUnsavedChanges(false);

      // Update initial data reference
      initialDataRef.current = JSON.stringify({
        criteria: formData.criteria,
        generalNotes: formData.form.generalNotes,
        recommendations: formData.form.recommendations,
      });
    } catch (error) {
      console.error("Auto-save error:", error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleFieldChange = (criterionNumber: number, fieldId: string, value: string) => {
    if (!formData) return;

    const updatedCriteria = formData.criteria.map((criterion) => {
      if (criterion.criterionNumber === criterionNumber) {
        const newData = { ...criterion.data, [fieldId]: value };
        const newScore = calculateCriterionScore(criterionNumber, newData);

        return {
          ...criterion,
          data: newData,
          score: newScore.toFixed(2),
        };
      }
      return criterion;
    });

    setFormData({
      ...formData,
      criteria: updatedCriteria,
    });
  };

  const handleNotesChange = (criterionNumber: number, notes: string) => {
    if (!formData) return;

    const updatedCriteria = formData.criteria.map((criterion) =>
      criterion.criterionNumber === criterionNumber
        ? { ...criterion, notes }
        : criterion
    );

    setFormData({
      ...formData,
      criteria: updatedCriteria,
    });
  };

  const handleSave = async () => {
    if (!formData) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generalNotes: formData.form.generalNotes,
          recommendations: formData.form.recommendations,
          criteria: formData.criteria.map((c) => ({
            criterionNumber: c.criterionNumber,
            data: c.data,
            score: c.score,
            notes: c.notes,
            recommendations: c.recommendations,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to save form");

      toast.success("Formulário salvo com sucesso!");
      setLastSaved(new Date());
      setHasUnsavedChanges(false);

      // Update initial data reference
      initialDataRef.current = JSON.stringify({
        criteria: formData.criteria,
        generalNotes: formData.form.generalNotes,
        recommendations: formData.form.recommendations,
      });

      fetchForm();
    } catch (error) {
      toast.error("Erro ao salvar formulário");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleFinalize = async () => {
    if (!formData) return;

    if (!confirm("Tem certeza que deseja finalizar este formulário? Ele não poderá mais ser editado.")) {
      return;
    }

    setFinalizing(true);
    try {
      await handleSave();

      const response = await fetch(`/api/forms/${formId}/finalize`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to finalize form");

      const data = await response.json();
      toast.success(`Formulário finalizado! Pontuação: ${data.totalScore.toFixed(2)}`);
      router.push(`/dashboard/forms/${formId}`);
    } catch (error) {
      toast.error("Erro ao finalizar formulário");
      console.error(error);
    } finally {
      setFinalizing(false);
    }
  };

  const getCurrentTotalScore = () => {
    if (!formData) return 0;

    return calculateTotalScore(
      formData.criteria.map((c) => ({
        criterionNumber: c.criterionNumber,
        data: c.data,
      }))
    );
  };

  const getCurrentClassification = () => {
    const score = getCurrentTotalScore();
    return classifyProfile(score);
  };

  // Calculate progress
  const getCompletedCriteria = () => {
    if (!formData) return 0;
    return formData.criteria.filter((c) => {
      const criterion = SPE_M_CRITERIA.find((cr) => cr.number === c.criterionNumber);
      if (!criterion) return false;

      // Check if all required fields are filled
      return criterion.fields.every((field) => c.data[field.id]);
    }).length;
  };

  const progressPercentage = (getCompletedCriteria() / 8) * 100;

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

  if (formData.form.status === "finalized") {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Formulário Finalizado</h2>
          <p className="text-muted-foreground mb-6">
            Este formulário já foi finalizado e não pode ser editado.
          </p>
          <Button asChild>
            <Link href={`/dashboard/forms/${formId}`}>
              Visualizar Formulário
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const classification = getCurrentClassification();

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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Paciente: {formData.patient.name}</span>
              {lastSaved && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-600" />
                    Auto-salvo {new Date(lastSaved).toLocaleTimeString("pt-BR")}
                  </span>
                </>
              )}
              {autoSaving && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Salvando...
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={saving || finalizing || !hasUnsavedChanges}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salvar Rascunho
          </Button>
          <Button onClick={handleFinalize} disabled={saving || finalizing}>
            {finalizing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            )}
            Finalizar
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progresso da Avaliação</span>
              <span className="text-muted-foreground">
                {getCompletedCriteria()}/8 critérios completos ({Math.round(progressPercentage)}%)
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Visual Stepper */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {SPE_M_CRITERIA.map((criterion, index) => {
              const criterionData = formData.criteria.find(
                (c) => c.criterionNumber === criterion.number
              );
              const isComplete = criterionData && criterion.fields.every((field) => criterionData.data[field.id]);
              const isCurrent = currentTab === criterion.number.toString();

              return (
                <div key={criterion.number} className="flex items-center flex-1">
                  <button
                    onClick={() => setCurrentTab(criterion.number.toString())}
                    className={`flex flex-col items-center gap-2 w-full ${
                      isCurrent ? "opacity-100" : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        isComplete
                          ? "bg-green-600 text-white"
                          : isCurrent
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{criterion.number}</span>
                      )}
                    </div>
                    <span className="text-xs text-center max-w-[80px] line-clamp-2">
                      {criterion.name.split(" ")[0]}
                    </span>
                  </button>
                  {index < SPE_M_CRITERIA.length - 1 && (
                    <div className={`h-[2px] flex-1 ${isComplete ? "bg-green-600" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Score Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pontuação Atual</CardTitle>
          <CardDescription>
            Cálculo automático baseado nos critérios preenchidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Pontuação Total</p>
              <p className="text-3xl font-bold">{getCurrentTotalScore().toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Classificação</p>
              <p className={`text-2xl font-bold ${classification.color}`}>
                {classification.label}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Descrição</p>
              <p className="text-sm mt-2">{classification.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criteria Content */}
      <Card>
        <CardContent className="pt-6">
          {SPE_M_CRITERIA.map((criterion) => {
            const criterionData = formData.criteria.find(
              (c) => c.criterionNumber === criterion.number
            );

            if (currentTab !== criterion.number.toString()) return null;

            return (
              <div key={criterion.number} className="space-y-6">
                {/* Criterion Header */}
                <div>
                  <h3 className="text-xl font-bold">{criterion.name}</h3>
                  <p className="text-muted-foreground">{criterion.description}</p>
                  {criterionData?.score && (
                    <p className="text-lg font-semibold mt-2">
                      Pontuação: {parseFloat(criterionData.score).toFixed(2)} / {criterion.maxScore}
                    </p>
                  )}
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {criterion.fields.map((field) => (
                    <div key={field.id}>
                      <Label htmlFor={field.id}>{field.label}</Label>
                      {field.type === "select" && field.options && (
                        <Select
                          value={criterionData?.data[field.id] || ""}
                          onValueChange={(value) =>
                            handleFieldChange(criterion.number, field.id, value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label} ({option.score} pontos)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor={`notes-${criterion.number}`}>
                    Observações Adicionais
                  </Label>
                  <Textarea
                    id={`notes-${criterion.number}`}
                    value={criterionData?.notes || ""}
                    onChange={(e) =>
                      handleNotesChange(criterion.number, e.target.value)
                    }
                    placeholder="Adicione observações específicas para este critério..."
                    rows={3}
                    className="mt-2"
                  />
                </div>

                {/* Navigation */}
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
            );
          })}
        </CardContent>
      </Card>

      {/* General Notes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Observações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="generalNotes">Notas Gerais da Avaliação</Label>
            <Textarea
              id="generalNotes"
              value={formData.form.generalNotes || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  form: { ...formData.form, generalNotes: e.target.value },
                })
              }
              placeholder="Adicione observações gerais sobre a avaliação..."
              rows={4}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="recommendations">Recomendações</Label>
            <Textarea
              id="recommendations"
              value={formData.form.recommendations || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  form: { ...formData.form, recommendations: e.target.value },
                })
              }
              placeholder="Adicione recomendações cirúrgicas ou estéticas..."
              rows={4}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
