import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AEOProvider } from "./AEOContext";
import { AEOAnnotation } from "./AEOAnnotation";
import { AEODemoToggle } from "./AEODemoToggle";

describe("AEOAnnotation", () => {
  it("renders children with no annotation chrome when AEO mode is off", () => {
    render(
      <AEOProvider>
        <AEOAnnotation id={1} title="Clear Market + Solution" explanation="Explains it.">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    expect(screen.getByText("Hero content")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /AEO annotation/ })).not.toBeInTheDocument();
  });

  it("shows the numbered marker but NOT the explanation when AEO mode turns on", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOAnnotation id={1} title="Clear Market + Solution" explanation="Explains it.">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    expect(screen.getByRole("button", { name: /AEO annotation 1/ })).toBeInTheDocument();
    expect(screen.queryByText("Clear Market + Solution")).not.toBeInTheDocument();
  });

  it("reveals the explanation only after the marker is activated, and hides it again on a second activation", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOAnnotation id={1} title="Clear Market + Solution" explanation="Explains it.">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    const marker = screen.getByRole("button", { name: /AEO annotation 1/ });
    fireEvent.click(marker);
    expect(marker).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Clear Market \+ Solution/)).toBeInTheDocument();
    expect(screen.getByText("Explains it.")).toBeInTheDocument();

    fireEvent.click(marker);
    expect(marker).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/Clear Market \+ Solution/)).not.toBeInTheDocument();
  });

  it("keeps only one annotation's explanation active at a time", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOAnnotation id={1} title="First" explanation="First explanation.">
          <p>First content</p>
        </AEOAnnotation>
        <AEOAnnotation id={2} title="Second" explanation="Second explanation.">
          <p>Second content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    fireEvent.click(screen.getByRole("button", { name: /AEO annotation 1/ }));
    expect(screen.getByText("First explanation.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /AEO annotation 2/ }));
    expect(screen.queryByText("First explanation.")).not.toBeInTheDocument();
    expect(screen.getByText("Second explanation.")).toBeInTheDocument();
  });

  it("the marker is a real, keyboard-focusable button (not a div with a click handler)", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOAnnotation id={1} title="Clear Market + Solution" explanation="Explains it.">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    const marker = screen.getByRole("button", { name: /AEO annotation 1/ });
    expect(marker.tagName).toBe("BUTTON");
    marker.focus();
    expect(marker).toHaveFocus();
  });

  it("closes the active explanation on Escape", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOAnnotation id={1} title="Clear Market + Solution" explanation="Explains it.">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    fireEvent.click(screen.getByRole("button", { name: /AEO annotation 1/ }));
    expect(screen.getByText("Explains it.")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Explains it.")).not.toBeInTheDocument();
  });

  it("wraps children in a position:relative box so the overlay never shifts layout", () => {
    const { container } = render(
      <AEOProvider>
        <AEOAnnotation id={1} title="t" explanation="e">
          <p>Hero content</p>
        </AEOAnnotation>
      </AEOProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toMatch(/wrapper/);
  });

  it("moves an outer annotation's marker to the opposite corner so it doesn't sit on top of an inner annotation's marker at the same corner (regression: annotation 8 wrapping <main> was unclickable behind annotation 1)", () => {
    render(
      <AEOProvider>
        <AEODemoToggle />
        <AEOAnnotation
          id={8}
          title="Information Architecture"
          explanation="Outer explanation."
          markerPosition="top-right"
        >
          <AEOAnnotation id={1} title="Clear Market + Solution" explanation="Inner explanation.">
            <p>Hero content</p>
          </AEOAnnotation>
        </AEOAnnotation>
      </AEOProvider>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "AEO Demo" }));
    const outerMarker = screen.getByRole("button", { name: /AEO annotation 8/ });
    const innerMarker = screen.getByRole("button", { name: /AEO annotation 1/ });
    expect(outerMarker.className).toMatch(/markerTopRight/);
    expect(innerMarker.className).not.toMatch(/markerTopRight/);

    fireEvent.click(innerMarker);
    expect(screen.getByText("Inner explanation.")).toBeInTheDocument();
    expect(screen.queryByText("Outer explanation.")).not.toBeInTheDocument();
  });
});
