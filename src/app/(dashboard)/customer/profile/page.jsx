import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Pencil, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CustomerProfilePage() {
  const session = await getServerSession(authOptions);
  const id = session.user.id;
  console.log("customer session id", session.user.id);

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
          <Button asChild variant="default" className="gap-2">
            <Link href="/customer/edit">
              <Pencil size={16} />
              Edit Profile
            </Link>
          </Button>

          <Button asChild variant="secondary" className="gap-2">
            <Link href="/customer">
              <ArrowLeft size={16} />
              Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
