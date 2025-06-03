"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import Pass from "@/app/share/_components/pass";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ApplePass } from "@/lib/types";
import { usePostHog } from "posthog-js/react";
import { ERROR_EVENTS, createClientErrorTracker } from "@/lib/posthog-client";
import { balloons, textBalloons } from "balloons-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .max(1150, "Description cannot exceed 150 cahracter")
    .optional(),
  header_field_label: z
    .string()
    .max(25, "Header label cannot exceed 25 characters")
    .optional(),
  header_field_value: z
    .string()
    .max(30, "Header value cannot exceed 30 characters")
    .optional(),
  text_color: z
    .string()
    .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Invalid hex color")
    .optional(),
  background_color: z
    .string()
    .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Invalid hex color")
    .optional(),
  logo_url: z.string().optional(),
  strip_image: z.string().optional(),
  secondary_left_label: z
    .string()
    .max(25, "Primary label cannot exceed 25 characters"),
  secondary_left_value: z
    .string()
    .max(25, "Primary value cannot exceed 30 characters"),
  secondary_right_label: z
    .string()
    .max(25, "Secondary label cannot exceed 25 characters")
    .optional(),
  secondary_right_value: z
    .string()
    .max(30, "Secondary value cannot exceed 30 characters")
    .optional(),
  barcode_format: z
    .enum([
      "PKBarcodeFormatQR",
      "PKBarcodeFormatPDF417",
      "PKBarcodeFormatAztec",
      "PKBarcodeFormatCode128",
    ])
    .optional(),
  barcode_value: z
    .string()
    .max(500, "Barcode message cannot exceed 500 characters")
    .optional(),
  barcode_alt_text: z
    .string()
    .max(30, "Barcode alt text cannot exceed 30 characters")
    .optional(),
  barcode_encoding: z
    .string()
    .max(20, "Encoding cannot exceed 20 characters")
    .optional(),
  website_url: z.string(),
  organization_id: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePassForm({ organizationId }: { organizationId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(false);
  const [stripImage, setStripImage] = useState(false);
  const [step, setStep] = useState<number>(1);
  const posthog = usePostHog();
  const trackError = createClientErrorTracker(posthog);

  useEffect(() => {
    if (logoImage) {
      toast.loading("Processing image...", {
        id: "image-upload",
        position: "bottom-right",
        duration: Infinity, // Don't auto-dismiss
      });
    } else {
      toast.dismiss("image-upload");
    }
  }, [logoImage]);

  useEffect(() => {
    if (stripImage) {
      toast.loading("Processing image...", {
        id: "image-upload",
        position: "bottom-right",
        duration: Infinity, // Don't auto-dismiss
      });
    } else {
      toast.dismiss("image-upload");
    }
  }, [stripImage]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Exodus Labs",
      description: "A pass for the employees of Exodus Labs",
      logo_url: "",
      header_field_label: "SPECIAL OFFERS",
      header_field_value: "TAP ••• FOR OFFERS",
      text_color: "#FFFFFF",
      background_color: "#000000",
      strip_image: "",
      secondary_left_label: "Team",
      secondary_left_value: "Engineer",
      secondary_right_label: "Status",
      secondary_right_value: "Active",
      barcode_format: "PKBarcodeFormatQR",
      barcode_value: "",
      barcode_alt_text: "",
      barcode_encoding: "iso-8859-1",
      website_url: "https://google.com",
      organization_id: organizationId,
    },
  });

  const watched = useWatch({ control: form.control });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const response = await fetch("/api/create-pass", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        trackError(
          ERROR_EVENTS.API_CREATE_PASS_ERROR,
          `HTTP ${response.status}: ${errorText}`,
          {
            pass_name: data.name,
            organization_id: organizationId,
            response_status: response.status,
            component: "dashboard_form",
            action: "pass_creation_failed",
          },
        );
        toast.error(`Failed to create pass: ${response.status} ${errorText}`);
        setLoading(false);
        return;
      }

      toast.success("Pass created successfully");
      router.prefetch("/dashboard");
      router.push("/dashboard");
      router.refresh();
      balloons();
      textBalloons([
        {
          text: "Time to cook 🔥",
          fontSize: 120,
          color: "#000000",
        },
      ]);
    } catch (err) {
      console.error("Error creating pass:", err);
      trackError(ERROR_EVENTS.PASS_CREATION_ERROR, err, {
        pass_name: data.name,
        organization_id: organizationId,
        component: "dashboard_form",
        action: "unexpected_error",
        form_data: {
          has_logo: !!data.logo_url,
          has_strip_image: !!data.strip_image,
          has_barcode: !!data.barcode_value,
          has_website: !!data.website_url,
        },
      });
      toast.error("Unexpected error during pass creation");
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="grid grid-cols-2 gap-8 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
              >
                1
              </div>
              <div className="h-1 w-16 bg-gray-200 mx-2"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
              >
                2
              </div>
            </div>
            <div className="text-sm dark:text-white">Step {step} of 2</div>
          </div>

          <div className="space-y-4">
            {step === 1 && (
              <>
                {/* Basic Info */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <div className="flex justify-between">
                        <FormLabel>Name</FormLabel>
                        <span className="text-xs text-gray-500">
                          {field.value?.length || 0}/50
                        </span>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="w-full border p-2 rounded-md"
                          maxLength={50}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be the pass name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.errors.name?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {form.formState.errors.name?.message}
                  </p>
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <div className="flex justify-between">
                        <FormLabel>Description</FormLabel>
                        <span className="text-xs text-gray-500">
                          {field.value?.length || 0}/1150
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="w-full border p-2 rounded-md"
                          maxLength={1150}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe the purpose of your pass
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.errors.description?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {form.formState.errors.description?.message}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <>
                    <FormField
                      control={form.control}
                      name="logo_url"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Logo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              ref={field.ref}
                              onChange={async (e) => {
                                setLogoImage(true);
                                const file = e.target.files?.[0];

                                if (!file) return;

                                // Check image dimensions before upload
                                const img = new Image();
                                const objectUrl = URL.createObjectURL(file);
                                let processedFile = file; // Use original file by default
                                const targetMimeType = "image/png"; // Always aim for PNG
                                const originalFileNameWithoutExtension =
                                  file.name.substring(
                                    0,
                                    file.name.lastIndexOf("."),
                                  ) || file.name;

                                try {
                                  await new Promise<void>((resolve, reject) => {
                                    img.onload = () => resolve();
                                    img.onerror = () =>
                                      reject(new Error("Failed to load image"));
                                    img.src = objectUrl;
                                  });

                                  const needsResize = img.width > 160;
                                  const needsTypeConversion =
                                    file.type !== targetMimeType;

                                  if (needsResize || needsTypeConversion) {
                                    if (needsResize && needsTypeConversion) {
                                      toast.info(
                                        "Resizing and converting to PNG...",
                                      );
                                    } else if (needsResize) {
                                      toast.info(
                                        "Logo image is too wide, resizing to 160px width...",
                                      );
                                    } else if (needsTypeConversion) {
                                      toast.info(
                                        `Converting to ${targetMimeType}...`,
                                      );
                                    }

                                    const canvas =
                                      document.createElement("canvas");
                                    const ctx = canvas.getContext("2d");
                                    if (!ctx) {
                                      const error = new Error(
                                        "Failed to get canvas context",
                                      );
                                      trackError(
                                        ERROR_EVENTS.FORM_SUBMISSION_ERROR,
                                        error,
                                        {
                                          component: "dashboard_form",
                                          action: "canvas_context_failed",
                                          field: "logo_url",
                                        },
                                      );
                                      throw error;
                                    }

                                    const aspectRatio = img.height / img.width;
                                    canvas.width = needsResize
                                      ? 160
                                      : img.width;
                                    canvas.height = needsResize
                                      ? 160 * aspectRatio
                                      : img.height;

                                    ctx.drawImage(
                                      img,
                                      0,
                                      0,
                                      canvas.width,
                                      canvas.height,
                                    );

                                    const blob = await new Promise<Blob | null>(
                                      (resolve) =>
                                        canvas.toBlob(
                                          resolve,
                                          targetMimeType,
                                          0.95,
                                        ),
                                    );
                                    if (!blob) {
                                      throw new Error(
                                        "Failed to convert canvas to blob",
                                      );
                                    }
                                    processedFile = new File(
                                      [blob],
                                      `${originalFileNameWithoutExtension}.png`,
                                      {
                                        type: targetMimeType,
                                        lastModified: Date.now(),
                                      },
                                    );
                                    toast.success(
                                      "Logo processed successfully",
                                    );
                                  }
                                } catch (error) {
                                  console.error(
                                    "Image processing error:",
                                    error,
                                  );
                                  toast.error(
                                    "Image processing failed: " +
                                      (error instanceof Error
                                        ? error.message
                                        : String(error)),
                                  );
                                  URL.revokeObjectURL(objectUrl);
                                  return;
                                } finally {
                                  URL.revokeObjectURL(objectUrl); // Ensure cleanup in all cases
                                }

                                try {
                                  const formData = new FormData();
                                  formData.append("file", processedFile);

                                  const res = await fetch("/api/upload-image", {
                                    method: "POST",
                                    body: formData,
                                  });

                                  if (!res.ok) {
                                    const errorText = await res.text();
                                    console.error("Upload failed:", errorText);
                                    toast.error(
                                      "Upload failed: " +
                                        (errorText || "Unknown error"),
                                    );
                                    setLogoImage(false);
                                    return;
                                  }

                                  const { url } = await res.json();
                                  toast.success("Upload successful");
                                  onChange(url);
                                  setLogoImage(false);
                                } catch (error) {
                                  console.error("Upload error:", error);
                                  toast.error(
                                    "Upload failed: " +
                                      (error instanceof Error
                                        ? error.message
                                        : String(error)),
                                  );
                                  setLogoImage(false);
                                }
                              }}
                              className="w-full border rounded-md"
                            />
                          </FormControl>
                          <FormDescription>
                            Upload logo image (Recommended: PNG format, 160px
                            wide, square aspect ratio)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.formState.errors.logo_url?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {form.formState.errors.logo_url?.message}
                      </p>
                    )}
                  </>
                  <>
                    <FormField
                      control={form.control}
                      name="strip_image"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Thumbnail Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              ref={field.ref}
                              onChange={async (e) => {
                                setStripImage(true);
                                const file = e.target.files?.[0];
                                if (!file) return;

                                // Load image and validate dimensions
                                const img = await new Promise<HTMLImageElement>(
                                  (res, rej) => {
                                    const url = URL.createObjectURL(file);
                                    const img = new Image();
                                    img.onload = () => {
                                      URL.revokeObjectURL(url);

                                      // For strip images, we'll verify dimensions
                                      if (file.name.includes("strip")) {
                                        // Just verify, we'll handle the success message later
                                      }
                                      // Check thumbnail dimensions (90x90 minimum)
                                      else if (
                                        file.name.includes("thumbnail") &&
                                        (img.width < 90 || img.height < 90)
                                      ) {
                                        toast.error(
                                          `Thumbnail image must be at least 90x90 pixels. Your image is ${img.width}x${img.height}px`,
                                          {
                                            duration: 5000,
                                            position: "top-center",
                                            style: { maxWidth: "500px" },
                                          },
                                        );
                                        rej(
                                          new Error(
                                            "Thumbnail dimensions too small",
                                          ),
                                        );
                                        return;
                                      }

                                      res(img);
                                    };
                                    img.onerror = () => {
                                      URL.revokeObjectURL(url);
                                      rej(new Error("Failed to load image"));
                                    };
                                    img.src = url;
                                  },
                                );

                                // If we get here, the image loaded successfully and meets size requirements

                                // Configuration for strip image (375x144) or thumbnail (90x90)
                                const isStripImage =
                                  file.name.includes("strip");
                                const isAlreadyPerfectSize =
                                  isStripImage &&
                                  img.width === 375 &&
                                  img.height === 144;

                                console.log("isStripImage", isStripImage);
                                console.log(
                                  "isAlreadyPerfectSize",
                                  isAlreadyPerfectSize,
                                );
                                // If it's a strip image with perfect dimensions, skip processing
                                try {
                                  // Validate file type
                                  if (!file.type.includes("image/")) {
                                    setStripImage(false);
                                    toast.error(
                                      "Please upload a valid image file",
                                    );
                                    return;
                                  }

                                  // Create image element to check dimensions
                                  const img = new Image();
                                  const objectUrl = URL.createObjectURL(file);

                                  img.onload = async () => {
                                    // Clean up object URL
                                    URL.revokeObjectURL(objectUrl);

                                    // Check dimensions (1x for retina)
                                    const minWidth = 312;
                                    const minHeight = 110;

                                    if (
                                      img.width < minWidth ||
                                      img.height < minHeight
                                    ) {
                                      toast.error(
                                        `Image must be at least ${minWidth}x${minHeight}px`,
                                      );
                                      return;
                                    }

                                    try {
                                      // Convert to canvas to ensure PNG format
                                      const canvas =
                                        document.createElement("canvas");
                                      canvas.width = img.width;
                                      canvas.height = img.height;
                                      const ctx = canvas.getContext("2d");
                                      if (!ctx) {
                                        setStripImage(false);
                                        throw new Error(
                                          "Could not create canvas context",
                                        );
                                      }

                                      // Draw image to canvas
                                      ctx.drawImage(
                                        img,
                                        0,
                                        0,
                                        img.width,
                                        img.height,
                                      );

                                      // Convert to blob and upload
                                      canvas.toBlob(async (blob) => {
                                        if (!blob) {
                                          throw new Error(
                                            "Failed to process image",
                                          );
                                        }

                                        const formData = new FormData();
                                        formData.append(
                                          "file",
                                          blob,
                                          "strip.png",
                                        );

                                        const res = await fetch(
                                          "/api/upload-image",
                                          {
                                            method: "POST",
                                            body: formData,
                                          },
                                        );

                                        if (!res.ok) {
                                          const error = await res.text();
                                          throw new Error(
                                            error || "Upload failed",
                                          );
                                        }

                                        const { url } = await res.json();
                                        toast.success(
                                          "Image uploaded successfully",
                                        );
                                        onChange(url);
                                        setStripImage(false);
                                      }, "image/png");
                                    } catch (err) {
                                      console.error(
                                        "Image processing error:",
                                        err,
                                      );
                                      toast.error(
                                        `Upload failed: ${(err as Error).message}`,
                                      );
                                      setStripImage(false);
                                    }
                                  };

                                  img.onerror = () => {
                                    URL.revokeObjectURL(objectUrl);
                                    toast.error("Failed to load image");
                                  };

                                  img.src = objectUrl;
                                } catch (err) {
                                  console.error("Upload error:", err);
                                  toast.error(
                                    `Upload failed: ${(err as Error).message}`,
                                  );
                                }

                                // const config = isStripImage
                                //   ? {
                                //       // Strip image configuration
                                //       width: 375,  // Exact width for strip
                                //       height: 144, // Exact height for strip
                                //       enforceSquare: false,
                                //       quality: 1.0,
                                //       isStripImage: true,
                                //       scale: 1,
                                //       minRatio: 375/144,
                                //       maxRatio: 375/144,
                                //       cover: true
                                //     }
                                //   : {
                                //       // Thumbnail configuration
                                //       width: 90,
                                //       height: 90,
                                //       enforceSquare: true,
                                //       quality: 1.0,
                                //       isStripImage: false,
                                //       scale: 1,
                                //       // Allow any aspect ratio as long as both dimensions are at least 90px
                                //       minRatio: 0.1,  // Very wide
                                //       maxRatio: 10,   // Very tall
                                //       cover: true,
                                //       // Ensure minimum dimensions are met
                                //       minWidth: 90,
                                //       minHeight: 90
                                //     };

                                // try {
                                //   toast.info(
                                //     "Optimizing image for best quality…",
                                //   );
                                //   const processedFile = await processImage(
                                //     img,
                                //     file,
                                //     originalName,
                                //     targetMimeType,
                                //     config,
                                //   );
                                //   toast.success("Image processed successfully");

                                //   // Upload
                                //   const buf = await processedFile.arrayBuffer();
                                //   const res = await fetch("/api/upload-image", {
                                //     method: "POST",
                                //     headers: {
                                //       "Content-Type":
                                //         "application/octet-stream",
                                //       "x-file-name": processedFile.name,
                                //     },
                                //     body: buf,
                                //   });
                                //   if (!res.ok)
                                //     throw new Error(await res.text());
                                //   const { url } = await res.json();
                                //   toast.success("Upload successful");
                                //   onChange(url);
                                // } catch (err) {
                                //   console.error(err);
                                //   toast.error(
                                //     "Image processing/upload failed: " +
                                //       (err as Error).message,
                                //   );
                                // }
                              }}
                              className="w-full border rounded-md"
                            />
                          </FormControl>
                          <FormDescription>
                            Upload front strip image (Required: 144px height,
                            recommended width 375px, PNG format)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.formState.errors.strip_image?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {form.formState.errors.strip_image?.message}
                      </p>
                    )}
                  </>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="background_color"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Background Color</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="color"
                            className="w-full h-10 p-1 rounded-md"
                          />
                        </FormControl>
                        <FormDescription>
                          Customize your pass background
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.background_color?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.background_color?.message}
                    </p>
                  )}
                  <FormField
                    control={form.control}
                    name="text_color"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Text Color</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="color"
                            className="w-full h-10 p-1 rounded-md"
                          />
                        </FormControl>
                        <FormDescription>
                          Customize your text color
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.text_color?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.text_color?.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="header_field_label"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <div className="flex justify-between">
                          <FormLabel>Header Field Label</FormLabel>
                          <span className="text-xs text-gray-500">
                            {field.value?.length || 0}/25
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="w-full border p-2 rounded-md"
                            maxLength={25}
                          />
                        </FormControl>
                        <FormDescription>
                          Label for the header field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.header_field_label?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.header_field_label?.message}
                    </p>
                  )}
                  <FormField
                    control={form.control}
                    name="header_field_value"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <div className="flex justify-between">
                          <FormLabel>Header Field Value</FormLabel>
                          <span className="text-xs text-gray-500">
                            {field.value?.length || 0}/30
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="w-full border p-2 rounded-md"
                            maxLength={30}
                          />
                        </FormControl>
                        <FormDescription>
                          Value for the header field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.header_field_value?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.header_field_value?.message}
                    </p>
                  )}
                </div> */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="secondary_left_label"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <div className="flex justify-between">
                          <FormLabel>Primary Field Label</FormLabel>
                          <span className="text-xs text-gray-500">
                            {field.value?.length || 0}/25
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="w-full border p-2 rounded-md"
                            maxLength={25}
                          />
                        </FormControl>
                        <FormDescription>
                          Label for the secondary field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.secondary_left_label?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.secondary_left_label?.message}
                    </p>
                  )}
                  <FormField
                    control={form.control}
                    name="secondary_left_value"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <div className="flex justify-between">
                          <FormLabel>Primary Field Value</FormLabel>
                          <span className="text-xs text-gray-500">
                            {field.value?.length || 0}/30
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="w-full border p-2 rounded-md"
                            maxLength={30}
                          />
                        </FormControl>
                        <FormDescription>
                          Value for the primary field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.secondary_left_value?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.secondary_left_value?.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="secondary_right_label"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <div className="flex justify-between">
                          <FormLabel>Secondary Field Label</FormLabel>
                          <span className="text-xs text-gray-500">
                            {field.value?.length || 0}/25
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="w-full border p-2 rounded-md"
                            maxLength={25}
                          />
                        </FormControl>
                        <FormDescription>
                          Label for the secondary field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.secondary_right_label?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.secondary_right_label?.message}
                    </p>
                  )}
                  <FormField
                    control={form.control}
                    name="secondary_right_value"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <div className="flex justify-between">
                          <FormLabel>Secondary Field Value</FormLabel>
                          <span className="text-xs text-gray-500">
                            {field.value?.length || 0}/30
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="w-full border p-2 rounded-md"
                            maxLength={30}
                          />
                        </FormControl>
                        <FormDescription>
                          Value for the secondary field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.secondary_right_value?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.secondary_right_value?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 pt-4 border-t mt-4">
                  <FormField
                    control={form.control}
                    name="website_url"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <div className="flex justify-between">
                          <FormLabel>Website Url</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="w-full border p-2 rounded-md"
                          />
                        </FormControl>
                        <FormDescription>
                          This website will be linked on the back of the card.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.barcode_encoding?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.barcode_encoding?.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="w-24 "
              >
                Previous
              </Button>
            )}
            {step < 2 && (
              <Button
                type="button"
                disabled={!watched?.logo_url || !watched?.strip_image}
                onClick={nextStep}
                className="w-24"
              >
                Next
              </Button>
            )}
            {step === 2 && (
              <Button type="submit" className="w-24" disabled={loading}>
                {loading ? "Creating..." : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </Form>
      {/* 🔍 Live Preview */}
      <Pass pass={watched as ApplePass} />
    </div>
  );
}
