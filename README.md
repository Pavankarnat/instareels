# Instantreels — Next.js + Tailwind CSS

A 5-page marketing site (Home, Services, Portfolio, About, Contact) built with
Next.js (App Router) and Tailwind CSS, matching the Instantreels design:
deep ink/merlot browns, cream backgrounds, a dusty-rose accent, Fraunces for
display type and Manrope for body/nav.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.js          root layout, fonts, metadata
  globals.css         Tailwind entrypoint
  page.js             Home
  services/page.js
  portfolio/page.js   includes a working category filter
  about/page.js
  contact/page.js     includes a working demo enquiry form
components/
  Navbar.js           sticky nav, active-link highlighting, mobile menu
  Footer.js
  Photo.js            next/image wrapper used for every photo on the site
  CtaSection.js        shared closing call-to-action block
```

## Photos

Every image on the site currently comes from **Lorem Picsum**
(`https://picsum.photos/seed/<seed>/...`), so the layout renders with real
photography out of the box with no setup. Before launch, replace these with
your own shoot photos:

1. Drop your images into `public/photos/`.
2. In `components/Photo.js`, change the `src` to point at your local file
   (e.g. `/photos/wedding-1.jpg`) instead of the Picsum URL, or pass a
   different `src` prop per usage.
3. Remove the `picsum.photos` entries from `next.config.js` once you're no
   longer using them.

## Customizing the look

Colors and fonts are defined as Tailwind tokens in `tailwind.config.js`
(`ink`, `merlot`, `linen`, `linen2`, `bark`, `sand`, `rose`, `rose-deep`) and
loaded via `next/font/google` in `app/layout.js`. Change either file to
restyle the whole site at once.

## Contact form

The contact form on `/contact` is a working client-side demo: submitting it
shows a confirmation message but does not send anything anywhere yet. Wire
it up to a real backend or form service (e.g. an API route, Resend, or
Formspree) inside `handleSubmit` in `app/contact/page.js`.

# instareels
