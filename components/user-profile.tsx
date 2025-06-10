import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserInfo {
  id: string;
  name: string;
  image?: string | null | undefined;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function UserProfile({ mini }: { mini?: boolean }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authClient.getSession();

      if (!result.data?.user) {
        router.push("/sign-in");
        return;
      }

      setUserInfo(result.data?.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load user profile. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  };

  if (error) {
    return (
      <div
        className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}
      >
        <div className="text-red-500 text-sm flex-1">
          {mini ? "Error" : error}
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}
        >
          <Avatar>
            {loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <>
                {userInfo?.image ? (
                  <AvatarImage src={userInfo?.image} alt="User Avatar" />
                ) : (
                  <AvatarFallback>
                    {userInfo?.name && userInfo.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </>
            )}
          </Avatar>
          {mini ? null : (
            <div className="flex items-center gap-2">
              <p className="font-medium text-md">
                {loading ? "Loading..." : userInfo?.name || "User"}
              </p>
              {loading && <Loader2 className="h-3 w-3 animate-spin" />}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/settings?tab=profile">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings?tab=billing">
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
