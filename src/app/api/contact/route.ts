import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function env(name: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

type MailError = Error & {
  code?: string;
  responseCode?: number;
  response?: string;
};

function getSendFailureMessage(error: MailError) {
  const code = (error.code || "").toUpperCase();
  const responseCode = error.responseCode;

  if (code === "EAUTH" || responseCode === 535) {
    return "SMTP authentication failed. Check SMTP_USER/SMTP_PASS. For Microsoft 365, ensure mailbox password is correct and SMTP AUTH is enabled.";
  }

  if (responseCode === 530) {
    return "SMTP login is not allowed yet. Verify the mailbox allows authenticated SMTP and try again.";
  }

  if (code === "ESOCKET" || code === "ECONNECTION" || responseCode === 421) {
    return "Could not connect to the email server. Please verify SMTP_HOST/SMTP_PORT and network access.";
  }

  return "Failed to send email. Please try again later.";
}

export async function POST(req: Request) {
  let payload: ContactPayload;

  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = (payload?.name || "").trim();
  const email = (payload?.email || "").trim();
  const phone = (payload?.phone || "").toString().trim();
  const message = (payload?.message || "").trim();

  if (!name || name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Please provide a valid name." }, { status: 400 });
  }

  if (!email || !isValidEmail(email) || email.length > 220) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!phone) {
    return NextResponse.json({ ok: false, error: "Please provide a phone number." }, { status: 400 });
  }

  if (phone.length > 30) {
    return NextResponse.json({ ok: false, error: "Phone number is too long." }, { status: 400 });
  }

  const digits = phone.replace(/\D/g, "");
  if (!digits || digits.length < 7 || digits.length > 15) {
    return NextResponse.json({ ok: false, error: "Please provide a valid phone number." }, { status: 400 });
  }

  if (!message || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please enter a message (at least 10 characters)." }, { status: 400 });
  }

  if (message.length > 4000) {
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
  const emailSubject = `Contact inquiry — ${name}`;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">${escapeHtml(emailSubject)}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from,
      to: CONTACT_TO,
      subject: emailSubject,
      text,
      html,
    });
  } catch (err) {
    const messageErr = getSendFailureMessage(err as MailError);
    return NextResponse.json({ ok: false, error: messageErr }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
