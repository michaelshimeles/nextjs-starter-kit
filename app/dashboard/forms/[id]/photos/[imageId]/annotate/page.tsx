"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Undo,
  Trash2,
  Pen,
  Minus,
  ArrowRight,
  Circle,
  Type,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Stage, Layer, Line, Arrow, Circle as KonvaCircle, Text, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

interface Annotation {
  tool: string;
  points?: number[];
  color: string;
  strokeWidth: number;
  text?: string;
  x?: number;
  y?: number;
  radius?: number;
}

interface ImageData {
  id: string;
  formId: string;
  imageType: string;
  storageUrl: string;
  annotations: Annotation[] | null;
}

const COLORS = [
  "#EF4444", // Red
  "#F59E0B", // Amber
  "#10B981", // Green
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#FFFFFF", // White
  "#000000", // Black
];

const TOOLS = [
  { id: "pen", icon: Pen, label: "Caneta" },
  { id: "line", icon: Minus, label: "Linha" },
  { id: "arrow", icon: ArrowRight, label: "Seta" },
  { id: "circle", icon: Circle, label: "Círculo" },
  { id: "text", icon: Type, label: "Texto" },
];

function URLImage({ src }: { src: string }) {
  const [image] = useImage(src, "anonymous");
  return <KonvaImage image={image} />;
}

export default function AnnotateImagePage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.id as string;
  const imageId = params.imageId as string;

  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#EF4444");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null);
  const isDrawing = useRef(false);

  const stageRef = useRef<any>(null);

  useEffect(() => {
    fetchImage();
  }, [imageId]);

  const fetchImage = async () => {
    try {
      const response = await fetch(`/api/forms/${formId}`);
      if (!response.ok) throw new Error("Failed to fetch form");

      const data = await response.json();
      const image = data.images.find((img: any) => img.id === imageId);

      if (!image) {
        throw new Error("Image not found");
      }

      setImageData(image);
      if (image.annotations) {
        setAnnotations(image.annotations);
      }
    } catch (error) {
      toast.error("Erro ao carregar imagem");
      console.error(error);
      router.push(`/dashboard/forms/${formId}/photos`);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDown = (e: any) => {
    if (tool === "text") return; // Text requires click

    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    if (tool === "pen") {
      setCurrentAnnotation({
        tool: "pen",
        points: [pos.x, pos.y],
        color,
        strokeWidth,
      });
    } else if (tool === "line" || tool === "arrow") {
      setCurrentAnnotation({
        tool,
        points: [pos.x, pos.y, pos.x, pos.y],
        color,
        strokeWidth,
      });
    } else if (tool === "circle") {
      setCurrentAnnotation({
        tool: "circle",
        x: pos.x,
        y: pos.y,
        radius: 0,
        color,
        strokeWidth,
      });
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current || !currentAnnotation) return;

    const pos = e.target.getStage().getPointerPosition();

    if (tool === "pen") {
      setCurrentAnnotation({
        ...currentAnnotation,
        points: [...(currentAnnotation.points || []), pos.x, pos.y],
      });
    } else if (tool === "line" || tool === "arrow") {
      const points = currentAnnotation.points || [];
      setCurrentAnnotation({
        ...currentAnnotation,
        points: [points[0], points[1], pos.x, pos.y],
      });
    } else if (tool === "circle") {
      const dx = pos.x - (currentAnnotation.x || 0);
      const dy = pos.y - (currentAnnotation.y || 0);
      const radius = Math.sqrt(dx * dx + dy * dy);
      setCurrentAnnotation({
        ...currentAnnotation,
        radius,
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing.current || !currentAnnotation) return;

    isDrawing.current = false;
    setAnnotations([...annotations, currentAnnotation]);
    setCurrentAnnotation(null);
  };

  const handleClick = (e: any) => {
    if (tool !== "text") return;

    const pos = e.target.getStage().getPointerPosition();
    const text = prompt("Digite o texto:");

    if (text) {
      const newAnnotation: Annotation = {
        tool: "text",
        text,
        x: pos.x,
        y: pos.y,
        color,
        strokeWidth,
      };
      setAnnotations([...annotations, newAnnotation]);
    }
  };

  const handleUndo = () => {
    if (annotations.length > 0) {
      setAnnotations(annotations.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (confirm("Tem certeza que deseja limpar todas as anotações?")) {
      setAnnotations([]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/forms/${formId}/images`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId,
          annotations,
        }),
      });

      if (!response.ok) throw new Error("Failed to save annotations");

      toast.success("Anotações salvas com sucesso!");
      router.push(`/dashboard/forms/${formId}/photos`);
    } catch (error) {
      toast.error("Erro ao salvar anotações");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!imageData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-muted-foreground">Imagem não encontrada</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/forms/${formId}/photos`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Anotar Imagem</h1>
            <p className="text-muted-foreground">
              {imageData.imageType.replace(/_/g, " ").toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleUndo}
            disabled={annotations.length === 0}
          >
            <Undo className="w-4 h-4 mr-2" />
            Desfazer
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={annotations.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar Tudo
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salvar Anotações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Toolbar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Tools */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Ferramentas</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {TOOLS.map((t) => (
                      <Button
                        key={t.id}
                        variant={tool === t.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTool(t.id)}
                        className="justify-start"
                      >
                        <t.icon className="w-4 h-4 mr-2" />
                        {t.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Cores</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-10 h-10 rounded border-2 transition-transform ${
                          color === c
                            ? "border-primary scale-110"
                            : "border-muted-foreground/20"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stroke Width */}
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Espessura: {strokeWidth}px
                  </h3>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Stats */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {annotations.length} anotação(ões)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="border rounded-lg overflow-hidden bg-muted/20">
                <Stage
                  ref={stageRef}
                  width={800}
                  height={600}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onClick={handleClick}
                >
                  <Layer>
                    {/* Background Image */}
                    <URLImage src={imageData.storageUrl} />

                    {/* Saved Annotations */}
                    {annotations.map((anno, i) => {
                      if (anno.tool === "pen") {
                        return (
                          <Line
                            key={i}
                            points={anno.points}
                            stroke={anno.color}
                            strokeWidth={anno.strokeWidth}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                          />
                        );
                      } else if (anno.tool === "line") {
                        return (
                          <Line
                            key={i}
                            points={anno.points}
                            stroke={anno.color}
                            strokeWidth={anno.strokeWidth}
                          />
                        );
                      } else if (anno.tool === "arrow") {
                        return (
                          <Arrow
                            key={i}
                            points={anno.points}
                            stroke={anno.color}
                            strokeWidth={anno.strokeWidth}
                            fill={anno.color}
                          />
                        );
                      } else if (anno.tool === "circle") {
                        return (
                          <KonvaCircle
                            key={i}
                            x={anno.x}
                            y={anno.y}
                            radius={anno.radius}
                            stroke={anno.color}
                            strokeWidth={anno.strokeWidth}
                          />
                        );
                      } else if (anno.tool === "text") {
                        return (
                          <Text
                            key={i}
                            x={anno.x}
                            y={anno.y}
                            text={anno.text}
                            fontSize={20}
                            fill={anno.color}
                          />
                        );
                      }
                      return null;
                    })}

                    {/* Current Annotation (while drawing) */}
                    {currentAnnotation && (
                      <>
                        {currentAnnotation.tool === "pen" && (
                          <Line
                            points={currentAnnotation.points}
                            stroke={currentAnnotation.color}
                            strokeWidth={currentAnnotation.strokeWidth}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                          />
                        )}
                        {currentAnnotation.tool === "line" && (
                          <Line
                            points={currentAnnotation.points}
                            stroke={currentAnnotation.color}
                            strokeWidth={currentAnnotation.strokeWidth}
                          />
                        )}
                        {currentAnnotation.tool === "arrow" && (
                          <Arrow
                            points={currentAnnotation.points}
                            stroke={currentAnnotation.color}
                            strokeWidth={currentAnnotation.strokeWidth}
                            fill={currentAnnotation.color}
                          />
                        )}
                        {currentAnnotation.tool === "circle" && (
                          <KonvaCircle
                            x={currentAnnotation.x}
                            y={currentAnnotation.y}
                            radius={currentAnnotation.radius}
                            stroke={currentAnnotation.color}
                            strokeWidth={currentAnnotation.strokeWidth}
                          />
                        )}
                      </>
                    )}
                  </Layer>
                </Stage>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
