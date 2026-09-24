# Admin panel setup (Firebase)

The site works today without any of this — it just shows demo/placeholder content and the
Contact form falls back to a "not connected yet" message. Do these steps once to turn on
the real database and the `/admin` panel.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com → **Add project** → give it a name (e.g. `sam-k-socials`).
2. In the new project, click the **Web** icon (`</>`) to register a web app. Skip Firebase Hosting setup in that wizard — we'll do it via CLI later if you want it.
3. Copy the `firebaseConfig` values shown (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).

## 2. Enable Firestore and Auth

1. In the left sidebar: **Build → Firestore Database → Create database**. Choose a region close to your users, start in **production mode** (the security rules in this repo already lock it down — see step 4).
2. **Build → Authentication → Get started**. Enable the **Email/Password** sign-in method.
3. Still in Authentication → **Users** tab → **Add user**. Create exactly one user: Sam's real email + a password. This is the *only* account that should ever exist here — there's no public sign-up screen in the app.

## 3. Set the admin email in the security rules

Open [firestore.rules](firestore.rules) and find:

```js
function isAdminEmail() {
  return request.auth != null &&
    request.auth.token.email in ['hello@samksocials.com'];
}
```

Replace `hello@samksocials.com` with the exact email you used in step 2.3. This is what grants
`/admin` write access — get it wrong and either nobody can save changes, or the wrong account can.

## 4. Deploy the security rules

```bash
npx firebase-tools@latest login
npx firebase-tools@latest use --add        # pick the project you created, alias "default"
npx firebase-tools@latest deploy --only firestore:rules
```

> ⚠️ These rules are a solid first pass (per-field validation, size limits, default-deny,
> admin-only writes) but treat them as a **prototype to review**, not a guarantee — especially
> before you get real traffic. Ask me to re-audit them once the real admin email is in and you've
> used the panel a bit.

## 5. Set your local environment variables

Copy `.env.example` to `.env.local` and fill in the values from step 1.3:

```bash
cp .env.example .env.local
```

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Restart `npm run dev` after saving. The Contact form and `/admin/login` will now be live.

## 6. First login

1. Go to `/admin/login`, sign in with the email/password from step 2.3.
2. Open each section (Services, Process, Portfolio, Testimonials, Site settings) and hit **Save**
   once, even without changing anything — this is what actually creates the Firestore documents
   for the first time (they start out as the same demo content already on the live site, so
   nothing visibly changes until you edit and save again).

## 7. Deploying the site itself

This repo already has `firebase.json` set up for **Firebase Hosting**, as one option:

```bash
npm run build
npx firebase-tools@latest deploy --only hosting
```

Vercel/Netlify also still work fine (see `vercel.json` / `public/_redirects`) — Hosting is not
required, only Firestore + Auth are. Whichever host you use, set the same `VITE_FIREBASE_*`
environment variables there too (Vercel/Netlify: Project Settings → Environment Variables).

## What the admin panel controls

| Section | Firestore doc | Public pages it affects |
|---|---|---|
| Site settings | `content/site` | Header (name), Footer, Contact, Home hero availability line |
| Services | `content/services` | Home services carousel, Services page |
| Process | `content/process` | Services page "how we work" section |
| Portfolio | `content/clients` | Portfolio page, case study pages (max 4 clients) |
| Testimonials | `content/testimonials` | Home + Services testimonial sections |
| Enquiries | `enquiries` collection | (read-only inbox — messages sent via the Contact form) |

Every public page falls back to the original demo copy if Firestore has no saved content yet,
so the site never breaks — even before you've logged into `/admin` for the first time.
