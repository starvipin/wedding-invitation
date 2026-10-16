# Vinayak & Chanderkanta wedding invitation

## Local run

Node.js must be installed. No packages need to be installed.

Open PowerShell and run:

```powershell
cd C:\Users\starv\Desktop\Vinayak\wedding-invitation
node server.cjs
```

Open http://127.0.0.1:4173 in your browser. Keep the terminal open while using the website. Press Ctrl+C to stop the server.

You can also run `npm start` or `npm run dev` from this folder.

## Editing

- `dist/index.html`: invitation text, names, event dates, address and contact links.
- `dist/style.css`: colours, layout, flowers and animations.
- `dist/script.js`: share button and optional venue name/event times.
- `server.cjs`: local preview server, accessible only on this computer.

After saving changes, refresh your browser. No build step is needed. Local edits do not automatically update the hosted website.

The countdown targets 20 November 2026 at 00:00 India time (the start of the wedding date, not a confirmed ceremony time). The supplied couple photo is in `dist/assets/couple.jpg`. Function times and parents' names are still empty. The map points to the supplied locality, not a confirmed event venue.

`dist/celebrate.js` controls the wedding countdown. There is no background music. `dist/moments.css` styles the photo and countdown.

Google Fonts needs an internet connection; if unavailable, the browser uses fallback fonts.
