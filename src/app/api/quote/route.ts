import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  pickup_location: string;
  delivery_location: string;
  preferred_date: string;
  message: string;
  website?: string;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const quoteRateLimitStore = new Map<string, { count: number; resetAt: number }>();

function env(name: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type MailError = Error & {
  code?: string;
  responseCode?: number;
};

function getSendFailureMessage(error: MailError) {
  const code = (error.code || "").toUpperCase();
  const responseCode = error.responseCode;
  const rawMessage = (error.message || "").toLowerCase();

  if (code === "EAUTH" || responseCode === 535) {
    return "SMTP authentication failed. Check SMTP_USER/SMTP_PASS. For Microsoft 365, ensure mailbox password is correct and SMTP AUTH is enabled.";
  }

  if (responseCode === 530) {
    return "SMTP login is not allowed yet. Verify the mailbox allows authenticated SMTP and try again.";
  }

  if (code === "ESOCKET" || code === "ECONNECTION" || responseCode === 421) {
    return "Could not connect to the email server. Please verify SMTP_HOST/SMTP_PORT and network access.";
  }

  if (code === "ETIMEDOUT" || rawMessage.includes("timed out")) {
    return "Email server timed out. This usually means outbound SMTP is blocked in your hosting environment.";
  }

  if (code === "ECONNREFUSED" || rawMessage.includes("connection refused")) {
    return "SMTP connection was refused by the server. Please verify SMTP settings and mailbox SMTP access.";
  }

  return `Failed to send email. Please try again later. (${code || "UNKNOWN"})`;
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = quoteRateLimitStore.get(ip);

  if (!entry || now >= entry.resetAt) {
    quoteRateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  quoteRateLimitStore.set(ip, entry);
  return false;
}

export async function POST(req: Request) {
  let payload: QuotePayload;

  try {
    payload = (await req.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = (payload?.name || "").trim();
  const email = (payload?.email || "").trim();
  const phone = (payload?.phone || "").toString().trim();
  const pickupLocation = (payload?.pickup_location || "").trim();
  const deliveryLocation = (payload?.delivery_location || "").trim();
  const preferredDate = (payload?.preferred_date || "").trim();
  const message = (payload?.message || "").trim();
  const website = (payload?.website || "").trim();

  // Honeypot: most bots fill hidden fields, so short-circuit and pretend success.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  if (!name || name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Please provide a valid name." }, { status: 400 });
  }

  if (!email || !isValidEmail(email) || email.length > 220) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
  }

  const digits = phone.replace(/\D/g, "");
  if (!digits || digits.length < 7 || digits.length > 15) {
    return NextResponse.json({ ok: false, error: "Please provide a valid phone number." }, { status: 400 });
  }

  if (!pickupLocation || pickupLocation.length < 2 || pickupLocation.length > 220) {
    return NextResponse.json({ ok: false, error: "Please provide a valid pickup location." }, { status: 400 });
  }

  if (!deliveryLocation || deliveryLocation.length < 2 || deliveryLocation.length > 220) {
    return NextResponse.json({ ok: false, error: "Please provide a valid delivery location." }, { status: 400 });
  }

  if (!preferredDate || preferredDate.length > 40) {
    return NextResponse.json({ ok: false, error: "Please provide a valid preferred date." }, { status: 400 });
  }

  if (!message || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please provide a message (at least 10 characters)." }, { status: 400 });
  }

  if (message.length > 2000) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  const SMTP_HOST = env("SMTP_HOST");
  const SMTP_PORT = env("SMTP_PORT");
  const SMTP_USER = env("SMTP_USER");
  const SMTP_PASS = env("SMTP_PASS");
  const CONTACT_TO = env("CONTACT_TO");
  const CONTACT_FROM = env("CONTACT_FROM") || SMTP_USER;
  const SMTP_FROM_NAME = env("SMTP_FROM_NAME") || "YBR Logistics";

  const smtpUseJsonTransport = (env("SMTP_USE_JSON_TRANSPORT") || "").toLowerCase();
  const useJsonTransport = smtpUseJsonTransport === "true" || smtpUseJsonTransport === "1";

  if (useJsonTransport) {
    if (!CONTACT_TO || !CONTACT_FROM) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured. Please set CONTACT_TO and CONTACT_FROM." },
        { status: 500 }
      );
    }
  } else {
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO || !CONTACT_FROM) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    if (SMTP_PASS.includes("REPLACE_WITH_")) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email service setup is incomplete. Please set a valid SMTP password in SMTP_PASS.",
        },
        { status: 500 }
      );
    }
  }

  const transporter = useJsonTransport
    ? nodemailer.createTransport({ jsonTransport: true })
    : (() => {
        const portNum = Number(SMTP_PORT);
        const secure = portNum === 465;
        return nodemailer.createTransport({
          host: SMTP_HOST,
          port: portNum,
          secure,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });
      })();

  const from = `${SMTP_FROM_NAME} <${CONTACT_FROM}>`;
  const subject = "New shipment quote request";

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Pickup Location: ${pickupLocation}`,
    `Delivery Location: ${deliveryLocation}`,
    `Preferred Date: ${preferredDate}`,
    "",
    "Message:",
    message || "N/A",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">${subject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
      <p><strong>Delivery Location:</strong> ${deliveryLocation}</p>
      <p><strong>Preferred Date:</strong> ${preferredDate}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <p style="white-space: pre-wrap; margin: 0;">${message || "N/A"}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from,
      to: CONTACT_TO,
      subject,
      text,
      html,
    });
  } catch (err) {
    const message = getSendFailureMessage(err as MailError);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

