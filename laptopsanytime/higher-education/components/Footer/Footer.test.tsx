import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("matches the live site's current copyright year exactly (2025, not updated)", () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2025 by LaptopsAnytime, All Rights Reserved"),
    ).toBeInTheDocument();
  });

  it("shows the real company info", () => {
    render(<Footer />);
    expect(screen.getByText("Java Connections LLC dba LaptopsAnytime")).toBeInTheDocument();
    expect(
      screen.getByText("17304 Preston Road, Suite 800, Dallas, TX 75252"),
    ).toBeInTheDocument();
  });
});
