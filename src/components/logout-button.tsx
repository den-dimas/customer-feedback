"use client";

import { LucideLogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    const logout = await signOut();

    if (logout.success) {
      router.push("/auth/signin");
    } else {
      toast.error("Sign out failed, try again later..");
    }
  };

  return (
    <Button onClick={onLogout}>
      <LucideLogOut />
      Sign Out
    </Button>
  );
}
