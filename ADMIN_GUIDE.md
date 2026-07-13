# Admin Guide — English With Henda

A short, practical guide to running the site: signing in, sharing access, and managing the audio resources.

---

## 1. Signing in

1. Go to **`/login`** (e.g. `https://learnenglish.tn/login`).
2. Enter your **email** and **password**.
3. You land on the **Admin dashboard** (`/admin`). An **Admin** link also appears in the site menu while you're signed in.

> As an admin you can browse the whole site freely — the private-site lock (below) never blocks you.

To leave, click **Logout** (top-right of the dashboard).

---

## 2. The private site & sharing access

The whole site is **private**. A first-time visitor sees a locked screen and can't go further without an **access code** (or a link/QR that contains it).

On the dashboard, the **Site access** card is where you manage this:

- **Shareable link** — copy it with **Copy link** and send it (WhatsApp, email, etc.). Anyone who opens it is unlocked on their device for ~6 months.
- **QR code** — click **Download QR** to get a PNG you can print or post. Scanning it unlocks the person's device.
- **Access code** — the short code inside the link is what someone types on the locked screen if they don't have the link.

### Rotating the key (revoking access)
If a link leaks or you want to cut off old access, click **Rotate key**. This makes a **new** code and **immediately breaks every link/QR you shared before** — so you'll need to re-send the new link/QR to the people who should still have access.

> **Tip:** People stay unlocked on their device once they've used the link. Share the access link/QR once with your audience; after that they can use the site normally.

---

## 3. Managing resources (audio lessons)

Each **resource** is an audio lesson tied to a grade and (optionally) a page in one of the books.

### Add a resource
1. Click **Add Resource**.
2. Fill in:
   - **Title** — e.g. "Grammar — Present Simple". (The **slug**, the address of the page, is filled in automatically.)
   - **Grade** — 4th to 9th year.
   - **Page number in the book** — optional; the page where this listening exercise appears.
   - **Summary** — a short description shown on the page.
   - **Related books** — tap the year chips to link the relevant book(s).
   - **Audio files** — click **Add audio files**; you can add **several** (they play in order on the page). Accepted: mp3, wav, ogg, m4a, aac, flac, opus.
3. Click **Create Resource**.

### Edit or delete
- **Edit** — change any field, add more audio, or remove an audio (the ✕ next to it). Existing audios you keep stay; ones you remove are deleted.
- **Delete** — removes the resource and its audio files permanently.

The table shows each resource's **grade**, **page**, and **number of audios**.

---

## 4. Resource QR codes (for the books)

Each resource has its **own QR code** — this is what you print next to the exercise in a book.

1. In the resource table, click the **QR icon** on a row.
2. **Download PNG** — the QR is a **transparent PNG**, so it prints cleanly on any page background.
3. Print it next to the matching exercise. A student scans it → the audio page opens on their phone.

> **Important — how the two QR types work together:**
> The site is private, so a student scanning a **book QR on a brand-new phone** will first hit the locked screen. The intended flow is: they open your **Site-access link/QR once** (Section 2) to unlock their phone, and after that every book QR works normally. So make sure buyers also receive the site-access link/QR.

---

## 5. Good to know

- **Two different codes:** the **Site access** code unlocks the whole site; each **resource QR** opens one specific lesson. They're separate.
- **Languages:** the public site is Arabic + English; visitors switch with the language button. The admin dashboard is in English.
- **Nothing is lost:** resources live in a database with automatic backups. Deleting is the only way to remove one.
- **If something looks broken:** make sure you're signed in, and that the link you shared hasn't been rotated. When in doubt, grab a fresh link/QR from the **Site access** card.

---

*Questions or changes? Contact your developer.*
