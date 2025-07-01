import RegisterForm from "@/components/RegisterForm";

// export const metadata = {
//   title: "Register",
// };


export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <RegisterForm />
    </div>
  );
}
