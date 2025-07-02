import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/hashPassword";
import { NextResponse } from "next/server";

// Customer Add in the Users and Custormers Table
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      first_name,
      last_name,
      company,
      address,
      city,
      state,
      zip,
      country,
      phone,
      mobile,
      email,
      password,
      shipping_first_name,
      shipping_last_name,
      shipping_company,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_country,
      shipping_zip,
      shipping_phone,
      shipping_mobile,
      send_invoice,
      conformance,
      terms,
      freight,
      customer_note,
      quality_note,
      accounting_note,
      shipping_note,
      sales_note,
    } = body;

    console.log("customer body", body);

    const trimmedEmail = email.trim().toLowerCase();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: trimmedEmail,
        password: hashedPassword,
        first_name: first_name,
        last_name: last_name,
        customer: {
          create: {
            first_name: first_name,
            last_name: last_name,
            email: trimmedEmail,
            company,
            address,
            city,
            state,
            zip,
            country,
            phone,
            mobile: mobile || null,
            shipping_first_name: shipping_first_name || null,
            shipping_last_name: shipping_last_name || null,
            shipping_company: shipping_company || null,
            shipping_address: shipping_address || null,
            shipping_city: shipping_city || null,
            shipping_state: shipping_state || null,
            shipping_zip: shipping_zip || null,
            shipping_country: shipping_country || null,
            shipping_phone: shipping_phone || null,
            shipping_mobile: shipping_mobile || null,
            send_invoice: send_invoice || null,
            conformance: conformance || null,
            terms: terms || null,
            freight: freight || null,
            customer_note: customer_note || null,
            quality_note: quality_note || null,
            accounting_note: accounting_note || null,
            shipping_note: shipping_note || null,
            sales_note: sales_note || null,
            sorting: 0,
          },
        },
      },
    });

    console.log("user data :", user)

    const response = NextResponse.json(
      { message: "Customer added successfully" },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error("Error in POST /api/dashboard/customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
