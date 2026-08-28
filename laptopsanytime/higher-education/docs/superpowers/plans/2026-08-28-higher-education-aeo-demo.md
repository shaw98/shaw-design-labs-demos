# Higher Education AEO Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/higher-education`, a Next.js App Router demo page that looks like a
page LaptopsAnytime's own designer added to their existing site, targeted at university
IT/library buyers, with a toggleable AEO-annotation inspector layer.

**Architecture:** A server-rendered `app/higher-education/page.tsx` composes ~14
presentational section components (mostly server components) inside two client-side
context providers — `VideoModalProvider` (shared "See How It Works" modal state) and
`AEOProvider` (the demo toggle's on/off state). Content lives in one typed data module
(`lib/content.ts`) so the page stays declarative. Interactive leaf components (modal,
accordion, toggle, annotation overlay) are small client components; everything else is
a server component. Styling is plain CSS Modules using tokens read directly off the
live LaptopsAnytime site.

**Tech Stack:** Next.js 15 (App Router, already scaffolded) + TypeScript + CSS Modules
+ Vitest + React Testing Library (dev-only, for the interactive components) + `next/image`
against the `static.wixstatic.com` remote pattern.

**Spec:** [docs/superpowers/specs/2026-08-28-higher-education-aeo-demo-design.md](../specs/2026-08-28-higher-education-aeo-demo-design.md)

## Global Constraints

- No new Google Font / no typography redesign. Font stack everywhere:
  `Avenir, "Avenir Next", Helvetica, Arial, sans-serif`. Heavy/bold weight for headings,
  nav, and buttons; light/regular for body copy.
- Verified color tokens only, used exactly as read: header/footer `#002E55`, primary CTA
  `#F96811` with `3px solid #EBD517` border and `border-radius: 50px`, footer heading
  teal `#90DDD1`, magenta/purple accent `#A647A3`, hero blue `#005DAA`. The two
  section-band background colors and the footer background are approximations (flagged
  in the spec) — use `#B8C4CA` (light blue-gray) and `#DDEBF3` (pale blue) for banding.
- Never use the "8+ Million" / "OVER 8 MILLION" annual-checkout statistic anywhere.
- Trust strip uses exactly these four institutions, no others: Chapman University,
  University of California Riverside, Colorado School of Mines, Texas A&M
  University–Commerce.
- Case study CTA links to
  `https://www.laptopsanytime.com/_files/ugd/410f26_9e0fad9ea43c46cc8b96167fa07405ec.pdf`
  and only states facts from that PDF (fall 2013 Gee Library pilot, 12-slot kiosk +12
  more laptops, fall 2014 Student Center kiosk +12 more laptops, fall 2014 companion
  library kiosk, remote management, student-ID swipe authentication, no
  academic-building claim).
- All images are hotlinked from `static.wixstatic.com` — never downloaded into `/public`.
- `/higher-education` metadata sets `robots: { index: false, follow: false }` and no
  canonical URL. `/` redirects to `/higher-education`.
- AEO Demo toggle defaults OFF, is visually distinct from the LaptopsAnytime brand
  (dev-tool styling: monospace label, dark chip, not navy/orange), and never changes
  page layout/box size when toggled — annotations render as `position: absolute`
  overlays inside `position: relative` wrappers that already exist at their normal size.
- External LaptopsAnytime links (`/solutions`, `/product-lines`, `/how-it-works`,
  `/architects-corner`, `/brainy-ai`, `/get-quote`) point at
  `https://www.laptopsanytime.com<path>` and open in a new tab
  (`target="_blank" rel="noopener noreferrer"`).

---

## File Structure

```
app/
  layout.tsx                        # root layout, font stack, global metadata defaults
  globals.css                       # CSS custom properties (design tokens) + reset
  page.tsx                          # redirects to /higher-education
  higher-education/
    page.tsx                        # composes all sections, sets noindex metadata

components/
  Header/Header.tsx, Header.module.css
  Footer/Footer.tsx, Footer.module.css
  Hero/Hero.tsx, Hero.module.css
  TrustStrip/TrustStrip.tsx, TrustStrip.module.css
  BuyerProblem/BuyerProblem.tsx, BuyerProblem.module.css
  HowItWorks/HowItWorks.tsx, HowItWorks.module.css
  Benefits/Benefits.tsx, Benefits.module.css
  SupportedDevices/SupportedDevices.tsx, SupportedDevices.module.css
  UniversityUseCases/UniversityUseCases.tsx, UniversityUseCases.module.css
  ITSecurity/ITSecurity.tsx, ITSecurity.module.css
  CaseStudy/CaseStudy.tsx, CaseStudy.module.css
  FAQ/FAQ.tsx, FAQ.module.css, FAQ.test.tsx
  FinalCTA/FinalCTA.tsx, FinalCTA.module.css
  video-modal/VideoModalProvider.tsx, VideoModal.tsx, VideoModal.module.css, VideoModal.test.tsx
  aeo/AEOContext.tsx
  aeo/AEODemoToggle.tsx, AEODemoToggle.module.css, AEODemoToggle.test.tsx
  aeo/AEOAnnotation.tsx, AEOAnnotation.module.css, AEOAnnotation.test.tsx
  aeo/AEOPanel.tsx, AEOPanel.module.css

lib/
  content.ts                        # typed content objects + content.test.ts
  content.test.ts

test/
  setup.ts                          # jest-dom matchers for vitest

next.config.ts                      # images.remotePatterns
vitest.config.ts
```

---

## Task 1: Project scaffolding — tooling, tokens, routing shell

**Files:**
- Modify: `next.config.ts`
- Create: `vitest.config.ts`
- Create: `test/setup.ts`
- Modify: `package.json` (add `test` script + devDependencies)
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `app/page.tsx`
- Create: `app/higher-education/page.tsx` (placeholder, filled out in Task 18)

**Interfaces:**
- Produces: CSS custom properties available globally — `--color-navy: #002E55`,
  `--color-orange: #F96811`, `--color-gold: #EBD517`, `--color-teal: #90DDD1`,
  `--color-magenta: #A647A3`, `--color-hero-blue: #005DAA`, `--color-band-gray:
  #B8C4CA`, `--color-band-pale-blue: #DDEBF3`, `--font-heading: Avenir, "Avenir
  Next", Helvetica, Arial, sans-serif`, `--font-weight-heavy: 800`.
- Produces: `npm test` (vitest run) and `npm run test:watch` scripts.

- [ ] **Step 1: Install test dependencies**

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

- [ ] **Step 2: Add Vitest config**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
  },
});
```

```typescript
// test/setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Add the `test` script**

Edit `package.json` scripts block to add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Write a trivial smoke test and confirm the harness works**

```typescript
// test/setup.test.ts
import { describe, expect, it } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npm test`
Expected: PASS (1 test). Delete `test/setup.test.ts` after confirming — it's only a
harness check, not part of the suite.

- [ ] **Step 5: Configure `next/image` for the Wix CDN**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 6: Add design tokens to global CSS**

```css
/* app/globals.css */
:root {
  --color-navy: #002e55;
  --color-orange: #f96811;
  --color-gold: #ebd517;
  --color-teal: #90ddd1;
  --color-magenta: #a647a3;
  --color-hero-blue: #005daa;
  --color-band-gray: #b8c4ca;
  --color-band-pale-blue: #ddebf3;
  --color-ink: #1a1a1a;
  --font-heading: Avenir, "Avenir Next", Helvetica, Arial, sans-serif;
  --font-body: Avenir, "Avenir Next", Helvetica, Arial, sans-serif;
  --font-weight-heavy: 800;
  --font-weight-light: 300;
  --max-content-width: 1280px;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  font-weight: var(--font-weight-light);
  color: var(--color-ink);
  background: #ffffff;
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  margin: 0;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

:focus-visible {
  outline: 3px solid var(--color-hero-blue);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Root layout with base metadata**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaptopsAnytime — Higher Education Demo",
  description:
    "Internal AEO architecture demonstration for LaptopsAnytime. Not the live site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Root redirect**

```tsx
// app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/higher-education");
}
```

- [ ] **Step 9: Placeholder Higher Education page**

```tsx
// app/higher-education/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Service Technology Lending for Higher Education | LaptopsAnytime",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HigherEducationPage() {
  return (
    <main>
      <h1>Self-Service Technology Lending for Higher Education</h1>
    </main>
  );
}
```

- [ ] **Step 10: Verify build**

Run: `npm run build`
Expected: build succeeds with routes `/` and `/higher-education` listed.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "Set up test harness, design tokens, and routing shell"
```

---

## Task 2: Content data layer

**Files:**
- Create: `lib/content.ts`
- Test: `lib/content.test.ts`

**Interfaces:**
- Produces:
  - `type University = { name: string; imageSrc: string; alt: string }`
  - `universities: University[]` (length 4)
  - `type Benefit = { title: string; description: string }`
  - `benefits: Benefit[]` (length 4)
  - `type Device = { name: string; description: string; imageSrc?: string; imageAlt?: string }`
  - `devices: Device[]` (length 5)
  - `type UseCase = { title: string; description: string }`
  - `useCases: UseCase[]` (length 4)
  - `type FaqItem = { question: string; answer: string }`
  - `faqItems: FaqItem[]` (length 6)
  - `type AeoAnnotationContent = { id: number; title: string; explanation: string }`
  - `aeoAnnotations: Record<string, AeoAnnotationContent>` keyed by section id used in
    Task 18 (`hero`, `problem`, `howItWorks`, `devices`, `security`, `caseStudy`, `faq`,
    `architecture`)
  - `externalLinks: { solutions, productLines, howItWorks, architectsCorner, brainyAi,
    getQuote, caseStudyPdf }` — all absolute `https://www.laptopsanytime.com/...` URLs
    (see Global Constraints for the exact case-study PDF URL)

- [ ] **Step 1: Write the failing test**

```typescript
// lib/content.test.ts
import { describe, expect, it } from "vitest";
import {
  aeoAnnotations,
  benefits,
  devices,
  externalLinks,
  faqItems,
  universities,
  useCases,
} from "./content";

describe("content data", () => {
  it("has exactly 4 verified universities", () => {
    expect(universities).toHaveLength(4);
    expect(universities.map((u) => u.name)).toEqual([
      "Chapman University",
      "University of California Riverside",
      "Colorado School of Mines",
      "Texas A&M University–Commerce",
    ]);
  });

  it("has 4 benefits, 5 devices, 4 use cases, 6 faq items", () => {
    expect(benefits).toHaveLength(4);
    expect(devices).toHaveLength(5);
    expect(useCases).toHaveLength(4);
    expect(faqItems).toHaveLength(6);
  });

  it("never mentions the omitted checkout statistic", () => {
    const haystack = JSON.stringify({ benefits, devices, useCases, faqItems });
    expect(haystack).not.toMatch(/8\+?\s*million/i);
  });

  it("case study PDF link points at the verified URL", () => {
    expect(externalLinks.caseStudyPdf).toBe(
      "https://www.laptopsanytime.com/_files/ugd/410f26_9e0fad9ea43c46cc8b96167fa07405ec.pdf",
    );
  });

  it("has all 8 AEO annotation keys used by the page", () => {
    expect(Object.keys(aeoAnnotations).sort()).toEqual(
      [
        "architecture",
        "caseStudy",
        "devices",
        "faq",
        "hero",
        "howItWorks",
        "problem",
        "security",
      ].sort(),
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/content.test.ts`
Expected: FAIL — `lib/content.ts` does not exist yet.

- [ ] **Step 3: Write `lib/content.ts`**

```typescript
// lib/content.ts

export type University = {
  name: string;
  imageSrc: string;
  alt: string;
};

export const universities: University[] = [
  {
    name: "Chapman University",
    imageSrc:
      "https://static.wixstatic.com/media/25edec_2fb3effa0d874017a9b7b9b04f39d71a~mv2.png",
    alt: "Chapman University",
  },
  {
    name: "University of California Riverside",
    imageSrc:
      "https://static.wixstatic.com/media/25edec_4589f393941942c6987ee42b93c4b3c5~mv2.jpg",
    alt: "University California Riverside",
  },
  {
    name: "Colorado School of Mines",
    imageSrc:
      "https://static.wixstatic.com/media/410f26_4241c7d6539e4fda8dfd8843811c0bf0~mv2.png",
    alt: "Colorado School Of Mines",
  },
  {
    name: "Texas A&M University–Commerce",
    imageSrc:
      "https://static.wixstatic.com/media/410f26_31561c5d19b848d483d71e52ef246cdd~mv2.png",
    alt: "Texas A&M University Commerce",
  },
];

export type Benefit = {
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    title: "24/7 Technology Access",
    description:
      "Extend access to shared technology beyond traditional service-desk hours.",
  },
  {
    title: "Less Manual Checkout",
    description:
      "Automate routine checkout and return steps instead of requiring staff to manage every transaction.",
  },
  {
    title: "Accountability",
    description:
      "Connect authorized users with device checkout records and program controls.",
  },
  {
    title: "Devices Ready to Go",
    description:
      "Secure docking, charging and device-management workflows help prepare technology for future users.",
  },
];

export type Device = {
  name: string;
  description: string;
};

export const devices: Device[] = [
  {
    name: "Laptops",
    description:
      "Enterprise laptops are the most popular checkout option and remain the primary focus of most deployments.",
  },
  {
    name: "MacBooks",
    description: "Supported alongside enterprise Windows and Linux laptop models.",
  },
  {
    name: "Chromebooks",
    description:
      "Selective Chromebook models are supported; compatibility depends on the model and deployment configuration.",
  },
  {
    name: "iPads / Tablets",
    description:
      "Configured with preloaded apps and synced via Apple Configurator for automated checkout and refresh.",
  },
  {
    name: "Portable 110V Chargers",
    description:
      "An on-demand power option for students who bring their own devices, standalone or as part of a larger system.",
  },
];

export type UseCase = {
  title: string;
  description: string;
};

export const useCases: UseCase[] = [
  {
    title: "University Libraries",
    description:
      "Expand student access to shared technology while reducing the need for staff to manually process every transaction.",
  },
  {
    title: "Campus IT",
    description:
      "Provide controlled access to shared devices while maintaining authentication and accountability.",
  },
  {
    title: "Student Unions & Study Spaces",
    description:
      "Place technology access closer to the spaces students use throughout the day.",
  },
  {
    title: "Multi-Building Campuses",
    description:
      "Support technology-lending programs across multiple university locations and environments.",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "How does automated laptop lending work at a university?",
    answer:
      "Students authenticate at the kiosk, select a device, and it's released automatically. When finished, they return it to any open bay, where it's secured and prepared for the next checkout. The process is self-service from start to finish, without a staff member handling each transaction.",
  },
  {
    question: "Can students authenticate with university credentials?",
    answer:
      "Supported authentication approaches include SSO availability, AD/LDAP credentials, and other input methods such as magnetic stripe or barcode, depending on how the deployment is configured with your team.",
  },
  {
    question: "What types of devices can LaptopsAnytime systems support?",
    answer:
      "Enterprise laptops, MacBooks, selective Chromebook models, iPads/tablets, and portable 110V power chargers. Device compatibility and system configuration depend on the selected models and deployment requirements.",
  },
  {
    question: "What happens when a device is returned?",
    answer:
      "The device is inserted into an available bay and secured. Charging and device-management workflows then support preparing it for the next authorized user.",
  },
  {
    question: "Can a university configure the system around its existing IT environment?",
    answer:
      "Yes. Authentication method, device policies, the software image, and supported management tools are all configured around your university's existing environment rather than a fixed default.",
  },
  {
    question: "How does LaptopsAnytime approach kiosk security?",
    answer:
      "Kiosks run on a Linux-based operating environment with regular security scans. Network exposure is limited to an outgoing-only SSL connection, with temporary VPN access used only when needed for setup or support.",
  },
];

export type AeoAnnotationContent = {
  id: number;
  title: string;
  explanation: string;
};

export const aeoAnnotations: Record<string, AeoAnnotationContent> = {
  hero: {
    id: 1,
    title: "Clear Market + Solution",
    explanation:
      "The page immediately tells humans and answer engines who this content is for and what problem LaptopsAnytime solves.",
  },
  problem: {
    id: 2,
    title: "Buyer Problem Language",
    explanation:
      "This section uses the language a university IT or library leader might use when asking Google, ChatGPT, Claude or Gemini for help.",
  },
  howItWorks: {
    id: 3,
    title: "Direct, Extractable Answer",
    explanation:
      "The process is explained in simple HTML text alongside visual media, making the answer easy for people and machines to understand.",
  },
  devices: {
    id: 4,
    title: "Clear Product Context",
    explanation:
      "Specific supported device categories help connect LaptopsAnytime with the technology needs university buyers actually research.",
  },
  security: {
    id: 5,
    title: "High-Intent Buying Questions",
    explanation:
      "Technical buyers need answers about authentication, security and integration before they can seriously evaluate a solution.",
  },
  caseStudy: {
    id: 6,
    title: "Evidence and Trust",
    explanation:
      "Real customer evidence gives buyers and answer engines stronger reasons to trust claims about the solution.",
  },
  faq: {
    id: 7,
    title: "Natural-Language Answers",
    explanation:
      "FAQs directly answer realistic buyer questions without turning the page into a wall of copy.",
  },
  architecture: {
    id: 8,
    title: "Information Architecture",
    explanation:
      "This page creates a clear relationship between LaptopsAnytime, Higher Education, the buyer's problem, the solution and supporting evidence.",
  },
};

export const externalLinks = {
  solutions: "https://www.laptopsanytime.com/solutions",
  productLines: "https://www.laptopsanytime.com/product-lines",
  howItWorks: "https://www.laptopsanytime.com/how-it-works",
  architectsCorner: "https://www.laptopsanytime.com/architects-corner",
  brainyAi: "https://www.laptopsanytime.com/brainy-ai",
  getQuote: "https://www.laptopsanytime.com/get-quote",
  caseStudyPdf:
    "https://www.laptopsanytime.com/_files/ugd/410f26_9e0fad9ea43c46cc8b96167fa07405ec.pdf",
};

export const heroImage = {
  src: "https://static.wixstatic.com/media/410f26_af25a05b38474e84a2addfed105341d9~mv2.png",
  alt: "A university technology leader standing proudly next to her college's LaptopsAnytime laptop checkout kiosk.",
};

export const logoImage = {
  src: "https://static.wixstatic.com/media/410f26_84dbb8bda4314120a7f64b4018f45862~mv2.png",
  alt: "LaptopsAnytime — Automated Checkout Kiosks",
};

export const videoId = "IQOKecMU3eM";
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- lib/content.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts lib/content.test.ts
git commit -m "Add typed content data layer for the Higher Education page"
```

---

## Task 3: Video modal (provider + component)

**Files:**
- Create: `components/video-modal/VideoModalProvider.tsx`
- Create: `components/video-modal/VideoModal.tsx`
- Create: `components/video-modal/VideoModal.module.css`
- Test: `components/video-modal/VideoModal.test.tsx`

**Interfaces:**
- Produces: `VideoModalProvider` (client component, wraps `children`), `useVideoModal()`
  hook returning `{ isOpen: boolean; open: () => void; close: () => void }`.
- Produces: `<VideoModal videoId={string} />` — reads state from `useVideoModal()`
  internally; renders nothing when closed.
- Consumes: `videoId` from `lib/content.ts` (`videoId` export, Task 2) when wired up in
  Task 18.

- [ ] **Step 1: Write the failing tests**

```tsx
// components/video-modal/VideoModal.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VideoModalProvider, useVideoModal } from "./VideoModalProvider";
import { VideoModal } from "./VideoModal";

function TestHarness() {
  const { open } = useVideoModal();
  return (
    <>
      <button onClick={open}>See How It Works</button>
      <VideoModal videoId="IQOKecMU3eM" />
    </>
  );
}

function renderHarness() {
  return render(
    <VideoModalProvider>
      <TestHarness />
    </VideoModalProvider>,
  );
}

describe("VideoModal", () => {
  it("is not rendered until opened", () => {
    renderHarness();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click and embeds the given YouTube video", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    const dialog = screen.getByRole("dialog", { name: "See LaptopsAnytime in Action" });
    expect(dialog).toBeInTheDocument();
    const iframe = screen.getByTitle("LaptopsAnytime higher education kiosk walkthrough");
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("youtube.com/embed/IQOKecMU3eM"),
    );
    expect(iframe).toHaveAttribute("src", expect.not.stringContaining("autoplay=1"));
  });

  it("shows the four-step process as plain text under the video", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    expect(screen.getByText(/Authenticate.*Check Out.*Use.*Return/)).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the trigger", () => {
    renderHarness();
    const trigger = screen.getByRole("button", { name: "See How It Works" });
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on backdrop click", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    fireEvent.click(screen.getByTestId("video-modal-backdrop"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on the close button", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    fireEvent.click(screen.getByRole("button", { name: "Close video" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("traps Tab focus within the dialog", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    const closeBtn = screen.getByRole("button", { name: "Close video" });
    expect(closeBtn).toHaveFocus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    // Shift+Tab from the first focusable element should wrap to the last.
    const focusables = screen
      .getByRole("dialog")
      .querySelectorAll<HTMLElement>('button, a[href], iframe');
    expect(document.activeElement).toBe(focusables[focusables.length - 1]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/video-modal/VideoModal.test.tsx`
Expected: FAIL — modules don't exist yet.

- [ ] **Step 3: Implement `VideoModalProvider`**

```tsx
// components/video-modal/VideoModalProvider.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type VideoModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    triggerRef.current =
      (document.activeElement as HTMLElement) ?? triggerRef.current;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const value = useMemo(
    () => ({ isOpen, open, close, triggerRef }),
    [isOpen, open, close],
  );

  return (
    <VideoModalContext.Provider value={value}>{children}</VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) {
    throw new Error("useVideoModal must be used within a VideoModalProvider");
  }
  return ctx;
}
```

- [ ] **Step 4: Implement `VideoModal`**

```tsx
// components/video-modal/VideoModal.tsx
"use client";

import { useEffect, useRef } from "react";
import { useVideoModal } from "./VideoModalProvider";
import styles from "./VideoModal.module.css";

const FOCUSABLE_SELECTOR = 'button, a[href], iframe, [tabindex]:not([tabindex="-1"])';

export function VideoModal({ videoId }: { videoId: string }) {
  const { isOpen, close } = useVideoModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeButton = dialogRef.current?.querySelector<HTMLElement>(
      '[data-close-button="true"]',
    );
    closeButton?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      data-testid="video-modal-backdrop"
      onClick={close}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="See LaptopsAnytime in Action"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          data-close-button="true"
          onClick={close}
        >
          Close video
        </button>
        <h2 className={styles.title}>See LaptopsAnytime in Action</h2>
        <p className={styles.subtitle}>
          See students experience self-service technology lending in a real university
          environment.
        </p>
        <div className={styles.videoWrapper}>
          <iframe
            title="LaptopsAnytime higher education kiosk walkthrough"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className={styles.processSteps}>
          Authenticate → Check Out → Use → Return
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Modal styles**

```css
/* components/video-modal/VideoModal.module.css */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 46, 85, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 1000;
}

.dialog {
  background: #ffffff;
  border-radius: 12px;
  max-width: 720px;
  width: 100%;
  padding: 1.5rem;
  position: relative;
}

.closeButton {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--color-navy);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.4rem 0.9rem;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  cursor: pointer;
}

.title {
  color: var(--color-navy);
  margin-bottom: 0.25rem;
  padding-right: 6rem;
}

.subtitle {
  font-weight: var(--font-weight-light);
  margin: 0 0 1rem;
}

.videoWrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.videoWrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 8px;
}

.processSteps {
  margin-top: 1rem;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  color: var(--color-magenta);
  text-align: center;
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- components/video-modal/VideoModal.test.tsx`
Expected: PASS (7 tests)

- [ ] **Step 7: Commit**

```bash
git add components/video-modal
git commit -m "Add accessible video modal with focus trap"
```

---

## Task 4: AEO context + demo toggle

**Files:**
- Create: `components/aeo/AEOContext.tsx`
- Create: `components/aeo/AEODemoToggle.tsx`
- Create: `components/aeo/AEODemoToggle.module.css`
- Test: `components/aeo/AEODemoToggle.test.tsx`

**Interfaces:**
- Produces: `AEOProvider` (client component wrapping `children`), `useAEO()` hook
  returning `{ enabled: boolean; toggle: () => void }`.
- Produces: `<AEODemoToggle />` — the floating OFF/ON control.
- Consumed by: `AEOAnnotation` and `AEOPanel` (Task 5).

- [ ] **Step 1: Write the failing test**

```tsx
// components/aeo/AEODemoToggle.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AEOProvider, useAEO } from "./AEOContext";
import { AEODemoToggle } from "./AEODemoToggle";

function Consumer() {
  const { enabled } = useAEO();
  return <span data-testid="state">{enabled ? "ON" : "OFF"}</span>;
}

describe("AEODemoToggle", () => {
  it("defaults to OFF", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <Consumer />
      </AEOProvider>,
    );
    expect(screen.getByTestId("state")).toHaveTextContent("OFF");
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("toggles ON when clicked, and back OFF on a second click", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <Consumer />
      </AEOProvider>,
    );
    const toggle = screen.getByRole("switch", { name: "AEO Demo" });
    fireEvent.click(toggle);
    expect(screen.getByTestId("state")).toHaveTextContent("ON");
    expect(toggle).toHaveAttribute("aria-checked", "true");

    fireEvent.click(toggle);
    expect(screen.getByTestId("state")).toHaveTextContent("OFF");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/aeo/AEODemoToggle.test.tsx`
Expected: FAIL — modules don't exist yet.

- [ ] **Step 3: Implement `AEOContext`**

```tsx
// components/aeo/AEOContext.tsx
"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AEOContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const AEOContext = createContext<AEOContextValue | null>(null);

export function AEOProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const toggle = useCallback(() => setEnabled((prev) => !prev), []);
  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle]);
  return <AEOContext.Provider value={value}>{children}</AEOContext.Provider>;
}

export function useAEO() {
  const ctx = useContext(AEOContext);
  if (!ctx) {
    throw new Error("useAEO must be used within an AEOProvider");
  }
  return ctx;
}
```

- [ ] **Step 4: Implement `AEODemoToggle`**

```tsx
// components/aeo/AEODemoToggle.tsx
"use client";

import { useAEO } from "./AEOContext";
import styles from "./AEODemoToggle.module.css";

export function AEODemoToggle() {
  const { enabled, toggle } = useAEO();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="AEO Demo"
      className={styles.toggle}
      onClick={toggle}
    >
      <span className={styles.label}>AEO Demo</span>
      <span className={styles.state}>{enabled ? "ON" : "OFF"}</span>
    </button>
  );
}
```

- [ ] **Step 5: Toggle styles (deliberately not LaptopsAnytime-branded)**

```css
/* components/aeo/AEODemoToggle.module.css */
.toggle {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 1100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1e1e1e;
  color: #d4d4d4;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.label {
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.state {
  background: #333;
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
}

.toggle[aria-checked="true"] .state {
  background: #2f9e44;
  color: #fff;
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- components/aeo/AEODemoToggle.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 7: Commit**

```bash
git add components/aeo/AEOContext.tsx components/aeo/AEODemoToggle.tsx components/aeo/AEODemoToggle.module.css components/aeo/AEODemoToggle.test.tsx
git commit -m "Add AEO demo toggle defaulting to OFF"
```

---

## Task 5: AEO annotation overlay + side panel

**Files:**
- Create: `components/aeo/AEOAnnotation.tsx`
- Create: `components/aeo/AEOAnnotation.module.css`
- Test: `components/aeo/AEOAnnotation.test.tsx`
- Create: `components/aeo/AEOPanel.tsx`
- Create: `components/aeo/AEOPanel.module.css`

**Interfaces:**
- Consumes: `useAEO()` from Task 4.
- Produces: `<AEOAnnotation id={number} title={string} explanation={string}>
  {children}</AEOAnnotation>` — always renders `children` at their normal size; only
  adds the numbered marker + explanation card when `enabled` is true.
- Produces: `<AEOPanel />` — fixed side panel, rendered only when `enabled` is true.

- [ ] **Step 1: Write the failing test**

```tsx
// components/aeo/AEOAnnotation.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AEOProvider } from "./AEOContext";
import { AEOAnnotation } from "./AEOAnnotation";
import { AEODemoToggle } from "./AEODemoToggle";

describe("AEOAnnotation", () => {
  it("renders children with no annotation chrome when AEO mode is off", () => {
    render(
      <AEOProvider>
        <AEOAnnotation id={1} title="Clear Market + Solution" explanation="Explains it.">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    expect(screen.getByText("Hero content")).toBeInTheDocument();
    expect(screen.queryByText("Clear Market + Solution")).not.toBeInTheDocument();
  });

  it("shows the numbered marker and explanation once AEO mode is toggled on", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOAnnotation id={1} title="Clear Market + Solution" explanation="Explains it.">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    expect(screen.getByText("Hero content")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Clear Market + Solution")).toBeInTheDocument();
    expect(screen.getByText("Explains it.")).toBeInTheDocument();
  });

  it("wraps children in a position:relative box so the overlay never shifts layout", () => {
    const { container } = render(
      <AEOProvider>
        <AEOAnnotation id={1} title="t" explanation="e">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toMatch(/wrapper/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/aeo/AEOAnnotation.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `AEOAnnotation`**

```tsx
// components/aeo/AEOAnnotation.tsx
"use client";

import { useAEO } from "./AEOContext";
import styles from "./AEOAnnotation.module.css";

export function AEOAnnotation({
  id,
  title,
  explanation,
  children,
}: {
  id: number;
  title: string;
  explanation: string;
  children: React.ReactNode;
}) {
  const { enabled } = useAEO();
  return (
    <div className={styles.wrapper}>
      {children}
      {enabled && (
        <div className={styles.overlay} aria-hidden="false">
          <span className={styles.marker}>{id}</span>
          <div className={styles.card}>
            <p className={styles.cardTitle}>
              {id}. {title}
            </p>
            <p className={styles.cardBody}>{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Annotation styles**

```css
/* components/aeo/AEOAnnotation.module.css */
.wrapper {
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  outline: 2px dashed #ff6b6b;
  outline-offset: -2px;
  z-index: 500;
}

.marker {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: #1e1e1e;
  color: #fff;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 0.8rem;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.card {
  position: absolute;
  top: 2.5rem;
  left: 0.5rem;
  max-width: 280px;
  background: #1e1e1e;
  color: #eaeaea;
  padding: 0.75rem;
  border-radius: 6px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 0.75rem;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.cardTitle {
  font-weight: 700;
  margin: 0 0 0.35rem;
}

.cardBody {
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 640px) {
  .card {
    position: fixed;
    left: 1rem;
    right: 1rem;
    bottom: 4.5rem;
    top: auto;
    max-width: none;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/aeo/AEOAnnotation.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 6: Implement `AEOPanel` (no test — static presentational, covered by the
  page-level manual QA in Task 18)**

```tsx
// components/aeo/AEOPanel.tsx
"use client";

import { useAEO } from "./AEOContext";
import styles from "./AEOPanel.module.css";

const CHECKLIST = [
  "Clear Higher Education topic",
  "Buyer problem language",
  "Direct answers",
  "Product context",
  "Technical evaluation content",
  "Real-world proof",
  "Natural-language FAQs",
  "Strong conversion path",
];

export function AEOPanel() {
  const { enabled } = useAEO();
  if (!enabled) return null;

  return (
    <aside className={styles.panel} aria-label="Why this page matters">
      <h2 className={styles.heading}>Why this page matters</h2>
      <ul className={styles.list}>
        {CHECKLIST.map((item) => (
          <li key={item}>✓ {item}</li>
        ))}
      </ul>
      <p className={styles.footer}>
        AEO does not require redesigning the entire website. It adds missing pages and
        clearer information around specific buyer questions.
      </p>
    </aside>
  );
}
```

```css
/* components/aeo/AEOPanel.module.css */
.panel {
  position: fixed;
  top: 5rem;
  right: 1.25rem;
  width: 260px;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  background: #1e1e1e;
  color: #eaeaea;
  border-radius: 8px;
  padding: 1rem;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 0.8rem;
  z-index: 1050;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.heading {
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
  color: #fff;
}

.list {
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.footer {
  margin: 0;
  padding-top: 0.5rem;
  border-top: 1px solid #444;
  line-height: 1.4;
  color: #aaa;
}

@media (max-width: 640px) {
  .panel {
    top: auto;
    bottom: 4.5rem;
    left: 1rem;
    right: 1rem;
    width: auto;
  }
}
```

- [ ] **Step 7: Commit**

```bash
git add components/aeo/AEOAnnotation.tsx components/aeo/AEOAnnotation.module.css components/aeo/AEOAnnotation.test.tsx components/aeo/AEOPanel.tsx components/aeo/AEOPanel.module.css
git commit -m "Add AEO annotation overlay and explanatory side panel"
```

---

## Task 6: Header + Footer (site chrome)

**Files:**
- Create: `components/Header/Header.tsx`, `components/Header/Header.module.css`
- Create: `components/Footer/Footer.tsx`, `components/Footer/Footer.module.css`
- Test: `components/Header/Header.test.tsx`

**Interfaces:**
- Consumes: `externalLinks`, `logoImage` from `lib/content.ts` (Task 2).
- Produces: `<Header />`, `<Footer />` — server components, no interactivity.

- [ ] **Step 1: Write the failing test (external links open in a new tab)**

```tsx
// components/Header/Header.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("links every nav item to the live LaptopsAnytime site in a new tab", () => {
    render(<Header />);
    const links = [
      ["Solutions", "https://www.laptopsanytime.com/solutions"],
      ["Popular Products", "https://www.laptopsanytime.com/product-lines"],
      ["How It Works", "https://www.laptopsanytime.com/how-it-works"],
      ["Architects Corner", "https://www.laptopsanytime.com/architects-corner"],
      ["BRAINY", "https://www.laptopsanytime.com/brainy-ai"],
      ["Get Quote", "https://www.laptopsanytime.com/get-quote"],
    ] as const;

    for (const [name, href] of links) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/Header/Header.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `Header`**

```tsx
// components/Header/Header.tsx
import Image from "next/image";
import { externalLinks, logoImage } from "@/lib/content";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Solutions", href: externalLinks.solutions },
  { label: "Popular Products", href: externalLinks.productLines },
  { label: "How It Works", href: externalLinks.howItWorks },
  { label: "Architects Corner", href: externalLinks.architectsCorner },
  { label: "BRAINY", href: externalLinks.brainyAi },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <a href="https://www.laptopsanytime.com" className={styles.logoLink}>
          <Image src={logoImage.src} alt={logoImage.alt} width={220} height={30} />
        </a>
        <a className={styles.phone} href="tel:1-877-836-3727">
          877-836-3727
        </a>
      </div>
      <nav className={styles.nav} aria-label="LaptopsAnytime site navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            {item.label}
          </a>
        ))}
        <a
          href={externalLinks.getQuote}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.getQuote}
        >
          Get Quote
        </a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Header styles**

```css
/* components/Header/Header.module.css */
.header {
  background: var(--color-navy);
  color: #fff;
  padding: 0.75rem 1.5rem;
}

.topRow {
  max-width: var(--max-content-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}

.logoLink {
  display: inline-flex;
}

.phone {
  color: #fff;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  font-size: 0.85rem;
  text-decoration: none;
}

.nav {
  max-width: var(--max-content-width);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
}

.navLink {
  color: #fff;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  font-size: 0.75rem;
  text-decoration: none;
  letter-spacing: 0.02em;
}

.navLink:hover {
  color: var(--color-teal);
}

.getQuote {
  margin-left: auto;
  background: var(--color-orange);
  color: #fff;
  border: 3px solid var(--color-gold);
  border-radius: 50px;
  padding: 0.4rem 1rem;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  font-size: 0.75rem;
  text-decoration: none;
}
```

- [ ] **Step 5: Implement `Footer`**

```tsx
// components/Footer/Footer.tsx
import { externalLinks } from "@/lib/content";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { label: "Overview", href: "https://www.laptopsanytime.com" },
  { label: "BRAINY AI Suite", href: externalLinks.brainyAi },
  { label: "Architects Corner", href: externalLinks.architectsCorner },
  { label: "How It Works", href: externalLinks.howItWorks },
  { label: "Get Quote", href: externalLinks.getQuote },
];

const SYSTEMS_FOR = [
  "Laptops",
  "Chromebooks",
  "Tablets",
  "110V Power Chargers",
  "Repair Depot",
  "Smart Vending",
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div>
          <h2 className={styles.heading}>Quick Links</h2>
          <ul className={styles.list}>
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>Systems For</h2>
          <ul className={styles.list}>
            {SYSTEMS_FOR.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.company}>Java Connections LLC dba LaptopsAnytime</p>
          <p>17304 Preston Road, Suite 800, Dallas, TX 75252</p>
          <p>
            TEL:{" "}
            <a href="tel:1-877-836-3727">877-836-3727</a> | INFO@LAPTOPSANYTIME.COM
          </p>
        </div>
      </div>
      <p className={styles.copyright}>© 2026 by LaptopsAnytime, All Rights Reserved</p>
    </footer>
  );
}
```

```css
/* components/Footer/Footer.module.css */
.footer {
  background: var(--color-navy);
  color: #fff;
  padding: 2.5rem 1.5rem 1.5rem;
}

.columns {
  max-width: var(--max-content-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.heading {
  color: var(--color-teal);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-weight: var(--font-weight-light);
}

.list a {
  color: #fff;
  text-decoration: none;
}

.list a:hover {
  color: var(--color-teal);
}

.company {
  font-weight: var(--font-weight-heavy);
  font-family: var(--font-heading);
}

.copyright {
  max-width: var(--max-content-width);
  margin: 2rem auto 0;
  font-size: 0.75rem;
  font-weight: var(--font-weight-light);
  opacity: 0.8;
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- components/Header/Header.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 7: Commit**

```bash
git add components/Header components/Footer
git commit -m "Add site header and footer matching the live LaptopsAnytime chrome"
```

---

## Task 7: Hero

**Files:**
- Create: `components/Hero/Hero.tsx`, `components/Hero/Hero.module.css`
- Test: `components/Hero/Hero.test.tsx`

**Interfaces:**
- Consumes: `useVideoModal()` (Task 3), `externalLinks`, `heroImage` (Task 2).
- Produces: `<Hero />` — a small `"use client"` component (needs `useVideoModal`).

- [ ] **Step 1: Write the failing test**

```tsx
// components/Hero/Hero.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoModalProvider } from "@/components/video-modal/VideoModalProvider";
import { VideoModal } from "@/components/video-modal/VideoModal";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the H1, value proposition, and both CTAs", () => {
    render(
      <VideoModalProvider>
        <Hero />
        <VideoModal videoId="IQOKecMU3eM" />
      </VideoModalProvider>,
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Self-Service Technology Lending for Higher Education",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Give students secure, self-service access to laptops — without adding more work for your IT or library staff.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Request a Quote" })).toHaveAttribute(
      "href",
      "https://www.laptopsanytime.com/get-quote",
    );
  });

  it("opens the video modal from the primary CTA", () => {
    render(
      <VideoModalProvider>
        <Hero />
        <VideoModal videoId="IQOKecMU3eM" />
      </VideoModalProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/Hero/Hero.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `Hero`**

```tsx
// components/Hero/Hero.tsx
"use client";

import Image from "next/image";
import { useVideoModal } from "@/components/video-modal/VideoModalProvider";
import { externalLinks, heroImage } from "@/lib/content";
import styles from "./Hero.module.css";

export function Hero() {
  const { open } = useVideoModal();

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Higher Education</p>
        <h1 className={styles.headline}>
          Self-Service Technology Lending for Higher Education
        </h1>
        <p className={styles.valueProp}>
          Give students secure, self-service access to laptops — without adding more
          work for your IT or library staff.
        </p>
        <p className={styles.supporting}>
          Automate checkout, return, charging and accountability for laptops,
          MacBooks, Chromebooks, tablets and portable chargers.
        </p>
        <div className={styles.ctas}>
          <button type="button" className={styles.primaryCta} onClick={open}>
            See How It Works
          </button>
          <a
            className={styles.secondaryCta}
            href={externalLinks.getQuote}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a Quote
          </a>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={480}
          height={960}
          priority
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Hero styles**

```css
/* components/Hero/Hero.module.css */
.hero {
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: center;
}

.eyebrow {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  color: var(--color-magenta);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
}

.headline {
  color: var(--color-hero-blue);
  font-size: 2.5rem;
  line-height: 1.15;
  margin-bottom: 1rem;
}

.valueProp {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  font-size: 1.15rem;
  margin: 0 0 1rem;
}

.supporting {
  font-weight: var(--font-weight-light);
  margin: 0 0 1.5rem;
  max-width: 46ch;
}

.ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primaryCta,
.secondaryCta {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  font-size: 1rem;
  letter-spacing: 0.02em;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.primaryCta {
  background: var(--color-orange);
  color: #fff;
  border: 3px solid var(--color-gold);
}

.secondaryCta {
  background: transparent;
  color: var(--color-navy);
  border: 3px solid var(--color-navy);
}

.imageWrapper {
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 800px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/Hero/Hero.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add components/Hero
git commit -m "Add hero section wired to the shared video modal"
```

---

## Task 8: Trust strip

**Files:**
- Create: `components/TrustStrip/TrustStrip.tsx`, `components/TrustStrip/TrustStrip.module.css`
- Test: `components/TrustStrip/TrustStrip.test.tsx`

**Interfaces:**
- Consumes: `universities` from `lib/content.ts` (Task 2).
- Produces: `<TrustStrip />` — server component.

- [ ] **Step 1: Write the failing test**

```tsx
// components/TrustStrip/TrustStrip.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TrustStrip } from "./TrustStrip";

describe("TrustStrip", () => {
  it("renders exactly the four verified institutions with real alt text", () => {
    render(<TrustStrip />);
    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(screen.getByAltText("Chapman University")).toBeInTheDocument();
    expect(screen.getByAltText("University California Riverside")).toBeInTheDocument();
    expect(screen.getByAltText("Colorado School Of Mines")).toBeInTheDocument();
    expect(screen.getByAltText("Texas A&M University Commerce")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/TrustStrip/TrustStrip.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `TrustStrip`**

```tsx
// components/TrustStrip/TrustStrip.tsx
import Image from "next/image";
import { universities } from "@/lib/content";
import styles from "./TrustStrip.module.css";

export function TrustStrip() {
  return (
    <section className={styles.section} aria-label="Supporting higher education">
      <h2 className={styles.heading}>
        Supporting technology access across higher education
      </h2>
      <ul className={styles.grid}>
        {universities.map((uni) => (
          <li key={uni.name} className={styles.item}>
            <Image src={uni.imageSrc} alt={uni.alt} width={160} height={130} />
            <p className={styles.caption}>{uni.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Trust strip styles**

```css
/* components/TrustStrip/TrustStrip.module.css */
.section {
  background: #fff;
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.heading {
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 1.5rem;
}

.grid {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: var(--max-content-width);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 160px;
}

.caption {
  font-size: 0.75rem;
  font-weight: var(--font-weight-light);
  margin: 0;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/TrustStrip/TrustStrip.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/TrustStrip
git commit -m "Add trust strip with four verified university customers"
```

---

## Task 9: Buyer problem section

**Files:**
- Create: `components/BuyerProblem/BuyerProblem.tsx`, `components/BuyerProblem/BuyerProblem.module.css`
- Test: `components/BuyerProblem/BuyerProblem.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// components/BuyerProblem/BuyerProblem.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BuyerProblem } from "./BuyerProblem";

describe("BuyerProblem", () => {
  it("renders the problem headline and never mentions the omitted checkout stat", () => {
    render(<BuyerProblem />);
    expect(
      screen.getByRole("heading", {
        name: "Technology access shouldn't stop when the service desk closes.",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/8\+?\s*million/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/BuyerProblem/BuyerProblem.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `BuyerProblem`**

```tsx
// components/BuyerProblem/BuyerProblem.tsx
import styles from "./BuyerProblem.module.css";

export function BuyerProblem() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Technology access shouldn&apos;t stop when the service desk closes.
        </h2>
        <p className={styles.paragraph}>
          Students depend on laptops and other technology for coursework, research and
          campus life. Traditional lending programs can require library and IT teams
          to manually manage checkout, return and device availability.
        </p>
        <p className={styles.paragraph}>
          LaptopsAnytime helps automate those repetitive steps while allowing the
          university to maintain control over authentication, devices and program
          policies.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Styles**

```css
/* components/BuyerProblem/BuyerProblem.module.css */
.section {
  background: var(--color-band-gray);
  padding: 3rem 1.5rem;
}

.inner {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}

.heading {
  color: var(--color-navy);
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.paragraph {
  font-weight: var(--font-weight-light);
  line-height: 1.6;
  margin: 0 0 1rem;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/BuyerProblem/BuyerProblem.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/BuyerProblem
git commit -m "Add buyer problem section"
```

---

## Task 10: How It Works (4-step flow)

**Files:**
- Create: `components/HowItWorks/HowItWorks.tsx`, `components/HowItWorks/HowItWorks.module.css`
- Test: `components/HowItWorks/HowItWorks.test.tsx`

**Interfaces:**
- Consumes: `useVideoModal()` (Task 3) — the section's own "play" affordance also opens
  the shared modal.

- [ ] **Step 1: Write the failing test**

```tsx
// components/HowItWorks/HowItWorks.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoModalProvider } from "@/components/video-modal/VideoModalProvider";
import { HowItWorks } from "./HowItWorks";

describe("HowItWorks", () => {
  it("lists all four steps as plain text", () => {
    render(
      <VideoModalProvider>
        <HowItWorks />
      </VideoModalProvider>,
    );
    expect(screen.getByText("Authenticate")).toBeInTheDocument();
    expect(screen.getByText("Check Out")).toBeInTheDocument();
    expect(screen.getByText("Use")).toBeInTheDocument();
    expect(screen.getByText("Return")).toBeInTheDocument();
    expect(
      screen.getByText(/Students use approved university credentials/),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/HowItWorks/HowItWorks.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `HowItWorks`**

```tsx
// components/HowItWorks/HowItWorks.tsx
"use client";

import { useVideoModal } from "@/components/video-modal/VideoModalProvider";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    title: "Authenticate",
    description: "Students use approved university credentials to access the system.",
  },
  {
    title: "Check Out",
    description: "After authentication, an available device is securely released.",
  },
  {
    title: "Use",
    description:
      "Students take the technology where they need it for coursework, research or study.",
  },
  {
    title: "Return",
    description:
      "The device is returned to an available bay, secured and prepared for the next checkout.",
  },
];

export function HowItWorks() {
  const { open } = useVideoModal();

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        From student ID to laptop in a few simple steps.
      </h2>
      <ol className={styles.steps}>
        {STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </li>
        ))}
      </ol>
      <button type="button" className={styles.watchButton} onClick={open}>
        Watch it in action
      </button>
    </section>
  );
}
```

- [ ] **Step 4: Styles**

```css
/* components/HowItWorks/HowItWorks.module.css */
.section {
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.heading {
  color: var(--color-navy);
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
}

.steps {
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.step {
  text-align: center;
}

.stepNumber {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--color-orange);
  color: #fff;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  margin-bottom: 0.75rem;
}

.stepTitle {
  color: var(--color-navy);
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}

.stepDescription {
  font-weight: var(--font-weight-light);
  font-size: 0.9rem;
  margin: 0;
}

.watchButton {
  display: block;
  margin: 0 auto;
  background: var(--color-navy);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.6rem 1.5rem;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  cursor: pointer;
}

@media (max-width: 800px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/HowItWorks/HowItWorks.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/HowItWorks
git commit -m "Add four-step How It Works section"
```

---

## Task 11: Benefits

**Files:**
- Create: `components/Benefits/Benefits.tsx`, `components/Benefits/Benefits.module.css`
- Test: `components/Benefits/Benefits.test.tsx`

**Interfaces:** Consumes `benefits` from `lib/content.ts` (Task 2).

- [ ] **Step 1: Write the failing test**

```tsx
// components/Benefits/Benefits.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Benefits } from "./Benefits";

describe("Benefits", () => {
  it("renders all four benefit cards", () => {
    render(<Benefits />);
    expect(screen.getByText("24/7 Technology Access")).toBeInTheDocument();
    expect(screen.getByText("Less Manual Checkout")).toBeInTheDocument();
    expect(screen.getByText("Accountability")).toBeInTheDocument();
    expect(screen.getByText("Devices Ready to Go")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/Benefits/Benefits.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `Benefits`**

```tsx
// components/Benefits/Benefits.tsx
import { benefits } from "@/lib/content";
import styles from "./Benefits.module.css";

export function Benefits() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        More access for students. Less repetitive work for staff.
      </h2>
      <ul className={styles.grid}>
        {benefits.map((benefit) => (
          <li key={benefit.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{benefit.title}</h3>
            <p className={styles.cardBody}>{benefit.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Styles**

```css
/* components/Benefits/Benefits.module.css */
.section {
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.heading {
  color: var(--color-navy);
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.card {
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 1.25rem;
}

.cardTitle {
  color: var(--color-navy);
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.cardBody {
  font-weight: var(--font-weight-light);
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/Benefits/Benefits.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/Benefits
git commit -m "Add benefits section"
```

---

## Task 12: Supported devices

**Files:**
- Create: `components/SupportedDevices/SupportedDevices.tsx`, `components/SupportedDevices/SupportedDevices.module.css`
- Test: `components/SupportedDevices/SupportedDevices.test.tsx`

**Interfaces:** Consumes `devices` from `lib/content.ts` (Task 2).

- [ ] **Step 1: Write the failing test**

```tsx
// components/SupportedDevices/SupportedDevices.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SupportedDevices } from "./SupportedDevices";

describe("SupportedDevices", () => {
  it("lists all five device categories and the compatibility qualifier", () => {
    render(<SupportedDevices />);
    expect(screen.getByText("Laptops")).toBeInTheDocument();
    expect(screen.getByText("MacBooks")).toBeInTheDocument();
    expect(screen.getByText("Chromebooks")).toBeInTheDocument();
    expect(screen.getByText("iPads / Tablets")).toBeInTheDocument();
    expect(screen.getByText("Portable 110V Chargers")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Device compatibility and system configuration depend on the selected models and deployment requirements.",
      ),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/SupportedDevices/SupportedDevices.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `SupportedDevices`**

```tsx
// components/SupportedDevices/SupportedDevices.tsx
import { devices } from "@/lib/content";
import styles from "./SupportedDevices.module.css";

export function SupportedDevices() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>One system. Multiple campus technology needs.</h2>
      <ul className={styles.grid}>
        {devices.map((device, index) => (
          <li
            key={device.name}
            className={index === 0 ? `${styles.card} ${styles.primary}` : styles.card}
          >
            <h3 className={styles.cardTitle}>{device.name}</h3>
            <p className={styles.cardBody}>{device.description}</p>
          </li>
        ))}
      </ul>
      <p className={styles.qualifier}>
        Device compatibility and system configuration depend on the selected models and
        deployment requirements.
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Styles**

```css
/* components/SupportedDevices/SupportedDevices.module.css */
.section {
  background: var(--color-band-pale-blue);
  padding: 3rem 1.5rem;
}

.heading {
  color: var(--color-navy);
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
}

.grid {
  list-style: none;
  margin: 0 auto 1.5rem;
  padding: 0;
  max-width: var(--max-content-width);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 1.25rem 1rem;
  text-align: center;
}

.primary {
  border: 2px solid var(--color-orange);
}

.cardTitle {
  color: var(--color-navy);
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}

.cardBody {
  font-weight: var(--font-weight-light);
  font-size: 0.8rem;
  margin: 0;
}

.qualifier {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  font-size: 0.8rem;
  font-style: italic;
  font-weight: var(--font-weight-light);
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/SupportedDevices/SupportedDevices.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/SupportedDevices
git commit -m "Add supported devices section"
```

---

## Task 13: University use cases

**Files:**
- Create: `components/UniversityUseCases/UniversityUseCases.tsx`, `components/UniversityUseCases/UniversityUseCases.module.css`
- Test: `components/UniversityUseCases/UniversityUseCases.test.tsx`

**Interfaces:** Consumes `useCases` from `lib/content.ts` (Task 2).

- [ ] **Step 1: Write the failing test**

```tsx
// components/UniversityUseCases/UniversityUseCases.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UniversityUseCases } from "./UniversityUseCases";

describe("UniversityUseCases", () => {
  it("renders all four use cases", () => {
    render(<UniversityUseCases />);
    expect(screen.getByText("University Libraries")).toBeInTheDocument();
    expect(screen.getByText("Campus IT")).toBeInTheDocument();
    expect(screen.getByText("Student Unions & Study Spaces")).toBeInTheDocument();
    expect(screen.getByText("Multi-Building Campuses")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/UniversityUseCases/UniversityUseCases.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `UniversityUseCases`**

```tsx
// components/UniversityUseCases/UniversityUseCases.tsx
import { useCases } from "@/lib/content";
import styles from "./UniversityUseCases.module.css";

export function UniversityUseCases() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Built for the places students already learn.</h2>
      <ul className={styles.grid}>
        {useCases.map((useCase) => (
          <li key={useCase.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{useCase.title}</h3>
            <p className={styles.cardBody}>{useCase.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Styles**

```css
/* components/UniversityUseCases/UniversityUseCases.module.css */
.section {
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.heading {
  color: var(--color-navy);
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.card {
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 1.25rem;
}

.cardTitle {
  color: var(--color-navy);
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.cardBody {
  font-weight: var(--font-weight-light);
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/UniversityUseCases/UniversityUseCases.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/UniversityUseCases
git commit -m "Add university use cases section"
```

---

## Task 14: IT / Security / Authentication

**Files:**
- Create: `components/ITSecurity/ITSecurity.tsx`, `components/ITSecurity/ITSecurity.module.css`
- Test: `components/ITSecurity/ITSecurity.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// components/ITSecurity/ITSecurity.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ITSecurity } from "./ITSecurity";

describe("ITSecurity", () => {
  it("renders all four subsections with accurate, hedged claims", () => {
    render(<ITSecurity />);
    expect(screen.getByRole("heading", { name: "Authentication" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "University Control" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Network / Kiosk Security" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Device Management" })).toBeInTheDocument();
    expect(
      screen.getByText(/depending on the deployment/),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/ITSecurity/ITSecurity.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `ITSecurity`**

```tsx
// components/ITSecurity/ITSecurity.tsx
import styles from "./ITSecurity.module.css";

const SUBSECTIONS = [
  {
    title: "Authentication",
    body: "LaptopsAnytime supports multiple authentication approaches, including SSO availability, AD/LDAP credentials and other supported university credential methods depending on the deployment.",
  },
  {
    title: "University Control",
    body: "Your university remains in control of the software image, device policies and supported management tools used on the laptops or tablets being dispensed.",
  },
  {
    title: "Network / Kiosk Security",
    body: "Kiosks run on a Linux-based operating environment with regular security scans. Network exposure is limited to an outgoing-only SSL connection, with temporary VPN access used only when needed for setup or support.",
  },
  {
    title: "Device Management",
    body: "The system can support university device-management and reset workflows so shared equipment can be prepared for the next authorized user.",
  },
];

export function ITSecurity() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Built to work with your IT environment — not around it.
      </h2>
      <div className={styles.grid}>
        {SUBSECTIONS.map((sub) => (
          <div key={sub.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{sub.title}</h3>
            <p className={styles.cardBody}>{sub.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Styles (visually distinct band signaling technical content)**

```css
/* components/ITSecurity/ITSecurity.module.css */
.section {
  background: var(--color-navy);
  color: #fff;
  padding: 3rem 1.5rem;
}

.heading {
  color: #fff;
  font-size: 1.75rem;
  text-align: center;
  max-width: 760px;
  margin: 0 auto 2rem;
}

.grid {
  max-width: var(--max-content-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1.25rem;
}

.cardTitle {
  color: var(--color-teal);
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.cardBody {
  font-weight: var(--font-weight-light);
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/ITSecurity/ITSecurity.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/ITSecurity
git commit -m "Add IT/security/authentication section"
```

---

## Task 15: Case study

**Files:**
- Create: `components/CaseStudy/CaseStudy.tsx`, `components/CaseStudy/CaseStudy.module.css`
- Test: `components/CaseStudy/CaseStudy.test.tsx`

**Interfaces:** Consumes `externalLinks.caseStudyPdf` from `lib/content.ts` (Task 2).

- [ ] **Step 1: Write the failing test**

```tsx
// components/CaseStudy/CaseStudy.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudy } from "./CaseStudy";

describe("CaseStudy", () => {
  it("cites only verified Texas A&M–Commerce facts and links the real PDF", () => {
    render(<CaseStudy />);
    expect(screen.getByText(/fall 2013/i)).toBeInTheDocument();
    expect(screen.getByText(/Gee Library/i)).toBeInTheDocument();
    expect(screen.getByText(/[Ss]tudent [Cc]enter/)).toBeInTheDocument();
    expect(screen.queryByText(/academic building/i)).not.toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Read the Case Study" });
    expect(link).toHaveAttribute(
      "href",
      "https://www.laptopsanytime.com/_files/ugd/410f26_9e0fad9ea43c46cc8b96167fa07405ec.pdf",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/CaseStudy/CaseStudy.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `CaseStudy`**

```tsx
// components/CaseStudy/CaseStudy.tsx
import { externalLinks } from "@/lib/content";
import styles from "./CaseStudy.module.css";

export function CaseStudy() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Proven on real campuses</h2>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Texas A&amp;M University–Commerce</p>
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>The Challenge</h3>
          <p>
            The Gee Library&apos;s computer lab couldn&apos;t keep up with student
            demand, and commuter and nontraditional students needed access beyond what
            in-library laptop loans could offer.
          </p>
        </div>
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>The Approach</h3>
          <p>
            In fall 2013, the library piloted a self-service LaptopsAnytime kiosk with
            12 slots and 12 laptops — the first library kiosk of its kind in Texas.
            Demand required adding 12 more laptops almost immediately. In fall 2014, a
            second 12-slot kiosk was installed in the Student Center, chosen for its
            central, high-traffic location near the dorms, and a companion kiosk was
            added back in the library the same year.
          </p>
        </div>
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>The Experience</h3>
          <p>
            Students authenticate by swiping their student ID and agreeing to the terms
            of service. Staff can manage the system remotely, seeing when a location is
            running low and restocking it. &quot;Was the investment worth it? Yes, it
            was,&quot; the library&apos;s case study concludes.
          </p>
        </div>
        <a
          className={styles.cta}
          href={externalLinks.caseStudyPdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the Case Study
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Styles**

```css
/* components/CaseStudy/CaseStudy.module.css */
.section {
  background: var(--color-band-gray);
  padding: 3rem 1.5rem;
}

.heading {
  color: var(--color-navy);
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
}

.inner {
  max-width: 720px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
}

.eyebrow {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  color: var(--color-magenta);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.85rem;
  margin: 0 0 1.25rem;
}

.block {
  margin-bottom: 1.25rem;
}

.blockTitle {
  color: var(--color-navy);
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.block p {
  font-weight: var(--font-weight-light);
  line-height: 1.6;
  margin: 0;
}

.cta {
  display: inline-block;
  margin-top: 0.5rem;
  background: var(--color-orange);
  color: #fff;
  border: 3px solid var(--color-gold);
  border-radius: 50px;
  padding: 0.6rem 1.5rem;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  text-decoration: none;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/CaseStudy/CaseStudy.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/CaseStudy
git commit -m "Add Texas A&M-Commerce case study section with verified facts"
```

---

## Task 16: FAQ accordion

**Files:**
- Create: `components/FAQ/FAQ.tsx`, `components/FAQ/FAQ.module.css`
- Test: `components/FAQ/FAQ.test.tsx`

**Interfaces:** Consumes `faqItems` from `lib/content.ts` (Task 2). `"use client"`
(needs open/close state).

- [ ] **Step 1: Write the failing test**

```tsx
// components/FAQ/FAQ.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FAQ } from "./FAQ";

describe("FAQ", () => {
  it("renders all six questions, collapsed by default", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(6);
    for (const button of buttons) {
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("expands a question on click and exposes the answer", () => {
    render(<FAQ />);
    const first = screen.getByRole("button", {
      name: "How does automated laptop lending work at a university?",
    });
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/Students authenticate at the kiosk/),
    ).toBeVisible();
  });

  it("collapses again on a second click", () => {
    render(<FAQ />);
    const first = screen.getByRole("button", {
      name: "How does automated laptop lending work at a university?",
    });
    fireEvent.click(first);
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/FAQ/FAQ.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `FAQ`**

```tsx
// components/FAQ/FAQ.tsx
"use client";

import { useState } from "react";
import { faqItems } from "@/lib/content";
import styles from "./FAQ.module.css";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Questions university technology teams ask</h2>
      <div className={styles.list}>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          return (
            <div key={item.question} className={styles.item}>
              <button
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p id={panelId} className={styles.answer}>
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Styles**

```css
/* components/FAQ/FAQ.module.css */
.section {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.heading {
  color: var(--color-navy);
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 2rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item {
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  overflow: hidden;
}

.question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: #fff;
  border: none;
  padding: 1rem 1.25rem;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  font-size: 0.95rem;
  color: var(--color-navy);
  text-align: left;
  cursor: pointer;
}

.icon {
  color: var(--color-orange);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.answer {
  margin: 0;
  padding: 0 1.25rem 1.25rem;
  font-weight: var(--font-weight-light);
  line-height: 1.6;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/FAQ/FAQ.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add components/FAQ
git commit -m "Add accessible FAQ accordion"
```

---

## Task 17: Final CTA

**Files:**
- Create: `components/FinalCTA/FinalCTA.tsx`, `components/FinalCTA/FinalCTA.module.css`
- Test: `components/FinalCTA/FinalCTA.test.tsx`

**Interfaces:** Consumes `useVideoModal()` (Task 3), `externalLinks.getQuote` (Task 2).

- [ ] **Step 1: Write the failing test**

```tsx
// components/FinalCTA/FinalCTA.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoModalProvider } from "@/components/video-modal/VideoModalProvider";
import { VideoModal } from "@/components/video-modal/VideoModal";
import { FinalCTA } from "./FinalCTA";

describe("FinalCTA", () => {
  it("links Request a Quote to the live quote page and reopens the modal", () => {
    render(
      <VideoModalProvider>
        <FinalCTA />
        <VideoModal videoId="IQOKecMU3eM" />
      </VideoModalProvider>,
    );
    expect(screen.getByRole("link", { name: "Request a Quote" })).toHaveAttribute(
      "href",
      "https://www.laptopsanytime.com/get-quote",
    );
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/FinalCTA/FinalCTA.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement `FinalCTA`**

```tsx
// components/FinalCTA/FinalCTA.tsx
"use client";

import { useVideoModal } from "@/components/video-modal/VideoModalProvider";
import { externalLinks } from "@/lib/content";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  const { open } = useVideoModal();

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Give students technology when they need it.</h2>
      <p className={styles.subheading}>
        Let&apos;s talk about how self-service technology lending could work across
        your university.
      </p>
      <div className={styles.ctas}>
        <a
          className={styles.primaryCta}
          href={externalLinks.getQuote}
          target="_blank"
          rel="noopener noreferrer"
        >
          Request a Quote
        </a>
        <button type="button" className={styles.secondaryCta} onClick={open}>
          See How It Works
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Styles**

```css
/* components/FinalCTA/FinalCTA.module.css */
.section {
  background: var(--color-navy);
  color: #fff;
  padding: 3.5rem 1.5rem;
  text-align: center;
}

.heading {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.subheading {
  font-weight: var(--font-weight-light);
  max-width: 520px;
  margin: 0 auto 1.5rem;
}

.ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primaryCta,
.secondaryCta {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heavy);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  text-decoration: none;
}

.primaryCta {
  background: var(--color-orange);
  color: #fff;
  border: 3px solid var(--color-gold);
}

.secondaryCta {
  background: transparent;
  color: #fff;
  border: 3px solid #fff;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- components/FinalCTA/FinalCTA.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add components/FinalCTA
git commit -m "Add final CTA section"
```

---

## Task 18: Assemble the page, wire AEO annotations, verify end-to-end

**Files:**
- Modify: `app/higher-education/page.tsx`
- Test: manual (browser + `npm run build`, `npm run lint`, `npm test`)

**Interfaces:**
- Consumes every component from Tasks 3–17 plus `AEOProvider`/`AEODemoToggle`/`AEOPanel`
  (Task 4–5) and `aeoAnnotations` (Task 2).

- [ ] **Step 1: Compose the full page**

```tsx
// app/higher-education/page.tsx
import type { Metadata } from "next";
import { AEOAnnotation } from "@/components/aeo/AEOAnnotation";
import { AEODemoToggle } from "@/components/aeo/AEODemoToggle";
import { AEOPanel } from "@/components/aeo/AEOPanel";
import { AEOProvider } from "@/components/aeo/AEOContext";
import { Benefits } from "@/components/Benefits/Benefits";
import { BuyerProblem } from "@/components/BuyerProblem/BuyerProblem";
import { CaseStudy } from "@/components/CaseStudy/CaseStudy";
import { FAQ } from "@/components/FAQ/FAQ";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { ITSecurity } from "@/components/ITSecurity/ITSecurity";
import { SupportedDevices } from "@/components/SupportedDevices/SupportedDevices";
import { TrustStrip } from "@/components/TrustStrip/TrustStrip";
import { UniversityUseCases } from "@/components/UniversityUseCases/UniversityUseCases";
import { VideoModal } from "@/components/video-modal/VideoModal";
import { VideoModalProvider } from "@/components/video-modal/VideoModalProvider";
import { aeoAnnotations, videoId } from "@/lib/content";

export const metadata: Metadata = {
  title: "Self-Service Technology Lending for Higher Education | LaptopsAnytime",
  description:
    "Give students secure, self-service access to laptops, MacBooks, Chromebooks, tablets and portable chargers — without adding more work for university IT or library staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HigherEducationPage() {
  return (
    <AEOProvider>
      <VideoModalProvider>
        <Header />
        <AEOAnnotation {...aeoAnnotations.architecture}>
          <main>
            <AEOAnnotation {...aeoAnnotations.hero}>
              <Hero />
            </AEOAnnotation>
            <TrustStrip />
            <AEOAnnotation {...aeoAnnotations.problem}>
              <BuyerProblem />
            </AEOAnnotation>
            <AEOAnnotation {...aeoAnnotations.howItWorks}>
              <HowItWorks />
            </AEOAnnotation>
            <Benefits />
            <AEOAnnotation {...aeoAnnotations.devices}>
              <SupportedDevices />
            </AEOAnnotation>
            <UniversityUseCases />
            <AEOAnnotation {...aeoAnnotations.security}>
              <ITSecurity />
            </AEOAnnotation>
            <AEOAnnotation {...aeoAnnotations.caseStudy}>
              <CaseStudy />
            </AEOAnnotation>
            <AEOAnnotation {...aeoAnnotations.faq}>
              <FAQ />
            </AEOAnnotation>
            <FinalCTA />
          </main>
        </AEOAnnotation>
        <Footer />
        <VideoModal videoId={videoId} />
        <AEODemoToggle />
        <AEOPanel />
      </VideoModalProvider>
    </AEOProvider>
  );
}
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: PASS — every test file from Tasks 2–17 passes.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: no errors. Fix any that surface (e.g. unused imports) before continuing.

- [ ] **Step 4: Run the production build**

Run: `npm run build`
Expected: build succeeds; `/higher-education` is listed as a static/prerendered route.

- [ ] **Step 5: Manual browser verification**

Start the app (`npm run dev`) and, in the browser tool, confirm:
- Desktop layout: header, hero, trust strip, all sections through footer render in the
  intended order (Problem → Solution → How It Works → Benefits → Devices → Use Cases →
  IT/Security → Case Study → FAQ → Final CTA).
- Mobile viewport (375px): sections stack single-column, no horizontal scroll, hero
  image doesn't crush the copy.
- Click "See How It Works" in the hero: modal opens, video does not autoplay with
  sound, `Authenticate → Check Out → Use → Return` line is visible under the video.
- Press Escape: modal closes, focus returns to the hero CTA button.
- Reopen, click the backdrop: modal closes.
- Reopen, Tab through the dialog: focus stays trapped between the close button and the
  iframe.
- Click through all six FAQ questions: each expands independently and collapses again.
- Click "AEO Demo" toggle: numbered dashed-outline annotations and the side panel
  appear with no visible layout jump; page scroll position and section sizes are
  unchanged before/after toggling (compare a screenshot at the same scroll position).
- Toggle AEO back OFF: annotations and panel disappear cleanly.
- Click every external nav link, "Request a Quote" (hero and final CTA), and "Read the
  Case Study": each opens `https://www.laptopsanytime.com/...` (or the case-study PDF
  URL) in a new tab.
- View page source (or the rendered `<head>`) and confirm a `noindex, nofollow` meta
  robots tag is present and no canonical `<link>` was added.
- Confirm no errors in the browser console.

- [ ] **Step 6: Commit**

```bash
git add app/higher-education/page.tsx
git commit -m "Assemble the Higher Education AEO demo page end-to-end"
```

---

## Self-Review Notes

- **Spec coverage:** every spec section (hero, trust strip, problem, how-it-works +
  video modal, benefits, devices, use cases, IT/security, case study, FAQ, final CTA,
  footer, AEO toggle/annotations/panel, noindex metadata, `next/image` remote pattern)
  maps to a task above.
- **Placeholder scan:** no TBD/TODO; every step has real, complete code.
- **Type consistency:** `useVideoModal()` returns `{isOpen, open, close, triggerRef}`
  consistently across Tasks 3, 7, 10, 17; `useAEO()` returns `{enabled, toggle}`
  consistently across Tasks 4, 5, 18; `AEOAnnotation` props (`id`, `title`,
  `explanation`, `children`) match between Task 5's implementation and Task 18's usage
  via `{...aeoAnnotations.hero}` spread (object shape `{id, title, explanation}` from
  Task 2 matches exactly).
