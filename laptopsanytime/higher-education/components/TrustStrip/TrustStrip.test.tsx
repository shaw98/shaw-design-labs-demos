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
