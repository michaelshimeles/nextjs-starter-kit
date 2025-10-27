/**
 * TopNavBar - SPE-M Medical System Navigation
 *
 * @description Barra de navegação fixa no topo com glassmorphism Apple Vision Pro
 *
 * ESTRUTURA:
 * - Altura: 64px (h-16)
 * - Posição: fixed top-0 z-50
 * - Background: glassmorphism com blur
 * - Border bottom: border-subtle
 *
 * LAYOUT:
 * [Logo] [Nav Links] [Spacer] [Search] [Notifications] [Theme Toggle] [User Menu]
 *
 * @example
 * ```tsx
 * <TopNavBar currentPath="/dashboard" user={user} />
 * ```
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  FileText,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "next-themes";

// ============================================
// TYPES & INTERFACES
// ============================================

export interface TopNavBarUser {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface TopNavBarProps {
  user: TopNavBarUser;
  onLogout?: () => void;
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active: boolean;
}

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * NavLink - Link de navegação com estado ativo
 */
const NavLink: React.FC<NavLinkProps> = ({ href, icon, children, active }) => {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg transition-base font-medium
        ${
          active
            ? "bg-primary text-white"
            : "text-secondary hover:bg-secondary hover:text-primary"
        }
      `}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const TopNavBar: React.FC<TopNavBarProps> = ({ user, onLogout }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useState(() => {
    setMounted(true);
  });

  // Helper function to check if path is active
  const isActive = (path: string): boolean => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 glass-effect border-b border-subtle"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="container mx-auto h-full flex items-center justify-between px-6">

        {/* Logo & Brand */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="SPE-M - Ir para Dashboard"
        >
          <Activity className="w-8 h-8 text-primary" aria-hidden="true" />
          <div className="hidden sm:block">
            <span className="text-xl font-semibold text-primary">SPE-M</span>
            <p className="text-xs text-tertiary leading-none">Sistema Médico</p>
          </div>
        </Link>

        {/* Main Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink
            href="/dashboard"
            icon={<LayoutDashboard className="w-4 h-4" />}
            active={isActive("/dashboard")}
          >
            Dashboard
          </NavLink>
          <NavLink
            href="/patients"
            icon={<Users className="w-4 h-4" />}
            active={isActive("/patients")}
          >
            Pacientes
          </NavLink>
          <NavLink
            href="/forms"
            icon={<FileText className="w-4 h-4" />}
            active={isActive("/forms")}
          >
            Fichas
          </NavLink>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center gap-3">

          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Buscar"
            className="hidden sm:flex"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notificações - 3 não lidas"
          >
            <Bell className="w-5 h-5" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"
              aria-hidden="true"
            />
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={
                theme === "dark"
                  ? "Ativar modo claro"
                  : "Ativar modo escuro"
              }
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 hover:bg-secondary transition-base"
                aria-label="Menu do usuário"
              >
                <Avatar className="w-8 h-8">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-primary">{user.name}</p>
                  <p className="text-xs text-tertiary">{user.role || "Médico"}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-tertiary" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 glass-effect">
              <DropdownMenuLabel>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-tertiary font-normal">{user.email}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onLogout}
                className="cursor-pointer text-error focus:text-error"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Sheet Alternative */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-subtle">
        <div className="flex items-center justify-around px-4 py-2">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-base ${
              isActive("/dashboard")
                ? "text-primary"
                : "text-tertiary"
            }`}
            aria-label="Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-medium">Dashboard</span>
          </Link>

          <Link
            href="/patients"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-base ${
              isActive("/patients")
                ? "text-primary"
                : "text-tertiary"
            }`}
            aria-label="Pacientes"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">Pacientes</span>
          </Link>

          <Link
            href="/forms"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-base ${
              isActive("/forms")
                ? "text-primary"
                : "text-tertiary"
            }`}
            aria-label="Fichas"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs font-medium">Fichas</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
