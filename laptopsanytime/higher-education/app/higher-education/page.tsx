import type { Metadata } from "next";
import { AEOAnnotation } from "@/components/aeo/AEOAnnotation";
import { AEODemoToggle } from "@/components/aeo/AEODemoToggle";
import { AEOPanel } from "@/components/aeo/AEOPanel";
import { AEOProvider } from "@/components/aeo/AEOContext";
import { Benefits } from "@/components/Benefits/Benefits";
import { BuyerProblem } from "@/components/BuyerProblem/BuyerProblem";
import { CaseStudy } from "@/components/CaseStudy/CaseStudy";
import { FAQ } from "@/components/FAQ/FAQ";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { ITSecurity } from "@/components/ITSecurity/ITSecurity";
import { SupportedDevices } from "@/components/SupportedDevices/SupportedDevices";
import { TrustStrip } from "@/components/TrustStrip/TrustStrip";
import { UniversityUseCases } from "@/components/UniversityUseCases/UniversityUseCases";
import { VideoModal } from "@/components/video-modal/VideoModal";
import { VideoModalProvider } from "@/components/video-modal/VideoModalProvider";
import { aeoAnnotations, videoId } from "@/lib/content";

export const metadata: Metadata = {
  title: "Self-Service Technology Lending for Higher Education | LaptopsAnytime",
  description:
    "Give students secure, self-service access to laptops, MacBooks, Chromebooks, tablets and portable chargers — without adding more work for university IT or library staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HigherEducationPage() {
  return (
    <AEOProvider>
      <VideoModalProvider>
        <Header />
        <AEOAnnotation {...aeoAnnotations.architecture} markerPosition="top-right">
          <main>
            <AEOAnnotation {...aeoAnnotations.hero}>
              <Hero />
            </AEOAnnotation>
            <TrustStrip />
            <AEOAnnotation {...aeoAnnotations.problem}>
              <BuyerProblem />
            </AEOAnnotation>
            <AEOAnnotation {...aeoAnnotations.howItWorks}>
              <HowItWorks />
            </AEOAnnotation>
            <Benefits />
            <AEOAnnotation {...aeoAnnotations.devices}>
              <SupportedDevices />
            </AEOAnnotation>
            <UniversityUseCases />
            <AEOAnnotation {...aeoAnnotations.security}>
              <ITSecurity />
            </AEOAnnotation>
            <AEOAnnotation {...aeoAnnotations.caseStudy}>
              <CaseStudy />
            </AEOAnnotation>
            <AEOAnnotation {...aeoAnnotations.faq}>
              <FAQ />
            </AEOAnnotation>
            <FinalCTA />
          </main>
        </AEOAnnotation>
        <Footer />
        <VideoModal videoId={videoId} />
        <AEODemoToggle />
        <AEOPanel />
      </VideoModalProvider>
    </AEOProvider>
  );
}
