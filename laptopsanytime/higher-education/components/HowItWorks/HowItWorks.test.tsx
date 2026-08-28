import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoModalProvider } from "@/components/video-modal/VideoModalProvider";
import { HowItWorks } from "./HowItWorks";

describe("HowItWorks", () => {
  it("lists all four steps as plain text", () => {
    render(
      <VideoModalProvider>
        <HowItWorks />
      </VideoModalProvider>,
    );
    expect(screen.getByText("Authenticate")).toBeInTheDocument();
    expect(screen.getByText("Check Out")).toBeInTheDocument();
    expect(screen.getByText("Use")).toBeInTheDocument();
    expect(screen.getByText("Return")).toBeInTheDocument();
    expect(
      screen.getByText(/Students use approved university credentials/),
    ).toBeInTheDocument();
  });
});
