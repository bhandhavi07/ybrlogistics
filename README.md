# YbrLogistics Website

This is a Next.js (App Router) marketing site for `YbrLogistics` with an SMTP-backed contact form.

## Setup

1. Install dependencies
   - `npm install`
2. Configure environment variables
   - Copy the example env file: `cp .env.local.example .env.local`
   - Update the SMTP settings and `CONTACT_TO`.

## Run locally

- `npm run dev`
- Open: `http://localhost:3000`

## Contact form

The `POST /api/contact` endpoint sends the submitted message via SMTP using:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `CONTACT_TO` (recipient)
- `CONTACT_FROM` (optional; used as the sender email)
- `SMTP_FROM_NAME` (optional; used as the sender display name)

### Local testing without SMTP

If you do not have real SMTP credentials yet, set `SMTP_USE_JSON_TRANSPORT=true`. The backend will accept the submission and run through the Nodemailer send flow without needing a real mail server.

 
