import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

const CUSTOMER_ROLE = process.env.CUSTOMER_ROLE;

const CustomerPage = async () => {
  const session = await getServerSession(authOptions);
  console.log("customer session", session);
  if (!session?.user?.role || session.user.role !== CUSTOMER_ROLE) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md shadow-xl rounded-2xl p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome back,{" "}
            <span className="font-semibold">{session.user.name}</span>
          </p>
        </div>
        <div className="space-y-2 text-center mt-4">
          <p className="text-sm text-gray-700">
            <strong>Email:</strong> {session.user.email}
          </p>
          <Link
            href="/customer/profile"
            className="text-sm text-blue-600 hover:underline"
          >
            View Customer Profile
          </Link>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default CustomerPage;
