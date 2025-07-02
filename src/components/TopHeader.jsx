"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import clsx from "clsx";

const navItems = [
  "Activities",
  "Billing",
  "Customer",
  "Vendors",
  "Payroll and HR",
  "Financial",
  "Reports",
  "Analytics",
  "Documents",
  "Setup",
  "Payments",
  "Fixed Assets",
  "A/P A/R",
  "SuiteApps",
  "Support",
];

export default function TopHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-100 dark:bg-gray-900 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4 text-sm font-medium whitespace-nowrap overflow-x-auto">
          {navItems.map((item) => {
            const href = `/dashboard/${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item}
                href={href}
                className={clsx(
                  "transition-colors",
                  isActive
                    ? "text-primary font-semibold border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu (Sheet) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="text-muted-foreground" asChild>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] p-4">
              <nav className="space-y-3 mt-6">
                {navItems.map((item) => {
                  const href = `/${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={item}
                      href={href}
                      className={clsx(
                        "block text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      {item}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
