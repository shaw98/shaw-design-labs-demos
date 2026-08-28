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
