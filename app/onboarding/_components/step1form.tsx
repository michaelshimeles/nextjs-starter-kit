"use client";

import React from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart3, Briefcase, Building2, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { storeOnboardingInfo } from "./action";
// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  companyUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Company URL is required"),
  position: z.string().min(1, "Position is required"),
  visitors: z.string().min(1, "Please select an option"),
});

type FormValues = z.infer<typeof formSchema>;

interface Step1Props {
  onNextAction: () => void;
  userId: string;
}

export function Step1({ onNextAction, userId }: Step1Props) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // Initialize React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyUrl: "",
      position: "",
      visitors: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      await storeOnboardingInfo({
        name: data?.name,
        position: data?.position,
        company_url: data?.companyUrl,
        total_visitors: data?.visitors,
        user_id: userId,
      });

      toast.success("Information submitted successfully!");

      onNextAction();
      form.reset();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg transition-all duration-300 hover:shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Tell us about yourself
            </CardTitle>
            <CardDescription>
              Please provide your information to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 mt-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
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
              control={form.control}
              name="companyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (URL)</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
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
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position in company</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Marketing Manager"
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
              control={form.control}
              name="visitors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many site visitors/month</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select visitor range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="less-than-1000">
                          Less than 1,000
                        </SelectItem>
                        <SelectItem value="1000-10000">
                          1,000 - 10,000
                        </SelectItem>
                        <SelectItem value="10000-50000">
                          10,000 - 50,000
                        </SelectItem>
                        <SelectItem value="50000-100000">
                          50,000 - 100,000
                        </SelectItem>
                        <SelectItem value="100000-500000">
                          100,000 - 500,000
                        </SelectItem>
                        <SelectItem value="more-than-500000">
                          More than 500,000
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mt-3">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
