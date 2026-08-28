import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoModalProvider } from "@/components/video-modal/VideoModalProvider";
import { VideoModal } from "@/components/video-modal/VideoModal";
import { FinalCTA } from "./FinalCTA";

describe("FinalCTA", () => {
  it("links Request a Quote to the live quote page and reopens the modal", () => {
    render(
      <VideoModalProvider>
        <FinalCTA />
        <VideoModal videoId="IQOKecMU3eM" />
      </VideoModalProvider>,
    );
    expect(screen.getByRole("link", { name: "Request a Quote" })).toHaveAttribute(
      "href",
      "https://www.laptopsanytime.com/get-quote",
    );
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
