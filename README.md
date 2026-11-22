# Jennings Cleaning — Premium Homepage (Design Concept)

A custom, conversion-focused homepage redesign for **Jennings Cleaning**, a family-run
pure-water window cleaning and exterior care company serving Folkestone, Hythe, Elham and
the wider South East Kent coast since 2005.

This is a **static, GitHub Pages-ready** build: plain HTML5, CSS3 and vanilla JavaScript —
no build step, no backend, no framework.

> **Note on the folder layout:** the files live at the repository root (rather than inside a
> `website-demo/` wrapper) on purpose. GitHub Pages serves a project repository from its root,
> so `index.html` must sit at the root for the site to load at
> `https://<owner>.github.io/<repository>/`. All asset paths are relative, so the site also
> works from any sub-directory.

---

## Design direction

| Token | Value | Source |
| --- | --- | --- |
| Primary accent (gold) | `#F6B831` | Existing brand theme colour |
| Charcoal | `#333333` | Existing brand theme colour |
| Ink / dark sections | `#212121` | Existing brand footer colour |
| Off-white | `#F8F8F8` | Existing brand theme colour |
| Body text | `#6C6C6C` | Existing brand text colour |
| Display type | Glegoo | Existing brand heading font |
| Body type | Open Sans | Existing brand body font |

The layout is an editorial, alternating grid — full-bleed hero, numbered service stories,
dark "pure water" feature band, saver-plan pricing, testimonial slider, service-area index
and an accordion FAQ — designed to feel like a bespoke studio build rather than a template.

## Sections

1. Sticky header with office/direct numbers and primary navigation
2. Full-bleed hero with dual CTAs and trust chips
3. Key-facts stat band
4. About / "trusted quality seal since 2005"
5. Core services — six editorial rows + specialist cleans
6. The pure-water difference (why choose us)
7. Four-step process
8. Service plans (Platinum / Gold / Silver saver)
9. Testimonial slider (real customer quotes from the existing site)
10. Service-area index (32 towns and villages)
11. FAQ accordion
12. Final call-to-action
13. Professional footer

## Technology

- **HTML5** — semantic landmarks, accessible accordion/slider, inline SVG icon sprite
- **CSS3** — custom properties, mobile-first responsive layout, fluid `clamp()` type
- **Vanilla JavaScript** — mobile menu, FAQ accordion, testimonial slider, scroll reveals
- **Assets** — optimised JPEG + WebP with `<picture>` fallback, SVG logo and icons

No external JavaScript or CSS libraries are used. The only external requests are the two
Google Fonts stylesheets (Glegoo + Open Sans), with system-font fallbacks.

## Project structure

```
.
├── index.html              # Single homepage
├── css/
│   └── style.css           # Design system + responsive layout
├── js/
│   └── script.js           # Menu, accordion, slider, scroll reveals
├── assets/
│   ├── logo/               # SVG emblem, light emblem, favicon, lockup
│   └── images/             # Hero, service and about photography (JPG + WebP)
├── .nojekyll               # Ensures GitHub Pages serves files as-is
└── README.md
```

## Local development

Any static file server works. For example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

The repository is configured for **GitHub Pages** with the source set to the deployed branch
and the site root (`/`). Once Pages is enabled, the homepage is served from `index.html`
automatically — no extra configuration is required.

## Content & asset notes

- Business details, service copy, testimonials, service areas and contact numbers are taken
  from the existing `jenningscleaning.co.uk` website.
- Brand colours and typography are extracted from the existing site's stylesheets.
- Photography is original AI-generated imagery created for this concept; operatives are shown
  in branded charcoal/gold workwear. No generated image is presented as a real customer photo.
- Phone numbers link to `tel:` and the "Send a message" actions link to the business's own
  contact page, so every call-to-action resolves to a real destination.
- The page carries a `noindex, nofollow` directive because it is a design concept and should
  not compete with the live business website in search results.
