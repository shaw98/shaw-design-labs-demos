import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("links every nav item to the live LaptopsAnytime site in a new tab", () => {
    render(<Header />);
    const links = [
      ["Solutions+", "https://www.laptopsanytime.com/solutions"],
      ["Popular Products+", "https://www.laptopsanytime.com/product-lines"],
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

  it("links Login to the real LaptopsAnytime login page", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "https://hq.laptopsanytime.net/login.html",
    );
  });

  it("shows the phone number", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "877-836-3727" })).toHaveAttribute(
      "href",
      "tel:1-877-836-3727",
    );
  });

  it("opens the logo link in a new tab so the demo session isn't navigated away", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /LaptopsAnytime/ });
    expect(logoLink).toHaveAttribute("href", "https://www.laptopsanytime.com");
    expect(logoLink).toHaveAttribute("target", "_blank");
    expect(logoLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
