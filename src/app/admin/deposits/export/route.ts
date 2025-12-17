import { NextRequest } from "next/server";
import { getDeposits } from "@/lib/db";
import type { Deposit } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  const token = process.env.ADMIN_ACCESS_TOKEN || "";
  const { searchParams } = new URL(req.url);
  const provided = searchParams.get("key") || "";
  const q = searchParams.get("q") || "";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (token && provided !== token) {
    return new Response("Forbidden", { status: 403 });
  }

  const fromDate = from ? new Date(from) : undefined;
  const toDate = to ? new Date(to) : undefined;

  const dateRange = fromDate || toDate ? { from: fromDate, to: toDate } : undefined;

  const limit = 4000;
  const deposits = await getDeposits({
    search: q.trim() || undefined,
    dateRange,
    limit,
  });

  const filtered = deposits;

  const headers = [
    "id",
    "created_at",
    "email",
    "amount_cents",
    "currency",
    "payment_status",
    "session_id",
    "payment_intent_id",
    "booking_id",
  ];

  const lines = [headers.join(",")];

  for (const d of filtered) {
    const row = [
      d.id,
      new Date(d.createdAt).toISOString(),
      d.email || "",
      String(d.amount),
      d.currency,
      d.paymentStatus,
      d.sessionId,
      d.paymentIntentId || "",
      d.bookingId || "",
    ];
    lines.push(row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","));
  }

  const csv = lines.join("\n");
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=deposits.csv",
    },
  });
}

