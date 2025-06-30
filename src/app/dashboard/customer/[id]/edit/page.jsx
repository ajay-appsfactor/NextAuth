'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default  function EditCustomerProfile() {
  const router = useRouter();
  const params = useParams();
  const  id  =  params.id;
  console.log("Customer id",id)
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`/api/customer/${id}`)
      .then(res => res.json())
      .then(data => setCustomer(data));
  }, [id]);

  if (!customer) {
    return <div className="p-4 text-center font-semibold text-2xl mx-auto">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        <Formik
          initialValues={{
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
          }}
          validationSchema={Yup.object({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await fetch(`/api/customer/${id}/update`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });

            if (res.ok) {
              router.push(`/dashboard/customer/${id}`);
            } else {
              alert('Update failed');
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">First Name</label>
                <Field name="first_name" className="w-full border p-2 rounded" />
                <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Last Name</label>
                <Field name="last_name" className="w-full border p-2 rounded" />
                <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Field name="email" type="email" className="w-full border p-2 rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="cursor-pointer px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
