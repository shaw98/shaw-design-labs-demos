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
    expect(screen.getByText(/depending on the deployment/)).toBeInTheDocument();
  });
});
