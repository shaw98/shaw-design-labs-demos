import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AEOProvider, useAEO } from "./AEOContext";
import { AEODemoToggle } from "./AEODemoToggle";

function Consumer() {
  const { enabled } = useAEO();
  return <span data-testid="state">{enabled ? "ON" : "OFF"}</span>;
}

describe("AEODemoToggle", () => {
  it("defaults to OFF", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <Consumer />
      </AEOProvider>,
    );
    expect(screen.getByTestId("state")).toHaveTextContent("OFF");
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("toggles ON when clicked, and back OFF on a second click", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <Consumer />
      </AEOProvider>,
    );
    const toggle = screen.getByRole("switch", { name: "AEO Demo" });
    fireEvent.click(toggle);
    expect(screen.getByTestId("state")).toHaveTextContent("ON");
    expect(toggle).toHaveAttribute("aria-checked", "true");

    fireEvent.click(toggle);
    expect(screen.getByTestId("state")).toHaveTextContent("OFF");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});
