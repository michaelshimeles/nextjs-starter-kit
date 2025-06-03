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
import { authClient } from "@/lib/auth/auth-client";
import { ERROR_EVENTS, createClientErrorTracker } from "@/lib/posthog-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

interface UserInfo {
  name?: string;
  image?: string;
  id: string;
  email?: string;
}

export default function UserProfile({ mini }: { mini?: boolean }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const posthog = usePostHog();
  const trackError = createClientErrorTracker(posthog);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authClient.getSession();
      setUserInfo(result.data?.user);
      
      // Track successful user profile load
      posthog?.capture('user_profile_loaded', {
        component: 'user_profile',
        has_name: !!result.data?.user?.name,
        has_image: !!result.data?.user?.image,
        user_id: result.data?.user?.id
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      trackError(ERROR_EVENTS.AUTH_SESSION_ERROR, error, {
        component: 'user_profile',
        action: 'fetch_session_failed',
        mini_mode: !!mini
      });
      setError("Failed to load user profile. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    posthog?.capture('user_profile_retry', {
      component: 'user_profile',
      mini_mode: !!mini
    });
    fetchUserData();
  };

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
      <div className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}>
        <div className="text-red-500 text-sm flex-1">
          {mini ? "Error" : error}
        </div>
        {!mini && (
          <button
            onClick={handleRetry}
            className="text-xs text-blue-500 hover:text-blue-700 underline ml-2"
            disabled={loading}
          >
            {loading ? "Retrying..." : "Retry"}
          </button>
        )}
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
              <AvatarImage src={userInfo?.image} alt="User Avatar" />
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
          <Link href="/dashboard/settings?tab=organization">
            <DropdownMenuItem>
              Organization
              <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
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
