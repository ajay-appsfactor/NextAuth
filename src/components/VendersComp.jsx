"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { vendorSchema } from "@/validations/venderSchema";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

export default function VenderComp() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: {
      vendor_code: "",
      vendor_name: "",
      vendor_type: "",
      email: "",
      phone_number: "",
      website: "",
      status: "Active",
      notes: "",
    },
    validationSchema: vendorSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const res = await fetch("/api/vendors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          router.push("/dashboard/vendors");
          resetForm();
        } else {
          const data = await res.json();
          setServerError(data.error || "Failed to create vendor");
        }
      } catch (err) {
        setServerError("Something went wrong");
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border mt-8 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Create Vendor</h2>

      {serverError && (
        <p className="text-sm text-red-500 text-center mb-4">{serverError}</p>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/*  Vendor Info */}
        <section>
          <h3 className="text-lg font-medium mb-4">Vendor Information</h3>

          {/* Grid Layout Set */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vender Code */}
            <div>
              <Label htmlFor="vendor_code" className="mb-2">
                Vendor Code<span className="text-rose-500">*</span>
              </Label>
              <Input
                id="vendor_code"
                name="vendor_code"
                placeholder="VEND123"
                value={formik.values.vendor_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="placeholder:italic"
              />
              {formik.touched.vendor_code && formik.errors.vendor_code && (
                <p className="text-sm text-red-500">
                  {formik.errors.vendor_code}
                </p>
              )}
            </div>

            {/* Vender Name */}
            <div>
              <Label htmlFor="vendor_name" className="mb-2">
                First Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="vendor_name"
                name="vendor_name"
                placeholder="Vender Name"
                value={formik.values.vendor_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="placeholder:italic"
              />
              {formik.touched.vendor_name && formik.errors.vendor_name && (
                <p className="text-sm text-red-500">
                  {formik.errors.vendor_name}
                </p>
              )}
            </div>

            {/* Vender Type */}
            <div>
              <Label htmlFor="vendor_type" className="mb-2">
                Vendor Type
              </Label>
              <Input
                id="vendor_type"
                name="vendor_type"
                placeholder="Manufacturer / Supplier"
                value={formik.values.vendor_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="placeholder:italic"
              />
              {formik.touched.vendor_type && formik.errors.vendor_type && (
                <p className="text-sm text-red-500">
                  {formik.errors.vendor_type}
                </p>
              )}
            </div>

            {/* Vender Status */}
            <div className="md:col-span-1">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formik.values.status}
                onValueChange={(value) => formik.setFieldValue("status", value)}
              >
                <SelectTrigger
                  id="status"
                  name="status"
                  className={clsx(
                    "w-full mt-1",
                    formik.touched.status && formik.errors.status
                      ? "border-red-500"
                      : ""
                  )}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Blacklisted">Blacklisted</SelectItem>
                </SelectContent>
              </Select>

              {formik.touched.status && formik.errors.status && (
                <p className="text-sm text-red-500">{formik.errors.status}</p>
              )}
            </div>
          </div>
        </section>

        {/*  Contact Info */}
        <section>
          <h3 className="text-lg font-medium mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2">
                Email 
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="vendor@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="placeholder:italic"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            {/* Phone Number */}
            <div>
              <Label htmlFor="phone_number" className="mb-2">
                Phone Number
              </Label>
              <Input
                id="phone_number"
                name="phone_number"
                placeholder="+91 **********"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="placeholder:italic"
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="text-sm text-red-500">
                  {formik.errors.phone_number}
                </p>
              )}
            </div>
            {/* Website */}
            <div>
              <Label htmlFor="phone_number" className="mb-2">
                Website 
              </Label>
              <Input
                id="website"
                name="website"
                placeholder="https://vendor.com"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="placeholder:italic"
              />
              {formik.touched.website && formik.errors.website && (
                <p className="text-sm text-red-500">{formik.errors.website}</p>
              )}
            </div>
          </div>
        </section>

        {/* Additional Notes */}
        <section>
          <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
          <div>
            <Label htmlFor="notes" className="mb-2">
              Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Write any additional notes here..."
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              className={clsx(
                "w-full border rounded-md p-2",
                formik.touched.notes && formik.errors.notes
                  ? "border-red-500"
                  : ""
              )}
            />
            {formik.touched.notes && formik.errors.notes && (
              <p className="text-sm text-red-500">{formik.errors.notes}</p>
            )}
          </div>
        </section>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="flex items-center gap-2 cursor-pointer"
          >
            {formik.isSubmitting && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {formik.isSubmitting ? "Creating..." : "Create Vendor"}
          </Button>
        </div>
      </form>
    </div>
  );
}
