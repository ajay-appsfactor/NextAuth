import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req, res) {
  try {
    const body = await req.json();
    console.log("Vender Data", body);
    const {
      vendor_code,
      vendor_name,
      vendor_type,
      email,
      phone_number,
      website,
      status,
      notes,
    } = body;

    if (!vendor_code || !vendor_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const vendor = await prisma.vendor.create({
      data: {
        vendor_code,
        vendor_name,
        vendor_type,
        email,
        phone_number,
        website,
        status,
        notes,
      },
    });
    return NextResponse.json(
      { message: "Vender Create Successfull", vendor },
      { status: 200 }
    );
  } catch (error) {
    console.error("Vendor creation failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
