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
