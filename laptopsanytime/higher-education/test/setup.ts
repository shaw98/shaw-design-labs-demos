import "@testing-library/jest-dom/vitest";

// jsdom has no layout engine, so window.matchMedia isn't implemented.
// Default to "not matching" (desktop) unless a test overrides it.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
