"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { CircleQuestionMark, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="border-b bg-white dark:bg-gray-900 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/dashboard">
          <div className="cursor-pointer flex items-center gap-2 text-lg font-semibold text-primary whitespace-nowrap">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-md">
              A
            </div>
            <span>Appsfactor</span>
          </div>
        </Link>

        {/* Center: Search bar */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="text" placeholder="Search..." className="pl-10 h-9" />
          </div>
        </div>

        {/* Right: Profile Section */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground whitespace-nowrap">
          {/* Help */}
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <CircleQuestionMark className="h-4 w-4" />
            <span className="hidden sm:inline">Help</span>
          </div>

          {/* Feedback */}
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Feedback</span>
          </div>

          {/* User Name */}
          {user?.name && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{user.name}</span>
            </div>
          )}

          {/* Email */}
          <div className="hidden sm:block">
            {user?.email || "user@example.com"}
          </div>
        </div>
      </div>
    </nav>
  );
}
