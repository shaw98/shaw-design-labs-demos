import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoModalProvider, useVideoModal } from "./VideoModalProvider";
import { VideoModal } from "./VideoModal";

function TestHarness() {
  const { open } = useVideoModal();
  return (
    <>
      <button onClick={open}>See How It Works</button>
      <VideoModal videoId="IQOKecMU3eM" />
    </>
  );
}

function renderHarness() {
  return render(
    <VideoModalProvider>
      <TestHarness />
    </VideoModalProvider>,
  );
}

describe("VideoModal", () => {
  it("is not rendered until opened", () => {
    renderHarness();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click and embeds the given YouTube video", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    const dialog = screen.getByRole("dialog", { name: "See LaptopsAnytime in Action" });
    expect(dialog).toBeInTheDocument();
    const iframe = screen.getByTitle("LaptopsAnytime higher education kiosk walkthrough");
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("youtube.com/embed/IQOKecMU3eM"),
    );
    expect(iframe).toHaveAttribute("src", expect.not.stringContaining("autoplay=1"));
  });

  it("shows the four-step process as plain text under the video", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    expect(screen.getByText(/Authenticate.*Check Out.*Use.*Return/)).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the trigger", () => {
    renderHarness();
    const trigger = screen.getByRole("button", { name: "See How It Works" });
    // jsdom, unlike real browsers, doesn't focus a button as part of a click,
    // so the trigger's own focus (which a real click would produce) is simulated here.
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on backdrop click", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    fireEvent.click(screen.getByTestId("video-modal-backdrop"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on the close button", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    fireEvent.click(screen.getByRole("button", { name: "Close video" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("traps Tab focus within the dialog", () => {
    renderHarness();
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    const closeBtn = screen.getByRole("button", { name: "Close video" });
    expect(closeBtn).toHaveFocus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    const focusables = screen
      .getByRole("dialog")
      .querySelectorAll<HTMLElement>("button, a[href], iframe");
    expect(document.activeElement).toBe(focusables[focusables.length - 1]);
  });
});
