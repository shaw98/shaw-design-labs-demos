import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UniversityUseCases } from "./UniversityUseCases";

describe("UniversityUseCases", () => {
  it("renders all four use cases", () => {
    render(<UniversityUseCases />);
    expect(screen.getByText("University Libraries")).toBeInTheDocument();
    expect(screen.getByText("Campus IT")).toBeInTheDocument();
    expect(screen.getByText("Student Unions & Study Spaces")).toBeInTheDocument();
    expect(screen.getByText("Multi-Building Campuses")).toBeInTheDocument();
  });
});
