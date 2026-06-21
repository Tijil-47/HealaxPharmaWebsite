import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, type, subject, message } = await request.json();

    if (!name || !email || !type || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Insert into database
    const newInquiry = await prisma.inquiry.create({
      data: {
        name,
        email: email.toLowerCase(),
        type,
        subject,
        message,
        status: "unread",
      },
    });

    return NextResponse.json(
      { message: "Inquiry submitted successfully", id: newInquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry submission API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during submission" },
      { status: 500 }
    );
  }
}
