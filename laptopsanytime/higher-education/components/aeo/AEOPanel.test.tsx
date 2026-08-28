import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AEOProvider } from "./AEOContext";
import { AEODemoToggle } from "./AEODemoToggle";
import { AEOPanel } from "./AEOPanel";

function mockViewport(matchesMaxWidth640: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === "(max-width: 640px)" ? matchesMaxWidth640 : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
}

describe("AEOPanel", () => {
  it("does not render when AEO mode is off", () => {
    render(
      <AEOProvider>
        <AEOPanel />
      </AEOProvider>,
    );
    expect(screen.queryByLabelText("Why this page matters")).not.toBeInTheDocument();
  });

  it("renders the checklist and closing line when AEO mode is on", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOPanel />
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    expect(screen.getByLabelText("Why this page matters")).toBeInTheDocument();
    expect(screen.getByText(/Clear Higher Education topic/)).toBeInTheDocument();
    expect(
      screen.getByText(/AEO does not require redesigning the entire website/),
    ).toBeInTheDocument();
  });

  it("collapses to a small tab on request, and can be reopened", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOPanel />
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    fireEvent.click(screen.getByRole("button", { name: "Hide" }));
    expect(screen.queryByLabelText("Why this page matters")).not.toBeInTheDocument();
    const tab = screen.getByRole("button", { name: "Why this page matters" });
    expect(tab).toBeInTheDocument();

    fireEvent.click(tab);
    expect(screen.getByLabelText("Why this page matters")).toBeInTheDocument();
  });

  describe("on a narrow (mobile) viewport", () => {
    afterEach(() => {
      mockViewport(false);
    });

    it("starts collapsed instead of covering the hero copy immediately", () => {
      mockViewport(true);
      render(
        <AEOProvider>
          <AEODemoToggle />
          <AEOPanel />
        </AEOProvider>,
      );
      fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
      expect(screen.queryByLabelText("Why this page matters")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Why this page matters" }),
      ).toBeInTheDocument();
    });
  });

  it("starts expanded on a normal desktop viewport", () => {
    mockViewport(false);
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOPanel />
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    expect(screen.getByLabelText("Why this page matters")).toBeInTheDocument();
  });
});
