import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FAQ } from "./FAQ";

describe("FAQ", () => {
  it("renders all six questions, collapsed by default", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(6);
    for (const button of buttons) {
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("expands a question on click and exposes the answer", () => {
    render(<FAQ />);
    const first = screen.getByRole("button", {
      name: /How does automated laptop lending work at a university\?/,
    });
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Students authenticate at the kiosk/)).toBeVisible();
  });

  it("collapses again on a second click", () => {
    render(<FAQ />);
    const first = screen.getByRole("button", {
      name: /How does automated laptop lending work at a university\?/,
    });
    fireEvent.click(first);
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("hedges the IT-configuration answer instead of an unqualified 'Yes.'", () => {
    render(<FAQ />);
    const question = screen.getByRole("button", {
      name: /Can a university configure the system around its existing IT environment\?/,
    });
    fireEvent.click(question);
    expect(screen.getByText(/can be configured around/i)).toBeInTheDocument();
  });
});
