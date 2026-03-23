"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoaderIcon } from "@/components/icons";
import { toast } from "@/components/toast";

export function UserNav({ user }: { user: any }) {
  const router = useRouter();
  const { data, status } = useSession();

  const isGuest = data?.user?.type === "guest" || user?.type === "guest";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {status === "loading" ? (
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex flex-row gap-2">
              <div className="size-6 animate-pulse rounded-full bg-zinc-500/30" />
              <span className="animate-pulse rounded-md bg-zinc-500/30 text-transparent">
                Loading auth status
              </span>
            </div>
            <div className="animate-spin text-zinc-500">
              <LoaderIcon />
            </div>
          </button>
        ) : (
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
            data-testid="user-nav-button"
          >
            <Image
              alt={user.email ?? "User Avatar"}
              className="rounded-full"
              height={24}
              src={`https://avatar.vercel.sh/${user.email}`}
              width={24}
            />
            <span
              className="truncate max-w-[100px] sm:max-w-[150px]"
              data-testid="user-email"
            >
              {isGuest ? "Guest" : user?.email}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        align="end"
        data-testid="user-nav-menu"
      >
        <DropdownMenuItem asChild data-testid="user-nav-item-chat">
          <button
            type="button"
            className="w-full cursor-pointer"
            onClick={() => router.push("/chat")}
          >
            开始对话
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild data-testid="user-nav-item-auth">
          <button
            type="button"
            className="w-full cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600"
            onClick={() => {
              if (status === "loading") {
                toast({
                  type: "error",
                  description:
                    "Checking authentication status, please try again!",
                });

                return;
              }

              if (isGuest) {
                router.push("/login");
              } else {
                signOut({
                  callbackUrl: "/",
                });
              }
            }}
          >
            {isGuest ? "登录" : "退出登录"}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
