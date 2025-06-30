import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Pencil, ArrowLeft } from 'lucide-react';

export default async function CustomerProfilePage({ params }) {
  const { id } = await params;

  const customer = await prisma.user.findUnique({
    where: {
      user_key: id,
    },
    select: {
      user_key: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
      created_at: true,
      updated_at: true,
      deleted_at: true,
    },
  });

  if (!customer || customer.role !== "customer" || customer.deleted_at) {
    notFound();
  }

  const isDeleted = Boolean(customer.deleted_at);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4 shadow-md">
            {customer.first_name[0]}
            {customer.last_name[0]}
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {customer.first_name} {customer.last_name}
          </h2>
          <p className="text-gray-500">{customer.email}</p>
          <span className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full capitalize">
            {customer.role}
          </span>
        </div>

        <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-600">
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(customer.created_at).toLocaleString()}
          </div>
          <div>
            <strong>Updated At:</strong>{" "}
            {new Date(customer.updated_at).toLocaleString()}
          </div>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <Link
        href={`/dashboard/customer/${customer.user_key}/edit`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
      >
        <Pencil size={16} />
        Edit Profile
      </Link>

          <Link
            href={`/dashboard/customer`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          {/* <form method="POST" action={`/api/customer/${customer.user_key}/delete`}>
            <button
              type="submit"
              className={`px-4 py-2 text-sm rounded transition ${
                isDeleted
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {isDeleted ? "♻️ Restore" : "🗑️ Delete"}
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
}
