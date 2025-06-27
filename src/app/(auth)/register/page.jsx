"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: { first_name: "", last_name: "", email: "", password: "" },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setServerError(data.error || "Registration failed");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {/* Server Error */}
      {serverError && (
        <p className="text-sm text-red-500 mt-2 mb-2 text-center">{serverError}</p>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <Label htmlFor="first_name" className="mb-2">
            First Name
          </Label>
          <Input
            id="first_name"
            name="first_name"
            placeholder="Ajay"
            className="placeholder:italic"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.first_name}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <Label htmlFor="last_name" className="mb-2">
            Last Name
          </Label>
          <Input
            id="last_name"
            name="last_name"
            placeholder="Kumar"
            className="placeholder:italic"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.last_name}
            </p>
          )}
        </div>
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
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {formik.isSubmitting ? "Registering..." : "Register"}
        </Button>

        {/* Already have an account */}
        <div>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
