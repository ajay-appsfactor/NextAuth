"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
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
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {/* Server Error */}
      {serverError && (
        <p className="text-sm text-red-500 mt-2 text-center">{serverError}</p>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            className="placeholder:italic"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <Label htmlFor="password" className="mb-2">
            Password
          </Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[32px] text-gray-500 cursor-pointer"
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full cursor-pointer flex items-center justify-center gap-2"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </Button>
        {/* Register Prompt */}
        <div>
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
