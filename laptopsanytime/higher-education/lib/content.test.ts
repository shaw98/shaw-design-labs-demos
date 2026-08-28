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

  it("does not overclaim laptops as the 'primary focus of most deployments'", () => {
    const laptop = devices.find((d) => d.name === "Laptops");
    expect(laptop?.description).toBe(
      "Enterprise laptops are the most popular checkout option across LaptopsAnytime's supported device categories.",
    );
    expect(laptop?.description).not.toMatch(/primary focus of most deployments/i);
  });

  it("hedges the IT-configuration FAQ answer instead of an unqualified 'Yes.'", () => {
    const item = faqItems.find((f) =>
      f.question.startsWith("Can a university configure the system"),
    );
    expect(item?.answer).not.toMatch(/^Yes\./);
    expect(item?.answer).toMatch(/can be configured around/i);
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
