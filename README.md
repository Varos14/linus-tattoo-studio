<<<<<<< HEAD
# linustatoostudio
linustatoostudio
=======
This is a Next.js + Tailwind CSS site for Linus Tattoo Studio.

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

## Configure booking email and Firebase

1) Copy `.env.example` to `.env.local` and set the values:

```
RESEND_API_KEY=...  # from https://resend.com
BOOKINGS_TO_EMAIL=you@studio.com
NEXT_PUBLIC_STUDIO_EMAIL=you@studio.com

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

2) Restart `npm run dev` after changing env vars.

- Without `RESEND_API_KEY`, booking requests are logged to the server console for local testing.
- With `RESEND_API_KEY`, requests are sent to `BOOKINGS_TO_EMAIL` using Resend.
- Firebase configuration is required for database operations (bookings and deposits).

## Customize content

- Edit `src/lib/config.ts` for studio name, Instagram, and contact details.
- Update copy and sections in pages under `src/app/*` (home, gallery, artists, booking, FAQ, aftercare, contact).
- Replace placeholder images in `public/` and gallery grid.

## Deploy

You can deploy to any Node host or to Vercel. For Vercel, set the same env vars in the project settings.

## Tech
st
- Next.js App Router
- Tailwind CSS v4
- Serverless API route for booking
>>>>>>> master
