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
import { Loader2 } from "lucide-react";
import LoginImage from "../../../../public/login_user.jpg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ResetPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
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
          else if (role === "customer") router.push("/customer");
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
          <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

          {serverError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle className="text-center">Error</AlertTitle>
              <AlertDescription className="text-sm text-center">
                {serverError}
              </AlertDescription>
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
            {/* Back To Login */}
            <p className="text-sm text-muted-foreground text-end mt-6">
              <Link href="/login" className="text-primary hover:underline">
                Back To Login
              </Link>
            </p>

            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2 cursor-pointer mt-7 h-14"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {formik.isSubmitting ? "Logging in..." : "CONTINUE"}
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
};

export default ResetPage;
