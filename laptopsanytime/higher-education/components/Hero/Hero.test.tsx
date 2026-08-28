import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoModalProvider } from "@/components/video-modal/VideoModalProvider";
import { VideoModal } from "@/components/video-modal/VideoModal";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the H1, value proposition, and both CTAs", () => {
    render(
      <VideoModalProvider>
        <Hero />
        <VideoModal videoId="IQOKecMU3eM" />
      </VideoModalProvider>,
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Self-Service Technology Lending for Higher Education",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Give students secure, self-service access to laptops — without adding more work for your IT or library staff.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Request a Quote" })).toHaveAttribute(
      "href",
      "https://www.laptopsanytime.com/get-quote",
    );
  });

  it("opens the video modal from the primary CTA", () => {
    render(
      <VideoModalProvider>
        <Hero />
        <VideoModal videoId="IQOKecMU3eM" />
      </VideoModalProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "See How It Works" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
