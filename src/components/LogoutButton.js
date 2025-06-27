"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };
  return (
    <Button
      variant="destructive"
      className="cursor-pointer mx-auto block mt-5"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
