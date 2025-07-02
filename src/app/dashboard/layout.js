import Navbar from "@/components/Navbar";
import TopHeader from "@/components/TopHeader";

export default function DashboardLayout({ children }) {
  return (
    <section>
          <Navbar />
          <TopHeader />
        <main className="w-full">
          <div className="px-4">{children}</div>
        </main>
    </section>
  );
}

