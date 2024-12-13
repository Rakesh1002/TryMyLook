import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { demoLimit: true, demoUsed: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      remaining: Math.max(0, user.demoLimit - user.demoUsed),
    });
  } catch (error) {
    console.error("Failed to get demo count:", error);
    return NextResponse.json(
      { error: "Failed to get demo count" },
      { status: 500 }
    );
  }
}
