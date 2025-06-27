import { hashPassword } from "@/utils/hashPassword";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, password } = body;
    console.log(body)

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists." }), {
        status: 400,
      });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: { first_name, last_name, email, password: hashed },
    });

    return new Response(JSON.stringify({ success: true, user }), {
      status: 201,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
}
