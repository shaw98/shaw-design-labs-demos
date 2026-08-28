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

  it("does not overclaim laptops as the primary focus of deployments", () => {
    render(<SupportedDevices />);
    expect(screen.queryByText(/primary focus of most deployments/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "Enterprise laptops are the most popular checkout option across LaptopsAnytime's supported device categories.",
      ),
    ).toBeInTheDocument();
  });
});
