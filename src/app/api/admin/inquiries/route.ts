import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

// Helper function to verify admin authentication session
async function isAuthenticated(request: Request): Promise<boolean> {
  try {
    const cookies = (request as any).cookies;
    // Next.js standard requests provide a .cookies helper
    const token = request.headers.get("cookie")
      ?.split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) return false;

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "default_super_secret_fallback_key_32_chars_long"
    );
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Admin inquiries GET error:", error);
    return NextResponse.json({ error: "Failed to retrieve inquiries" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required fields" }, { status: 400 });
    }

    if (!["unread", "reviewed", "archived"].includes(status)) {
      return NextResponse.json({ error: "Invalid status state" }, { status: 400 });
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedInquiry);
  } catch (error) {
    console.error("Admin inquiries PUT error:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Admin inquiries DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
