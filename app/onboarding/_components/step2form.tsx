"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import {
  ERROR_EVENTS,
  createClientErrorTracker,
  trackClientUserJourney,
} from "@/lib/posthog-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slug from "slug";
import { toast } from "sonner";
import * as z from "zod";

// only validate companyName here
const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companySlug: z
    .string()
    .min(1, "Company slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid company slug"),
  email: z
    .string()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function Step2({ prevStepAction }: { prevStepAction: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const posthog = usePostHog();
  const trackError = createClientErrorTracker(posthog);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { companyName: "", companySlug: "", email: "" },
  });

  const { handleSubmit, control, reset, watch } = form;

  const companyName = watch("companyName");
  const router = useRouter();

  // Track user journey - form started
  useEffect(() => {
    trackClientUserJourney(posthog, "onboarding_step2_started", {
      component: "step2form",
      step: "organization_creation",
    });
  }, [posthog]);

  useEffect(() => {
    const slugified = slug(companyName || "");
    // Debounce the slug checker to avoid excessive API calls
    const debouncedSlugChecker = debounce(async (slugToCheck: string) => {
      try {
        const response = await fetch(`/api/check-slug?slug=${slugToCheck}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setSlugAvailable(data.available);
        if (!data.available) {
          toast.error("Slug is not available");
          trackError(ERROR_EVENTS.SLUG_CHECK_ERROR, "Slug not available", {
            slug: slugToCheck,
            company_name: companyName,
            component: "step2form",
            action: "slug_unavailable",
          });
          trackClientUserJourney(posthog, "slug_unavailable", {
            slug: slugToCheck,
            company_name: companyName,
            component: "step2form",
          });
        } else {
          trackClientUserJourney(posthog, "slug_available", {
            slug: slugToCheck,
            company_name: companyName,
            component: "step2form",
          });
        }
        form.setValue("companySlug", slugToCheck);
      } catch (error) {
        console.error("Error checking slug:", error);
        trackError(ERROR_EVENTS.SLUG_CHECK_ERROR, error, {
          slug: slugToCheck,
          company_name: companyName,
          component: "step2form",
          action: "fetch_failed",
        });
        toast.error("Failed to check slug availability");
        setSlugAvailable(null);
      }
    }, 500); // 500ms debounce

    if (slugified) {
      debouncedSlugChecker(slugified);
    }

    // Cleanup to cancel any pending debounced calls
    return () => {
      debouncedSlugChecker.cancel();
    };
  }, [companyName, form, posthog, trackError]);

  const onSubmit = async (data: FormValues) => {
    // Track form submission attempt
    trackClientUserJourney(posthog, "organization_creation_started", {
      company_name: data.companyName,
      company_slug: data.companySlug,
      has_email: !!data.email,
      component: "step2form",
    });

    // Validate slug availability before submission
    if (slugAvailable === false) {
      toast.error("Please choose an available company slug");
      trackError(
        ERROR_EVENTS.VALIDATION_ERROR,
        "Attempted submission with unavailable slug",
        {
          company_name: data.companyName,
          company_slug: data.companySlug,
          component: "step2form",
          action: "submit_validation_failed",
        },
      );
      trackClientUserJourney(posthog, "validation_failed", {
        reason: "unavailable_slug",
        company_name: data.companyName,
        company_slug: data.companySlug,
        component: "step2form",
      });
      return;
    }

    setIsSubmitting(true);
    let success = false;

    try {
      await authClient.organization.create({
        name: data?.companyName,
        slug: data?.companySlug,
        metadata: data,
      });

      // Track successful organization creation
      posthog?.capture("organization_created", {
        company_name: data.companyName,
        company_slug: data.companySlug,
        has_email: !!data.email,
        component: "step2form",
      });

      trackClientUserJourney(posthog, "organization_created_success", {
        company_name: data.companyName,
        company_slug: data.companySlug,
        has_email: !!data.email,
        component: "step2form",
      });

      success = true;
    } catch (error) {
      console.log("error", error);
      trackError(ERROR_EVENTS.ORGANIZATION_CREATION_ERROR, error, {
        company_name: data?.companyName,
        company_slug: data?.companySlug,
        has_email: !!data?.email,
        component: "step2form",
        action: "organization_create_failed",
      });
      trackClientUserJourney(posthog, "organization_creation_failed", {
        company_name: data?.companyName,
        company_slug: data?.companySlug,
        has_email: !!data?.email,
        component: "step2form",
        error_message: error instanceof Error ? error.message : String(error),
      });
      toast.error("Oops, something went wrong");
    } finally {
      setIsSubmitting(false);
    }

    if (success) {
      trackClientUserJourney(posthog, "onboarding_completed", {
        company_name: data.companyName,
        company_slug: data.companySlug,
        component: "step2form",
        next_destination: "dashboard",
      });
      reset();
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Create your organization</CardTitle>
            <CardDescription>
              Set up your org and invite your team.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* companyName */}
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Company name</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground pointer-events-none">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Acme Inc."
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companySlug"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Company Slug</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground pointer-events-none">
                      <Building2 className="h-4 w-4" />
                    </div>

                    <FormControl>
                      <Input
                        placeholder="acme-inc"
                        className={`pl-10 ${
                          slugAvailable === false
                            ? "border-red-500"
                            : slugAvailable === true
                              ? "border-green-500"
                              : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  {slugAvailable === false && (
                    <p className="text-sm text-red-500 mt-1">
                      This slug is already taken
                    </p>
                  )}
                  {slugAvailable === true && (
                    <p className="text-sm text-green-500 mt-1">
                      Slug is available
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mt-3 flex justify-between items-center">
            <Button variant="outline" onClick={prevStepAction}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Organization"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
