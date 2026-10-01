import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma"; // Adjust import path based on your project structure

/**
 * Health Check Endpoint
 * Verifies the status of the PostgreSQL database via Prisma
 */
export async function GET() {
  const startTime = Date.now();

  try {
    // Attempt a simple query to verify connection (e.g., SELECT 1)
    // This handles SSL and basic connectivity issues
    await prisma.$queryRawUnsafe("SELECT 1");

    // Calculate response time
    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      status: "ok",
      database: {
        status: "connected",
        duration: `${durationMs}ms`,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Log error for debugging but don't leak stack trace in production if not needed
    console.error("Database connection failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Database is unavailable or unreachable",
        // Optionally expose internal errors to self-hosted instances only if configured
        ...(process.env.NODE_ENV !== "production" && { stack: (error as Error).stack }),
      },
      { status: 503 }, // Service Unavailable
    );
  }
}
