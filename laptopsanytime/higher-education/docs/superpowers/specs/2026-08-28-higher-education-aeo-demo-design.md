# Higher Education AEO Demo — Design Spec

Date: 2026-08-28
Status: Approved (with corrections) by user, pending final implementation plan review.

## Purpose

A demonstration page at `/higher-education` showing the LaptopsAnytime client what one
new, buyer-focused AEO (Answer Engine Optimization) page could look like — built to be
visually indistinguishable from a page their own designer added to laptopsanytime.com,
targeting university IT and library leadership. This is a prototype, not a redesign and
not a production page. Full requirements are in the client-provided build brief (see
conversation history); this doc captures the verified design tokens, content sources,
and corrections that resulted from inspecting the live site.

## Source of truth

Live site: https://laptopsanytime.com (Wix-built). All visual tokens below were read via
computed styles / DOM inspection of the live site on 2026-08-28, not estimated.

## Verified visual tokens

| Token | Value | Source |
|---|---|---|
| Header/nav background | `#002E55` (rgb(0,46,85)) | computed bg of header's opaque ancestor div |
| Primary CTA background | `#F96811` (rgb(249,104,17)) | "Explore" button computed bg |
| Primary CTA border | `3px solid #EBD517` (gold) | "Explore" button computed border |
| Primary CTA shape | `border-radius: 50px` (full pill) | "Explore" button computed style |
| Primary CTA label | white text, 700 weight, 20px, `letter-spacing: 1px` | computed style of button label span |
| Nav link text | white, 12px, heavy weight | computed style of "How It Works"/"BRAINY"/"Get Quote" |
| Footer "Quick Links" heading | teal/mint `#90DDD1` (rgb(144,221,209)) | computed color |
| Footer body text | white on dark (footer shares header's navy family) | computed color; exact footer bg not directly resolvable (Wix renders it via a non-ancestor painted layer) — treated as the same `#002E55` navy as header, a reasonable inference from the site's two-tone dark/light system, not a directly-read value |
| Accent magenta/purple | `#A647A3` (rgb(166,71,163)) | "The Process:" section eyebrow, computed color |
| Hero headline blue | `#005DAA` (rgb(0,93,170)) | "Self-Service Tech Freedom" H1 computed color |
| Heading/button font-family (as rendered live) | `avenir-lt-w01_85-heavy1475544, avenir-lt-w05_85-heavy, sans-serif` | computed `font-family` on nav, buttons, section headings |
| Body/light-weight font-family (as rendered live) | `avenir-lt-w01_35-light1475496, sans-serif` | computed `font-family` on footer company line |
| Section band backgrounds | alternating white / pale blue-gray / pale blue | visually estimated from screenshots (Wix paints these via SVG/gradient layers that don't expose a computed `background-color`); close approximations, not exact hex reads |

**Font substitution (per correction #1):** Avenir is a licensed Typekit font not
embeddable in this prototype. Per the user's explicit instruction, do **not** substitute
a Google Font (no Poppins, no new brand identity). Use the system font stack
`Avenir, "Avenir Next", Helvetica, Arial, sans-serif` — this resolves to the real Avenir
on any Mac (the most common client/agency review environment, and where Avenir ships
as a system font), and falls back to Helvetica/Arial elsewhere, which is visually the
closest unlicensed match to Avenir's grotesque-humanist shape. Use heavy/bold weight for
headings, nav, and buttons; light/regular weight for body copy, mirroring the live
site's own weight split.

**Confirmed real nav routes** (to open in a new tab per the brief):
`/solutions`, `/product-lines`, `/how-it-works`, `/architects-corner`, `/brainy-ai`,
`/get-quote`, `/laptops-tablets-page`.

**Confirmed footer facts:** Java Connections LLC dba LaptopsAnytime · 17304 Preston
Road, Suite 800, Dallas, TX 75252 · 877-836-3727 · info@laptopsanytime.com · footer
nav groups "Quick Links" (Overview, BRAINY AI Suite, Supported Devices, Customer
Showcase, Architects Corner, Case Studies & More, Video Page, Technical Info, Custom
Graphics) and "Systems for" (Laptops, Chromebooks, Tablets, 110V Power Chargers,
Critical Assets, Controlled Pickup, Repair Depot, Virtual Reality, Tech Anytime, Smart
Vending).

**Confirmed guardrail:** the live site currently shows "8+ Million" / "OVER 8 MILLION"
annual-checkout figures in at least two places (homepage and /how-it-works). Per the
brief, this statistic is **omitted entirely** from the demo page.

## Verified imagery (hotlinked from `static.wixstatic.com`, per correction #5)

All images below were confirmed present on the live site with their real `alt` text —
not assumed:

- Logo: `LaptopsLogoWEBwIcon.png`
- Hero candidate: `ChapmanWpres.png`, alt "Tech Leader proud of her College's Laptop
  Kiosk System" — real person interacting with a university kiosk deployment.
- Chapman University — image with alt "Chapman University"
- University of California Riverside — image with alt "University California Riverside"
- Colorado School of Mines — image with alt "Colorado School Of Mines"
- Texas A&M University–Commerce — image with alt "Texas A&M University Commerce"

**Trust-strip correction (per correction #4):** only the four institutions above are
used, because they are the only ones independently confirmed via alt-tagged images on
the live site during this session. Rutgers, Penn, UCLA, Lone Star College, and Grand
Rapids Community College — all visible only as small unlabeled marks in a composite
logo-grid graphic — are **not** used, since their identity in that grid could not be
directly verified. Four verified institutions is treated as sufficient per the user's
explicit instruction that accuracy outweighs logo count.

`next.config.ts` must allow-list `static.wixstatic.com` in `images.remotePatterns` since
`next/image` is used against this external host.

## Case study: Texas A&M University–Commerce (per correction #3)

Source: the live, currently-linked case-study PDF —
`https://www.laptopsanytime.com/_files/ugd/410f26_9e0fad9ea43c46cc8b96167fa07405ec.pdf`
(originally published in *Computers in Libraries*, July/August 2017, by Gail Johnston).
Fetched and read in full during this session. Verified facts to use:

- Pilot began **fall 2013** at the **Gee Library** (Texas A&M–Commerce) — the first
  library in Texas to install a LaptopsAnytime kiosk.
- Started with **one 12-slot / 12-laptop kiosk**; demand required adding **12 more
  laptops** to rotate almost immediately.
- A **second kiosk** (12 slots / 12 laptops) was installed in the **Student Center** in
  **fall 2014** — chosen for being centrally located, high-traffic, and close to the
  dorms. It also needed 12 additional rotating laptops.
- A **companion (third) kiosk** was added back in the library, also in fall 2014, due to
  continued demand.
- The system supports **remote management** — staff can see when a location is running
  low and restock it.
- **Authentication**: students swipe their student ID and agree to terms of service.
- Security: kiosks are in sight of campus security cameras and have a built-in camera;
  no vandalism or kiosk damage was reported; device loss/damage rates were comparable to
  over-the-counter checkout.
- One short attributable quote may be used (under 15 words, quotation marks, with
  attribution to the case study/Gail Johnston), e.g. on the investment paying off.

**Do not claim** an academic-building deployment — the two verified locations are the
library and the student center, not an academic building. This corrects the original
design draft's looser wording.

The case study also directly supports two of the "University Use Cases" cards
(University Libraries, Student Unions & Study Spaces) with the same verified facts.

**Case-study CTA:** "Read the Case Study" links directly to the PDF URL above (opens in
a new tab).

## Corrections carried into implementation (summary)

1. Typography: `Avenir, "Avenir Next", Helvetica, Arial, sans-serif` everywhere — no
   Google Font substitution.
2. All primary visual tokens above are read, not approximated, except the two flagged
   section-band background colors (Wix paints those in a way that resists computed-style
   extraction) and the footer background (inferred to match the header navy).
3. Case study rewritten from the verified PDF; academic-building claim removed.
4. Trust strip reduced to four independently verified institutions.
5. Images hotlinked from `static.wixstatic.com`; `next.config.ts` configured with a
   `remotePatterns` entry for that host.
6. AEO Demo toggle unchanged from the original proposal: OFF by default, a floating
   control visually distinct from the LaptopsAnytime brand (dev-tool styling, not brand
   styling), annotations overlaid via `position: absolute`/`fixed` so no layout shift
   occurs in either state.

## Out of scope / flagged for client verification

- No dedicated case-study landing page exists on the live site for other listed
  customers (Austin Public Library, Barry University, etc.) beyond what's used here —
  not used in this demo.
- Exact hex values for the two secondary section-band backgrounds and the footer
  background are visual approximations, not computed-style reads; flagged above.
