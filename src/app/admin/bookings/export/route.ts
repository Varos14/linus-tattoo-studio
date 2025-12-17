import { NextRequest } from "next/server";
import { getBookings, getDeposits } from "@/lib/db";
import type { Booking, Deposit } from "@/lib/firebase";

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

  const limit = 2000;
  const bookings = await getBookings({
    search: q.trim() || undefined,
    dateRange,
    limit,
  });

  // For each booking, we need to get the associated deposits
  const bookingsWithDeposits = await Promise.all(
    bookings.map(async (booking: Booking) => {
      const deposits = await getDeposits({
        where: [{ field: 'bookingId', op: '==', value: booking.id }],
        orderBy: { field: 'createdAt', direction: 'desc' },
      });
      return { ...booking, deposits };
    })
  );

  const filtered = bookingsWithDeposits;

  const headers = [
    "id",
    "created_at",
    "name",
    "email",
    "phone",
    "placement",
    "size",
    "style",
    "preferred_dates",
    "budget",
    "references",
    "uploads_count",
    "deposit_count",
    "deposit_total_cents",
    "deposit_currency",
  ];

  const lines = [headers.join(",")];

  for (const b of filtered) {
    const uploads = Array.isArray(b.uploads as unknown)
      ? ((b.uploads as unknown[]) || []).map((u) => String(u))
      : [];
    const totalCents = b.deposits.reduce((sum, d) => sum + (d.amount || 0), 0);
    const currency = b.deposits[0]?.currency || "";

    const row = [
      b.id,
      new Date(b.createdAt).toISOString(),
      b.name,
      b.email,
      b.phone || "",
      b.placement,
      b.size,
      b.style || "",
      b.preferredDates || "",
      b.budget || "",
      (b.references || "").replaceAll(/\r?\n|\r|,/g, " "),
      String(uploads.length),
      String(b.deposits.length),
      String(totalCents),
      currency,
    ];
    lines.push(row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","));
  }

  const csv = lines.join("\n");
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=bookings.csv",
    },
  });
}

