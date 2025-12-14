/**
 * DashboardLayout - Layout principal do sistema SPE-M
 *
 * @description Wrapper que inclui TopNavBar e garante padding correto
 *
 * RESPONSABILIDADE:
 * - Renderizar TopNavBar fixa no topo
 * - Garantir pt-16 no main para não cobrir conteúdo
 * - Garantir pb-20 no mobile para não cobrir bottom nav
 * - Fornecer container responsivo
 *
 * @example
 * ```tsx
 * <DashboardLayout user={user}>
 *   <YourPageContent />
 * </DashboardLayout>
 * ```
 */

"use client";

import { TopNavBar, TopNavBarUser } from "./top-nav-bar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ============================================
// TYPES & INTERFACES
// ============================================

export interface DashboardLayoutProps {
  children: React.ReactNode;
  user: TopNavBarUser;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  maxWidth = "2xl",
  className = "",
}) => {
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    // TODO: Implementar lógica real de logout quando auth estiver pronto
    toast.success("Logout realizado com sucesso!");
    router.push("/sign-in");
  };

  // Container width classes
  const containerClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Skip to main content - Accessibility */}
      <a href="#main-content" className="skip-to-main">
        Pular para conteúdo principal
      </a>

      {/* TopNavBar - Fixed */}
      <TopNavBar user={user} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main
        id="main-content"
        className={`
          pt-16 pb-4 md:pb-8
          md:pb-4
          ${className}
        `}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${containerClasses[maxWidth]}`}>
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav Spacer */}
      <div className="md:hidden h-20" aria-hidden="true" />
    </div>
  );
};

/**
 * DashboardLayoutSimple - Versão sem container para páginas full-width
 *
 * @description Útil para dashboards, mapas, editores, etc.
 */
export const DashboardLayoutSimple: React.FC<
  Omit<DashboardLayoutProps, "maxWidth">
> = ({ children, user, className = "" }) => {
  const router = useRouter();

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-primary">
      <a href="#main-content" className="skip-to-main">
        Pular para conteúdo principal
      </a>

      <TopNavBar user={user} onLogout={handleLogout} />

      <main
        id="main-content"
        className={`pt-16 pb-4 md:pb-8 ${className}`}
      >
        {children}
      </main>

      <div className="md:hidden h-20" aria-hidden="true" />
    </div>
  );
};
