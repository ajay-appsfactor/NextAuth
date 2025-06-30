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
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Customer Dashboard</h1>
      <p className="text-center mt-4">Welcome {session.user.email}</p>
      <Link
        href={`/dashboard/customer/${session.user.id}`}
        className="text-blue-600 block text-center mt-4"
      >
        View Customer Profile
      </Link>
      <LogoutButton />
    </div>
  );
};

export default CustomerPage;
