import {
  Shadcnui,
  TailwindCSS,
  BetterAuth,
  Polar,
  NeonPostgres,
  Nextjs,
} from "@/components/logos";
import { Card } from "@/components/ui/card";
import * as React from "react";

export default function Integrations() {
  return (
    <section>
      <div className="pt-12 pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <div>
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Built with the best tools
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Launch your project with confidence, knowing that you&apos;re
              using the best tools available.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              title="Next.js"
              description="The React framework for production with App Router, Server Components, and built-in optimizations."
              link="https://nextjs.org"
            >
              <Nextjs />
            </IntegrationCard>

            <IntegrationCard
              title="Better Auth"
              description="Modern authentication library with session management, OAuth providers, and security features."
              link="https://better-auth.com"
            >
              <BetterAuth />
            </IntegrationCard>

            <IntegrationCard
              title="Neon Postgres"
              description="Serverless PostgreSQL database with branching, autoscaling, and modern developer experience."
              link="https://neon.tech"
            >
              <NeonPostgres />
            </IntegrationCard>

            <IntegrationCard
              title="Polar.sh"
              description="Developer-first subscription platform with webhooks, customer portal, and usage-based billing."
              link="https://polar.sh"
            >
              <Polar />
            </IntegrationCard>

            <IntegrationCard
              title="Tailwind CSS"
              description="Utility-first CSS framework for rapid UI development with consistent design tokens."
              link="https://tailwindcss.com"
            >
              <TailwindCSS />
            </IntegrationCard>

            <IntegrationCard
              title="shadcn/ui"
              description="Beautiful, accessible components built with Radix UI primitives and styled with Tailwind CSS."
              link="https://ui.shadcn.com"
            >
              <Shadcnui />
            </IntegrationCard>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  title,
  description,
  children,
  link,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  link?: string;
}) => {
  const CardContent = () => (
    <div className="relative">
      <div className="*:size-10">{children}</div>

      <div className="mt-6 space-y-1.5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-105"
      >
        <Card className="p-6 h-full cursor-pointer hover:shadow-lg transition-shadow rounded-md">
          <CardContent />
        </Card>
      </a>
    );
  }

  return (
    <Card className="p-6">
      <CardContent />
    </Card>
  );
};
