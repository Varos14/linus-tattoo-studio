import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

const resendApiKey = process.env.RESEND_API_KEY||process.env.NEXT_PUBLIC_RESEND_API_KEY||"re_g7y1ZM7F_27TGr88cBAUsgcnPdC3BUFR1";
const toEmail = process.env.BOOKINGS_TO_EMAIL || process.env.NEXT_PUBLIC_STUDIO_EMAIL || "geraldvaros@gmail.com";

type BookingPayload = {
  name: string;
  email: string;
  phone?: string;
  placement: string;
  size: string;
  style?: string;
  preferredDates?: string;
  budget?: string;
  references?: string;
  uploads?: string[];
  details: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<BookingPayload>;
    const required = ["name", "email", "placement", "size", "details"] as const;
    const missing = required.filter((k) => !body[k] || String(body[k]).trim() === "");
    if (missing.length) {
      return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
    }

    // Persist booking
    const bookingData: Omit<BookingPayload, 'id' | 'createdAt'> = {
      name: String(body.name),
      email: String(body.email),
      placement: String(body.placement),
      size: String(body.size),
      details: String(body.details),
    };

    if (body.phone) bookingData.phone = body.phone;
    if (body.style) bookingData.style = body.style;
    if (body.preferredDates) bookingData.preferredDates = body.preferredDates;
    if (body.budget) bookingData.budget = body.budget;
    if (body.references) bookingData.references = body.references;
    if (Array.isArray(body.uploads)) bookingData.uploads = body.uploads;

    // Persist booking using admin SDK (if available)
    let bookingId = null;
    if (adminDb) {
      try {
        const docRef = await adminDb.collection('bookings').add({
          ...bookingData,
          createdAt: Timestamp.now(),
        });
        bookingId = docRef.id;
      } catch (firestoreError) {
        console.error('Failed to save booking to Firestore:', firestoreError);
        // Generate a temporary booking ID as fallback
        bookingId = `local-${Date.now()}`;
      }
    } else {
      console.warn('Firebase Admin not initialized, skipping Firestore save');
      // Generate a temporary booking ID for local development
      bookingId = `local-${Date.now()}`;
    }

    const html = renderEmail(body as BookingPayload);

    if (!resendApiKey) {
      // Fallback: log to server console in dev environments
      console.log("[booking email fallback] to:", toEmail);
      console.log("subject:", `New booking request from ${body.name}`);
      console.log(html);
      return NextResponse.json({ ok: true, booked: true, bookingId, queued: false, note: "No RESEND_API_KEY set; logged to server." });
    }

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: "Linus Tattoo Studio <bookings@resend.dev>",
      to: [toEmail],
      subject: `New booking request from ${body.name}`,
      html,
      replyTo: String(body.email),
    });

    return NextResponse.json({ ok: true, booked: true, bookingId, queued: true });
  } catch (e: unknown) {
    console.error("Booking API error:", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

function renderEmail(data: BookingPayload) {
  const line = (label: string, key: keyof BookingPayload) =>
    data[key] ? `<p><strong>${label}:</strong> ${escapeHtml(String(data[key]))}</p>` : "";

  return `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px 0">New Booking Request</h2>
      ${line("Name", "name")}
      ${line("Email", "email")}
      ${line("Phone", "phone")}
      ${line("Placement", "placement")}
      ${line("Size", "size")}
      ${line("Style", "style")}
      ${line("Preferred Dates", "preferredDates")}
      ${line("Budget", "budget")}
      ${line("References", "references")}
      ${Array.isArray(data.uploads) && data.uploads.length ? `<p><strong>Uploaded images:</strong></p><ul>${data.uploads.map((u) => `<li><a href="${escapeHtml(String(u))}">${escapeHtml(String(u))}</a></li>`).join("")}</ul>` : ""}
      <p><strong>Idea</strong></p>
      <div>${escapeHtml(String(data.details || ""))}</div>
    </div>
  `;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

