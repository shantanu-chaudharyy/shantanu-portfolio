# Shantanu Chaudhary — Portfolio

A responsive, animated developer portfolio built with vanilla HTML, CSS, and JavaScript. No build tools or package installs are required.

## Project structure

```text
shantanu-portfolio-wow/
├── index.html                  # Page structure and section mounts
├── assets/
│   ├── shantanu-profile.png    # Profile portrait
│   └── css/styles.css          # All styles, responsive rules, animations
├── js/
│   ├── portfolio-data.js       # Editable skills, projects, certifications
│   ├── render-content.js       # Creates cards from the data
│   └── main.js                 # Scroll effects, reveals, ambient background
├── README.md
└── TEST-REPORT.md
```

## Add content in one place

Open `js/portfolio-data.js`. Add an object to the relevant array:
- `skills`: `{ "category": "Testing", "items": "Playwright, Jest" }`
- `projects`: provide `artClass`, `label`, `artLead`, `artAccent`, `artIndex`, `title`, `url`, `description`, `tags`, `cta`, and `ctaUrl`. Set a project URL only when it exists.
- `certifications`: `{ "issuer": "Issuer", "date": "Month YYYY", "title": "Credential title", "detail": "Short detail", "logo": "https://...", "fallback": "AB" }`. Use an official or trusted logo URL; initials appear if the image fails.

Keep text in the data file and visual design in `assets/css/styles.css`; the renderer builds cards using DOM APIs. The page layout in `index.html` stays stable.

## Run locally (important)

**Do not use the ChatGPT file preview to judge the site.** That preview may show `index.html` without loading its sibling CSS, JavaScript, and image files. This is a multi-file project and should be opened through a local server.

- **macOS:** double-click `START-HERE-MAC.command`. If macOS blocks it, right-click the file and choose **Open**. Keep the Terminal window open while viewing the site.
- **Windows:** double-click `START-HERE-WINDOWS.bat`.
- **Manual method:** open Terminal in this folder and run `python3 -m http.server 8000` (Windows can use `py -m http.server 8000`), then visit `http://localhost:8000`.

If port 8000 is already in use, stop the other server or use a different port, for example `python3 -m http.server 8001`, and open `http://localhost:8001`.

## Contact links

- LinkedIn: https://www.linkedin.com/in/shantanuchaudhary
- Gmail: `shantanu.com01@gmail.com` (opens the visitor's email app via `mailto:`)
- GitHub: https://github.com/shantanu-chaudharyy

## Notes

- Education text intentionally shows `Pass-out: 2029`.
- External Google Fonts and issuer logos need an internet connection; system-font and initials fallbacks are available.
- Verify credential details and add credential verification links when available.
- This is a static site; deploy the full folder to GitHub Pages, Netlify, or Cloudflare Pages.
