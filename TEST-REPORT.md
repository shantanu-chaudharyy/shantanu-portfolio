# Portfolio QA report

**Result: 43/43 automated checks passed.**

## Coverage

- **Desktop:** 1440 × 1000
- **Tablet:** 768 × 1024
- **Mobile:** 390 × 844
- **Reduced-motion preference:** checked
- **JavaScript syntax:** `node --check` passed for all three JS files
- **HTML integrity:** one doctype, no duplicate IDs, local script/style/image paths exist
- **Content rendering:** 8 skill rows, 4 project cards, 17 certification entries
- **Contact:** exactly three actions (LinkedIn, Gmail, GitHub); removed the extra email text link that appeared like a fourth outlined button
- **Responsive layout:** no horizontal overflow at the tested viewport widths
- **Navigation:** all in-page anchor targets exist
- **Scroll effects:** all reveal sections become visible while scrolling; no JavaScript runtime exceptions
- **Offline logo fallback:** issuer initials appear when remote logo requests fail
- **Accessibility behavior:** reduced-motion mode keeps content visible and disables ambient particles

## Important scope note

Chromium local HTTP navigation is restricted in this execution environment, so browser checks used a test harness assembled from the current HTML, CSS, and JavaScript source files, with the local profile image embedded for the test. Node syntax checks and local-path checks were also run against the actual project files. The live external delivery of Google Fonts and Simple Icons logo images was not verified; if a logo cannot load, its issuer initials are shown instead.

## Ready-to-run

Run from the project folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.


## Additional launch verification (2026-10-20)

- Added `START-HERE-MAC.command` and `START-HERE-WINDOWS.bat` launch helpers.
- The ChatGPT inline file preview is not a reliable preview for this multi-file site: it may sandbox `index.html` without loading adjacent CSS, JavaScript, and image assets. Open the site through the local server instead.
- Local HTTP smoke test returned HTTP 200 for `index.html`, the stylesheet, profile image, and all three JavaScript files.
