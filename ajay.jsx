import TopHeader from "@/components/TopHeader";

export default function Layout({ children }) {
  return (
    <>
      <TopHeader />
      <MainHeader /> {/* your existing header with logo, search, profile */}
      <main>{children}</main>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

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
</Link>;




// Login Form ..
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import LoginImage from "../../../../public/login_user.jpg";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Please complete this required field."),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Please complete this required field."),
    }),
    onSubmit: async (values) => {
      setServerError("");
      try {
        const res = await signIn("credentials", {
          ...values,
          redirect: false,
        });

        if (res?.ok) {
          const sessionRes = await fetch("/api/auth/session");
          if (!sessionRes.ok) throw new Error("Session fetch failed");

          const session = await sessionRes.json();
          const role = session?.user?.role;

          if (role === "admin") router.push("/admin");
          else if (role === "customer") router.push("/dashboard/customer");
          else router.push("/login");
        } else {
          setServerError("Invalid email or password.");
        }
      } catch (err) {
        console.error(err);
        setServerError("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-6">
      {/* Left Side (Form) — smaller (2/5) on lg+ */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:col-span-2">
        {/* Logo */}
        <div className="w-full max-w-md mx-auto flex justify-center">
          <div className="mb-10 flex items-center justify-center lg:justify-start gap-2 text-3xl font-semibold text-primary">
            <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-md">
              A
            </div>
            <span>Appsfactor</span>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Log In</h2>
          <div className="mb-6 text-md">
            Welcome! Please fill email and password to log in into your account.
          </div>

          {serverError && (
            <Alert
              variant="destructive"
              className="bg-red-100 text-red-500 border-red-500 mb-4"
            >
               <AlertTitle className="text-center text-sm"> {serverError}</AlertTitle>
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="mb-2">
                Email<span className="text-rose-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="h-12"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="password" className="mb-2">
                Password<span className="text-rose-500">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                className="h-12"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Forget Password */}
            <p className="text-sm text-muted-foreground text-end mt-6">
              <Link
                href="/reset-password"
                className="text-primary hover:underline"
              >
                Forget your password?
              </Link>
            </p>

            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2 cursor-pointer mt-7 h-12"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {formik.isSubmitting ? "Logging in..." : "LOGIN NOW"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side (Image) — larger (3/5) on lg+ */}
      <div className="hidden lg:block relative lg:col-span-4">
        <Image
          src={LoginImage}
          alt="Login Illustration"
          fill
          className="object-cover h-full w-full dark:brightness-[0.4] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}

