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

The year, function times, parents' names and photos have not been supplied and are left empty. The map points to the supplied locality, not a confirmed event venue.

Google Fonts needs an internet connection; if unavailable, the browser uses fallback fonts.
