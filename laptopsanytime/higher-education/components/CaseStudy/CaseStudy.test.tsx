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
