import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const ADMIN_ROLE = process.env.ADMIN_ROLE;

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== ADMIN_ROLE) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
      <p className="text-center">Welcome {session.user.email}</p>
      <LogoutButton />
    </div>
  );
}
