"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createUploadClient } from "pushduck/client";
import type { AppRouter } from "@/app/api/upload/route";
import { Check, FileImage, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const uploadClient = createUploadClient<AppRouter>({
  endpoint: "/api/upload",
});

interface DisplayFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const { uploadFiles, files, isUploading, progress } =
    uploadClient.imageUpload();

  const uploadedFiles: DisplayFile[] = files
    .filter((f) => f.status === "success" && f.url)
    .map((f) => ({
      id: f.id,
      name: f.name,
      url: f.url!,
      size: f.size ?? 0,
      type: f.type ?? "image/*",
      uploadedAt: new Date(),
    }));

  const handleFiles = useCallback(
    async (incoming: File[] | FileList) => {
      const fileArray = Array.from(incoming).filter((f) => {
        if (!f.type.startsWith("image/")) {
          toast.error(`${f.name} is not an image file`);
          return false;
        }
        return true;
      });

      if (!fileArray.length) return;

      try {
        await uploadFiles(fileArray);
        toast.success(
          fileArray.length === 1
            ? `${fileArray[0].name} uploaded successfully`
            : `${fileArray.length} files uploaded successfully`,
        );
      } catch {
        toast.error("Upload failed. Please try again.");
      }
    },
    [uploadFiles],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">File Upload</h1>
        <p className="text-muted-foreground mt-2">
          Upload images to Cloudflare R2 storage with drag and drop support
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Images
            </CardTitle>
            <CardDescription>
              Upload images to Cloudflare R2. Maximum file size is 10MB.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                disabled={isUploading}
              />
              <div className="space-y-2">
                <FileImage className="h-10 w-10 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {dragActive
                      ? "Drop files here"
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploading}
                  onClick={() => inputRef.current?.click()}
                >
                  {isUploading ? "Uploading…" : "Choose files"}
                </Button>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading…</span>
                  <span>{Math.round(progress ?? 0)}%</span>
                </div>
                <Progress value={progress ?? 0} className="h-2" />
              </div>
            )}

            {files.length > 0 && (
              <ul className="text-sm space-y-1">
                {files.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center justify-between text-muted-foreground"
                  >
                    <span className="truncate max-w-[200px]">{f.name}</span>
                    <span className="ml-2 shrink-0">
                      {f.status === "success" ? (
                        <span className="text-green-600">Done</span>
                      ) : f.status === "error" ? (
                        <span className="text-destructive">Failed</span>
                      ) : (
                        <span>{f.progress ?? 0}%</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Upload Info */}
        <Card>
          <CardHeader>
            <CardTitle>About R2 Storage</CardTitle>
            <CardDescription>
              Cloudflare R2 provides S3-compatible object storage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Global CDN</p>
                  <p className="text-muted-foreground">
                    Fast delivery worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Zero Egress Fees</p>
                  <p className="text-muted-foreground">No bandwidth charges</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">S3 Compatible</p>
                  <p className="text-muted-foreground">
                    Works with existing tools
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Auto Scaling</p>
                  <p className="text-muted-foreground">Handles any file size</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
            <CardDescription>
              Recently uploaded images to R2 storage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="group relative border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative bg-muted">
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-3">
                    <p
                      className="font-medium text-sm truncate"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{file.uploadedAt.toLocaleDateString()}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(file.url)}
                        className="flex-1 text-xs"
                      >
                        Copy URL
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(file.url, "_blank")}
                        className="flex-1 text-xs"
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.location.reload()}
                    className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
