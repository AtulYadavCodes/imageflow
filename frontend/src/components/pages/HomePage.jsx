import ApiDocsSection from "../sections/ApiDocsSection";
import ApiKeySection from "../sections/ApiKeySection";
import FooterSection from "../ui/Footer";
import HeroSection from "../sections/HeroSection";
import TryoutSection from "../sections/TryoutSection";


function HomePage() {
  return (
    <>
      <HeroSection />
      <TryoutSection
        steps={[
          "Pick an image file from your device.",
          "Send it through the upload flow with your API key.",
          "Use the returned file link to preview or transform the asset.",
        ]}
      />
    </>
  );
}

export default HomePage;
