"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, CheckCircle2, Loader2, X, Camera } from "lucide-react";
import Link from "next/link";
import { IMAGE_TYPES } from "@/lib/spe-m-criteria";

interface FormData {
  form: {
    id: string;
    patientId: string;
    status: string;
  };
  patient: {
    name: string;
  };
  images: Array<{
    id: string;
    imageType: string;
    storageUrl: string;
    annotations: any;
    uploadedAt: string;
  }>;
}

export default function FormPhotosPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.id as string;

  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("frontal");
  const [uploadingType, setUploadingType] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

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

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imageType: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadFile(file, imageType);
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
    imageType: string
  ) => {
    event.preventDefault();
    setDragOver(null);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    await uploadFile(file, imageType);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    imageType: string
  ) => {
    event.preventDefault();
    setDragOver(imageType);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const uploadFile = async (file: File, imageType: string) => {
    // Validações
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Formato inválido. Use JPG ou PNG.");
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("Arquivo muito grande. Máximo 10MB.");
      return;
    }

    setUploadingType(imageType);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("imageType", imageType);

      const response = await fetch(`/api/forms/${formId}/images`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload image");
      }

      toast.success("Foto enviada com sucesso!");
      fetchForm(); // Refresh to get updated images
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setUploadingType(null);
    }
  };

  const getImageForType = (imageType: string) => {
    return formData?.images.find((img) => img.imageType === imageType);
  };

  const handleFinalize = async () => {
    // Check if all 6 photos are uploaded
    const uploadedCount = IMAGE_TYPES.filter((type) =>
      formData?.images.some((img) => img.imageType === type.id)
    ).length;

    if (uploadedCount < 6) {
      toast.error(
        `Você precisa enviar todas as 6 fotos. Faltam ${6 - uploadedCount} foto(s).`
      );
      return;
    }

    toast.success("Todas as fotos foram enviadas!");
    router.push(`/dashboard/forms/${formId}`);
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

  const uploadedCount = IMAGE_TYPES.filter((type) =>
    formData.images.some((img) => img.imageType === type.id)
  ).length;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/forms/${formId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Ficha
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Fotos do Paciente</h1>
            <p className="text-muted-foreground">
              {formData.patient.name} - {uploadedCount}/6 fotos enviadas
            </p>
          </div>
        </div>
        <Button
          onClick={handleFinalize}
          disabled={uploadedCount < 6}
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Finalizar
        </Button>
      </div>

      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso do Upload</span>
              <span className="font-medium">
                {uploadedCount}/6 ({Math.round((uploadedCount / 6) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: `${(uploadedCount / 6) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Registro Fotográfico Padronizado</CardTitle>
          <CardDescription>
            Envie as 6 fotos obrigatórias para completar a avaliação SPE-M
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
              {IMAGE_TYPES.map((type) => {
                const hasImage = formData.images.some(
                  (img) => img.imageType === type.id
                );
                return (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    className="relative"
                  >
                    {type.label}
                    {hasImage && (
                      <CheckCircle2 className="w-3 h-3 text-green-600 absolute -top-1 -right-1" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {IMAGE_TYPES.map((type) => {
              const existingImage = getImageForType(type.id);
              const isUploading = uploadingType === type.id;
              const isDragging = dragOver === type.id;

              return (
                <TabsContent key={type.id} value={type.id}>
                  <div className="space-y-4">
                    {/* Upload Area or Preview */}
                    {!existingImage ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25"
                        }`}
                        onDrop={(e) => handleDrop(e, type.id)}
                        onDragOver={(e) => handleDragOver(e, type.id)}
                        onDragLeave={handleDragLeave}
                      >
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">
                              Enviando foto...
                            </p>
                          </div>
                        ) : (
                          <>
                            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">
                              {type.label}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6">
                              {type.description}
                            </p>
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">
                                Arraste e solte a foto aqui ou
                              </p>
                              <label htmlFor={`file-${type.id}`}>
                                <Button type="button" asChild>
                                  <span>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Selecionar Arquivo
                                  </span>
                                </Button>
                                <input
                                  id={`file-${type.id}`}
                                  type="file"
                                  accept="image/jpeg,image/jpg,image/png"
                                  className="hidden"
                                  onChange={(e) => handleFileSelect(e, type.id)}
                                />
                              </label>
                            </div>
                            <div className="mt-6 text-xs text-muted-foreground space-y-1">
                              <p>Formatos aceitos: JPG, PNG</p>
                              <p>Tamanho máximo: 10MB</p>
                              <p>Resolução mínima: 800x600px</p>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative border rounded-lg overflow-hidden">
                          <img
                            src={existingImage.storageUrl}
                            alt={type.label}
                            className="w-full h-auto"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              asChild
                            >
                              <Link href={`/dashboard/forms/${formId}/photos/${existingImage.id}/annotate`}>
                                Adicionar Anotações
                              </Link>
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Foto enviada com sucesso
                          </div>
                          <label htmlFor={`replace-${type.id}`}>
                            <Button variant="outline" size="sm" asChild>
                              <span>
                                <Upload className="w-4 h-4 mr-2" />
                                Substituir
                              </span>
                            </Button>
                            <input
                              id={`replace-${type.id}`}
                              type="file"
                              accept="image/jpeg,image/jpg,image/png"
                              className="hidden"
                              onChange={(e) => handleFileSelect(e, type.id)}
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = IMAGE_TYPES.findIndex(
                            (t) => t.id === type.id
                          );
                          if (currentIndex > 0) {
                            setCurrentTab(IMAGE_TYPES[currentIndex - 1].id);
                          }
                        }}
                        disabled={IMAGE_TYPES[0].id === type.id}
                      >
                        Anterior
                      </Button>
                      <Button
                        onClick={() => {
                          const currentIndex = IMAGE_TYPES.findIndex(
                            (t) => t.id === type.id
                          );
                          if (currentIndex < IMAGE_TYPES.length - 1) {
                            setCurrentTab(IMAGE_TYPES[currentIndex + 1].id);
                          }
                        }}
                        disabled={
                          IMAGE_TYPES[IMAGE_TYPES.length - 1].id === type.id
                        }
                      >
                        Próxima
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Dicas para Fotos de Qualidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Use iluminação natural uniforme</li>
            <li>✓ Fundo neutro (branco ou cinza claro)</li>
            <li>✓ Paciente sem maquiagem</li>
            <li>✓ Cabelo preso (para fotos de perfil)</li>
            <li>✓ Expressão neutra (sem sorrir)</li>
            <li>✓ Distância de aproximadamente 1 metro</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
