"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function EditCustomerProfile() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const user = session?.user;
  const [submitted, setSubmitted] = useState(false); 

  const validationSchema = useMemo(
    () =>
      Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
      }),
    []
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitted(true); 

      const res = await fetch(`/api/customer/${user.id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Update failed");

      await update({
        first_name: values.first_name,
        last_name: values.last_name,
        email: user.email,
      });

      router.push("/customer/profile");
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Something went wrong while saving.");
      setSubmitted(false); // revert
    } finally {
      setSubmitting(false);
    }
  };

  
  if (status === "loading" && !submitted) {
    return <div className="p-4 text-center text-lg">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-red-500">
        User session not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        <Formik
          initialValues={{
            first_name: user.first_name || "",
            last_name: user.last_name || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {["first_name", "last_name"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 font-medium capitalize">
                    {field.replace("_", " ")}
                  </label>
                  <Field
                    name={field}
                    type="text"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
